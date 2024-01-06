import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { FormateDate } from 'src/app/utils/formatDate';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-card-notifications',
  templateUrl: './card-notifications.component.html',
  styleUrls: ['./card-notifications.component.scss']
})
export class CardNotificationsComponent implements OnInit {
  @Input() _id: string;
  @Input() title: string;
  @Input() message: string;
  @Input() type: string;
  @Input() color: string;
  @Input() date: Date;
  @Input() read: boolean;
  @Input() archive: boolean;
  @Input() redirection_url: string;
  @Input() redirection_external: boolean;

  Subscriptions: Array<Subscription>;

  constructor(private router: Router,
              private _notificationsService: NotificationsService,
              private _middleService: MiddleService) {
  }

  ngOnInit() {
    this.Subscriptions = new Array<Subscription>();
    //this.init();
  }

  init() {
    this._middleService.sendLoading(true);
    this.Subscriptions.push(Observable.forkJoin([
      this.readNotification(null),
      this.archiveNotification(null),
    ]).subscribe(
      () => {
        this._middleService.sendLoading(false);
      }
    ));
  }

  formatDayMonthYear() {
    return FormateDate.getDayMonthYear(this.date);
  }

  timeSince() {
    const current = new Date();
    this.date = new Date(this.date);
    return FormateDate.timeSince(current, this.date);
  }

  markAsChecked(_id: string) {
    this._middleService.sendLoading(true);
    if(!this.read) {
      this.read = true;
      this.readNotification(_id);
    } else {
      this._middleService.sendLoading(false);
    }
  }
  
  setBackGroundColor() {
    let color = '#F5F5F5';
    if(!this.read) {
      color = 'white';
    }
    let styles = {
      'background-color': color,
    };
    return styles;
  }

  redirectTo() {
    if (this.redirection_external) {
      let url = this.redirection_url;
      window.open(url, "_blank");
    } else {
      this.router.navigate([this.redirection_url]);
    }
  }

  archiveNotification(_id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationsService.archive(_id).subscribe(
        (val: any) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Notificaciones",
            "Notificación archivada",
            "ok"
          );
          this.updateBellNotification();
          resolve({});
        },
        (error) => {
          console.log(error)
          reject({});
          this._middleService.sendMessage(
            "Notificaciones",
            "No se ha podido archivar esta notificación",
            "error"
          );
        }
      )
    });
    return waitPromise;
  }

  readNotification(_id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationsService.read(_id).subscribe(
        (val: any) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Notificaciones",
            "Notificación marcada como leída",
            "ok"
          );
          this.updateBellNotification();
          resolve({});
        },
        (error) => {
          console.log(error)
          reject({});
          this._middleService.sendMessage(
            "Notificaciones",
            "No se ha podido marcada como leída esta notificación",
            "error"
          );
        }
      )
    });
    return waitPromise;
  }

  updateBellNotification() {
    this._notificationsService.sendNotification(null, null, true);
  }
}
