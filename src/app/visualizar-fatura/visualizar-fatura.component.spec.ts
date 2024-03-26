import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFaturaComponent } from './visualizar-fatura.component';

describe('VisualizarFaturaComponent', () => {
  let component: VisualizarFaturaComponent;
  let fixture: ComponentFixture<VisualizarFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarFaturaComponent]
    });
    fixture = TestBed.createComponent(VisualizarFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
