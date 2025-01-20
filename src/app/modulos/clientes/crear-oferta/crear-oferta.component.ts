import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.scss']
})

export class CrearOfertaComponent {
  crearSolicitudForm: FormGroup;
  areas = ['Área 1', 'Área 2', 'Área 3']; // Ejemplo de áreas
  prioridad = ['Alta', 'Media', 'Baja']

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.crearSolicitudForm = this.fb.group({
      numeroSolicitud: [{ value: this.data.numeroSolicitud || 'AUTO-GENERADO', disabled: true }],
      area: [null, Validators.required],
      tipoSolicitud: ['', Validators.required],
      fechaEjecucion: [null, Validators.required],
      prioridad: [null, Validators.required],
      detalle: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  guardarSolicitud() {
    if (this.crearSolicitudForm.valid) {
      this.dialogRef.close(this.crearSolicitudForm.value);
    }
  }
}
