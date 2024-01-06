import { TestBed } from '@angular/core/testing';

import { RulesAdminService } from './rules-admin.service';

xdescribe('RulesAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RulesAdminService = TestBed.get(RulesAdminService);
    expect(service).toBeTruthy();
  });
});
