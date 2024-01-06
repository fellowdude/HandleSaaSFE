import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GridComponent } from '../../components/grid/grid.component';
import { GroupApprovalService } from 'src/app/shared/service/group-approval.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../../components/header/header.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-crud-group-approval',
  templateUrl: './crud-group-approval.component.html',
  styleUrls: ['./crud-group-approval.component.scss']
})
export class CrudGroupApprovalComponent implements OnInit {
  headerFixed: boolean;
  idGroup: boolean;
  groupForm: FormGroup;
  namePage: string;
  submitted: boolean;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _groupApprovalService: GroupApprovalService,
    private _middleService: MiddleService,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idGroup = params.id;
    });
  }

  @ViewChild(DialogConfirmComponent, { static: true })
  dialogConfirm: DialogConfirmComponent;

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle('Grupos de Aprobación');
    this.submitted = false;
    this.headerFixed = false;
    this.namePage = 'Grupos de aprobación';
    this.groupForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      approval_amount: new FormControl(null, [Validators.required]),
      approval_user: new FormControl(null, [Validators.required])
    });

    this.gridList.columns = [
      {
        field: 'additionals.name',
        title: 'Nombre',
        type: 'text'
      },
      {
        field: 'additionals.last_name_father',
        title: 'Apellido Paterno',
        type: 'text'
      },
      {
        field: 'additionals.last_name_mother',
        title: 'Apellido Materno',
        type: 'text'
      },
      {
        field: 'email',
        title: 'Correo',
        type: 'text'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/user/list-user-admin';
    this.gridList.config.entity = 'Usuario';
    this.gridList.config.select = true;
    this.gridList.config.listItemSelect = [];
    if (this.idGroup) {
      this.getInfo();
    }
  }
  get f() {
    return this.groupForm.controls;
  }

  OpenModalDeleteConfirm() {
    const messageModal = '¿Esta seguro de eliminar?';
    this.dialogConfirm.show('Eliminar grupo de aprobación', messageModal);
  }

  acceptModal($event) {
    if ($event.accept) {
      this._middleService.sendLoading(true);
      this._groupApprovalService.delete(this.idGroup).subscribe(
        deleteInfo => {
          this._middleService.sendLoading(false);
          this.router.navigate(['/system/group-approval']);
          this._middleService.sendMessage(
            this.namePage,
            'El grupo de aprobación ha sido eliminado correctamente',
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
  }

  getInfo() {
    this._groupApprovalService.getById(this.idGroup).subscribe(
      (infoGroup: any) => {
        this.groupForm.patchValue(infoGroup);
        this.gridList.config.listItemSelect = infoGroup.approval_user;
        this.gridList.updateSelectItem();
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

  itemSelecReturn(listItem) {
    this.groupForm.get('approval_user').setValue(listItem);
  }

  returnGroups() {
    this.router.navigate(['/system/group-approval']);
  }
  saveGroup() {
    this.submitted = true;
    if (!this.groupForm.invalid) {
      this._middleService.sendLoading(true);
      if (this.groupForm.get('approval_amount').value > 0) {
        if (this.groupForm.get('approval_user').value.length > 0) {
          if (this.idGroup) {
            this._groupApprovalService
              .update(this.idGroup, this.groupForm.value)
              .subscribe(
                updateGroup => {
                  this._middleService.sendLoading(false);
                  this._middleService.sendMessage(
                    this.namePage,
                    'El grupo de aprobación ha sido actualizado correctamente',
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
            this._groupApprovalService.save(this.groupForm.value).subscribe(
              (createGroup: any) => {
                this.router.navigate([
                  '/system/group-approval/detail/' + createGroup.idCreated
                ]);
                this._middleService.sendLoading(false);
                this._middleService.sendMessage(
                  this.namePage,
                  'El grupo de aprobación ha sido creado correctamente',
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
            'Debes seleccionar por lo menos un contacto',
            'error'
          );
        }
      } else {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.namePage,
          'La cantidad de aprobación debe ser mayor a 0',
          'error'
        );
      }
    } else {
      this._middleService.sendMessage(
        this.namePage,
        'Porfavor revise los campos obligatorios',
        'error'
      );
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
}
