import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEmailFormComponent } from './crud-email-form.component';

xdescribe('CrudEmailFormComponent', () => {
  let component: CrudEmailFormComponent;
  let fixture: ComponentFixture<CrudEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
