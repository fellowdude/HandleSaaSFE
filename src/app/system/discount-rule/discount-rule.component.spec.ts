import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRuleComponent } from './discount-rule.component';

xdescribe('DiscountRuleComponent', () => {
  let component: DiscountRuleComponent;
  let fixture: ComponentFixture<DiscountRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
