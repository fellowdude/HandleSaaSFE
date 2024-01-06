import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchFatherVariationProductComponent } from './modal-search-father-variation-product.component';

describe('ModalSearchFatherVariationProductComponent', () => {
  let component: ModalSearchFatherVariationProductComponent;
  let fixture: ComponentFixture<ModalSearchFatherVariationProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchFatherVariationProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchFatherVariationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
