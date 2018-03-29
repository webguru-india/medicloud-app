import { TestBed, inject } from '@angular/core/testing';

import { AgendasCentrosDeCosteService } from './agendas-centros-de-coste.service';

describe('AgendasCentrosDeCosteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendasCentrosDeCosteService]
    });
  });

  it('should be created', inject([AgendasCentrosDeCosteService], (service: AgendasCentrosDeCosteService) => {
    expect(service).toBeTruthy();
  }));
});
