import { TestBed } from '@angular/core/testing';

import { GroupApprovalService } from './group-approval.service';

xdescribe('GroupApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupApprovalService = TestBed.get(GroupApprovalService);
    expect(service).toBeTruthy();
  });
});
