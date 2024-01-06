import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListStaticPageComponent } from './list-static-page/list-static-page.component';
import { StaticPageComponent } from './static-page.component';
import { ComponentsModule } from '../../components/components.module';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { DinamicStaticPageComponent } from './dinamic-static-page/dinamic-static-page.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { EditorModule } from '@tinymce/tinymce-angular';

const StaticPageRoutes: Routes = [
  { path: '', component: ListStaticPageComponent },
  { path: 'new', component: StaticPageComponent },
  { path: 'detail/:idPage', component: StaticPageComponent },
];

@NgModule({
  declarations: [
    ListStaticPageComponent,
    StaticPageComponent,
    DinamicStaticPageComponent

  ],
  imports: [
    RouterModule.forChild(StaticPageRoutes),
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
export class StaticPageModule { }
