import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'payu', loadChildren: () => import('./payu/payu.module').then(m => m.PayuModule) },
  { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule), canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
