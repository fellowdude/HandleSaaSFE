import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule, MatCheckboxModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';

export const userRoutes: Routes = [
  { path: '', component: UserComponent },
  { path: 'new', component: CrudUserComponent },
  { path: 'detail/:id', component: CrudUserComponent },
]

@NgModule({
  declarations: [
    UserComponent,
    CrudUserComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    ComponentsModule,
    CommonModule
  ]
})
export class UserModule { }
