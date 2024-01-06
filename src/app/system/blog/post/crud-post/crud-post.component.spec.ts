import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPostComponent } from './crud-post.component';

xdescribe('CrudPostComponent', () => {
  let component: CrudPostComponent;
  let fixture: ComponentFixture<CrudPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
