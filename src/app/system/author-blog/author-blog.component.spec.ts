import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBlogComponent } from './author-blog.component';

xdescribe('AuthorBlogComponent', () => {
  let component: AuthorBlogComponent;
  let fixture: ComponentFixture<AuthorBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
