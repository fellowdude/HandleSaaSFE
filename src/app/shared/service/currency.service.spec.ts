import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';

xdescribe('CurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    expect(service).toBeTruthy();
  });
});
