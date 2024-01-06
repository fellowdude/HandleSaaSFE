import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRoleComponent } from './crud-role.component';

xdescribe('CrudRoleComponent', () => {
  let component: CrudRoleComponent;
  let fixture: ComponentFixture<CrudRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
