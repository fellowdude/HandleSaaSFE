import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-bar-graphic',
  templateUrl: './bar-graphic.component.html',
  styleUrls: ['./bar-graphic.component.scss', '../main.component.scss']
})
export class BarGraphicComponent implements OnInit {
  multi: any
  showYAxisLabel = true;
  showXAxisLabel = true;
  colorScheme = {
    domain: [' #46bfbd']
  };
  legend = false;
  xAxis = true;
  yAxis = true;
  xAxisLabel = 'Días';
  yAxisLabel = 'Cantidad';
  showLoading : boolean


  constructor() { }

  ngOnInit() {
    this.showLoading = true
  }

  sendinfo(
    multi,
  ) {

    this.multi = multi
    this.showLoading = false
  }

}
