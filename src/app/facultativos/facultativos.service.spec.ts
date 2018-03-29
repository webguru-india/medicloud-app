import { TestBed, inject } from '@angular/core/testing';

import { FacultativosService } from './facultativos.service';

describe('FacultativosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultativosService]
    });
  });

  it('should be created', inject([FacultativosService], (service: FacultativosService) => {
    expect(service).toBeTruthy();
  }));
});
