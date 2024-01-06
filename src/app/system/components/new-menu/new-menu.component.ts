import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { UserService } from "src/app/shared/service/user.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/shared/service/login.service";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss'],
  animations: [
    trigger("asideWrapperAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("200ms", style({ opacity: 0 })),
      ]),
    ]),
    trigger("asideAnimation", [
      transition(":enter", [
        style({ transform: "translateX(-255px)", opacity: 0 }),
        animate("200ms", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
      transition(":leave", [
        style({ transform: "translateX(0)", opacity: 1 }),
        animate(
          "200ms",
          style({ transform: "translateX(-255px)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class NewMenuComponent implements OnInit, OnDestroy {

  dataUser: any;
  menuSubscription: Subscription;
  open = false;
  enterpriseLogo: string;

  constructor(
    private userService: UserService,
    private _loginService: LoginService,
    private router: Router,
    private middleService: MiddleService
  ) { 
    this.menuSubscription = this.middleService
    .getMenuInfo()
    .subscribe((notification) => {
      if (notification.action == "sendChangeMenu") {
        this.closeItemsMenu();
      }
      if (notification.action == "closeMenu") {
        this.closeMenu();
      }
      if (notification.action == "openMenu") {
        this.openMenu();
      }
    });
  }

  ngOnInit() {
    this.userService.enterpriseLogo().subscribe((response: any) => {
      this.enterpriseLogo = response.url_attachment + response.logo;
    });
    this.userService.getBasicInfo().subscribe(
      (dataUser: any) => {
        this.middleService.sendHeader(dataUser.additionals.name);
        this.dataUser = dataUser;
        this.cleanVisible(dataUser.listMenu);
        this.createArrayFuntionalities(dataUser.listMenu);
      },
      (error) => {
        if (error.error.close_session) {
          this.router.navigate(["/public"]);
        }
      }
    );
  }

  cleanVisible(funtionalities) {
    for (let moduleFunct of funtionalities) {
      const arrayDelete = [];
      for (let i = 0; i < moduleFunct.functionalities.length; i++) {
        if (!moduleFunct.functionalities[i].visible) {
          arrayDelete.push(i);
        }
      }
      if (arrayDelete.length > 0) {
        for (const deleteFunct of arrayDelete) {
          moduleFunct.functionalities.splice(deleteFunct, 1);
        }
      }
    }
  }
  createArrayFuntionalities(funtionalities) {
    localStorage.setItem(
      "urlAllowedOperations",
      btoa(JSON.stringify(funtionalities))
    );
    const arrayFunctionality: Array<string> = [];
    const arrayFunctionalityGeneral: Array<string> = [];
    for (let moduleFunct of funtionalities) {
      for (let funtionality of moduleFunct.functionalities) {
        arrayFunctionality.push(funtionality.url);
        arrayFunctionalityGeneral.push(funtionality);
      }
    }
    localStorage.setItem(
      "urlAllowed",
      btoa(JSON.stringify(arrayFunctionality))
    );

    localStorage.setItem(
      "urlAllowedGeneral",
      btoa(JSON.stringify(arrayFunctionalityGeneral))
    );
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  changeNav(position) {
    this.dataUser.listMenu.forEach((element, index) => {
      if (index != position) {
        element.open = false;
      }
    });
    this.dataUser.listMenu[position].open = !this.dataUser.listMenu[position]
      .open;
  }

  changeStateMenu() {
    this.middleService.sendChangeMenu();
  }

  closeItemsMenu() {
    if (this.dataUser) {
      for (const menu of this.dataUser.listMenu) {
        menu.open = false;
      }
    }
  }

  closeSesion() {
    this._loginService.closeSession().subscribe((dataMessage) => {
      this.router.navigate([
        "/public/login/" + localStorage.getItem("key_enterprise"),
      ]);
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  goWindow(url) {
    this.middleService.sendHeaderIcon();
    sessionStorage.clear()
    this.router.navigate(["/system" + url]);
    this.closeMenu();
  }

  closeMenu() {
    this.open = false;
  }
  
  openMenu() {
    this.open = true;
  }

  enterSideBar(e) {
    this.openMenu()
  }

  exitSideBar(e) {
    this.closeMenu()
  }

}
