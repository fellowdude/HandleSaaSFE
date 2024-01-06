import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAddressComponent } from './crud-address.component';

describe('CrudAddressComponent', () => {
  let component: CrudAddressComponent;
  let fixture: ComponentFixture<CrudAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
