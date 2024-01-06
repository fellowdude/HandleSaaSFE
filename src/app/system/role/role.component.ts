import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  headerFixed = false;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  constructor(private router: Router, private headerService: HeaderService) { }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  ngOnInit() {
    this.headerService.sendTitle('Roles');
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Rol',
        type: 'text'
      },
      {
        field: 'description',
        title: 'Descripción',
        type: 'text'
      },
      {
        field: 'create_date',
        title: 'Fecha de Creación',
        type: 'date',
        align: 'center'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/role/search';
    this.gridList.config.deleteService = '/role';
    this.gridList.config.redirect = 'system/role/detail/';
    this.gridList.config.entity = 'Rol';
    this.gridList.config.deleteMessage = 'El rol ha sido eliminado correctamente';
  }

  createRole() {
    this.router.navigate(['/system/role/new']);
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
}
