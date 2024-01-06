import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../notifications.service';
@Component({
  selector: 'app-filter-notifications',
  templateUrl: './filter-notifications.component.html',
  styleUrls: ['./filter-notifications.component.scss']
})
export class FilterNotificationsComponent implements OnInit {
  typesOfFilters: Array<any> = [
    {
      name: 'Todas',
      type: 'all',
      check: true,
    },
    {
      name: 'Sin Revisar',
      type: 'unread',
      check: false,
    },
    {
      name: 'Revisadas',
      type: 'read',
      check: false,
    },
    {
      name: 'Archivadas',
      type: 'archive',
      check: false,
    },
  ];

  constructor(private _notificationService: NotificationsService) { }

  ngOnInit() {
    this._notificationService.sendNotification(null, this.typesOfFilters[0], null);
  }

  applyFilter(filter: any) {
    for(let i = 0; i < this.typesOfFilters.length ; i++) {
      if(this.typesOfFilters[i].type === filter.type) {
        this.typesOfFilters[i].check = true;
      } else {
        this.typesOfFilters[i].check = false;
      }
    }
    this._notificationService.sendNotification(null, filter, null);
  }

}
