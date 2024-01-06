import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { RolService } from 'src/app/shared/service/rol.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { HeaderService } from '../../components/header/header.service';

@Component({
  selector: 'app-crud-role',
  templateUrl: './crud-role.component.html',
  styleUrls: ['./crud-role.component.scss']
})
export class CrudRoleComponent implements OnInit {
  roleForm: FormGroup;
  listFunctionality: Array<any>;
  idRole: string;
  headerFixed: boolean;
  namePage: string;
  onlyBd: boolean;
  @ViewChild('dialogDelete', { static: true }) dialogConfirm: DialogConfirmComponent;
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private _roleService: RolService,
    private _middleService: MiddleService,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idRole = params.id;
    });

    this.roleForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1500)
      ]),
      functionalities: new FormControl(null)
    });
  }
  @HostListener('scroll', ['$event']) private onScroll($event: Event): void {
    $event.srcElement.addEventListener('scroll', this.scrollEvent, true);
  }
  ngOnInit() {
    this.headerService.sendTitle('Roles');
    this.listFunctionality = [];
    this.namePage = 'Roles';
    this.headerFixed = false;
    this.getRol();
    this.onlyBd = false;
  }

  get f() {
    return this.roleForm.controls;
  }

  getRol() {
    this._middleService.sendLoading(true);
    if (this.idRole) {
      this._roleService.getOne(this.idRole).subscribe(
        (listRole: any) => {

          this.onlyBd = listRole.onlybd;
          this.roleForm.get('name').setValue(listRole.name);
          this.roleForm.get('description').setValue(listRole.description);
          this.listFunctionality = listRole.functionalities;
          this._middleService.sendLoading(false);
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
      this._roleService.getRole().subscribe(
        (listFunctionality: any) => {
          this.listFunctionality = listFunctionality;
          this._middleService.sendLoading(false);
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
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show('Eliminar Rol', '¿Esta seguro de eliminar?');
  }

  deletItem() {
    this._middleService.sendLoading(true);
    this._roleService.deleteOne(this.idRole).subscribe(
      deleteInfo => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.namePage,
          'Se elimino el rol correctamente',
          'ok'
        );
        this.returnRole();
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

  saveRole() {
    if (!this.roleForm.invalid) {
      this._middleService.sendLoading(true);
      this.roleForm.get('functionalities').setValue(this.listFunctionality);
      if (this.idRole) {
        this._roleService
          .updateRole(this.idRole, this.roleForm.value)
          .subscribe(
            (updateIfnfo: any) => {
              this._middleService.sendLoading(false);

              this._middleService.sendMessage(
                this.namePage,
                'Se actualizo el rol correctamente',
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
        this._roleService.saveRole(this.roleForm.value).subscribe(
          (infoSave: any) => {
            this.router.navigate(['/system/role/detail/' + infoSave.idRole]);
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.namePage,
              'El rol ha sido ceado correctamente',
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
        this.namePage,
        'Debe completar todos los campos obligatorios',
        'error'
      );
    }
  }


  returnRole() {
    this.router.navigate(['/system/role']);
  }
}
