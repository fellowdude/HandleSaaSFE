import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCallCenterComponent } from './order-call-center.component';

describe('OrderCallCenterComponent', () => {
  let component: OrderCallCenterComponent;
  let fixture: ComponentFixture<OrderCallCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCallCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCallCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
