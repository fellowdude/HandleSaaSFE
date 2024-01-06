import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelNotificationsComponent } from './label-notifications.component';

describe('LabelNotificationsComponent', () => {
  let component: LabelNotificationsComponent;
  let fixture: ComponentFixture<LabelNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
