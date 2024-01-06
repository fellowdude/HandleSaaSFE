import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathImgExcelSummaryComponent } from './math-img-excel-summary.component';

describe('MathImgExcelSummaryComponent', () => {
  let component: MathImgExcelSummaryComponent;
  let fixture: ComponentFixture<MathImgExcelSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathImgExcelSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathImgExcelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
