
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AreaService } from 'src/app/servicios/area.service';
import { NombreAreaService } from 'src/app/servicios/nombre-area';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent {
  idArea?: string;
  nombreJefe: string;
  solicitudPersonal: string;

  listaAreas: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos recibidos del componente principal
    private areaService: AreaService,
    private nombreAreaService: NombreAreaService) {

    // Si hay datos (modo edición), precarga los valores
    //this.idArea = data?.nombre_area || '';
    this.nombreJefe = data?.jefe_area || '';
    this.solicitudPersonal = data?.solicitud_personal || '';
    console.log ('Hola ', this.data)
  }

  ngOnInit(): void {
    // Cargar las áreas al iniciar el componente
    this.nombreAreaService.consultarAreas().subscribe(
      (data: any) => {
        this.listaAreas = data; // Asignar las áreas a la lista

        if (this.data?.nombre_area){

          const areaSeleccionada = this.listaAreas.find(area => area.nombre_area === this.data.nombre_area);
          this.idArea = areaSeleccionada?.id_area || '';
        }
      },
      (error) => {
        console.error('Error al cargar las áreas:', error);
      }
    );
  }

  guardar(): void {
    const solicitud = {
      id: this.data?.id, // Solo en modo edición
      nombre_area: this.idArea,
      jefe_area: this.nombreJefe,
      solicitud_personal: this.solicitudPersonal
    };

    if (this.data) {
      // Modo edición
      this.areaService.editar(this.data.id, solicitud).subscribe(
        () => {
          this.dialogRef.close(solicitud); // Cierra el modal y envía los datos actualizados
        },
        (error) => {
          console.error('Error al actualizar la solicitud:', error);
        }
      );
    } else {
      // Modo creación
      this.areaService.insertar(solicitud).subscribe(
        (response) => {
          this.dialogRef.close(response); // Cierra el modal y envía la nueva solicitud
        },
        (error) => {
          console.error('Error al crear la solicitud:', error);
        }
      );
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}


