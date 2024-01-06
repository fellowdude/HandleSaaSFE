import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSectionComponent } from './dialog-add-section.component';

xdescribe('DialogAddSectionComponent', () => {
  let component: DialogAddSectionComponent;
  let fixture: ComponentFixture<DialogAddSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
