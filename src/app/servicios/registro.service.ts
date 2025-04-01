import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  url ='http://localhost/talentlink-contratacion/backend-talentlink-contratacion/controlador/registro.php';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: any) {
    return this.http.post(this.url, usuario);
  }
  

}
