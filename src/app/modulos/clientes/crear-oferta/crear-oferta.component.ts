import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GerenciaService } from 'src/app/servicios/gerencia.service';
import { NombreAreaService } from 'src/app/servicios/nombre-area';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.scss'],
})
export class CrearOfertaComponent {
  crearSolicitudForm: FormGroup;
  prioridad = ['Alta', 'Media', 'Baja'];

  listaAreas: any[] = [];
  idArea?: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nombreAreaService: NombreAreaService,
    private gerenciaService: GerenciaService,
  ) {
    this.crearSolicitudForm = this.fb.group({
      id_solicitud: [{ value: this.data.id_aprobacion || '', disabled: true }],
      area: [this.data.id_area || null, Validators.required],
      cargo: [this.data.solicitud_personal || '', Validators.required],
      fechaFinOferta: [null, [Validators.required, this.fechaFuturaValidator]],
      prioridad: [null, Validators.required],
      detalle: [this.data.detalle_solicitud,[Validators.required, Validators.maxLength(4000)]],
    });
    console.log('Veamos', data);
  }

  ngOnInit(): void {

    this.nombreAreaService.consultarAreas().subscribe(
      (data: any) => {
        this.listaAreas = data; 

        if (this.data?.id_area) {
          const areaSeleccionada = this.listaAreas.find(
            (area) => area.id_area === this.data.id_area
          );
          if (areaSeleccionada) {
            this.crearSolicitudForm.patchValue({ area: areaSeleccionada.id_area });
          }
        }
      },
      (error) => {
        console.error('Error al cargar las áreas:', error);
      }
    );
  }

  guardarSolicitud() {
    if (this.crearSolicitudForm.valid) {
      const solicitudData = {
        ...this.crearSolicitudForm.value,
        id_solicitud: this.data.id_aprobacion, // Asignamos id_solicitud como id_aprobacion
        id_gerencia: this.data.id_gerencia || null, // Asegurar que estos valores no sean NULL
        solicitud_personal : this.data.solicitud_personal || null,
        fecha_solicitud : this.data.fecha_aprobacion || null
      };
      console.log ('Envio',solicitudData)

      this.gerenciaService.insertar(solicitudData).subscribe(
        (response: any) => {
          console.log('Solicitud guardada:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al guardar la solicitud:', error);
        }
      );
    }
  }


  fechaFuturaValidator(control: AbstractControl) {
    const fechaSeleccionada = control.value;
    const fechaActual = new Date();

    if (fechaSeleccionada) {
      const fechaSeleccionadaDate = new Date(fechaSeleccionada);

      if (fechaSeleccionadaDate <= fechaActual) {
        return { fechaInvalida: true }; 
      }
    }

    return null;
  }

  deshabilitarFechas = (fecha: Date | null): boolean => {
    if (!fecha) {
      return false;
    }
    const hoy = new Date();
    return fecha > hoy; 
  }
}
