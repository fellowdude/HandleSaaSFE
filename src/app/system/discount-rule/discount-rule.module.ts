import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DiscountRuleComponent } from "./discount-rule.component";
import { CrudDiscountRuleComponent } from "./crud-discount-rule/crud-discount-rule.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatSelectModule,
  MatInputModule,
  MatFormField,
  MatFormFieldModule,
  MatTabsModule,
  MatRadioModule,
  MatNativeDateModule,
  MatAutocompleteModule
} from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ComponentsModule } from "../components/components.module";
import { CategoryService } from "src/app/shared/service/category.service";

// const discountRuleRoutes: Routes = [
//   { path: "", component: DiscountRuleComponent },
//   { path: "new", component: CrudDiscountRuleComponent },
//   { path: "detail/:idDiscountRule", component: CrudDiscountRuleComponent }
// ];

@NgModule({
  declarations: [DiscountRuleComponent, CrudDiscountRuleComponent],
  imports: [
    // RouterModule.forChild(discountRuleRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ComponentsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  exports: [DiscountRuleComponent, CrudDiscountRuleComponent, RouterModule]
})
export class DiscountRuleModule {}
