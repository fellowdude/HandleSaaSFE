import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-categories-filters',
  templateUrl: './categories-filters.component.html',
  styleUrls: ['./categories-filters.component.scss']
})
export class CategoriesFiltersComponent implements OnInit {
  headerFixed: boolean;
  constructor(
    private router: Router,
    private headerService: HeaderService
  ) { }
  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  ngOnInit() {
    this.headerService.sendTitle('Filtro de Categorías');
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Filtro',
        type: 'text'
      },
      {
        field: 'type',
        title: 'Tipo',
        type: 'text',
        align: 'center'
      },
      {
        field: 'unit',
        title: 'Unidad',
        type: 'text',
        align: 'center'
      },
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/category-filter/';
    this.gridList.config.deleteService = '/category-filter';
    this.gridList.config.redirect = 'system/categories-filters/detail/';
    this.gridList.config.entity = 'Filtro';
    this.gridList.config.entityFilter = 'fiter';
    this.gridList.config.deleteMessage='El filtro de categoría ha sido eliminado correctamente'

  }

  createFilter() {
    this.router.navigate(['system/categories-filters/new']);
  }

  scrollEvent = (event: any): void => {
    //const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

}
