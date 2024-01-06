import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionActiveComponent } from './session-active.component';

describe('SessionActiveComponent', () => {
  let component: SessionActiveComponent;
  let fixture: ComponentFixture<SessionActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
