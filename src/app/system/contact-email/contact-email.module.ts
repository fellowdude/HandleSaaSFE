import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactEmailComponent } from './contact-email.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule, MatInputModule, MatFormFieldModule } from '@angular/material';

const contactEmailRoutes: Routes = [
  { path: '', component: ContactEmailComponent },
]

@NgModule({
  declarations: [
    ContactEmailComponent
  ],
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
export class ContactEmailModule { }
