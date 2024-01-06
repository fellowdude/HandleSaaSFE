import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list-information",
  templateUrl: "./list-information.component.html",
  styleUrls: ["./list-information.component.scss"]
})
export class ListInformationComponent implements OnInit {
  detailGroupEmail: any;
  showPopupContact: boolean;
  constructor() {
    this.showPopupContact = false;
  }

  ngOnInit() {}

  open(detailInfo) {
    this.detailGroupEmail = detailInfo;
    this.showPopupContact = true;
  }

  close() {
    this.showPopupContact = false;
  }
}
