
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AreaService } from 'src/app/servicios/area.service';
import { NombreAreaService } from 'src/app/servicios/nombre-area';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent {
  id_area?: string;
  nombreJefe: string;
  solicitudPersonal: string;
  // detalleSolicitud: string;
  detalleSolicitud: string = '';

  listaAreas: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearSolicitudComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private areaService: AreaService,
    private nombreAreaService: NombreAreaService) {


    this.nombreJefe = data?.jefe_area || '';
    this.solicitudPersonal = data?.solicitud_personal || '';
    this.detalleSolicitud = data?.detalle_solicitud || '';
    console.log ('Hola ', this.data)
  }

  ngOnInit(): void {
    this.nombreAreaService.consultarAreas().subscribe(
      (data: any) => {
        this.listaAreas = data; 

        if (this.data?.nombre_area){

          const areaSeleccionada = this.listaAreas.find(area => area.nombre_area === this.data.nombre_area);
          this.id_area = areaSeleccionada?.id_area || '';
        }
      },
      (error) => {
        console.error('Error al cargar las áreas:', error);
      }
    );
  }

  guardar(): void {
    const solicitud = {
      id: this.data?.id,
      id_area: this.id_area,
      jefe_area: this.nombreJefe,
      solicitud_personal: this.solicitudPersonal,
      detalle_solicitud: this.detalleSolicitud,
    };
  
    const serviceCall = this.data
      ? this.areaService.editar(this.data.id, solicitud)
      : this.areaService.insertar(solicitud);
  
    serviceCall.subscribe(
      (response) => {
        this.dialogRef.close(true); 
      },
      (error) => {
        console.error('Error al guardar la solicitud:', error);
      }
    );
  }

  confirmarGuardado(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Está seguro de guardar la solicitud?' }
    });
  
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.guardar();
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}


