import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAddressClientComponent } from './crud-address-client.component';

describe('CrudAddressClientComponent', () => {
  let component: CrudAddressClientComponent;
  let fixture: ComponentFixture<CrudAddressClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAddressClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAddressClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
