import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-oferta',
  templateUrl: './ver-oferta.component.html',
  styleUrls: ['./ver-oferta.component.scss']
})
export class VerOfertaComponent {
  constructor(
    public dialogRef: MatDialogRef<VerOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { detalle_oferta: string }
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }
}