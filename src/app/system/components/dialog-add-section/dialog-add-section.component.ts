import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-dialog-add-section",
  templateUrl: "./dialog-add-section.component.html",
  styleUrls: ["./dialog-add-section.component.scss"]
})
export class DialogAddSectionComponent implements OnInit {
  dataStatic: any;
  showModalNewSection: boolean;
  @Input() config: any;
  @Output() getInfo: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    this.dataStatic = {};
    this.config = {};
    this.showModalNewSection = false;
  }

  createNewSection() {
    if (this.dataStatic.newSectionName) {
      this.getInfo.emit(this.dataStatic.newSectionName);
      this.closeModal();
    }
  }

  closeModal() {
    this.showModalNewSection = false;
  }

  openModal() {
    this.dataStatic.newSectionName = null;
    this.showModalNewSection = true;
  }
}
