import { TestBed } from '@angular/core/testing';

import { LdvService } from './ldv.service';

xdescribe('LdvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LdvService = TestBed.get(LdvService);
    expect(service).toBeTruthy();
  });
});
