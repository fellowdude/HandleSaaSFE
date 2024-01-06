import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/shared/service/user.service";
import { Router } from "@angular/router";
import { GridComponent } from "../components/grid/grid.component";
import { HeaderService } from "../components/header/header.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private router: Router,
    private headerService: HeaderService
  ) {}
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  ngOnInit() {
    this.headerService.sendTitle("Usuarios");
    this.gridList.columns = [
      {
        field: "additionals.name",
        title: "Nombre",
        type: "text"
      },
      {
        field: "additionals.last_name_father",
        title: "Apellido Paterno",
        type: "text"
      },
      {
        field: "additionals.last_name_mother",
        title: "Apellido Materno",
        type: "text"
      },
      {
        field: "email",
        title: "Correo",
        type: "text"
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/user/list-user-admin";
    this.gridList.config.deleteService = "/user";
    this.gridList.config.redirect = "system/user/detail/";
    this.gridList.config.entity = "Usuario";
    this.gridList.config.entityFilter = 'user';
    this.gridList.config.deleteMessage = "El usuario ha sido eliminado correctamente";
  }

  createUser() {
    this.router.navigate(["/system/user/new"]);
  }
}
