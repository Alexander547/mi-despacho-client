import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  apiUrl = environment.apiUrl;
  expedienteUrl = `${this.apiUrl}/expediente`;
  constructor(private http: HttpClient) {}

  crearExpedienteConArchivos(formData: FormData): Observable<any> {
    return this.http.post(this.expedienteUrl, formData);
  }

  actualizarExpedienteConArchivos(
    id: string,
    formData: FormData
  ): Observable<any> {
    return this.http.patch(`${this.expedienteUrl}/${id}`, formData);
  }

  eliminarExpediente(id: string): Observable<any> {
    return this.http.delete(`${this.expedienteUrl}/${id}`);
  }
}
