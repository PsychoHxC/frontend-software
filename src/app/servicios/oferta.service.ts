import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  url = 'http://localhost/talentlink-contratacion/backend-talentlink-contratacion/controlador/oferta.php';

  constructor(private http: HttpClient) {}

  obtenerOfertasAprobadas() {
    return this.http.get(`${this.url}?control=consulta`);
  }

  postularCandidato(data: any) {
    return this.http.post(`${this.url}?control=insertarPostulacion`, data);
  }
}
