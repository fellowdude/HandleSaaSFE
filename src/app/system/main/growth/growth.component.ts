import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.scss']
})
export class GrowthComponent implements OnInit {
  increase: any
  totalSellsDayBefore: any

  @ViewChild("growthLoading", { static: true })
  growthLoading: LoadingLocalComponent;

  constructor() { }

  ngOnInit() {
    this.growthLoading.changeState(true)
  }
  sendInfo(increase, totalSellsDayBefore) {
    this.increase = increase
    this.totalSellsDayBefore = totalSellsDayBefore
    this.growthLoading.changeState(false)
  }

}
