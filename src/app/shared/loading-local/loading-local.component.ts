import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MiddleService } from '../service/middle.service';

@Component({
  selector: 'app-loading-local',
  templateUrl: './loading-local.component.html',
  styleUrls: ['./loading-local.component.scss']
})
export class LoadingLocalComponent implements OnInit {

  subscription: Subscription;
  showLoading: boolean;
  constructor() {
    this.showLoading = false;
  }

  ngOnInit() {
  }

  changeState(state) {
    this.showLoading = state;
  }

}
