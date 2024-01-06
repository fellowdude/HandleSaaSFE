import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';
import * as KJUR from 'jsrsasign';
import { Constants } from 'src/app/utils/constants';
import { MiddleService } from 'src/app/shared/service/middle.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm: FormGroup;
  key: string;
  submitted = false;
  showValidEmail = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private middleService: MiddleService
  ) {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.key = params.key;
      }
    );
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  get f() { return this.resetPasswordForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.key) {
      if (!this.resetPasswordForm.invalid) {
        const oHeader = { alg: 'RS256', typ: 'JWT' };
        // Payload
        const oPayload: any = {};
        oPayload.email = this.resetPasswordForm.value.email;
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);
        this.middleService.sendLoading(true);
        this.loginService.passwordReset(this.key, { jwt: sJWT }).subscribe((result: any) => {
          this.resetPasswordForm.reset();
          this.submitted = false;
          this.showValidEmail = true;
          this.middleService.sendMessage(
            "Recuperar contraseña",
            "Se ha enviado un enlace al correo ingresado para reestablecer su contraseña.",
            "ok"
          );
          this.middleService.sendLoading(false);
        }, (error) => {
          if (error.status == 401) {
            this.middleService.sendMessage('Recuperar contraseña', 'Por favor ingrese nuevamente desde la página de ventas.', 'error');
          }
          if (error.status == 404) {
            this.middleService.sendMessage('Recuperar contraseña', error.error.message, 'error');
          }
          this.middleService.sendLoading(false);

        });
      }
    } else {
      this.middleService.sendMessage('Recuperar contraseña', 'Por favor ingrese nuevamente desde la página de ventas.', 'error');
    }
  }

  goReturn() {
    if (this.key) {
      this.router.navigate(['/public/login/' + this.key]);
    } else {
      this.middleService.sendMessage('Inicio de sesión', 'Por favor ingrese nuevamente desde la página de ventas.', 'error');
    }
  }

}
