import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterNotificationsComponent } from './center-notifications.component';

describe('CenterNotificationsComponent', () => {
  let component: CenterNotificationsComponent;
  let fixture: ComponentFixture<CenterNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
