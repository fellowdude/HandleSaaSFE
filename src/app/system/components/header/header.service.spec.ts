import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service';

xdescribe('HeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderService = TestBed.get(HeaderService);
    expect(service).toBeTruthy();
  });
});
