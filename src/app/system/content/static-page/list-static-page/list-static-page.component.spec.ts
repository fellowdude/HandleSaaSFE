import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStaticPageComponent } from './list-static-page.component';

xdescribe('ListStaticPageComponent', () => {
  let component: ListStaticPageComponent;
  let fixture: ComponentFixture<ListStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
