import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesFiltersComponent } from './categories-filters.component';
import { CrudFilterComponent } from './crud-filter/crud-filter.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

const categoriesFilterRoutes: Routes = [
  { path: '', component: CategoriesFiltersComponent },
  { path: 'new', component: CrudFilterComponent },
  { path: 'detail/:id', component: CrudFilterComponent },
];

@NgModule({
  declarations: [
    CategoriesFiltersComponent,
    CrudFilterComponent
  ],
  imports: [
    RouterModule.forChild(categoriesFilterRoutes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule
  ]
})
export class CategoriesFiltersModule { }
