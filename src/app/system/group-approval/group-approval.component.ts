import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-group-approval',
  templateUrl: './group-approval.component.html',
  styleUrls: ['./group-approval.component.scss']
})
export class GroupApprovalComponent implements OnInit {
  headerFixed = false;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  constructor(
    private router: Router,
    private headerService: HeaderService
  ) { }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  ngOnInit() {
    this.headerService.sendTitle('Grupos de Aprobación');
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Grupo',
        type: 'text'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/group-approval/search';
    this.gridList.config.deleteService = '/group-approval';
    this.gridList.config.redirect = 'system/group-approval/detail/';
    this.gridList.config.entity = 'Grupo de Aprobación';
    this.gridList.config.entityFilter = 'group_approve';
    this.gridList.config.deleteMessage =
      'El grupo de categoría ha sido eliminado correctamente';
  }

  createGroup() {
    this.router.navigate(['/system/group-approval/new']);
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
