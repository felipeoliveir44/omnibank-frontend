/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcompanhamentoClienteService } from './acompanhamentoCliente.service';

describe('Service: AcompanhamentoCliente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcompanhamentoClienteService]
    });
  });

  it('should ...', inject([AcompanhamentoClienteService], (service: AcompanhamentoClienteService) => {
    expect(service).toBeTruthy();
  }));
});
