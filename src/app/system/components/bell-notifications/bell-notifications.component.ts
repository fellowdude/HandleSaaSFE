import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-bell-notifications',
  templateUrl: './bell-notifications.component.html',
  styleUrls: ['./bell-notifications.component.scss']
})
export class BellNotificationsComponent implements OnInit {
  showNotifications: boolean;
  maxLength: number = 30;
  numberNotifications: number;
  dataSource: any  = [];
  update: boolean = false;
  updating: boolean = false;

  constructor(private router: Router,
              private _notificationService: NotificationsService,
              private middleService: MiddleService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showNotifications = false;
    this.getNumberNotifications();
    this.getSummaryNotifications();
    this._notificationService.$Onotification.subscribe(
      (data) => {
        if(data.update) {
          this.getNumberNotifications();
          this.getSummaryNotifications();
        }
      }
    )
  }

  toogleNotificationOn() {
    this.showNotifications = true;
  }

  toggleNotificationOff() {
    this.showNotifications = false;
  }

  toggleNotification() {
    this.showNotifications = !this.showNotifications;
  }

  treatString(text: string): string {
    let newText = text;
    if(text.length > this.maxLength) {
      newText = text.substr(0,this.maxLength) + '...';
    }
    return newText;
  }

  toNotificationCenter() {
    this.cdr.detectChanges();
    this.router.navigate(['/system/notifications/center']);
  }

  redirectTo(url: string, link: boolean, id: string) {
    this.showNotifications = false;
    if (link) {
      window.open(url, "_blank");
    } else {
      this.router.navigate([url]);
    }
    this.readNotification(id);
  }

  readNotification(_id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationService.read(_id).subscribe(
        (val: any) => {
          this.middleService.sendMessage(
            "Notificaciones",
            "Notificación marcada como leída",
            "ok"
          );
          this.updateBell();
          this.showNotifications = false;
          resolve({});
        },
        (error) => {
          console.log(error)
          reject({});
          this.middleService.sendMessage(
            "Notificaciones",
            "No se ha podido marcada como leída esta notificación",
            "error"
          );
        }
      )
    });
    return waitPromise;
  }

  getNumberNotifications() {
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationService.getCountUnread().subscribe(
        (val: any) => {
          console.log(val)
          this.numberNotifications = val;
          this.updating = false;
          resolve({});
        },
        (error) => {
          this.updating = false;
          console.log(error)
          reject({});
        }
      )
    });
    return waitPromise;
  }

  getSummaryNotifications() {
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationService.getSummary().subscribe(
        (val: any) => {
          console.log(val)
          this.dataSource = val;
          this.updating = false;
          resolve({});
        },
        (error) => {
          this.updating = false;
          console.log(error)
          reject({});
        }
      )
    });
    return waitPromise;
  }

  updateBell() {
    this.updating = true;
    setTimeout(() => {
      this.getNumberNotifications();
      this.getSummaryNotifications();
    }, 1500);
  }

}
