import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSupplierLocalComponent } from './crud-supplier-local.component';

describe('CrudSupplierLocalComponent', () => {
  let component: CrudSupplierLocalComponent;
  let fixture: ComponentFixture<CrudSupplierLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudSupplierLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudSupplierLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
