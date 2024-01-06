import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BellNotificationsComponent } from './bell-notifications.component';

describe('BellNotificationsComponent', () => {
  let component: BellNotificationsComponent;
  let fixture: ComponentFixture<BellNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BellNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BellNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
