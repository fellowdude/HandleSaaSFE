import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCallCenterComponent } from './order-call-center/order-call-center.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CrudClientModule } from '../customer/crud-client/crud-client.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ListCustomerModule } from '../customer/list-customer/list-customer.module';
import { CrudAddressClientModule } from '../customer/crud-address-client/crud-address-client.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalSearchProductModule } from '../product/modal-search-product/modal-search-product.module';
import { ComponentsModule } from '../components/components.module';
import { TooltipModule } from '@swimlane/ngx-charts';

export const callCenterRoutes: Routes = [
  { path: '', component: OrderCallCenterComponent }
];

@NgModule({
  declarations: [OrderCallCenterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(callCenterRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CrudClientModule,
    MatTabsModule,
    ListCustomerModule,
    CrudAddressClientModule,
    MatRadioModule,
    MatExpansionModule,
    ModalSearchProductModule,
    ComponentsModule,
    MatCheckboxModule,
    TooltipModule
  ],
  exports: [RouterModule]
})
export class CallCenterModule { }
