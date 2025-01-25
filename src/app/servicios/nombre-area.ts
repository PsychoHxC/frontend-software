import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NombreAreaService {

  url ='http://localhost/talentlink-contratacion/backend-talentlink-contratacion/controlador/nombre-area.php';
  constructor (private http:HttpClient) { }
  consultarAreas() {
    return this.http.get(`${this.url}?control=consulta`);
  }
}
