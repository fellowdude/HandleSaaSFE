import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer.component';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [ListCustomerComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    ListCustomerComponent
  ]
})
export class ListCustomerModule { }
