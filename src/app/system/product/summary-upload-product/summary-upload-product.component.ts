import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-summary-upload-product',
  templateUrl: './summary-upload-product.component.html',
  styleUrls: ['./summary-upload-product.component.scss']
})
export class SummaryUploadProductComponent implements OnInit {
  @Input() listProduts: Array<any>;
  @Input() supplierInfo: any;
  @Input() summary: any;
  @Output() answerContinue = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    if (!this.listProduts) {
      this.listProduts = [];
    }
  }

  closeSummary() {
    this.answerContinue.emit({ continue: false })
  }
  goNext() {
    this.answerContinue.emit({ continue: true })
  }

}
