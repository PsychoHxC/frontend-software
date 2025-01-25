// import { Component, AfterViewInit, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';

// @Component({
//   selector: 'app-preguntas-frecuentes',
//   templateUrl: './preguntas-frecuentes.component.html',
//   styleUrls: ['./preguntas-frecuentes.component.scss']
// })
// export class AreaComponent implements AfterViewInit {
//   // Columnas que se mostrarán en la tabla
//   displayedColumns: string[] = ['select', 'idArea', 'nombreJefe', 'solicitudPersonal'];
//   // Fuente de datos para la tabla
//   dataSource = new MatTableDataSource<any>();
//   // Solicitudes almacenadas
//   solicitudes: any[] = [];
//   // Selección de elementos
//   selection: any[] = [];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(public dialog: MatDialog) {}

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }

//   // Abrir el diálogo para crear solicitudes
//   openDialog(): void {
//     const dialogRef = this.dialog.open(CrearSolicitudComponent);

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         // Agregar la nueva solicitud y actualizar la tabla
//         this.solicitudes.push(result);
//         this.dataSource.data = this.solicitudes;
//       }
//     });
//   }

//   // Aprobar las solicitudes seleccionadas
//   aprobarSolicitudes(): void {
//     console.log('Solicitudes aprobadas:', this.selection);
//     this.selection = []; // Limpiar la selección después de aprobar
//   }

//   // Seleccionar o deseleccionar todos los registros
//   seleccionarTodos(event: any): void {
//     if (event.checked) {
//       this.selection = [...this.dataSource.data];
//     } else {
//       this.selection = [];
//     }
//   }

//   // Agregar o quitar un elemento de la selección
//   toggleSelection(element: any): void {
//     const index = this.selection.indexOf(element);
//     if (index === -1) {
//       this.selection.push(element);
//     } else {
//       this.selection.splice(index, 1);
//     }
//   }
// }

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { AreaService } from 'src/app/servicios/area.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.scss']
})
export class AreaComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'nombreArea', 'nombreJefe', 'solicitudPersonal', 'acciones' ];
  dataSource = new MatTableDataSource<any>();
  solicitudes: any[] = [];
  selection: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private areaService: AreaService,
    private snackBar: MatSnackBar
  ) {} 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cargarSolicitudes(); 
  }


  isLoading: boolean = true;
  

cargarSolicitudes(): void {
  this.isLoading = true;
  this.areaService.consultar().subscribe(
    (data: any) => {
      this.solicitudes = data.filter((solicitud: any) => solicitud.id_aprobacion === null);
      this.dataSource.data = this.solicitudes;
      this.isLoading = false; // Detener el indicador de carga
      console.log('Datos cargados:', this.solicitudes);
    },
    (error) => {
      console.error('Error al cargar las solicitudes:', error);
      this.isLoading = false; // Detener el indicador incluso en caso de error
    }
  );
}

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearSolicitudComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.solicitudes.push(result);
        this.dataSource.data = this.solicitudes;
      }
    });
  }

  aprobarSolicitudes(): void {
    this.selection.forEach((solicitud: any) => {
      const id = solicitud.id;
      const idAprobacion = 1; // Ajusta este valor según corresponda
      
      this.areaService.aprobarSolicitud(id, idAprobacion).subscribe(
        (response: any) => {
          if (response.resultado === 'OK') {
            // Actualizar localmente la solicitud aprobada
            const index = this.solicitudes.findIndex((s) => s.id === id);
            if (index !== -1) {
              this.solicitudes[index].id_aprobacion = idAprobacion;
              this.dataSource.data = this.solicitudes.slice(); // Forzar actualización
            }
          } else {
            console.error('Error al aprobar la solicitud:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud de aprobación:', error);
        }
      );
    });
  
    // Limpiar selección después de aprobar
    this.selection = [];
  }
  

  seleccionarTodos(event: any): void {
    if (event.checked) {
      this.selection = [...this.dataSource.data];
    } else {
      this.selection = [];
    }
  }

  toggleSelection(element: any): void {
    const index = this.selection.indexOf(element);
    if (index === -1) {
      this.selection.push(element);
    } else {
      this.selection.splice(index, 1);
    }
  }

  eliminarSolicitud(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      this.areaService.eliminar(id).subscribe(
        () => {
          // Filtrar el arreglo local y actualizar la tabla
          this.solicitudes = this.solicitudes.filter((solicitud) => solicitud.id !== id);
          this.dataSource.data = this.solicitudes;
        },
        (error) => {
          console.error('Error al eliminar la solicitud:', error);
        }
      );
    }
  }

  editarSolicitud(element: any): void {
    const dialogRef = this.dialog.open(CrearSolicitudComponent, {
      width: '75%',
      height: '75%',
      data: { ...element } // Pasamos los datos completos del registro al modal
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualiza la solicitud en la lista local y refresca la tabla
        const index = this.solicitudes.findIndex((s) => s.id === element.id);
        if (index !== -1) {
          this.solicitudes[index] = result;
          this.dataSource.data = this.solicitudes;
        }
      }
    });
  }
  
  
}



