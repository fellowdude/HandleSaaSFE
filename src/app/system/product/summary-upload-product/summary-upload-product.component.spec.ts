import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryUploadProductComponent } from './summary-upload-product.component';

describe('SummaryUploadProductComponent', () => {
  let component: SummaryUploadProductComponent;
  let fixture: ComponentFixture<SummaryUploadProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryUploadProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryUploadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
