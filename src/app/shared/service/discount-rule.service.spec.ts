import { TestBed } from '@angular/core/testing';

import { DiscountRuleService } from './discount-rule.service';

xdescribe('DiscountRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountRuleService = TestBed.get(DiscountRuleService);
    expect(service).toBeTruthy();
  });
});
