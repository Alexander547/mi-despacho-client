import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cliente,
  ClientesLazyResponse,
} from '../../../shared/interfaces/cliente';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  apiUrl = environment.apiUrl;
  clientessUrl = `${this.apiUrl}/cliente`;
  constructor(private http: HttpClient) {}

  getClientesLazyload(dto: {
    page: number;
    limit: number;
  }): Observable<ClientesLazyResponse> {
    return this.http.post<ClientesLazyResponse>(
      `${this.clientessUrl}/paginado`,
      dto
    );
  }
}
