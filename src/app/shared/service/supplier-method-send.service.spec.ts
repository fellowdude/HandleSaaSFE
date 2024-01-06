import { TestBed } from '@angular/core/testing';

import { SupplierMethodSendService } from './supplier-method-send.service';

xdescribe('SupplierMethodSendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierMethodSendService = TestBed.get(SupplierMethodSendService);
    expect(service).toBeTruthy();
  });
});
