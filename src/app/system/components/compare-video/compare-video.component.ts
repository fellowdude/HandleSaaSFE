import { Component, OnInit, Input } from "@angular/core";
interface ICompareVideo {
  arrayActually: Array<string>;
  arrayChange: Array<string>;
}
@Component({
  selector: "app-compare-video",
  templateUrl: "./compare-video.component.html",
  styleUrls: ["./compare-video.component.scss"]
})
export class CompareVideoComponent implements OnInit {
  @Input() config: ICompareVideo;
  constructor() {
    this.config = {
      arrayActually: [],
      arrayChange: []
    };
  }

  ngOnInit() {}
}
