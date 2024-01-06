import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCircleGraphComponent } from './loading-circle-graph.component';

describe('LoadingCircleGraphComponent', () => {
  let component: LoadingCircleGraphComponent;
  let fixture: ComponentFixture<LoadingCircleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingCircleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCircleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
