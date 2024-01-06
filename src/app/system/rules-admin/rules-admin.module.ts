import { DiscountRuleModule } from "./../discount-rule/discount-rule.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { RulesAdminComponent } from "./rules-admin.component";
import { CrudRulesAdminComponent } from "./crud-rules-admin/crud-rules-admin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatFormField,
  MatTabsModule,
  MatDatepickerModule,
  MatAutocompleteModule
} from "@angular/material";
import { ComponentsModule } from "../components/components.module";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";

// const adminRulesRoutes: Routes = [
//   { path: "", component: RulesAdminComponent },
//   { path: "new", component: CrudRulesAdminComponent },
//   { path: "detail/:idRulesAdmin", component: CrudRulesAdminComponent }
// ];

@NgModule({
  declarations: [RulesAdminComponent, CrudRulesAdminComponent],
  imports: [
    // RouterModule.forChild(adminRulesRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ComponentsModule,
    MatTabsModule,
    MatAutocompleteModule,
    ScrollDispatchModule,
    MatDatepickerModule,
    DiscountRuleModule
  ],
  // exports: [RulesAdminComponent, CrudRulesAdminComponent, RouterModule]
  exports: [RulesAdminComponent, CrudRulesAdminComponent]
})
export class RulesAdminModule {}
