import { TestBed } from '@angular/core/testing';

import { RulesDispatcherService } from './rules-dispatcher.service';

xdescribe('RulesDispatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RulesDispatcherService = TestBed.get(RulesDispatcherService);
    expect(service).toBeTruthy();
  });
});
