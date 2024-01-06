import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GroupCategoryComponent } from './group-category.component';
import { CrudGroupCategoryComponent } from './crud-group-category/crud-group-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { ComponentsModule } from '../../components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListGroupCategoryComponent } from './list-group-category/list-group-category.component';

export const groupCategoryRoutes: Routes = [
  { path: '', component: GroupCategoryComponent },
  { path: 'new', component: CrudGroupCategoryComponent },
  { path: 'detail/:idGroup', component: CrudGroupCategoryComponent },
]

@NgModule({
  declarations: [
    GroupCategoryComponent,
    CrudGroupCategoryComponent,
    ListGroupCategoryComponent,
  ],
  imports: [
    RouterModule.forChild(groupCategoryRoutes),
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    DragDropModule,
  ]
})
export class GroupCategoryModule { }
