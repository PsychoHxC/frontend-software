import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent implements AfterViewInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'nombre', 'puesto', 'acciones'];
  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<any>([
    { id: 1, nombre: 'Juan Pérez', puesto: 'Gerente' },
    { id: 2, nombre: 'Ana Gómez', puesto: 'Analista' },
    { id: 3, nombre: 'Carlos Ramírez', puesto: 'Desarrollador' }
  ]);
  // Referencia al paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Conectar el paginador
  }


  // Acción para editar un recurso
  editarRecurso(element: any): void {
    Swal.fire('Editar Recurso', `Editar información del recurso: ${element.nombre}`, 'info');
  }

  // Acción para eliminar un recurso
  eliminarRecurso() {

  }
}

