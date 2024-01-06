import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { GridComponent } from '../../components/grid/grid.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { HeaderService } from '../../components/header/header.service';
import { GroupCustomerService } from 'src/app/shared/service/group-customer.service';

@Component({
  selector: 'app-crud-group-customer',
  templateUrl: './crud-group-customer.component.html',
  styleUrls: ['./crud-group-customer.component.scss']
})
export class CrudGroupCustomerComponent implements OnInit {

  idGroupCustomer: String;
  headerFixed: boolean;
  customerGroupForm: FormGroup;
  nameWindow: string;
  submitted: boolean;
  customerList: any[];
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  @ViewChild('dialogDelete', { static: true }) dialogConfirm: DialogConfirmComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _middleService: MiddleService,
    private headerService: HeaderService,
    private _groupCustomerService: GroupCustomerService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.idGroupCustomer = params.idGroupCustomer;
    });
    this.customerGroupForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      list_customer: new FormControl(Validators.required)
    });
    this.customerList = [];
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
        field: 'complete_name',
        title: 'Usuario',
        type: 'text'
      },
      {
        field: 'additionals.number_card',
        title: 'Num. Tarjeta',
        type: 'text'
      },
      {
        field: 'additionals.number_document',
        title: 'Num. DNI',
        type: 'text'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/user/list-customer';
    this.gridList.config.entity = 'Usuario';
    this.gridList.config.select = true;
    this.gridList.config.listItemSelect = [];
    this.gridList.config.selectGetObject = true;
    this.gridList.config.errorConfig = true;
    if (this.idGroupCustomer) {
      this.getInfo();
    }
  }

  confirmDeleteItem() {
    this.dialogConfirm.show('Eliminar Grupo de Cliente', '¿Esta seguro de eliminar?');
  }

  returnGroupCustomer() {
    this.router.navigate(['/system/group-customer']);
  }

  get f() {
    return this.customerGroupForm.controls;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deleteItem();
    }
  }

  deleteItem() {
    this._groupCustomerService.delete(this.idGroupCustomer).subscribe(
      data => {
        this._middleService.sendMessage(
          this.nameWindow,
          'El grupo de clientes ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['/system/group-customer']);
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
    const foundIndex = this.customerList.findIndex((customer: any) => customer._id == listItem._id);
    if (foundIndex !== -1) {
      this.customerList.splice(foundIndex, 1);
    } else {
      this.customerList.push(listItem);
    }
    this.customerGroupForm.get('list_customer').setValue(this.customerList);
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

  saveGroupCustomer() {
    this.submitted = true;
    if (!this.customerGroupForm.invalid) {
      if (Array.isArray(this.customerGroupForm.get('list_customer').value)) {
        if (this.customerGroupForm.get('list_customer').value.length > 0) {
          this._middleService.sendLoading(true);
          if (this.idGroupCustomer) {
            this._groupCustomerService
            .update(this.idGroupCustomer, this.customerGroupForm.value)
            .subscribe(
              infoData => {
                this._middleService.sendLoading(false);
                this._middleService.sendMessage(
                  this.nameWindow,
                  'El grupo de clientes ha sido actualizado correctamente',
                  'ok'
                );
                this.router.navigate(['/system/group-customer']);
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
            this._groupCustomerService.create(this.customerGroupForm.value).subscribe(
              (infoCreate: any) => {
                this._middleService.sendLoading(false);
                this._middleService.sendMessage(
                  this.nameWindow,
                  'El grupo de clientes ha sido creado correctamente',
                  'ok'
                );
                this.router.navigate(['/system/group-customer']);
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
            'Debes seleccionar por lo menos un cliente',
            'error'
          );
        }
      } else {
        this._middleService.sendMessage(
          this.nameWindow,
          'Debes seleccionar por lo menos un cliente',
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

  getInfo() {
    this._middleService.sendLoading(true);
    this._groupCustomerService.getById(this.idGroupCustomer).subscribe(
      (dataInfo: any) => {
        this.customerGroupForm.patchValue(dataInfo);
        this.gridList.config.listItemSelect = dataInfo.list_customer;
        this.customerList = dataInfo.list_customer;
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

}
