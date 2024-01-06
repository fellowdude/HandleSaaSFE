import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmailFormComponent } from './email-form.component';
import { CrudEmailFormComponent } from './crud-email-form/crud-email-form.component';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatSliderModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { EditorModule } from '@tinymce/tinymce-angular';

const emailFormRoutes: Routes = [
  { path: '', component: EmailFormComponent },
  { path: 'new', component: CrudEmailFormComponent },
  { path: 'detail/:idEmailForm', component: CrudEmailFormComponent },
]

@NgModule({
  declarations: [
    EmailFormComponent,
    CrudEmailFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(emailFormRoutes),
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    SharedModule,
    FroalaEditorModule,
    MatSliderModule,
    EditorModule
  ]
})
export class EmailFormModule { }
