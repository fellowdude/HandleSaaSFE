import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy  } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { NotificationsService } from '../../notifications.service';
import { CardNotificationsComponent } from '../card-notifications/card-notifications.component';
@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss']
})
export class ListNotificationsComponent implements OnInit, OnDestroy  {
  unsubscribe$: Subject<boolean> = new Subject();
  pageNumber: any = 1;
  quantityPage: any;
  totalItems: any;
  quantity: number = 10;

  labelFilter: any = null;

  dataSource: any  = [];

  filterType: any = { name: 'Todas', type: 'all' };

  subscription: Subscription;

  constructor(private _middleService: MiddleService,
    private _notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.subscription = this._notificationService.$Onotification.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (data) => {
        /* console.log("data", data); */
        this.filterType = data.filterType;
        this.labelFilter = data.labelType;
        this.pageNumber = 1;
        this.getInfo();
      }
    )
  }

  ngOnDestroy() {
    this._notificationService.sendNotification(null, null, null);
    /* if(this.subscription) {
      this.subscription.unsubscribe();
    } */
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  } 

  firstPage() {
    if (this.pageNumber != 1) {
      this.pageNumber = 1;
      this.getInfo();
    }
  }

  lastPage() {
    if (this.pageNumber != this.quantityPage) {
      this.pageNumber = this.quantityPage;
      this.getInfo();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getInfo();
    }
  }

  nextPage() {
    if (this.pageNumber < this.quantityPage) {
      this.pageNumber++;
      this.getInfo();
    }
  }

  getNotificationsBy(filter: string, label?: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationService.get(filter, this.pageNumber, this.quantity, label).subscribe(
        (val: any) => {
          //console.log(val)
          this.dataSource = val.data;
          this.totalItems = val.totalItem;
          this.quantityPage = val.quantityPage;
          if(this.dataSource.length === 0) {
            this.pageNumber = 0;
          }
          this._middleService.sendLoading(false);
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

  getInfo() {
    this._middleService.sendLoading(true);
    if(this.labelFilter !== null) {
      this.getNotificationsBy(this.filterType.type, this.labelFilter._id);
    } else {
      this.getNotificationsBy(this.filterType.type);
    }
  }

  readAll() {
    this._middleService.sendLoading(true);
    const waitPromise = new Promise((resolve, reject) => {
      this._notificationService.readAll().subscribe(
        (response: any) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Notificaciones",
            "Se marcaron todas las notificaciones como leídas",
            "ok"
          );
          this._notificationService.sendNotification(this.labelFilter, this.filterType, true);
          resolve({});
        },
        (error) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Notificaciones",
            error.error.message,
            "error"
          );
          reject({});
        }
      )
    });
    return waitPromise;
  }

  changePageManual(event) {
    if (event.key === "Enter") {
      let value = event.target.value;
      if (value > this.quantityPage || value < 1) {
        this.pageNumber = 1;
        event.target.value = 1;
        this.getInfo();
      } else {
        this.pageNumber = value;
        this.getInfo();
      }
    }
  }

}
