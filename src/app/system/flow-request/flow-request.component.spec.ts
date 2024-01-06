import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRequestComponent } from './flow-request.component';

xdescribe('FlowRequestComponent', () => {
  let component: FlowRequestComponent;
  let fixture: ComponentFixture<FlowRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
