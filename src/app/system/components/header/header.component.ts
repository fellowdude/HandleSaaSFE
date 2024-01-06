import { Component, OnInit, OnDestroy } from "@angular/core";
import { MiddleService } from "src/app/shared/service/middle.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoginService } from "src/app/shared/service/login.service";
import { HeaderService } from "./header.service";
import { SupplierService } from "src/app/shared/service/supplier.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerSubscription: Subscription;
  headerIconSubscription: Subscription;
  headerServiceSubscription: Subscription;
  nameUser: string;
  showMenu = false;
  title: string;
  profileShow: boolean;
  idSupplier: string | null;
  supplierName: string | null;
  constructor(
    private middleService: MiddleService,
    private _loginService: LoginService,
    private router: Router,
    private headerService: HeaderService,
    private _supplierService: SupplierService
  ) {
    this.headerSubscription = this.middleService
      .getHeader()
      .subscribe(dataMessage => {
        this.changeInfoHeader(dataMessage);
      });

    this.headerIconSubscription = this.middleService
      .getHeaderIcon()
      .subscribe(dataMessage => {
        this.changeStateMenu();
      });

    this.headerServiceSubscription = this.headerService.headerListener.subscribe(
      (message: any) => {
        if (message.action == "setTitle") {
          this.title = message.title;
        }
      }
    );
  }

  ngOnInit() {
    this.profileShow = false;
    this.validIsSupplier();
  }

  goInitPage(){
    this.router.navigate(["/system"]);
  }

  ngOnDestroy() {
    this.headerSubscription.unsubscribe();
    this.headerIconSubscription.unsubscribe();
  }

  validIsSupplier() {
    this._supplierService.validIsSupplier().subscribe(
      (infoSupplier: any) => {
        if (infoSupplier.supplier) {
          this.supplierName = infoSupplier.supplier.name;
          this.idSupplier = infoSupplier.idSupplier;
        }
      }
    )
  }

  toogleProfile() {
    
    this.profileShow = !this.profileShow;
  }
  changeStateMenu() {
    this.showMenu = !this.showMenu;
    this.middleService.sendChangeMenu();
    //this.middleService.openMenu();
  }

  changeInfoHeader(dataMessage) {
    this.nameUser = dataMessage.name;
  }

  goSupplier() {
    this.router.navigate(['system/supplier/detail/' + this.idSupplier]);
    this.profileShow = false;
  }

  goProfile() {
    if (this.showMenu) {
      this.middleService.sendHeaderIcon();
    }
    this.router.navigate(["/system/profile"]);
  }

  closeSesion() {
    this._loginService.closeSession().subscribe(dataMessage => {
      this.router.navigate([
        "/public/login/" + localStorage.getItem("key_enterprise")
      ]);
      let user = localStorage.getItem('user')
      localStorage.clear();
      sessionStorage.clear();
      if(user) {
        localStorage.setItem('user', user);
      }
    });
  }
}
