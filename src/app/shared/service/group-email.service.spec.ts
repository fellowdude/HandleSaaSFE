import { TestBed } from '@angular/core/testing';

import { GroupEmailService } from './group-email.service';

xdescribe('GroupEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupEmailService = TestBed.get(GroupEmailService);
    expect(service).toBeTruthy();
  });
});
