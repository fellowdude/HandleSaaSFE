import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSearchFatherVariationProductComponent } from './modal-search-father-variation-product.component';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [ModalSearchFatherVariationProductComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    ModalSearchFatherVariationProductComponent
  ]
})
export class ModalSearchFatherVariationProductModule { }
