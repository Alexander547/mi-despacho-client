import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoExpediente } from '../../../shared/interfaces/tipoExpediente';

@Injectable({
  providedIn: 'root',
})
export class TipoExpedienteService {
  apiUrl = environment.apiUrl;
  tipoExpedienteUrl = `${this.apiUrl}/tipo-expediente`;

  constructor(private http: HttpClient) {}

  getTiposExpediente(): Observable<TipoExpediente[]> {
    return this.http.get<TipoExpediente[]>(this.tipoExpedienteUrl);
  }

  getTipoExpedienteById(id: string): Observable<TipoExpediente> {
    return this.http.get<TipoExpediente>(`${this.tipoExpedienteUrl}/${id}`);
  }
}
