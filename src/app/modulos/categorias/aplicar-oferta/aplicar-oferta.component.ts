import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-aplicar-oferta',
  templateUrl: './aplicar-oferta.component.html',
  styleUrls: ['./aplicar-oferta.component.scss']
})
export class AplicarOfertaComponent {
  formulario: FormGroup;
  archivoSeleccionado: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AplicarOfertaComponent>
  ) {
    this.formulario = this.fb.group({
      tipo_identificacion: ['', Validators.required],
      numero_identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      archivo: [null, Validators.required]
    });
  }

  onArchivoSeleccionado(event: any): void {
    if (event.target.files.length > 0) {
      this.archivoSeleccionado = event.target.files[0];
      this.formulario.patchValue({
        archivo: this.archivoSeleccionado
      });
      this.formulario.get('archivo')?.updateValueAndValidity();
    }
  }

  enviar(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.dialogRef.close();
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
