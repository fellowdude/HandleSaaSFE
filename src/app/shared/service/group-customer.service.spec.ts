import { TestBed } from '@angular/core/testing';

import { GroupCustomerService } from './group-customer.service';

describe('GroupCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupCustomerService = TestBed.get(GroupCustomerService);
    expect(service).toBeTruthy();
  });
});
