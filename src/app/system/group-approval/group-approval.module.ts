import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupApprovalComponent } from './group-approval.component';
import { CrudGroupApprovalComponent } from './crud-group-approval/crud-group-approval.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

const groupApprovalRoutes: Routes = [
  { path: '', component: GroupApprovalComponent },
  { path: 'detail/:id', component: CrudGroupApprovalComponent },
  { path: 'new', component: CrudGroupApprovalComponent },
]

@NgModule({
  declarations: [
    GroupApprovalComponent,
    CrudGroupApprovalComponent
  ],
  imports: [
    RouterModule.forChild(groupApprovalRoutes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule
  ]
})
export class GroupApprovalModule { }
