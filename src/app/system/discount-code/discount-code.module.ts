import { CrudDiscountCodeComponent } from "./crud-discount-code/crud-discount-code.component";
import { RulesAdminModule } from "../rules-admin/rules-admin.module";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTabsModule,
  MatSliderModule,
  MatSlideToggleModule,
} from "@angular/material";
import { ComponentsModule } from "../components/components.module";
import { DiscountCodeComponent } from "./discount-code.component";

const discountCode: Routes = [
  { path: "", component: DiscountCodeComponent },
  { path: "new", component: CrudDiscountCodeComponent },
  { path: "detail/:idDiscountCode", component: CrudDiscountCodeComponent }
];

@NgModule({
  declarations: [DiscountCodeComponent, CrudDiscountCodeComponent],
  imports: [
    RulesAdminModule,
    RouterModule.forChild(discountCode),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    ScrollDispatchModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  exports: [RouterModule]
})
export class DiscountCodeModule {}
