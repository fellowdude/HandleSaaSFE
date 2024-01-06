import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDiscountCodeComponent } from './crud-discount-code.component';

xdescribe('CrudDiscountCodeComponent', () => {
  let component: CrudDiscountCodeComponent;
  let fixture: ComponentFixture<CrudDiscountCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDiscountCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDiscountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
