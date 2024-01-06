import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as KJUR from 'jsrsasign';
import { Constants } from 'src/app/utils/constants';
import { LoginService } from 'src/app/shared/service/login.service';
import { MiddleService } from 'src/app/shared/service/middle.service';


@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: FormGroup;
  recaptchaForm: FormGroup;
  submitted = false;
  captchaValue = false;
  showChangePassword = false;
  jwt: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private middleService: MiddleService) {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.jwt = params.jwt;
      }
    );
    this.recoveryForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    });
    this.recaptchaForm = new FormGroup({
      recaptcha_reactive: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }
  get f() { return this.recoveryForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (!this.recoveryForm.invalid) {
      if (this.recoveryForm.value.password === this.recoveryForm.value.confirm_password) {
       // if (this.captchaValue) {
          const oHeader = { alg: 'RS256', typ: 'JWT' };
          // Payload
          const oPayload: any = {};
          oPayload.new_password = this.recoveryForm.value.password;
          const sHeader = JSON.stringify(oHeader);
          const sPayload = JSON.stringify(oPayload);
          const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);
          this.middleService.sendLoading(true);
          this.loginService.recoveryPassword(this.jwt, { jwt: sJWT }).subscribe((result: any) => {
            this.submitted = false;
            this.showChangePassword = true;
            this.recoveryForm.reset();
            this.middleService.sendMessage(
              "Recuperar contraseña",
              "Tu contraseña ha sido cambiada con éxito. Te estamos redirigiendo al login para que puedas iniciar sesión.",
              "ok"
            );
            this.middleService.sendLoading(false);
            setTimeout(() => {
              this.router.navigate(['/public/login/' + result.keyCompany]);
            }, 3000);
          }, (error) => {
            console.log(error);
          });
       /*  } else {
          this.middleService.sendMessage('Recuperar contraseña', 'Debe validar el captcha.', 'error');
        } */
      } else {
        this.middleService.sendMessage('Recuperar contraseña', 'La repetición de la contraseña es incorrect.', 'error');
      }
    }
  }


  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.captchaValue = true;
    } else {
      this.captchaValue = false;
    }
  }
}
