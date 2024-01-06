import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerSubject = new Subject();
  headerListener = this.headerSubject.asObservable();
  constructor() { }

  sendTitle(title) {
    this.headerSubject.next({ action: 'setTitle', title: title });
  }

}
