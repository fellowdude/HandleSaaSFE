import { TestBed } from '@angular/core/testing';

import { StaticPageService } from './static-page.service';

xdescribe('StaticPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticPageService = TestBed.get(StaticPageService);
    expect(service).toBeTruthy();
  });
});
