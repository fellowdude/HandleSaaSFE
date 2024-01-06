import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudClientComponent } from './crud-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';



@NgModule({
  declarations: [CrudClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    CrudClientComponent
  ]
})
export class CrudClientModule { }
