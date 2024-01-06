import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContentPageComponent } from './dynamic-content-page.component';

describe('DynamicContentPageComponent', () => {
  let component: DynamicContentPageComponent;
  let fixture: ComponentFixture<DynamicContentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
