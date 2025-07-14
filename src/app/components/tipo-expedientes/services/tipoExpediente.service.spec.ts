/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoExpedienteService } from './tipoExpediente.service';

describe('Service: TipoExpediente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoExpedienteService]
    });
  });

  it('should ...', inject([TipoExpedienteService], (service: TipoExpedienteService) => {
    expect(service).toBeTruthy();
  }));
});
