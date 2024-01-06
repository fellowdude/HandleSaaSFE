import { Router } from "@angular/router";
import { GridComponent } from "src/app/system/components/grid/grid.component";
import { DialogConfirmComponent } from "src/app/system/components/dialog-confirm/dialog-confirm.component";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-rules-admin",
  templateUrl: "./rules-admin.component.html",
  styleUrls: ["./rules-admin.component.scss"]
})
export class RulesAdminComponent implements OnInit {
  @ViewChild(DialogConfirmComponent, { static: false })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    this.gridList.columns = [
      {
        field: "name",
        title: "Regla de descuento",
        type: "text"
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/rules-admin/search";
    this.gridList.config.deleteService = "/rules-admin";
    this.gridList.config.redirect = "system/rules-admin/detail/";
    this.gridList.config.entity = "Administrador de reglas de descuento";
  }

  createRulesAdmin() {
    this.router.navigate(["/system/rules-admin/new"]);
  }
}
