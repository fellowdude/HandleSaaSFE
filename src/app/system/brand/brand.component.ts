import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { DialogConfirmComponent } from "../components/dialog-confirm/dialog-confirm.component";
import { GridComponent } from "../components/grid/grid.component";
import { HeaderService } from "../components/header/header.service";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.scss"]
})
export class BrandComponent implements OnInit {
  @ViewChild(DialogConfirmComponent, { static: false })
  dialogConfirm: DialogConfirmComponent;
  headerFixed: boolean;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  isSupplier: boolean;
  constructor(private router: Router, private headerService: HeaderService) {
    this.isSupplier = true;
  }

  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    localStorage.removeItem("returnListRequest");
    this.headerService.sendTitle("Marcas");
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: "name",
        title: "Marca",
        type: "text",
        align: 'left'
      },
      {
        field: "create_date",
        title: "Fecha de creación",
        type: "date",
        align: "center"
      },
      {
        field: "update_date",
        title: "Fecha de modificación",
        type: "date",
        align: "center"
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/brand/search";

    this.gridList.config.redirect = "system/brand/detail/";
    this.gridList.config.entity = "Marca";
    this.gridList.config.entityFilter = 'brand';
    this.gridList.config.returnField = ["isSupplier"];
  }

  createBrand() {
    this.router.navigate(["/system/brand/new"]);
  }

  fieldReturn(event) {
    if (!event.isSupplier) {
      this.gridList.config.deleteService = "/brand";
    }
    this.isSupplier = event.isSupplier;
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
