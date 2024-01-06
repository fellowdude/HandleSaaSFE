import { TestBed } from '@angular/core/testing';

import { FlowRequestService } from './flow-request.service';

xdescribe('FlowRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowRequestService = TestBed.get(FlowRequestService);
    expect(service).toBeTruthy();
  });
});
