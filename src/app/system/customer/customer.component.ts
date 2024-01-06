import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { GridComponent } from "../components/grid/grid.component";
import { UserService } from "src/app/shared/service/user.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { HeaderService } from "../components/header/header.service";
import { UploadExcelComponent } from '../components/upload-excel/upload-excel.component';
import { CrudClientComponent } from "./crud-client/crud-client.component";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
  headerFixed: boolean;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  @ViewChild("exportExcel", { static: true })
  exportExcel: UploadExcelComponent;
  @ViewChild("crudClient", { static: true }) crudClient: CrudClientComponent

  constructor(
    private _userService: UserService,
    private _middleService: MiddleService,
    private headerService: HeaderService
  ) { }


  ngOnInit() {
    this.headerFixed = false;
    if (localStorage.getItem("dashboard")) {
      localStorage.removeItem("dashboard");
    }
    this.headerService.sendTitle("Clientes");
    this.gridList.actions = [
      {
        icon: "fas fa-lock",
        action: "block",
        fieldReturn: "_id",
        color: "#fd96b9",
        tooltip: "Bloquear Cliente",
        conditionShow: {
          field: "state",
          value: "H"
        }
      },
      {
        icon: "fas fa-unlock-alt",
        action: "unlock",
        color: "#3dd47a",
        fieldReturn: "_id",
        tooltip: "Desbloquear Cliente",
        conditionShow: {
          field: "state",
          value: "B"
        }
      }
    ];

    this.gridList.columns = [
      {
        field: "additionals.name",
        title: "Nombre",
        type: "text"
      },
      {
        field: "additionals.last_name_father",
        title: "Apellido Pat.",
        type: "text"
      },
      {
        field: "additionals.last_name_mother",
        title: "Apellido Mat.",
        type: "text"
      },
      {
        field: "additionals.number_card",
        title: "Num. Tarjeta",
        type: "text"
      },
      {
        field: "email",
        title: "Email",
        type: "text"
      },
      {
        field: "state",
        title: "Estado",
        type: "text",
        align: "center",
        replace: [
          {
            value: "H",
            replace: "Habilitado",
            type: "label",
            background: "#e8f5e9",
            color: "#3dd47a"
          },
          {
            value: "B",
            replace: "Bloqueado",
            type: "label",
            background: "#fce4ec",
            color: "#fd96b9"
          }
        ]
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/user/list-customer";
    this.gridList.config.entity = "Usuario";
    this.gridList.config.entityFilter = 'customer';
    this.gridList.config.redirect = "system/customer/detail/";
    // comentado por falta de miguel Lopez 
    this.gridList.config.deleteService = "/user/customer";

    let date = new Date().toISOString().substring(0, 10);

    this.exportExcel.config = {
      title: "Exportar clientes",
      apiDownload: "/user/template",
      fileDownloadName: "Clientes por rango de fecha" + date + ".xlsx",
      buttonLabelDownload: "Exportar"
    };
  }

  exportClients() {
    this.exportExcel.open();
  }

  newClient() {
    this.crudClient.open()
  }

  sendAnswer(event) {
    console.log(event)
    if (event.created) {
      this.gridList.getInfo()
    }
  }
  actionAnswer(event) {
    switch (event.action) {
      case "block": {
        this._middleService.sendLoading(true);
        this._userService.blockUser(event.field).subscribe(infoBlock => {
          this.gridList.getInfo();
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Cliente",
            "El cliente ha sido bloqueado.",
            "ok"
          );
        }),
          error => {
            this._middleService.sendMessage(
              "Cliente",
              error.error.message,
              "error"
            );
          };
        break;
      }
      case "unlock": {
        this._middleService.sendLoading(true);
        this._userService.unlockUser(event.field).subscribe(infounlock => {
          this.gridList.getInfo();
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Cliente",
            "El cliente ha sido habilitado.",
            "ok"
          );
        }),
          error => {
            this._middleService.sendMessage(
              "Cliente",
              error.error.message,
              "error"
            );
          };
        break;
      }
    }
  }

}
