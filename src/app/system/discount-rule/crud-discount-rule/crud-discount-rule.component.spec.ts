import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDiscountRuleComponent } from './crud-discount-rule.component';

xdescribe('CrudDiscountRuleComponent', () => {
  let component: CrudDiscountRuleComponent;
  let fixture: ComponentFixture<CrudDiscountRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDiscountRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDiscountRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
