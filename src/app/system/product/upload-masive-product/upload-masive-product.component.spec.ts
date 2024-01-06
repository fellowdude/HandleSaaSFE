import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMasiveProductComponent } from './upload-masive-product.component';

describe('UploadMasiveProductComponent', () => {
  let component: UploadMasiveProductComponent;
  let fixture: ComponentFixture<UploadMasiveProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMasiveProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMasiveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
