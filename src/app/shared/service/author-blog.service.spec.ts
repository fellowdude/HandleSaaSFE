import { TestBed } from '@angular/core/testing';

import { AuthorBlogService } from './author-blog.service';

xdescribe('AuthorBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorBlogService = TestBed.get(AuthorBlogService);
    expect(service).toBeTruthy();
  });
});
