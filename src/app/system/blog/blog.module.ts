import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post/post.component";
import { CrudPostComponent } from "./post/crud-post/crud-post.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatSlideToggleModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSliderModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
} from "@angular/material";
import { SharedModule } from "src/app/shared/shared.module";
import { FroalaEditorModule } from "angular-froala-wysiwyg";
import { ComponentsModule } from "../components/components.module";
import { EditorModule } from '@tinymce/tinymce-angular';
const blogRoutes: Routes = [
  { path: "post", component: PostComponent },
  { path: "post/new", component: CrudPostComponent },
  { path: "post/detail/:id", component: CrudPostComponent },
];

@NgModule({
  declarations: [PostComponent, CrudPostComponent],
  imports: [
    CommonModule,
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
    SharedModule,
    EditorModule,
    RouterModule.forChild(blogRoutes),
  ],
})
export class BlogModule { }
