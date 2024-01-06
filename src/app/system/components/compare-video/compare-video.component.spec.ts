import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareVideoComponent } from './compare-video.component';

xdescribe('CompareVideoComponent', () => {
  let component: CompareVideoComponent;
  let fixture: ComponentFixture<CompareVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
