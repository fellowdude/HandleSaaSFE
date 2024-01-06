import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApprovalComponent } from './group-approval.component';

xdescribe('GroupApprovalComponent', () => {
  let component: GroupApprovalComponent;
  let fixture: ComponentFixture<GroupApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
