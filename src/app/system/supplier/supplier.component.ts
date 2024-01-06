import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { GridComponent } from "../components/grid/grid.component";
import { HeaderService } from "../components/header/header.service";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"]
})
export class SupplierComponent implements OnInit {
  supplierDelete: any;
  supplierSearchForm: FormGroup;
  headerFixed: boolean;
  dataSupplier: any;
  searchSupplier: string;
  pagNumber: any; // number page
  pagQuantity: any; // number items per pages
  totalPage: any;
  totalItems: any;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  constructor(private router: Router, private headerService: HeaderService) { }

  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle("Sellers");
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: "name",
        title: "Nombre",
        type: "text"
      },
      {
        field: "ruc",
        title: "RUC",
        type: "number"
      },
      {
        field: "entry",
        title: "Rubro",
        type: "text"
      },
      {
        field: "is_distribution_supplier",
        title: "Tipo",
        type: "boolean",
        align: "center",
        replace: [
          {
            value: true,
            replace: "Seller Delivery",
            type: "label",
            background: "#e8f5e9",
            color: "#3dd47a",
          },
          {
            value: false,
            replace: "Solo Seller",
            type: "label",
            background: "#fce4ec",
            color: "#fd96b9",
          },
        ],
      },
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/supplier/search";
    this.gridList.config.deleteService = "/supplier";
    this.gridList.config.redirect = "system/supplier/detail/";
    this.gridList.config.entity = "Seller";
    this.gridList.config.entityFilter = 'supplier';
    this.gridList.config.deleteMessage = "El seller ha sido eliminado correctamente";
  }

  createSupplier() {
    this.router.navigate(["/system/supplier/new"]);
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
