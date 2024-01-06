import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFilterComponent } from './crud-filter.component';

xdescribe('CrudFilterComponent', () => {
  let component: CrudFilterComponent;
  let fixture: ComponentFixture<CrudFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
