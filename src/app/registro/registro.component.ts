import { Component } from '@angular/core';
import { RegistroService } from '../servicios/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario = {
    nombre_usuario: '',
    email: '',
    clave: '',
    telefono: ''
  };

  mensaje = '';
  registroExitoso = false;

  constructor(private registroService: RegistroService, private router: Router) {}

  registrar() {
    this.registroService.registrarUsuario(this.usuario).subscribe((res: any) => {
      if (res.success) {
        this.mensaje = res.message;
        this.registroExitoso = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.mensaje = res.message;
        this.registroExitoso = false;
      }
    }, error => {
      this.mensaje = 'Error al registrar usuario';
      this.registroExitoso = false;
    });
  }
}
