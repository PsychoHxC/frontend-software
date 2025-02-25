import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
// import { OfertaService } from 'src/app/servicios/oferta.service';
import Swal from 'sweetalert2';
import { OfertaService } from 'src/app/servicios/oferta.service';
import { VerOfertaComponent } from './ver-oferta/ver-oferta.component';
import { AplicarOfertaComponent } from './aplicar-oferta/aplicar-oferta.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class OfertaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id_solicitud',
    'nombre_oferta',
    'fecha_fin_oferta',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ofertaService: OfertaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Obtener ofertas con estado = 1
  cargarOfertas(): void {
    this.ofertaService.obtenerOfertasAprobadas().subscribe(
      (data: any) => {
        console.log(data, 'Veamos');
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar ofertas:', error);
        Swal.fire('Error', 'No se pudieron cargar las ofertas.', 'error');
      }
    );
  }

  verOferta(oferta: any): void {
    this.dialog.open(VerOfertaComponent, {
      width: '400px',
      data: { detalle_oferta: oferta.detalle_oferta }
    });
  }

  aplicarOferta(): void {
    this.dialog.open(AplicarOfertaComponent, {
      width: '500px'
    });
  }
}
