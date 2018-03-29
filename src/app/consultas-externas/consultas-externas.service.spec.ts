import { TestBed, inject } from '@angular/core/testing';

import { ConsultasExternasService } from './consultas-externas.service';

describe('ConsultasExternasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultasExternasService]
    });
  });

  it('should be created', inject([ConsultasExternasService], (service: ConsultasExternasService) => {
    expect(service).toBeTruthy();
  }));
});
