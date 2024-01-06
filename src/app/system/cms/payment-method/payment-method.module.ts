import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodComponent } from './payment-method.component';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const paymentMethodRoutes: Routes = [
  { path: '', component: PaymentMethodComponent },
]

@NgModule({
  declarations: [
    PaymentMethodComponent
  ],
  imports: [
    RouterModule.forChild(paymentMethodRoutes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule
  ]
})
export class PaymentMethodModule { }
