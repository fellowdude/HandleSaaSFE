import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareImageComponent } from './compare-image.component';

xdescribe('CompareImageComponent', () => {
  let component: CompareImageComponent;
  let fixture: ComponentFixture<CompareImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
