import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-group-email',
  templateUrl: './group-email.component.html',
  styleUrls: ['./group-email.component.scss']
})
export class GroupEmailComponent implements OnInit {
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.sendTitle('Grupo de Contactos');
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
    this.gridList.config.getService = '/group-email/search';
    this.gridList.config.deleteService = '/group-email';
    this.gridList.config.redirect = 'system/group-email/detail/';
    this.gridList.config.entity = 'Grupo de contacto';
    this.gridList.config.deleteMessage =
      'El grupo de contacto ha sido eliminado correctamente';
  }

  createGroup() {
    this.router.navigate(['/system/group-email/new']);
  }
}
