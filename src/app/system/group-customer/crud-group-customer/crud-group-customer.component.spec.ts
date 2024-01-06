import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGroupCustomerComponent } from './crud-group-customer.component';

describe('CrudGroupCustomerComponent', () => {
  let component: CrudGroupCustomerComponent;
  let fixture: ComponentFixture<CrudGroupCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudGroupCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGroupCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
