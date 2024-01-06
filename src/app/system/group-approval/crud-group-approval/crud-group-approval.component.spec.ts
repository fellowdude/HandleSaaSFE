import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGroupApprovalComponent } from './crud-group-approval.component';

xdescribe('CrudGroupApprovalComponent', () => {
  let component: CrudGroupApprovalComponent;
  let fixture: ComponentFixture<CrudGroupApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudGroupApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGroupApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
