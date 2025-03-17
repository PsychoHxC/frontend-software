import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfertaService } from 'src/app/servicios/oferta.service';

@Component({
  selector: 'app-aplicar-oferta',
  templateUrl: './aplicar-oferta.component.html',
  styleUrls: ['./aplicar-oferta.component.scss']
})
export class AplicarOfertaComponent {
  formulario: FormGroup;
  archivoSeleccionado: File | null = null;
  base64PDF: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ofertaService: OfertaService,
    public dialogRef: MatDialogRef<AplicarOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id_solicitud: string }
  ) {
    console.log(data, 'veamos');

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
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Solo se permiten archivos PDF.');
      this.archivoSeleccionado = null;
      this.base64PDF = null;
      this.formulario.patchValue({ archivo: null });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64PDF = reader.result as string;
      this.formulario.patchValue({ archivo: this.base64PDF });
    };
    reader.onerror = (error) => {
      console.error('Error al convertir PDF a Base64:', error);
    };
  }

  enviar(): void {
    if (this.formulario.valid) {
      const datosPostulacion = {
        ...this.formulario.value,
        id_solicitud: this.data.id_solicitud
      };

      this.ofertaService.postularCandidato(datosPostulacion).subscribe(response => {
        console.log('Respuesta del servidor:', response);
        console.log(datosPostulacion)
        this.dialogRef.close();
      }, error => {
        console.error('Error al enviar postulación:', error);
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
