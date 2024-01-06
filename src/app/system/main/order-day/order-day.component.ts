import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';
import { MiddleService } from 'src/app/shared/service/middle.service';

@Component({
  selector: 'app-order-day',
  templateUrl: './order-day.component.html',
  styleUrls: ['./order-day.component.scss']
})
export class OrderDayComponent implements OnInit {
  todayTotalOrderCount: any
  totalOrderCount: any

  @ViewChild("orderDayLoading", { static: true })
  orderDayLoading: LoadingLocalComponent;
  
  constructor(
  ) { }

  ngOnInit() {
    this.orderDayLoading.changeState(true)
  }

  sendInfo(todayTotalOrderCount, totalOrderCount) {
    this.todayTotalOrderCount = todayTotalOrderCount
    this.totalOrderCount = totalOrderCount
    this.orderDayLoading.changeState(false)
  }

}
