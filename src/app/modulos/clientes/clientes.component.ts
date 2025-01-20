import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';
import Swal from 'sweetalert2';
import { GerenciaService } from 'src/app/servicios/gerencia.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements AfterViewInit {

  categoria:any;

  displayedColumns: string[] = [
    'select',
    'numeroSolicitud',
    'area',
    'tipoSolicitud',
    'fechaEjecucion',
    'prioridad',
    'acciones',
  ];

  dataSource = new MatTableDataSource([
    {
      numeroSolicitud: '202361203361152',
      area: 'JUZGADO 8',
      tipoSolicitud: 'Remanentes',
      fechaEjecucion: '2023-12-03',
      prioridad: 'Alta',
    },
    {
      numeroSolicitud: '202361203361153',
      area: 'JUZGADO 9',
      tipoSolicitud: 'Remanentes',
      fechaEjecucion: '2023-12-05',
      prioridad: 'Media',
    },
    // Agrega más elementos según sea necesario
  ]);

  selection: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
              private scate:GerenciaService
  ) {}


  ngOnInit(): void{
    this.consulta()
  }

  consulta(){
    this.scate.consultar().subscribe((res:any)=>{

      this.categoria =res;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleSelection(element: any) {
    const index = this.selection.indexOf(element);
    if (index >= 0) {
      this.selection.splice(index, 1); // Deseleccionar
    } else {
      this.selection.push(element); // Seleccionar
    }
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection = []; // Deseleccionar todo
    } else {
      this.selection = [...this.dataSource.data]; // Seleccionar todo
    }
  }

  isAllSelected(): boolean {
    return this.selection.length === this.dataSource.data.length;
  }

  isSomeSelected(): boolean {
    return this.selection.length > 0 && !this.isAllSelected();
  }

  crearSolicitud() {
    const dialogRef = this.dialog.open(CrearOfertaComponent, {
      width: '75%',
      height: '75%',
      data: { numeroSolicitud: '20240001' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nueva solicitud creada:', result);
      }
    });
  }

  aprobarSolicitud() {
    if (this.selection.length === 0) {
      alert('Por favor, selecciona al menos un registro.');
      return;
    }

    console.log('Aprobando registros seleccionados:', this.selection);
    // Lógica para procesar las solicitudes seleccionadas.
  }

  accion1(element: any) {
    console.log('Editar:', element);
  }

   eliminar(id:number){

    Swal.fire({
      title: "Esta seguro?",
      text: "No podras revertir la decisión!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.scate.eliminar(id).subscribe((resp:any) =>{
          if (resp['resultados']== 'OK'){
            this.consulta();
          }
        })

        Swal.fire({
          title: "Eliminado!",
          text: "A sido eliminado con exito.",
          icon: "success"
        });
      }
    });
  }
}
