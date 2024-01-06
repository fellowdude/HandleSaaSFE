import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchProductComponent } from './modal-search-product.component';

describe('ModalSearchProductComponent', () => {
  let component: ModalSearchProductComponent;
  let fixture: ComponentFixture<ModalSearchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
