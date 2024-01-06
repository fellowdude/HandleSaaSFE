import { Component, OnInit, Input } from "@angular/core";

interface Styles {
  selected: string;
  selectItems: string;
  selectStyle: string;
}

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
  @Input() items: any[];
  @Input() selectedItem: any;
  @Input() styles: Styles;
  @Input() regularDropDown: boolean;
  showItems: boolean = false;


  constructor() {}

  ngOnInit() {
    
  }

  toggleItems() {
    this.showItems = !this.showItems;
  }

  selectItem(item) {
    this.selectedItem = item;
    this.showItems = !this.showItems;
  }
}
