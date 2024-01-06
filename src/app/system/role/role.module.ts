import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { CrudRoleComponent } from './crud-role/crud-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatTabsModule, MatCheckboxModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';

export const roleRoutes: Routes = [
  { path: '', component: RoleComponent },
  { path: 'new', component: CrudRoleComponent },
  { path: 'detail/:id', component: CrudRoleComponent },
]

@NgModule({
  declarations: [
    RoleComponent,
    CrudRoleComponent
  ],
  imports: [
    RouterModule.forChild(roleRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ComponentsModule,
    MatTabsModule,
    MatCheckboxModule,
    CommonModule
  ]
})
export class RoleModule { }
