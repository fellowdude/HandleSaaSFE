import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceComponent } from './experience.component';
import { CrudExperienceComponent } from './crud-experience/crud-experience.component';
import { MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material';
import {EditorModule} from '@tinymce/tinymce-angular';
import { ActivationCardComponent } from './crud-experience/activation-card/activation-card.component';

export const experienceRoutes: Routes = [
  { path: '', component: ExperienceComponent },
  { path: 'new', component: CrudExperienceComponent },
  { path: 'detail/:idExperience', component: CrudExperienceComponent },
];

@NgModule({
  declarations: [
    ExperienceComponent,
    CrudExperienceComponent,
    ActivationCardComponent
  ],
  imports: [
    RouterModule.forChild(experienceRoutes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CommonModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    FroalaEditorModule,
    SharedModule,
    MatExpansionModule,
    MatIconModule,
    EditorModule
  ]
})
export class ExperienceModule { }
