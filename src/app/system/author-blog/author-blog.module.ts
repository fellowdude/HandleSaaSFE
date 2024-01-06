import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorBlogComponent } from './author-blog.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule, MatInputModule, MatFormFieldModule } from '@angular/material';

const contactEmailRoutes: Routes = [
  { path: '', component: AuthorBlogComponent },
]

@NgModule({
  declarations: [AuthorBlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactEmailRoutes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AuthorBlogModule { }
