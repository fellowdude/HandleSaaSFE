import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-label-notifications',
  templateUrl: './label-notifications.component.html',
  styleUrls: ['./label-notifications.component.scss']
})
export class LabelNotificationsComponent implements OnInit {
  typeOfLabels: Array<any> = [];
  labelSelected: any;
  Subscriptions: Array<Subscription>;

  constructor(private _notificationService: NotificationsService,
              private _ldvService: LdvService) { }

  ngOnInit() {
    this.Subscriptions = new Array<Subscription>();
    this.init();
  }

  init() {
    this.Subscriptions.push(Observable.forkJoin([
      this.getTypeOfLabels(),
    ]).subscribe(
      () => {
        this._notificationService.sendNotification(null, null, null);
      }
    ));
  }

  getTypeOfLabels() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail("SONR-TYPE-NOTIFICATION").subscribe(
        (response: any) => {
          this.typeOfLabels = response;
          this.typeOfLabels.forEach(function (label) {
            label.check = false;
          });
          resolve({});
        },
        (error) => {
          console.log(error)
          reject({});
        }
      )
    });
    return waitPromise;
  }

  applyFilter(label: any) {
    for(let i = 0; i < this.typeOfLabels.length ; i++) {
      if(this.typeOfLabels[i].value === label.value) {
        this.typeOfLabels[i].check = true;
        this.labelSelected = this.typeOfLabels[i];
      } else {
        this.typeOfLabels[i].check = false;
      }
    }
    this._notificationService.sendNotification(label, null, null);
  }

  removeLabelFilters() {
    this.labelSelected = [];
    for(let i = 0; i < this.typeOfLabels.length ; i++) {
      this.typeOfLabels[i].check = false;
    }
    this._notificationService.sendNotification(null, null, null);
  }

}
