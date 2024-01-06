import { Component, HostListener, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/service/request.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { Router } from '@angular/router';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  namePage: string;
  listProductRequest: any;
  listBrandRequest: any;
  headerFixed = false;
  listHistoryRequest: any;
  listHistoryBrandRequest: any;
  showFinished: boolean;
  showDetailApprove: boolean;
  detailApproveData: any;
  entity: 'PRODUCT' | 'BRAND';
  constructor(
    private readonly _requestService: RequestService,
    private readonly _middleService: MiddleService,
    private router: Router,
    private headerService: HeaderService
  ) { }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle('Lista de Solicitudes');
    this.listProductRequest = [];
    this.listBrandRequest = [];
    this.listHistoryRequest = [];
    this.listHistoryBrandRequest = [];
    this.detailApproveData = {};
    this.namePage = 'Solicitudes';
    this.getRequestProduct();
    this.getRequestBrand();
    this.getRequestHistory();
    this.getRequestBrandHistory();
    this.showFinished = false;
    this.showDetailApprove = false;
    this.entity = 'PRODUCT';
  }

  getRequestHistory() {
    this._requestService.requestHistory().subscribe(
      listHistoryRequest => {
        this.listHistoryRequest = listHistoryRequest;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  getRequestBrandHistory() {
    this._requestService.requestBrandHistory().subscribe(
      listHistoryBrandRequest => {
        this.listHistoryBrandRequest = listHistoryBrandRequest;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  getRequestProduct() {
    this._requestService.requestProduct().subscribe(
      listRequest => {
        this.listProductRequest = listRequest;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  getRequestBrand() {
    this._requestService.requestBrand().subscribe(
      listRequest => {
        this.listBrandRequest = listRequest;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  changeOption(entity) {
    this.entity = entity;
  }

  openDetailHistory(history) {
    this.detailApproveData = history;
    this.showDetailApprove = true;
  }

  closeDetailHistory() {
    this.showDetailApprove = false;
  }

  redirectProduct(productId) {
    localStorage.setItem('returnListRequest', 'system/list-request');
    this.router.navigate(['/system/product/detail/' + productId]);
  }
  redirectbrand(brandId) {
    localStorage.setItem('returnListRequest', 'system/list-request');
    this.router.navigate(['/system/brand/detail/' + brandId]);
  }
  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

}
