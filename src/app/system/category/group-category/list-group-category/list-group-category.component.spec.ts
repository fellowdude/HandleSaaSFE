import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupCategoryComponent } from './list-group-category.component';

describe('ListGroupCategoryComponent', () => {
  let component: ListGroupCategoryComponent;
  let fixture: ComponentFixture<ListGroupCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGroupCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
