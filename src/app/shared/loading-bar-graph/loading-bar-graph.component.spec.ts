import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarGraphComponent } from './loading-bar-graph.component';

describe('LoadingBarGraphComponent', () => {
  let component: LoadingBarGraphComponent;
  let fixture: ComponentFixture<LoadingBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
