import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import {Observer} from 'rxjs/Observer';
import { Constants } from 'src/app/utils/constants';
import { IFilterType, ILabelType, INotification } from './structure/notifications.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  labelType: ILabelType = {
    _id: '',
    code: '',
    value: '',
    active: true,
    ref1: '',
    ref2: '',
    check: false,
  };
  filterType: IFilterType = {
    name: '',
    type: '',
  };
  update: boolean = false;

  notification: INotification = {
    labelType: this.labelType,
    filterType: this.filterType,
    update: this.update,
  };

  private $notificationFilter = new BehaviorSubject<INotification>(this.notification);
  $Onotification = this.$notificationFilter.asObservable();

  constructor(private http: HttpClient) {

  }

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  getCountUnread() {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());
    
    return this.http.get(Constants.BACKEND_URL + '/notification/count-unread', 
    { headers: headers });
  }

  getSummary() {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());
    
    return this.http.get(Constants.BACKEND_URL + '/notification/summary', 
    { headers: headers });
  }

  get(filter: string, page?, quantity?, typeNotification?) {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());
    
    if(typeNotification) {
      return this.http.get(Constants.BACKEND_URL + '/notification/list/' + filter, 
        { headers: headers,  params: {
          page, quantity, typeNotification,
        }});
    } else {
      return this.http.get(Constants.BACKEND_URL + '/notification/list/' + filter, 
      { headers: headers,  params: {
        page, quantity,
      }});
    }
  }

  archive(idNotification) {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());

    return this.http.patch(Constants.BACKEND_URL + "/notification/archive/" + idNotification, {}, 
    { headers: headers });
  }

  read(idNotification) {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());

    return this.http.patch(Constants.BACKEND_URL + "/notification/read/" + idNotification, {},
    { headers: headers });
  }

  readAll() {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());

    return this.http.patch(Constants.BACKEND_URL + "/notification/read-all", {},
    { headers: headers });
  }


  //For sibilings
  sendNotification(newLabel?: ILabelType, newFilter?: IFilterType, newUpdate?: boolean) {
    if(newLabel) {
      this.notification.labelType._id = newLabel._id
      this.notification.labelType.code = newLabel.code
      this.notification.labelType.value = newLabel.value
      this.notification.labelType.active = newLabel.active
      this.notification.labelType.ref1 = newLabel.ref1
      this.notification.labelType.ref2 = newLabel.ref2
    }
    if(newFilter) {
      this.notification.filterType.name = newFilter.name;
      this.notification.filterType.type = newFilter.type;
    }
    if(newUpdate) {
      this.notification.update = newUpdate;
    }
    const cleanLabelType: ILabelType = {
      _id: '',
      code: '',
      value: '',
      active: true,
      ref1: '',
      ref2: '',
      check: false,
    };
    const not: INotification = {
      labelType: newLabel ? newLabel : cleanLabelType,
      filterType: newFilter ? newFilter : this.filterType,
      update: newUpdate ? newUpdate : false,
    }
    this.$notificationFilter.next(not);
  }

}
