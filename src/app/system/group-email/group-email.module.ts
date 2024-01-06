import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupEmailComponent } from './group-email.component';
import { CrudGroupEmailComponent } from './crud-group-email/crud-group-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

const groupMailRoutes: Routes = [
  { path: '', component: GroupEmailComponent },
  { path: 'new', component: CrudGroupEmailComponent },
  { path: 'detail/:idGroupEmail', component: CrudGroupEmailComponent },
]

@NgModule({
  declarations: [
    GroupEmailComponent,
    CrudGroupEmailComponent
  ],
  imports: [
    RouterModule.forChild(groupMailRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    ComponentsModule,
    SharedModule,
    CommonModule
  ]
})
export class GroupEmailModule { }
