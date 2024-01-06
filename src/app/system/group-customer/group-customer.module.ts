import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupCustomerComponent } from './group-customer.component';
import { CrudGroupCustomerComponent } from './crud-group-customer/crud-group-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

const groupCustomerRoutes: Routes = [
  { path: '', component: GroupCustomerComponent },
  { path: 'new', component: CrudGroupCustomerComponent },
  { path: 'detail/:idGroupCustomer', component: CrudGroupCustomerComponent },
]

@NgModule({
  declarations: [GroupCustomerComponent, CrudGroupCustomerComponent],
  imports: [
    RouterModule.forChild(groupCustomerRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    ComponentsModule,
    SharedModule,
    CommonModule
  ]
})
export class GroupCustomerModule { }
