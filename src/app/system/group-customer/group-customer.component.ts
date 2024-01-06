import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-group-customer',
  templateUrl: './group-customer.component.html',
  styleUrls: ['./group-customer.component.scss']
})
export class GroupCustomerComponent implements OnInit {
  @ViewChild('gridList', { static: true }) gridList: GridComponent;

  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.sendTitle('Grupo de Clientes');
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Nombre',
        type: 'text'
      },
      {
        field: 'create_date',
        title: 'Fecha de creación',
        type: 'date'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/group-customer/search';
    this.gridList.config.deleteService = '/group-customer';
    this.gridList.config.redirect = 'system/group-customer/detail/';
    this.gridList.config.entity = 'Grupo de clientes';
    this.gridList.config.deleteMessage =
      'El grupo de clientes ha sido eliminado correctamente';
  }

  createGroup() {
    this.router.navigate(['/system/group-customer/new']);
  }

}
