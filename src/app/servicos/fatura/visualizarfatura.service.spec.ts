import { TestBed } from '@angular/core/testing';

import { VisualizarfaturaService } from './visualizarfatura.service';

describe('VisualizarfaturaService', () => {
  let service: VisualizarfaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarfaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
