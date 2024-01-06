import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDayComponent } from './order-day.component';

describe('OrderDayComponent', () => {
  let component: OrderDayComponent;
  let fixture: ComponentFixture<OrderDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
