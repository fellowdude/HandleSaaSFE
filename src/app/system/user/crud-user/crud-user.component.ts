import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RolService } from 'src/app/shared/service/rol.service';
import { UserService } from 'src/app/shared/service/user.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { Location } from '@angular/common';
import { HeaderService } from '../../components/header/header.service';
import { UtilsCode } from '../../../utils/utilsCode';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss']
})
export class CrudUserComponent implements OnInit {
  userForm: FormGroup;
  listRole: any;
  dataUser: object;
  idUser: any;
  headerFixed: boolean;
  namePage: string;
  isSupplier: boolean;
  submitted: boolean;
  @ViewChild('deleteUser', { static: true })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private _roleService: RolService,
    private _userService: UserService,
    private _middleService: MiddleService,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idUser = params.id;
    });
  }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.submitted = false;
    this.headerService.sendTitle('Usuarios');
    this.namePage = 'Usuario';
    this.headerFixed = false;
    this.getRol();
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role_id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      last_name_father: new FormControl(null, [Validators.required]),
      last_name_mother: new FormControl(null, [Validators.required]),
      number_document: new FormControl(null, [Validators.required]),
      dni: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
    if (this.idUser) {
      this.getInfoUser();
    }
  }

  get f() {
    return this.userForm.controls;
  }

  validateInput(event: KeyboardEvent) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }


  getRol() {
    this._roleService.getListRole().subscribe(
      (listRole: Array<any>) => {
        const indexRole = listRole.findIndex(item => item.name == 'Proveedor');
        if (indexRole >= 0) {
          listRole.splice(indexRole, 1);
        }
        this.listRole = listRole;
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoUser() {
    this._middleService.sendLoading(true);
    this._userService.getDetailUser(this.idUser).subscribe(
      (infoUser: any) => {
        this.userForm.patchValue(infoUser.additionals);
        this.userForm.get('email').patchValue(infoUser.email);
        this.userForm.get('role_id').patchValue(infoUser.role_id);
        this._middleService.sendLoading(false);
        this.isSupplier = infoUser.isSupplier;
        // this.dataUser = infoUser;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  returnUser() {
    this.router.navigate(['/system/user']);
  }
  acceptModal($event) {
    if ($event.accept) {
      this.deleteUser();
    }
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show('Eliminar Usuario', '¿Esta seguro de eliminar?');
  }

  deleteUser() {
    this._middleService.sendLoading(true);
    this._userService.deleteUser(this.idUser).subscribe(
      data => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.namePage,
          'El usuario ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['/system/user']);
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  saveUser() {
    this.submitted = true;
    this.userForm
      .get('dni')
      .setValue(this.userForm.get('number_document').value);

    this.userForm.get('username').setValue(this.userForm.get('email').value);
    if (!this.userForm.invalid) {
      this._middleService.sendLoading(true);
      if (this.idUser) {
        this._userService
          .updateUser(this.userForm.value, this.idUser)
          .subscribe(
            (saveUser: any) => {
              this.submitted = false;
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                this.namePage,
                'El usuario ha sido actualizado correctamente',
                'ok'
              );
            },
            error => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                this.namePage,
                error.error.message,
                'error'
              );
            }
          );
      } else {
        this._userService.saveUser(this.userForm.value).subscribe(
          (saveUser: any) => {
            this.submitted = false;
            this.router.navigate(['/system/user/detail/' + saveUser.userId]);
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.namePage,
              'Usuario creado correctamente',
              'ok'
            );
          },
          error => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.namePage,
              error.error.message,
              'error'
            );
          }
        );
      }
    } else {
      this._middleService.sendMessage(
        'Usuario',
        'Revise los campos obligatorios',
        'error'
      );
    }
  }

  validatePhoneInput(event: KeyboardEvent) {
    UtilsCode.validatePhoneInput(event);
  }
}
