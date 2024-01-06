import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSupplierComponent } from './crud-supplier.component';

xdescribe('CrudSupplierComponent', () => {
  let component: CrudSupplierComponent;
  let fixture: ComponentFixture<CrudSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
