import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTreeItemComponent } from './dynamic-tree-item.component';

xdescribe('DynamicTreeItemComponent', () => {
  let component: DynamicTreeItemComponent;
  let fixture: ComponentFixture<DynamicTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
