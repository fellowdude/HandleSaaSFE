import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectPayuComponent } from './redirect-payu.component';

describe('RedirectPayuComponent', () => {
  let component: RedirectPayuComponent;
  let fixture: ComponentFixture<RedirectPayuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectPayuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectPayuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
