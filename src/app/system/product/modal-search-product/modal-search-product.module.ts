import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSearchProductComponent } from './modal-search-product.component';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [ModalSearchProductComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    ModalSearchProductComponent
  ]
})
export class ModalSearchProductModule { }
