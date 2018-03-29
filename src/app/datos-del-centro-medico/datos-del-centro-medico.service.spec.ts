import { TestBed, inject } from '@angular/core/testing';

import { DatosDelCentroMedicoService } from './datos-del-centro-medico.service';

describe('DatosDelCentroMedicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatosDelCentroMedicoService]
    });
  });

  it('should be created', inject([DatosDelCentroMedicoService], (service: DatosDelCentroMedicoService) => {
    expect(service).toBeTruthy();
  }));
});
