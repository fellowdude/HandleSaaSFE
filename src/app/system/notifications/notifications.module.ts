import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterNotificationsComponent } from './center-notifications/center-notifications.component';
import { RouterModule, Routes } from '@angular/router';
import { ListNotificationsComponent } from './center-notifications/list-notifications/list-notifications.component';
import { CardNotificationsComponent } from './center-notifications/card-notifications/card-notifications.component';
import { FilterNotificationsComponent } from './center-notifications/filter-notifications/filter-notifications.component';
import { LabelNotificationsComponent } from './center-notifications/label-notifications/label-notifications.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

export const notificationRoutes: Routes = [
  { path: 'center', component: CenterNotificationsComponent }
]

@NgModule({
  declarations: [CenterNotificationsComponent, ListNotificationsComponent, CardNotificationsComponent, FilterNotificationsComponent, LabelNotificationsComponent],
  imports: [
    RouterModule.forChild(notificationRoutes),
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
  ]
})
export class NotificationsModule { }
