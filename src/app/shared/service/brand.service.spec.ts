import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';

xdescribe('BrandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandService = TestBed.get(BrandService);
    expect(service).toBeTruthy();
  });
});
