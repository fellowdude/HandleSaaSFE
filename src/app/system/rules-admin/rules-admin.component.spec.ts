import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesAdminComponent } from './rules-admin.component';

xdescribe('RulesAdminComponent', () => {
  let component: RulesAdminComponent;
  let fixture: ComponentFixture<RulesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
