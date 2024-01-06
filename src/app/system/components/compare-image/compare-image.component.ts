import { Component, OnInit, Input } from "@angular/core";

interface ICompareImage {
  arrayActually: Array<string>;
  arrayChange: Array<string>;
}
@Component({
  selector: "app-compare-image",
  templateUrl: "./compare-image.component.html",
  styleUrls: ["./compare-image.component.scss"]
})
export class CompareImageComponent implements OnInit {
  @Input() config: ICompareImage;
  url_attachment: string;
  constructor() {
    this.config = {
      arrayActually: [],
      arrayChange: []
    };
  }

  ngOnInit() {
    this.url_attachment = localStorage.getItem("url_attachment");
  }
}
