import { TestBed } from '@angular/core/testing';

import { RolService } from './rol.service';

xdescribe('RolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolService = TestBed.get(RolService);
    expect(service).toBeTruthy();
  });
});
