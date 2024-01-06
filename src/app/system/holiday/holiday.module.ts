import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HolidayComponent } from './holiday.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const holidayRoutes: Routes = [
  { path: '', component: HolidayComponent },
]

@NgModule({
  declarations: [
    HolidayComponent
  ],
  imports: [
    RouterModule.forChild(holidayRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class HolidayModule { }
