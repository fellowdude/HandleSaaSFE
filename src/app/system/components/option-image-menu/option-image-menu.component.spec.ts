import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionImageMenuComponent } from './option-image-menu.component';

describe('OptionImageMenuComponent', () => {
  let component: OptionImageMenuComponent;
  let fixture: ComponentFixture<OptionImageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionImageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionImageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
