import { TestBed } from '@angular/core/testing';

import { FamilyProductService } from './family-product.service';

xdescribe('FamilyProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilyProductService = TestBed.get(FamilyProductService);
    expect(service).toBeTruthy();
  });
});
