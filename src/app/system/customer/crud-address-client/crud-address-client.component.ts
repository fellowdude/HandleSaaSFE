import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import "rxjs/add/observable/forkJoin";
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { UserService } from 'src/app/shared/service/user.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { LocationService } from 'src/app/shared/service/location.service';

@Component({
  selector: 'app-crud-address-client',
  templateUrl: './crud-address-client.component.html',
  styleUrls: ['./crud-address-client.component.scss']
})
export class CrudAddressClientComponent implements OnInit, OnDestroy {
  openModal: boolean
  addressForm: FormGroup;
  customerId: any
  @Output() sendAnswer: EventEmitter<any> = new EventEmitter<any>();
  submitted: boolean;
  Subscriptions: Array<Subscription>;
  listAddress: Array<any>
  listDepartment: Array<any>
  listProvince: Array<any>
  listDistrict: Array<any>
  constructor(
    private _middlesService: MiddleService,
    private _userService: UserService,
    private _locationService: LocationService
  ) { }

  ngOnInit() {
    this.openModal = false
    this.Subscriptions = new Array<Subscription>();
    this.submitted = false
    this.addressForm = new FormGroup({
      user_id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cellphone: new FormControl(null, [Validators.required]),
      type_address: new FormControl(null, [Validators.required]),
      ubigeo: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      province: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      reference: new FormControl(null, [Validators.required]),
    });
    this.onChanges()
  }

  get f() {
    return this.addressForm.controls;
  }

  close() {
    this.sendAnswer.emit({ created: false });
    this.openModal = false
  }

  open(customerId) {
    this.addressForm.reset()
    this.customerId = customerId
    this.submitted = false
    this.openModal = true
    this.basicInfo()
  }

  basicInfo() {
    this._middlesService.sendLoading(true)
    this.Subscriptions.push(Observable.forkJoin([
      this.getAddresAvailable(),
      this.getListDepartment()
    ]
    ).subscribe(
      () => {
        this._middlesService.sendLoading(false)
      }
    ));
  }

  getAddresAvailable() {
    const waitPromise = new Promise((resolve, reject) => {
      this._userService.getAvailableAddress(this.customerId).subscribe((response: any) => {

        this.listAddress = response
        resolve({});
      });
    });
    return waitPromise;
  }
  getListDepartment() {
    const waitPromise = new Promise((resolve, reject) => {
      this._locationService.getDepartment().subscribe((response: any) => {
        this.listDepartment = response
        resolve({});
      });
    });
    return waitPromise;
  }

  getListProvince(idDepartment) {
    this._middlesService.sendLoading(true)
    const waitPromise = new Promise((resolve, reject) => {
      this._locationService.getProvince(idDepartment).subscribe((response: any) => {
        this.listProvince = response
        this._middlesService.sendLoading(false)
        resolve({});
      });
    });
    return waitPromise;
  }

  getListDistrict(idProvince) {
    this._middlesService.sendLoading(true)
    const waitPromise = new Promise((resolve, reject) => {
      this._locationService.getDistrict(idProvince).subscribe((response: any) => {
        this.listDistrict = response
        this._middlesService.sendLoading(false)
        resolve({});
      });
    });
    return waitPromise;
  }

  accept() {
    this.submitted = true
    this.addressForm.get('user_id').setValue(this.customerId)
    if (!this.addressForm.invalid) {
      this._middlesService.sendLoading(true)
      this._userService.createNewAddressCustomer(this.addressForm.value, this.customerId).subscribe(
        (listInfo) => {
          this._middlesService.sendMessage('Cliente', 'Se ha creado la dirección del cliente exitosamente', 'ok')
          this._middlesService.sendLoading(false)
          this.sendAnswer.emit({ created: listInfo });
          this.openModal = false
        }, (error) => {
          this._middlesService.sendMessage('Cliente', error.error.message, 'error')
          this._middlesService.sendLoading(false)
        }
      )
    }
    else {
      this._middlesService.sendMessage('Cliente', 'Revisa los campos obligatorios', 'error')
    }
  }

  onChanges() {
    this.Subscriptions.push(this.addressForm.get('type_address').valueChanges.subscribe(val => {
      if (val) {
        const findAddress = this.listAddress.find(item => String(item._id) == String(val))
        if (findAddress) {
          this.addressForm.get('name').setValue(findAddress.value)
        }
      }

    }));
    this.Subscriptions.push(this.addressForm.get('department').valueChanges.subscribe(val => {
      if (val) {
        this.getListProvince(val)
      }
    }));
    this.Subscriptions.push(this.addressForm.get('province').valueChanges.subscribe(val => {
      if (val) {
        this.getListDistrict(val)
      }
    }));

    this.Subscriptions.push(this.addressForm.get('district').valueChanges.subscribe(val => {
      if (val) {
        const findDistrict = this.listDistrict.find(item => String(item._id) == String(val))
        if (findDistrict) {
          this.addressForm.get('ubigeo').setValue(findDistrict.ubigeo)
        }
      }
    }));

  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
