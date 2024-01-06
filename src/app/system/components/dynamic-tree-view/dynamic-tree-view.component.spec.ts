import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTreeViewComponent } from './dynamic-tree-view.component';

xdescribe('DynamicTreeViewComponent', () => {
  let component: DynamicTreeViewComponent;
  let fixture: ComponentFixture<DynamicTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
