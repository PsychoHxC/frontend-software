import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  url ='http://localhost/talentlink-contratacion/backend-talentlink-contratacion/controlador/area.php';
  constructor (private http:HttpClient) { }
  consultar(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}?control=eliminar&id=${id}`);
  }

  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }
  editar(id: number, params: any) {
    return this.http.put(`${this.url}?control=editar&id=${id}`, JSON.stringify(params))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al editar:', error);
          return throwError(() => new Error('No se pudo completar la operación. Verifica los datos.'));
        })
      );
  }

  filtro(dato:any){
    return this.http.get(`${this.url}?control=filtro&dato=${dato}`)
  }

  aprobarSolicitud(id: number, idAprobacion: number) {
    const body = { id_aprobacion: idAprobacion };
    return this.http.put(`${this.url}?control=aprobar&id=${id}`, JSON.stringify(body));
  }
  
  
}
