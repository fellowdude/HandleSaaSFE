import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRulesAdminComponent } from './crud-rules-admin.component';

xdescribe('CrudRulesAdminComponent', () => {
  let component: CrudRulesAdminComponent;
  let fixture: ComponentFixture<CrudRulesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRulesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRulesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
