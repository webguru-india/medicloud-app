import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasExternasBkpComponent } from './consultas-externas-bkp.component';

describe('ConsultasExternasBkpComponent', () => {
  let component: ConsultasExternasBkpComponent;
  let fixture: ComponentFixture<ConsultasExternasBkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasExternasBkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasExternasBkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
