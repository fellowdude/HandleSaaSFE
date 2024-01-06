import { TestBed } from '@angular/core/testing';

import { OrderCallCenterService } from './order-call-center.service';

describe('OrderCallCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderCallCenterService = TestBed.get(OrderCallCenterService);
    expect(service).toBeTruthy();
  });
});
