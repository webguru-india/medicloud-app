import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultativosComponent } from './facultativos.component';

describe('FacultativosComponent', () => {
  let component: FacultativosComponent;
  let fixture: ComponentFixture<FacultativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
