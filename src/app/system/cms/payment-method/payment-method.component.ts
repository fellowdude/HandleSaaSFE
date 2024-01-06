import { Component, HostListener, OnInit } from '@angular/core';
import { PaymentMethodService } from 'src/app/shared/service/payment-method.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../../components/header/header.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  listPaymentMethod: any;
  nameWindow: string;
  url_attachment: string;
  headerFixed = false;
  constructor(
    private _paymentMehodService: PaymentMethodService,
    private _middleService: MiddleService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.sendTitle('Pasarela de Pago');
    this.listPaymentMethod = [];
    this.nameWindow = 'Métodos de Pago';
    this.getListPayment();
  }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
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
  getListPayment() {
    this._middleService.sendLoading(true);
    this._paymentMehodService.getAllPaymentMethod().subscribe(
      (listPayment: any) => {
        this._middleService.sendLoading(false);
        this.url_attachment = listPayment.url_attachment;
        this.listPaymentMethod = listPayment.data;
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.nameWindow,
          error.error.message,
          'error'
        );
      }
    );
  }

  changeState(payment) {
    let continuePayment = true;
    if (!payment.active) {
      let activeMethod = 0;
      for (const method of this.listPaymentMethod) {
        if (method.active) {
          activeMethod++;
        }
      }
      if (activeMethod == 0) {
        continuePayment = false;
      }
    }

    if (continuePayment) {
      this._middleService.sendLoading(true);
      this._paymentMehodService
        .statePaymentMethod(payment._id, payment.active)
        .subscribe(
          updateInfo => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.nameWindow,
              'Se ha actualizado el estado de ' + payment.payment_method.name + ' correctamente',
              'ok'
            );

          },
          error => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.nameWindow,
              error.error.message,
              'error'
            );
          }
        );
    } else {
      this.getListPayment();
      this._middleService.sendMessage(
        this.nameWindow,
        'Necesita tener activada por lo menos una pasarela de pagos',
        'error'
      );
    }
  }
}
