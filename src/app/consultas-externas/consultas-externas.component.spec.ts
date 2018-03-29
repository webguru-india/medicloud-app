import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasExternasComponent } from './consultas-externas.component';

describe('ConsultasExternasComponent', () => {
  let component: ConsultasExternasComponent;
  let fixture: ComponentFixture<ConsultasExternasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasExternasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
