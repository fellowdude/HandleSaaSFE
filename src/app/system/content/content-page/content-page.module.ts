import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPageComponent } from './content-page.component';
import { ListContentPageComponent } from './list-content-page/list-content-page.component';
import { DynamicContentPageComponent } from './dynamic-content-page/dynamic-content-page.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { EditorModule } from '@tinymce/tinymce-angular';

const contentPageRoutes: Routes = [
  { path: '', component: ListContentPageComponent },
  { path: 'detail/:idPage', component: ContentPageComponent }
]

@NgModule({
  declarations: [ContentPageComponent, ListContentPageComponent, DynamicContentPageComponent],
  imports: [
    RouterModule.forChild(contentPageRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FroalaEditorModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    EditorModule
  ]
})
export class ContentPageModule { }
