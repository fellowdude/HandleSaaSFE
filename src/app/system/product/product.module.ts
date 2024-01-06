import { RulesAdminModule } from "./../rules-admin/rules-admin.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product.component";
import { CreateProductComponent } from "./crud-product/create-product.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSliderModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatTooltipModule
} from "@angular/material";
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FroalaEditorModule } from "angular-froala-wysiwyg";
import { ComponentsModule } from "../components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { EditorModule } from '@tinymce/tinymce-angular';
import { MathImgExcelSummaryComponent } from "./math-img-excel-summary/math-img-excel-summary.component";
import { ModalSearchFatherVariationProductModule } from "./modal-search-father-variation-product/modal-search-father-variation-product.module";
import { SummaryUploadProductComponent } from "./summary-upload-product/summary-upload-product.component";
import { UploadMasiveProductComponent } from "./upload-masive-product/upload-masive-product.component";



export const productRoutes: Routes = [
  { path: "", component: ProductComponent },
  { path: "new", component: CreateProductComponent },
  { path: "detail/:id", component: CreateProductComponent }
];

@NgModule({
  declarations: [ProductComponent, CreateProductComponent, SummaryUploadProductComponent, MathImgExcelSummaryComponent, UploadMasiveProductComponent],
  imports: [
    RulesAdminModule,
    RouterModule.forChild(productRoutes),
    CommonModule,
    MatMenuModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    FroalaEditorModule,
    ComponentsModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    EditorModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    ModalSearchFatherVariationProductModule
  ],
  exports: [RouterModule]
})
export class ProductModule { }
