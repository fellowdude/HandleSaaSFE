import { TestBed } from '@angular/core/testing';

import { ExperienceService } from './experience.service';

xdescribe('ExperienceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperienceService = TestBed.get(ExperienceService);
    expect(service).toBeTruthy();
  });
});
