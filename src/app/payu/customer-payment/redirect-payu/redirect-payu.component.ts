import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import * as KJUR from "jsrsasign";
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-redirect-payu',
  templateUrl: './redirect-payu.component.html',
  styleUrls: ['./redirect-payu.component.scss']
})
export class RedirectPayuComponent implements OnInit {
  orderId: string;
  subscriptions: Array<Subscription>;
  url: string;
  is_loaded: boolean = false;

  payment: payment = {
    merchantId: null,
    accountId: null,
    description: '',
    referenceCode: '',
    amount: null,
    /* tax: null,
    taxReturnBase: null, */
    currency: '',
    signature: '',
    test: null, // 1 para test
    buyerEmail: '',

    responseUrl: '',
    confirmationUrl: '',
    /* iin: '', */
  };

  @ViewChild('paymentFormNative', { static: false }) paymentFormNative;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private middleService: MiddleService) {
    this.is_loaded = false;
    this.subscriptions = new Array<Subscription>();
    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params.id);
      this.orderId = params.id;
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.router.events.subscribe(
      (change) => {
        if (change instanceof NavigationEnd) {
          this.orderId = this.activatedRoute.snapshot.params["id"];
        }
      }
    ));
    this.getInfoInit();
  }

  getInfoInit() {
    this.middleService.sendLoading(true);
    this.getPaymentData();
    if (this.is_loaded) {
      setTimeout(() => {
        /* this.middleService.sendLoading(false); */
        this.autoSubmit();
      }, 0);
    }
  }

  separate(longString, parts) {
    const numString = Math.ceil(longString.length / parts)
    const chunks = new Array(numString)
  
    for (let i = 0, o = 0; i < numString; ++i, o += parts) {
      chunks[i] = longString.substr(o, parts)
    }
  
    return chunks
  }

  getPaymentData() {
    const publicKey = Constants.PAYU_KEY;
    const data: any = KJUR.jws.JWS.verify(this.orderId, publicKey);
    console.log(data);
    if (data) {
      const dataDecoded = this.parseJwt(this.orderId);
      this.url = dataDecoded.url;
      this.payment = dataDecoded.payment;
      if(dataDecoded.payment.inn) {
        this.payment.iin = dataDecoded.payment.inn
      }
      if(dataDecoded.payment.extra1) {
        let extra: any;
        extra = this.separate(dataDecoded.payment.extra1, Math.ceil(dataDecoded.payment.extra1.length/3))
        this.payment.extra1 = extra[0]
        this.payment.extra2 = extra[1]
        this.payment.extra3 = extra[2]
      }
      this.is_loaded = true;
    }
    console.log(this.payment);
  }

  autoSubmit(): void {
    this.paymentFormNative.nativeElement.submit();
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}

interface payment {
  merchantId: number;
  accountId: number;
  description: string;
  referenceCode: string;
  amount: number;
  currency: string;
  signature: string;
  test: number;
  buyerEmail: string;
  responseUrl: string;
  confirmationUrl: string;
  tax?: number;
  taxReturnBase?: number;
  iin?: string;
  extra1?: string;
  extra2?: string;
  extra3?: string;
}
