import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-session-active',
  templateUrl: './session-active.component.html',
  styleUrls: ['./session-active.component.scss']
})
export class SessionActiveComponent implements OnInit {
  isSupplier: boolean
  countInWishListTotal: any
  activeSessions: any
  totalUser: any

  @ViewChild("sessionActiveLoading", { static: true })
  sessionActiveLoading: LoadingLocalComponent;
  
  constructor() { }

  ngOnInit() {
    this.sessionActiveLoading.changeState(true)
  }

  sendInfo(isSupplier, countInWishListTotal, activeSessions, totalUser) {
    this.isSupplier = isSupplier
    this.countInWishListTotal = countInWishListTotal
    this.activeSessions = activeSessions
    this.totalUser = totalUser
    this.sessionActiveLoading.changeState(false)
  }

}
