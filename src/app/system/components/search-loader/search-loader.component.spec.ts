import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLoaderComponent } from './search-loader.component';

xdescribe('SearchLoaderComponent', () => {
  let component: SearchLoaderComponent;
  let fixture: ComponentFixture<SearchLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
