import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CrudCustomerComponent } from './crud-customer/crud-customer.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { CrudClientModule } from './crud-client/crud-client.module';
import { CrudAddressComponent } from './crud-address/crud-address.component';

const customerRoutes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'detail/:idCustomer', component: CrudCustomerComponent },
]

@NgModule({
  declarations: [
    CustomerComponent,
    CrudCustomerComponent,
    CrudAddressComponent],
  imports: [
    RouterModule.forChild(customerRoutes),
    CommonModule,
    FroalaEditorModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CrudClientModule,
    MatDialogModule,
    MatSelectModule
  ],
  entryComponents: [
    CrudAddressComponent
  ]
})
export class CustomerModule { }
