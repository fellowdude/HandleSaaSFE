import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiddleService {

  constructor() { }
  private subjectMessage = new Subject<any>();
  private subjectHeader = new Subject<any>();
  private subjectLoading = new Subject<any>();

  private subjectUpdateItem = new Subject<any>();
  private subjectMenu = new Subject<any>();
  private subjectHeaderIcon = new Subject<any>();
  private subjectDateRange = new BehaviorSubject<any>({});
  private subjectChangeRange = new BehaviorSubject<any>({});
  sendMessage(title: string, message: string, type: string, timer?: number) {
    this.subjectMessage.next({ title: title, message: message, type: type, timer: timer });
  }
  getMessage(): Observable<any> {
    return this.subjectMessage.asObservable();
  }

  sendHeader(name: string) {
    this.subjectHeader.next({ name: name });
  }
  getHeader(): Observable<any> {
    return this.subjectHeader.asObservable();
  }

  sendHeaderIcon() {
    this.subjectHeaderIcon.next();
  }
  getHeaderIcon(): Observable<any> {
    return this.subjectHeaderIcon.asObservable();
  }

  sendLoading(state: boolean) {
    this.subjectLoading.next({ state: state });
  }
  getLoading(): Observable<any> {
    return this.subjectLoading.asObservable();
  }
  sendUpdateDeleteItem() {
    this.subjectUpdateItem.next();
  }
  getUpdateDeleteItem(): Observable<any> {
    return this.subjectUpdateItem.asObservable();
  }

  sendChangeMenu() {
    this.subjectMenu.next({action: 'sendChangeMenu'});
  }
  openMenu() {
    this.subjectMenu.next({action: 'openMenu'});
  }
  closeMenu() {
    this.subjectMenu.next({action: 'closeMenu'});
  }

  getMenuInfo(): Observable<any> {
    return this.subjectMenu.asObservable();
  }

  sendDateRange(fieldChange: any, objSend: any) {
    this.subjectDateRange.next({ fieldChange: fieldChange, data: objSend });
  }
  getDateRange(): Observable<any> {
    return this.subjectDateRange.asObservable();
  }

  sendChangeDateRange(value: any, data: any) {
    this.subjectChangeRange.next({ value: value, data: data });
  }
  getChangeDateRange(): Observable<any> {
    return this.subjectChangeRange.asObservable();
  }
}
