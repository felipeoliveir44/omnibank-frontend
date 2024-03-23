import { TestBed } from '@angular/core/testing';

import { CartaoserviceService } from './cartao.service';

describe('CartaoserviceService', () => {
  let service: CartaoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartaoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
