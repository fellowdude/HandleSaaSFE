import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { CrudSupplierComponent } from './crud-supplier/crud-supplier.component';
import { MethodsComponent } from './methods/methods.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { ComponentsModule } from '../components/components.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { CrudSupplierLocalComponent } from './crud-supplier-local/crud-supplier-local.component';

const supplierRoutes: Routes = [
  { path: '', component: SupplierComponent },
  { path: 'new', component: CrudSupplierComponent },
  { path: 'detail/:id', component: CrudSupplierComponent },
  { path: 'detail/add-method/:idSupplier', component: MethodsComponent },
  { path: 'detail/add-method/:idSupplier/:idMethod', component: MethodsComponent },
];

@NgModule({
  declarations: [
    SupplierComponent,
    CrudSupplierComponent,
    MethodsComponent,
    CrudSupplierLocalComponent,
  ],
  imports: [
    RouterModule.forChild(supplierRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    FroalaEditorModule,
    ComponentsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatTabsModule,
    MatSelectModule,
    ScrollingModule,
    CommonModule,
    MatExpansionModule
  ],
  entryComponents: [
    CrudSupplierLocalComponent
  ]
})
export class SupplierModule { }
