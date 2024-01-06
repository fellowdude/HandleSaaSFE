import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PublicComponent } from './public.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const publicChildRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "login/:key", component: LoginComponent },
  { path: "password-reset/:key", component: PasswordResetComponent },
  { path: "recovery-password/:jwt", component: PasswordRecoveryComponent }
];

const publicRoutes: Routes = [
  { path: '', component: PublicComponent, children: publicChildRoutes }
]

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    PasswordResetComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(publicRoutes),
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ]
})
export class PublicModule { }
