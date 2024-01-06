import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  isSupplier: boolean
  listUser: any
  countInWishListTotal: any
  top5wishlist: any
  showLoading: boolean

  constructor(private router: Router,) { }

  ngOnInit() {
    this.showLoading = true
  }

  openCustomer(info) {
    this.router.navigate(['/system/customer/detail/' + info._id]);
    localStorage.setItem('dashboard', '/system/dashboard');
  }

  openProduct() {

  }

  sendInfo(isSupplier, listUser, countInWishListTotal, top5wishlist) {

    this.isSupplier = isSupplier
    this.listUser = listUser
    this.countInWishListTotal = countInWishListTotal
    this.top5wishlist = top5wishlist
    this.showLoading = false
  }

}
