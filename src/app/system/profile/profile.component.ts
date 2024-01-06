import { Component, OnInit, HostListener } from "@angular/core";
import { UserService } from "src/app/shared/service/user.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Constants } from "src/app/utils/constants";
import * as KJUR from "jsrsasign";
import { HeaderService } from "../components/header/header.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  namePage: string;
  submittedPassword: boolean;
  headerFixed: boolean;
  constructor(
    private _userService: UserService,
    private _middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.namePage = "Perfil";
    this.submittedPassword = false;
  }

  @HostListener("scroll", ["$event"]) private onScroll($event: Event): void {
    $event.srcElement.addEventListener("scroll", this.scrollEvent, true);
  }
  ngOnInit() {
    this.headerFixed = false;
    this.headerService.sendTitle("Perfil");
    this.profileForm = new FormGroup({
      dni: new FormControl(null, [Validators.required]),
      last_name_father: new FormControl(null, [Validators.required]),
      last_name_mother: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      number_document: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),

    });
    this.passwordForm = new FormGroup({
      old_password: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      valid_password: new FormControl(null, [Validators.required]),
    });
    this.getInfo();
  }

  get f() {
    return this.profileForm.controls;
  }
  get g() {
    return this.passwordForm.controls;
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  getInfo() {
    this._userService.getBasicInfo().subscribe(
      (infoProfile: any) => {

        this.profileForm.patchValue(infoProfile.additionals);
        this.profileForm.get("email").setValue(infoProfile.email);
        //  this.profileForm.get("role").setValue(infoProfile.listRole[0]); se leimino porque provocaba error
      },
      (error) => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          "error"
        );
      }
    );
  }

  changePassword() {
    this.submittedPassword = true;
    if (this.passwordForm.invalid) {
      this._middleService.sendMessage(
        this.namePage,
        "Por favor ingrese todos los campos solicitados",
        "error"
      );
    } else {
      if (
        this.passwordForm.get("password").value ==
        this.passwordForm.get("valid_password").value
      ) {
        const oHeader = { alg: "RS256", typ: "JWT" };
        // Payload
        const oPayload: any = {};
        oPayload.old_password = this.passwordForm.value.old_password;
        oPayload.new_password = this.passwordForm.value.password;
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const sJWT = KJUR.jws.JWS.sign(
          "RS256",
          sHeader,
          sPayload,
          Constants.FRONT_KEY
        );
        this._middleService.sendLoading(true);
        this._userService.changePassword({ jwt: sJWT }).subscribe(
          (changePass) => {
            this._middleService.sendLoading(false);
            this.submittedPassword = false;
            this.passwordForm.reset();
            this._middleService.sendMessage(
              this.namePage,
              "La contraseña ha actualizada correctamente",
              "ok"
            );
          },
          (error) => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.namePage,
              error.error.message,
              "error"
            );
          }
        );
      } else {
        this._middleService.sendMessage(
          this.namePage,
          "La confirmación de la nueva contraseña no es válida",
          "error"
        );
      }
    }
  }

  saveProfile() {

    if (!this.profileForm.invalid) {
      this._middleService.sendLoading(true);
      this._userService.updateProfileUser(this.profileForm.value).subscribe(
        (updateInfo) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            this.namePage,
            "Perfil actualizado correctamente",
            "ok"
          );
        },
        (error) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            this.namePage,
            error.error.message,
            "error"
          );
        }
      );
    } else {
      this._middleService.sendMessage(
        this.namePage,
        "Complete todos los campos obligatorios",
        "error"
      );
    }
  }
  returnBack() {
    history.back();
  }
}
