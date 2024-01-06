import { RulesAdminModule } from "./../rules-admin/rules-admin.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CrudCategoryComponent } from "./crud-category/crud-category.component";
import { ListCategoryComponent } from "./list-category/list-category.component";
import { CategoryComponent } from "./category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule
} from "@angular/material";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "../components/components.module";
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryService } from "src/app/shared/service/category.service";

const categoryRoutes: Routes = [
  { path: "", component: CategoryComponent },
  { path: "new", component: CrudCategoryComponent },
  { path: "detail/:idCategory", component: CrudCategoryComponent }
];

@NgModule({
  declarations: [
    CrudCategoryComponent,
    ListCategoryComponent,
    CategoryComponent
  ],
  imports: [
    RulesAdminModule,
    RouterModule.forChild(categoryRoutes),
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    DragDropModule
  ],
  exports: [RouterModule]
})
export class CategoryModule { }
