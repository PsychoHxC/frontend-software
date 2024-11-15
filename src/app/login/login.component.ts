import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: any;
  clave: any;
  error = false;
  usuario: any;
  user = {
    nombre_usuario: "",
    email: "",
    clave: "",
    telefono: "",
    rol_usuario: "",
  }




  constructor(private slogin: LoginService, private router: Router){}

  ngOnInit(): void{

    sessionStorage.setItem("id","");
    sessionStorage.setItem("email","");
    sessionStorage.setItem("nombre","");
    sessionStorage.setItem("rol","");
  }

  consulta(tecla: any){
    if(tecla == 13 || tecla == ""){
      this.slogin.consultar(this.email, this.clave).subscribe((res:any)=>{
        this.usuario = res;
        console.log(this.usuario);

        if(this.usuario[0].validar == "valida"){
          sessionStorage.setItem("id", this.usuario[0]['id']);
          sessionStorage.setItem("email", this.usuario[0]['email']);
          sessionStorage.setItem("nombre", this.usuario[0] ['nombre_usuario']);
          sessionStorage.setItem("rol", this.usuario[0] ['rol_usuario']);
          this.router.navigate(['main']);
        } else{
          console.log("no entro");
          this.error = true;
        }
      })
    }
  }



 

}
