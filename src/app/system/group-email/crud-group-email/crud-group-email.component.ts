import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridComponent } from '../../components/grid/grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { GroupEmailService } from 'src/app/shared/service/group-email.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { HeaderService } from '../../components/header/header.service';

@Component({
  selector: 'app-crud-group-email',
  templateUrl: './crud-group-email.component.html',
  styleUrls: ['./crud-group-email.component.scss']
})
export class CrudGroupEmailComponent implements OnInit {
  idGroupEmail: String;
  headerFixed: boolean;
  emailGroupForm: FormGroup;
  nameWindow: string;
  submitted: boolean;
  contactList: any[];
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  @ViewChild('dialogDelete', { static: true })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _groupEmailService: GroupEmailService,
    private _middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idGroupEmail = params.idGroupEmail;
    });

    this.emailGroupForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      list_contact: new FormControl(Validators.required)
    });

    this.contactList = [];
  }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle('Grupo de Contactos');
    this.submitted = false;
    this.nameWindow = 'Grupo de Contacto';
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Contacto',
        type: 'text'
      },
      {
        field: 'email',
        title: 'Correo',
        type: 'text'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/contact-email/search';
    this.gridList.config.entity = 'Contacto';
    this.gridList.config.select = true;
    this.gridList.config.listItemSelect = [];
    this.gridList.config.selectGetObject = true;
    this.gridList.config.errorConfig = true;
    if (this.idGroupEmail) {
      this.getInfo();
    }
  }

  get f() {
    return this.emailGroupForm.controls;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  confirmDeleteItem() {
    this.dialogConfirm.show('Eliminar Grupo de Contacto', '¿Esta seguro de eliminar?');
  }

  deletItem() {
    this._groupEmailService.delete(this.idGroupEmail).subscribe(
      data => {
        this._middleService.sendMessage(
          this.nameWindow,
          'El grupo de categoría ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['/system/group-email']);
      },
      error => {
        this._middleService.sendMessage(
          this.nameWindow,
          error.error.message,
          'error'
        );
      }
    );
  }

  itemSelecReturn(listItem: any) {
    const foundIndex = this.contactList.findIndex((contact: any) => contact._id == listItem._id);
    if (foundIndex !== -1) {
      this.contactList.splice(foundIndex, 1);
    } else {
      this.contactList.push(listItem);
    }

    this.emailGroupForm.get('list_contact').setValue(this.contactList);
  }

  getInfo() {
    this._middleService.sendLoading(true);
    this._groupEmailService.getById(this.idGroupEmail).subscribe(
      (dataInfo: any) => {
        this.emailGroupForm.patchValue(dataInfo);
        this.gridList.config.listItemSelect = dataInfo.list_contact;
        this.contactList = dataInfo.list_contact;
        this.gridList.updateSelectItem();
        this._middleService.sendLoading(false);
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.nameWindow,
          error.error.message,
          'error'
        );
      }
    );
  }

  returnGroupEmail() {
    this.router.navigate(['/system/group-email']);
  }

  saveGroupEmail() {
    this.submitted = true;
    if (!this.emailGroupForm.invalid) {
      if (Array.isArray(this.emailGroupForm.get('list_contact').value)) {
        if (this.emailGroupForm.get('list_contact').value.length > 0) {
          this._middleService.sendLoading(true);
          if (this.idGroupEmail) {
            this._groupEmailService
              .update(this.idGroupEmail, this.emailGroupForm.value)
              .subscribe(
                infoData => {
                  this._middleService.sendLoading(false);
                  this._middleService.sendMessage(
                    this.nameWindow,
                    'El grupo de contacto ha sido actualizado correctamente',
                    'ok'
                  );
                  this.router.navigate(['/system/group-email']);
                },
                error => {
                  this._middleService.sendLoading(false);
                  this._middleService.sendMessage(
                    this.nameWindow,
                    error.error.message,
                    'error'
                  );
                }
              );
          } else {
            this._groupEmailService.create(this.emailGroupForm.value).subscribe(
              (infoCreate: any) => {
                this._middleService.sendLoading(false);
                this._middleService.sendMessage(
                  this.nameWindow,
                  'El grupo de contacto ha sido creado correctamente',
                  'ok'
                );
                this.router.navigate(['/system/group-email']);
              },
              error => {
                this._middleService.sendLoading(false);
                this._middleService.sendMessage(
                  this.nameWindow,
                  error.error.message,
                  'error'
                );
              }
            );
          }
        } else {
          this._middleService.sendMessage(
            this.nameWindow,
            'Debes seleccionar por lo menos un contacto',
            'error'
          );
        }
      } else {
        this._middleService.sendMessage(
          this.nameWindow,
          'Debes seleccionar por lo menos un contacto',
          'error'
        );
      }
    } else {
      this._middleService.sendMessage(
        this.nameWindow,
        'Revise los campos obligatorios',
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
