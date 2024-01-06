import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListRequestComponent } from './list-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';

const listRequestRoutes: Routes = [
  { path: '', component: ListRequestComponent }
]

@NgModule({
  declarations: [
    ListRequestComponent
  ],
  imports: [
    RouterModule.forChild(listRequestRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSlideToggleModule

  ]
})
export class ListRequestModule { }
