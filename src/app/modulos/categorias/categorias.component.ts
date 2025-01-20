

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { GerenciaService } from 'src/app/servicios/gerencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements AfterViewInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['numero_oferta', 'nombre_oferta', 'fecha_fin_oferta', 'detalle_oferta', 'acciones'];
  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<any>();
  // Referencia al paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gerenciaService: GerenciaService) {}

  ngOnInit(): void {
    this.cargarOfertas(); // Cargar las ofertas al inicializar el componente
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Conectar el paginador
  }

  // Consultar las ofertas desde el servicio
  cargarOfertas(): void {

  }

  // Crear una nueva oferta
  nuevaOferta(): void {
    Swal.fire('Nueva Oferta', 'Esta funcionalidad está en desarrollo.', 'info');
  }

  // Editar una oferta
  editarOferta(){

  }

  // Eliminar una oferta
  eliminarOferta(){

  }
}

