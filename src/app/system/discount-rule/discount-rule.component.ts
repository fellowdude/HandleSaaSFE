import { DialogConfirmComponent } from "./../components/dialog-confirm/dialog-confirm.component";
import { Router } from "@angular/router";
import { GridComponent } from "./../components/grid/grid.component";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-discount-rule",
  templateUrl: "./discount-rule.component.html",
  styleUrls: ["./discount-rule.component.scss"]
})
export class DiscountRuleComponent implements OnInit {
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
      },
      {
        field: "tipo.value",
        title: "Tipo",
        type: "text"
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/rdd/all";
    this.gridList.config.deleteService = "/rdd";
    this.gridList.config.redirect = "system/discount-rule/detail/";
    this.gridList.config.entity = "Regla de descuento";
  }

  createDiscountRule() {
    this.router.navigate(["/system/discount-rule/new"]);
  }
}
