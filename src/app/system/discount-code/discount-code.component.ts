import { Router } from "@angular/router";
import { GridComponent } from "./../components/grid/grid.component";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { HeaderService } from "../components/header/header.service";

@Component({
  selector: "app-discount-code",
  templateUrl: "./discount-code.component.html",
  styleUrls: ["./discount-code.component.scss"]
})
export class DiscountCodeComponent implements OnInit {
  headerFixed: boolean;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  constructor(private router: Router, private headerService: HeaderService) {}

  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle("Códigos de Descuento");
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: "name",
        title: "Código de descuento",
        type: "text",
        align: 'center'
      },
      {
        field: "active",
        title: 'Activo',
        type: "boolean",
        align: 'center',
        replace: [
          {
            value: true,
            replace: 'Activo',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a',
          },
          {
            value: false,
            replace: 'No Activo',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
        ],
      },
      {
        field: "have_discount",
        title: 'Descuento Sobre Productos',
        type: "boolean",
        align: 'center',
        replace: [
          {
            value: true,
            replace: 'Sí',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a',
          },
          {
            value: false,
            replace: 'No',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
        ],
      },
      {
        field: "have_delivery_discount",
        title: 'Descuento Sobre Delivery',
        type: "boolean",
        align: 'center',
        replace: [
          {
            value: true,
            replace: 'Sí',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a',
          },
          {
            value: false,
            replace: 'No',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
        ],
      },
      {
        field: "create_date",
        title: "Fecha de Creación",
        type: "date",
        align: 'center'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/discount-code/search";
    this.gridList.config.deleteService = "/discount-code";
    this.gridList.config.redirect = "system/discount-code/detail";
    this.gridList.config.entity = "Código de descuento";
    this.gridList.config.entityFilter = 'code_desc';
    this.gridList.config.deleteMessage='El código de descuento ha sido eliminado correctamente'
  }
  createDiscountCode() {
    this.router.navigate(["/system/discount-code/new"]);
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
