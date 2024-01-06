import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GridComponent } from 'src/app/system/components/grid/grid.component';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/system/components/header/header.service';

@Component({
  selector: 'app-list-static-page',
  templateUrl: './list-static-page.component.html',
  styleUrls: ['./list-static-page.component.scss']
})
export class ListStaticPageComponent implements OnInit {
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  headerFixed = false;
  constructor(private router: Router, private headerService: HeaderService) { }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }
  ngOnInit() {
    this.headerService.sendTitle('Páginas Estáticas');
    this.gridList.columns = [
      {
        field: 'static_name',
        title: 'Nombre',
        type: 'text'
      },
      {
        field: 'api_rest_name',
        title: 'End point',
        type: 'text'
      },
      {
        field: 'create_date',
        title: 'Fecha de creación',
        type: 'date',
        align: 'center',
      },
      {
        field: 'update_date',
        title: 'Fecha de modificación',
        type: 'date',
        align: 'center',
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/static-page/search';
    this.gridList.config.deleteService = '/static-page';
    this.gridList.config.redirect = 'system/static-page/detail/';
    this.gridList.config.entity = 'Páginas estáticas';
    this.gridList.config.entityFilter = 'page_static';
  }

  createPage() {
    this.router.navigate(['/system/static-page/new']);
  }
}
