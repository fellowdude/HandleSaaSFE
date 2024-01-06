import { TestBed } from '@angular/core/testing';

import { EmailFormService } from './email-form.service';

xdescribe('EmailFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailFormService = TestBed.get(EmailFormService);
    expect(service).toBeTruthy();
  });
});
