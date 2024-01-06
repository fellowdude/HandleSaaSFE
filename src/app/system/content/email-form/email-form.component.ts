import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '../../components/grid/grid.component';
import { HeaderService } from '../../components/header/header.service';
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  headerFixed = false;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  constructor(private router: Router, private headerService: HeaderService) { }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  ngOnInit() {
    this.headerService.sendTitle('Formularios de Email');
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Nombre',
        type: 'text'
      },
      {
        field: 'end_point',
        title: 'End Point',
        type: 'text'
      },
      {
        field: 'create_date',
        title: 'Fecha de creación',
        type: 'date',
        align: 'center'
      },
      {
        field: 'update_date',
        title: 'Fecha de modificación',
        type: 'date',
        align: 'center'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/email-form/search';
    this.gridList.config.deleteService = '/email-form';
    this.gridList.config.redirect = 'system/email-form/detail/';
    this.gridList.config.entity = 'Formulario de email';
    this.gridList.config.entityFilter = 'forms';
    this.gridList.config.deleteMessage =
      'El formulario de email ha sido eliminado correctamente';
  }

  createNewForm() {
    this.router.navigate(['/system/email-form/new']);
  }

  openEmailForm(dataEmailForm) {
    this.router.navigate(['/system/email-form/detail/' + dataEmailForm._id]);
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
