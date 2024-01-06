import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "src/app/shared/service/login.service";
import * as KJUR from "jsrsasign";
import { Constants } from "src/app/utils/constants";
import { MiddleService } from "src/app/shared/service/middle.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  key: string;
  submitted = false;
  saved_user: string = "";
  checked_user: Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private middleService: MiddleService,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.key = params.key;
    });
    this.saved_user = localStorage.getItem('user');
    if(this.saved_user) {
      this.checked_user = true;
    }
  }

  ngOnInit() {
    if (localStorage.getItem("urlAllowed")) {
      localStorage.removeItem("urlAllowed");
    }
    this.loginForm = new FormGroup({
      user: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      save_user: new FormControl()
    });
    this.loginForm.get('user').setValue(localStorage.getItem('user'))
    this.loginForm.get('save_user').setValue(this.checked_user);
    if (!this.key) {
      this.getValidEnterprise()
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  getValidEnterprise() {
    this.loginService.validKeyEnterprise().subscribe(
      (infoTokenKey: any) => {
        this.key = infoTokenKey.token
      }, (error) => {
        this.middleService.sendMessage('Login', error.error.message, 'error')
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    if (this.key) {
      if (!this.loginForm.invalid) {
        const oHeader = { alg: "RS256", typ: "JWT" };
        // Payload
        const oPayload: any = {};
        oPayload.user = this.loginForm.value.user;
        oPayload.password = this.loginForm.value.password;
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const sJWT = KJUR.jws.JWS.sign(
          "RS256",
          sHeader,
          sPayload,
          Constants.FRONT_KEY
        );
        this.middleService.sendLoading(true);
        this.loginService.create(this.key, { jwt: sJWT }).subscribe(
          (result: any) => {
            localStorage.setItem("jwt", result.jwt);
            localStorage.setItem("url_attachment", result.url_attachment);
            localStorage.setItem("key_enterprise", this.key);
            if (result.restriction) {
              localStorage.setItem("restriction", result.restriction);
            }
            if(this.loginForm.value.save_user) {
              localStorage.setItem("user", oPayload.user)
            }else {
              localStorage.removeItem("user");
            }
            this.loginForm.reset();
            this.submitted = false;
            this.router.navigate(["/system"]);
          },
          (error) => {
            if (error.status == 401) {
              this.middleService.sendLoading(false);
              this.middleService.sendMessage(
                "Inicio de sesión incorrecto",
                "Por favor ingrese nuevamente desde la página de ventas",
                "error"
              );
            } else {
              this.middleService.sendLoading(false);
              this.middleService.sendMessage(
                "Inicio de sesión incorrecto",
                error.error.message,
                "error"
              );
            }
          }
        );
      }
    } else {
      this.middleService.sendMessage(
        "Inicio de sesión",
        "Por favor ingrese nuevamente desde la página de ventas",
        "error"
      );
    }
  }

  goRecovery() {
    if (this.key) {
      this.router.navigate(["/public/password-reset/" + this.key]);
    } else {
      this.middleService.sendMessage(
        "Inicio de sesión",
        "Por favor ingrese nuevamente desde la página de ventas",
        "error"
      );
    }
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }
}
