import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectPayuComponent } from './customer-payment/redirect-payu/redirect-payu.component';
import { RouterModule, Routes } from '@angular/router';
import { PayuComponent } from './payu.component';
import { PaymentNotAvailableComponent } from './customer-payment/payment-not-available/payment-not-available.component';
import { MatToolbarModule } from '@angular/material';

const payuChildRoutes: Routes = [
  { path: "redirect-payu/:id", component: RedirectPayuComponent },
  { path: "payment-not-available/:id", component: PaymentNotAvailableComponent }
]

const payuRoutes: Routes = [
  { path: '', component: PayuComponent, children: payuChildRoutes }
]

@NgModule({
  declarations: [PayuComponent, RedirectPayuComponent, PaymentNotAvailableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(payuChildRoutes),
    MatToolbarModule
  ]
})
export class PayuModule { }
