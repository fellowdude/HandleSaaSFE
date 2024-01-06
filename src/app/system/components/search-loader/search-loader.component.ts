import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-loader',
  templateUrl: './search-loader.component.html',
  styleUrls: ['./search-loader.component.scss']
})
export class SearchLoaderComponent implements OnInit {
  @Input() visibility: string = "hidden";
  constructor() { }

  ngOnInit() {
  }

}
