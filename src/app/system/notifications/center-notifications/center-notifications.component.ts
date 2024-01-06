import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';

@Component({
  selector: 'app-center-notifications',
  templateUrl: './center-notifications.component.html',
  styleUrls: ['./center-notifications.component.scss']
})
export class CenterNotificationsComponent implements OnInit {
  @ViewChild("listNotifications", {static: true}) listNotifications: ListNotificationsComponent;
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  headerFixed: boolean;

  constructor() { }

  ngOnInit() {
    this.headerFixed = false;
  }

  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

}
