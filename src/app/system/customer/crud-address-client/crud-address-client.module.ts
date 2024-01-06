import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudAddressClientComponent } from './crud-address-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';



@NgModule({
  declarations: [CrudAddressClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [
    CrudAddressClientComponent
  ]
})
export class CrudAddressClientModule { }
