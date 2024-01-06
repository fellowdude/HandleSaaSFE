import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderReasonDetailComponent } from './dialog-order-reason-detail.component';

xdescribe('DialogOrderReasonDetailComponent', () => {
  let component: DialogOrderReasonDetailComponent;
  let fixture: ComponentFixture<DialogOrderReasonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderReasonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderReasonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
