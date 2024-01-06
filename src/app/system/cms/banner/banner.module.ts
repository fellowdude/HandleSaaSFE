import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { CrudBannerComponent } from './crud-banner/crud-banner.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule, MatFormFieldModule, MatSlideToggleModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';

const bannerRoutes: Routes = [
  { path: '', component: BannerComponent },
  { path: 'new', component: CrudBannerComponent },
  { path: 'detail/:id', component: CrudBannerComponent },
]

@NgModule({
  declarations: [
    BannerComponent,
    CrudBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(bannerRoutes),
    ComponentsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    EditorModule,
    MatAutocompleteModule
  ]
})
export class BannerModule { }
