import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeComponent } from './discount-code.component';

xdescribe('DiscountCodeComponent', () => {
  let component: DiscountCodeComponent;
  let fixture: ComponentFixture<DiscountCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
