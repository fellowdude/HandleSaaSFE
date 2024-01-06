import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activation-card',
  templateUrl: './activation-card.component.html',
  styleUrls: ['./activation-card.component.scss']
})
export class ActivationCardComponent implements OnInit {

  constructor() { }
  @Input() data;
  @Output() editData = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() changeActive = new EventEmitter();
  @Output() upLabelActive = new EventEmitter();
  @Output() downLabelActive = new EventEmitter();
  @Output() changePositionActive = new EventEmitter();

  ngOnInit() {

  }

  openActivationModal() {
    this.editData.emit({ activation: this.data.activation, index: this.data.index });
  }
  openDeleteModal() {
    this.deleteData.emit({ index: this.data.index });
  }

  upLabel(value, entity) {
    this.upLabelActive.emit({ value, entity });
  }

  downLabel(value, entity) {
    this.downLabelActive.emit({ value, entity });
  }
  changePositionBlur(value, newValue, element, event, entity) {
    if ((value + 1) != newValue) {
      const event = {
        key: 'Enter'
      }
      this.changePositionActive.emit({ value, newValue, element, event, entity });
    }
  }
  changePosition(value, newValue, element, event, entity) {
    this.changePositionActive.emit({ value, newValue, element, event, entity });
  }

}
