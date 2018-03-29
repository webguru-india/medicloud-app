import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDelCentroMedicoComponent } from './datos-del-centro-medico.component';

describe('DatosDelCentroMedicoComponent', () => {
  let component: DatosDelCentroMedicoComponent;
  let fixture: ComponentFixture<DatosDelCentroMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDelCentroMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelCentroMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
