import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { ComponentsModule } from '../../components/components.module';

const companyRoutes: Routes = [
  { path: '', component: CompanyComponent },
]

@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    RouterModule.forChild(companyRoutes),
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class CompanyModule { }
