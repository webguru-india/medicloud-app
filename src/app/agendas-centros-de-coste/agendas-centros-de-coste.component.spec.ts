import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasCentrosDeCosteComponent } from './agendas-centros-de-coste.component';

describe('AgendasCentrosDeCosteComponent', () => {
  let component: AgendasCentrosDeCosteComponent;
  let fixture: ComponentFixture<AgendasCentrosDeCosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendasCentrosDeCosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasCentrosDeCosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
