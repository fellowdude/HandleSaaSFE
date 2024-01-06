import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderVerificationComponent } from './uploader-verification.component';

describe('UploaderVerificationComponent', () => {
  let component: UploaderVerificationComponent;
  let fixture: ComponentFixture<UploaderVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaderVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
