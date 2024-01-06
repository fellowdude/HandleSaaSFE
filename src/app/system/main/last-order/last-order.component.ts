import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-order',
  templateUrl: './last-order.component.html',
  styleUrls: ['./last-order.component.scss']
})
export class LastOrderComponent implements OnInit {
  listOrder: any
  totalOrder: any
  showLoading: boolean

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.showLoading = true
  }

  openOrder(info) {
    if (localStorage.getItem('dashboard-customer')) {
      localStorage.removeItem('dashboard-customer');
    }
    if (localStorage.getItem('list-order')) {
      localStorage.removeItem('list-order');
    }

    this.router.navigate(['/system/order/detail/' + info._id]);
  }

  sendInfo(listOrder, totalOrder) {
    this.totalOrder = totalOrder
    this.listOrder = listOrder
    this.showLoading = false
    /*   this.lastOrderLoading.changeState(false) */
  }

}
