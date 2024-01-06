import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-dialog-confirm",
  templateUrl: "./dialog-confirm.component.html",
  styleUrls: ["./dialog-confirm.component.scss"]
})
export class DialogConfirmComponent implements OnInit {
  showModal: boolean;
  private message: string;
  private subMessage: string;
  private tittle: string;
  private entity: string;
  private messageModal: boolean = false;
  @Input() RightButtonText;
  @Output() answerModal = new EventEmitter<any>();
  @Output() agreeAnswerModal = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  show(tittle, message, subMessage?, entity?, messageModal?) {
    this.showModal = true;
    this.message = message;
    this.subMessage = subMessage;
    this.tittle = tittle;
    this.entity = entity;
    this.messageModal = messageModal;
  }
  close() {
    this.showModal = false;
  }
  agree() {
    this.agreeAnswerModal.emit({ accept: true});
    this.showModal = false;
  }
  accept() {
    this.answerModal.emit({ accept: true, entity: this.entity });
    this.showModal = false;
  }
}
