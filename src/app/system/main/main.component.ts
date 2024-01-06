import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { HeaderService } from '../components/header/header.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { SupplierService } from 'src/app/shared/service/supplier.service';
import { SupplierMethodSendService } from 'src/app/shared/service/supplier-method-send.service';
import { OrderDayComponent } from './order-day/order-day.component';
import { SessionActiveComponent } from './session-active/session-active.component';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/forkJoin";
import { Subscription } from 'rxjs';
import { GrowthComponent } from './growth/growth.component';
import { SellTodayComponent } from './sell-today/sell-today.component';
import { LastOrderComponent } from './last-order/last-order.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SellCategoryComponent } from './sell-category/sell-category.component';
import { BarGraphicComponent } from './bar-graphic/bar-graphic.component';
import { LoadingLocalComponent } from 'src/app/shared/loading-local/loading-local.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  todayTotalOrderCount: number;
  totalOrderCount: number;
  todayTotalSells: number;
  totalSells: number;
  totalSellsDayBefore: number;
  increase: any;
  listOrder: Array<any>;
  totalOrder: number;
  listUser: Array<any>;
  totalUser: number;
  headerFixed: boolean;
  countInWishListTotal: number;
  top10categories: Array<any>;
  top10brands: Array<any>;
  top10products: Array<any>;
  top5supplierByQuantity: Array<any>;
  top5supplierByTotalAmount: Array<any>;
  single: any[];
  multi: any[];
  isSupplier: boolean;
  panel_title: string;
  top5mostsold: Array<any>;
  top5wishlist: Array<any>;
  activeSessions: number;

  /* view: any[] = [null, 400]; */

  // options

  showLabels = true;
  animations = true;



  timeline = false;

  // options donut
  donutData;
  donutScheme;
  @ViewChild("orderDay", { static: true })
  orderDayInfo: OrderDayComponent;

  @ViewChild("activeSession", { static: true })
  activeSessionInfo: SessionActiveComponent;

  @ViewChild("growth", { static: true })
  growthInfo: GrowthComponent;

  @ViewChild("sellToday", { static: true })
  sellTodayInfo: SellTodayComponent;

  @ViewChild("lastOrder", { static: true })
  lastOrderinfo: LastOrderComponent;

  @ViewChild("customerList", { static: true })
  customerListInfo: CustomerListComponent;


  @ViewChild("categorySell", { static: true })
  categorySellInfo: SellCategoryComponent;

  @ViewChild("barGraphic", { static: true })
  barGraphicInfo: BarGraphicComponent;

  showLoading10Product: boolean
  showLoading10Brand: boolean
  showLoading10Category: boolean

  @ViewChild("list10BrandLoading", { static: true })
  list10BrandLoading: LoadingLocalComponent;

  @ViewChild("list10CategoryLoading", { static: true })
  list10CategoryLoading: LoadingLocalComponent;

  Subscriptions: Array<Subscription>;
  constructor(
    private headerService: HeaderService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private middleWareService: MiddleService,
    private supplierService: SupplierService,
    private _serviceMethod: SupplierMethodSendService,
  ) { }

  @HostListener("window:scroll", ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.Subscriptions = new Array<Subscription>();
    this.headerService.sendTitle('Panel de control');
    this.headerFixed = false;
    this.showLoading10Product = true
    this.showLoading10Brand = true
    this.showLoading10Category = true


    this.getInfoIni()
  }

  getInfoIni() {
    this.Subscriptions.push(Observable.forkJoin([
      this.validIsSupplier(),
      this.getLastOrder(),
      this.getLastCustomer(),
      this.initLastSellsGraph(),
      this.initSellsByCategory(),
      this.fillCardStas(),
      this.getTop10(),
    ]
    ).subscribe(
      () => {


      }
    ));
  }

  initLastSellsGraph() {
    const waitPromise = new Promise((resolve, reject) => {
      this.orderService.getBiweeklySales().subscribe((response: any) => {

        this.multi = response;
        this.barGraphicInfo.sendinfo(this.multi)
        resolve({});
      });
    });
    return waitPromise;

  }

  validIsSupplier() {
    const waitPromise = new Promise((resolve, reject) => {
      this.supplierService.validIsSupplier().subscribe(
        (infoSupplier: any) => {

          this.isSupplier = infoSupplier.idSupplier;

          if (!this.isSupplier) {
            this.panel_title = 'Últimos Clientes';
            this.getLastCustomer();
          } else {
            this.panel_title = 'Productos';
            this.supplierExtraInfo();
          }
          resolve({});
        }
      )
    });
    return waitPromise;

  }

  seeMethodSend() {
    //this.middleWareService.sendLoading(true);
    this._serviceMethod.searchBySupplier(this.isSupplier).subscribe(
      (listMethod: any) => {
        if (listMethod.length > 0) {
          this.router.navigate(['system/supplier/detail/add-method/' + this.isSupplier + '/' + listMethod[0]._id]);
          localStorage.setItem('methosSupplier', 'true')
          //this.middleWareService.sendLoading(false);
        }
      },
      (error) => {
        this.middleWareService.sendMessage(
          "Productos",
          error.message.message,
          "error"
        );
      }
    );
  }
  supplierExtraInfo() {
    this.orderService.supplierExtraInfo().subscribe(
      (listUser: any) => {
        this.countInWishListTotal = listUser.countInWishListTotal;
        // this.countInWishListBought = listUser.countInWishListBought;
        this.top5mostsold = listUser.top5mostsold;
        this.top5wishlist = listUser.top5wishlist;

        this.customerListInfo.sendInfo(this.isSupplier, this.listUser, this.countInWishListTotal, this.top5wishlist)
      },
      error => {
        console.log(error);
      }
    );
  }

  initSellsByCategory() {
    const waitPromise = new Promise((resolve, reject) => {
      this.donutScheme = {
        domain: ['#7023a1', '#f7464a', '#46bfbd', '#fdb45c', '#6b6f82']
      };
      this.orderService.getLastMonthCategorySales().subscribe((response: any) => {
        this.donutData = response;
        if (this.totalOrder) {
          this.categorySellInfo.sentInfo(this.totalOrder, this.donutData, this.donutScheme)
        }
        resolve({});
      });

    });
    return waitPromise;


  }

  scrollEvent = (event: any): void => {
    //const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
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


  getLastOrder() {
    const waitPromise = new Promise((resolve, reject) => {
      this.orderService.getLastOrder().subscribe(
        (listOrder: any) => {

          this.listOrder = listOrder.listOrder;
          this.totalOrder = listOrder.totalOrder;
          this.lastOrderinfo.sendInfo(this.listOrder, this.totalOrder)
        
          if(this.donutData && this.donutScheme){
            this.categorySellInfo.sentInfo(this.totalOrder, this.donutData, this.donutScheme)
          }
          resolve({});
        },
        error => {
          resolve({});
          console.log(error);
        }
      );
    });
    return waitPromise;


  }
  getLastCustomer() {
    const waitPromise = new Promise((resolve, reject) => {
      this.userService.getLastCustomer().subscribe(
        (listUser: any) => {
          this.listUser = listUser.listUser;
          this.totalUser = listUser.totalUser;
          this.activeSessions = listUser.activeSession;
          this.activeSessionInfo.sendInfo(this.isSupplier, this.countInWishListTotal, this.activeSessions, this.totalUser)
          this.customerListInfo.sendInfo(this.isSupplier, this.listUser, this.countInWishListTotal, this.top5wishlist)
          resolve({});
        },
        error => {
          console.log(error);
          resolve({});
        }
      );
    });
    return waitPromise;

  }

  fillCardStas() {

    const waitPromise = new Promise((resolve, reject) => {
      // this.middleWareService.sendLoading(true)
      this.orderService.fillCardStas().subscribe(
        (todayTotalOrder: number) => {
          //this.middleWareService.sendLoading(false)
          this.todayTotalOrderCount = todayTotalOrder[0];
          this.totalOrderCount = todayTotalOrder[1];
          this.orderDayInfo.sendInfo(this.todayTotalOrderCount, this.totalOrderCount)
          this.todayTotalSells = todayTotalOrder[2];
          this.totalSells = todayTotalOrder[3];
          this.totalSellsDayBefore = todayTotalOrder[4];
          if (this.totalSellsDayBefore > 0) {
            this.increase = (((this.todayTotalSells - this.totalSellsDayBefore) / this.totalSellsDayBefore) * 100).toFixed(2);
          } else if (this.totalSellsDayBefore == 0 && this.todayTotalSells == 0) {
            this.increase = 0;
          } else {
            this.increase = 100;
          }
          this.sellTodayInfo.sendInfo(this.todayTotalSells)
          this.growthInfo.sendInfo(this.increase, this.totalSellsDayBefore)
          resolve({});
        },
        error => {
          console.log(error);
          resolve({});
        }
      );

    });
    return waitPromise;

  }

  getTop10() {
    const waitPromise = new Promise((resolve, reject) => {
      this.orderService.getTop10().subscribe((response: any) => {

        this.top10categories = response.top10categories;
        this.top10brands = response.top10brands;
        this.top10products = response.top10products;
        this.top5supplierByQuantity = response.top5supplierByQuantity;
        this.top5supplierByTotalAmount = response.top5supplierByTotalAmount;
        this.showLoading10Product = false
        this.showLoading10Brand = false
        this.showLoading10Category = false

        resolve({});
      });
    });
    return waitPromise;

  }


}
