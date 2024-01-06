import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNotificationsComponent } from './filter-notifications.component';

describe('FilterNotificationsComponent', () => {
  let component: FilterNotificationsComponent;
  let fixture: ComponentFixture<FilterNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
