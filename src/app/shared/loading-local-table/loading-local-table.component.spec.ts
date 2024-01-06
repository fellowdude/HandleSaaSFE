import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingLocalTableComponent } from './loading-local-table.component';

describe('LoadingLocalTableComponent', () => {
  let component: LoadingLocalTableComponent;
  let fixture: ComponentFixture<LoadingLocalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingLocalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingLocalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
