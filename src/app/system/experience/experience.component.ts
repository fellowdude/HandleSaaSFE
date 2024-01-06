import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  editMode: Boolean;
  headerFixed: boolean;
  constructor(
    private router: Router,
    private headerService: HeaderService
  ) {
    this.editMode = false;
  }

  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle('Experiencias');
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: "image_cover",
        title: "Imagen",
        type: "image",
        align: "center",
        width: '70px'
      },
      {
        field: 'name',
        title: 'Experiencia',
        type: 'text',
        fontWeight: "bolder",
        align: "left",
      },
      {
        field: "active",
        title: "Visibilidad",
        type: "boolean",
        align: "center",
        replace: [
          {
            value: true,
            replace: "Visible",
            type: "label",
            background: "#e8f5e9",
            color: "#3dd47a",
          },
          {
            value: false,
            replace: "No Visible",
            type: "label",
            background: "#fce4ec",
            color: "#fd96b9",
          },
        ],
        changeBoolean: {
          url: '/experience/change-active',
          urlType: 'dinamic',
          fieldDinamic: '_id'
        }
      },
    ]
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/experience/customSearch';
    this.gridList.config.deleteService = '/experience';
    this.gridList.config.redirect = 'system/experience/detail/';
    this.gridList.config.entity = 'Experiencia';
    this.gridList.config.entityFilter = 'experience';
  }

  createExperience() {
    this.router.navigate(['/system/experience/new']);
  }

  changeBooleanField(field, value) {
    this.gridList.changeBooleanField(field, value)
  }

  changeEditMode() {
    this.editMode = !this.editMode;
    this.changeBooleanField('active', this.editMode)
    if (this.editMode) {
      /* this.gridList.actions = [
        {
          icon: "fas fa-folder-download",
          color: "#777",
          action: "archive",
          fieldReturn: "_id",
          tooltip: "Archivar Producto",
          conditionShow: {
            field: "archive",
            value: false,
          },
        },
      ]; */
      this.headerService.sendTitle("Experiencias (Modo Edición)");
    } else {
      this.headerService.sendTitle("Experiencias");
      this.gridList.actions = [];
    }
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
