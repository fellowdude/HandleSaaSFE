import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowRequestComponent } from './flow-request.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

const flowRequestRoutes: Routes = [
  { path: '', component: FlowRequestComponent },
]

@NgModule({
  declarations: [
    FlowRequestComponent
  ],
  imports: [
    RouterModule.forChild(flowRequestRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ComponentsModule,
    SharedModule,
    CommonModule
  ]
})
export class FlowRequestModule { }
