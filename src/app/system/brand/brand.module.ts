import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';
import { CrudBrandComponent } from './crud-brand/crud-brand.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSlideToggleModule, MatInputModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

export const brandRoutes: Routes = [
  { path: '', component: BrandComponent },
  { path: 'new', component: CrudBrandComponent },
  { path: 'detail/:id', component: CrudBrandComponent },
]

@NgModule({
  declarations: [
    BrandComponent,
    CrudBrandComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    RouterModule.forChild(brandRoutes)
  ]
})
export class BrandModule { }
