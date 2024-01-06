import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-sell-today',
  templateUrl: './sell-today.component.html',
  styleUrls: ['./sell-today.component.scss']
})
export class SellTodayComponent implements OnInit {
  todayTotalSells: any
  @ViewChild("sellTodayLoading", { static: true })
  sellTodayLoading: LoadingLocalComponent;
  constructor() { }

  ngOnInit() {
    this.sellTodayLoading.changeState(true)
  }

  sendInfo(todayTotalSells) {
    this.todayTotalSells = todayTotalSells
    this.sellTodayLoading.changeState(false)
  }

}
