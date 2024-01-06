import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-not-available',
  templateUrl: './payment-not-available.component.html',
  styleUrls: ['./payment-not-available.component.scss']
})
export class PaymentNotAvailableComponent implements OnInit {
  rejectedType: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.rejectedType = params.id;
    });
  }

  ngOnInit() {
  }

}
