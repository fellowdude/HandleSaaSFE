import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFiltersComponent } from './categories-filters.component';

xdescribe('CategoriesFiltersComponent', () => {
  let component: CategoriesFiltersComponent;
  let fixture: ComponentFixture<CategoriesFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
