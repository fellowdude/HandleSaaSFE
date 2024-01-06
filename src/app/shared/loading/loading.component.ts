import { Component, OnInit } from '@angular/core';
import { MiddleService } from '../service/middle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  subscription: Subscription;
  showLoading: boolean;
  constructor(private middleService: MiddleService) {
    this.showLoading = false;
    this.subscription = this.middleService.getLoading().subscribe(state => {
      this.showLoading = state.state;
    });
  }

  ngOnInit() {
  }

}
