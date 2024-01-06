import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-sell-category',
  templateUrl: './sell-category.component.html',
  styleUrls: ['./sell-category.component.scss','../main.component.scss']
})
export class SellCategoryComponent implements OnInit {
  totalOrder: any
  donutData: any
  donutScheme: any
  showLoading :boolean
  constructor() { }


  ngOnInit() {
    this.showLoading = true
  }

  sentInfo(totalOrder, donutData, donutScheme) { 
    this.totalOrder = totalOrder
    this.donutData = donutData
    this.donutScheme = donutScheme
    this.showLoading = false
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
