import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNotAvailableComponent } from './payment-not-available.component';

describe('PaymentNotAvailableComponent', () => {
  let component: PaymentNotAvailableComponent;
  let fixture: ComponentFixture<PaymentNotAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentNotAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
