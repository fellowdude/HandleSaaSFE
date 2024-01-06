import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { UserService } from 'src/app/shared/service/user.service';
import { IAddressInfo } from './structure/crud-address.interface';

@Component({
  selector: 'app-crud-address',
  templateUrl: './crud-address.component.html',
  styleUrls: ['./crud-address.component.scss']
})
export class CrudAddressComponent implements OnInit {
  addressForm: FormGroup;
  listDepartments: Array<any>;
  listProvinces: Array<any>;
  listDistricts: Array<any>;
  listTypeAddresses: Array<any>;
  Subscriptions: Array<Subscription>;

  constructor(public dialogRef: MatDialogRef<CrudAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ubigeoService: UbigeoService,
    private _userService: UserService,
    private middleService: MiddleService) {
      dialogRef.disableClose = true;
      this.listDepartments = [];
      this.listProvinces = [];
      this.listDistricts = [];
      this.listTypeAddresses = [];
    }

  ngOnInit() {
    console.log("data", this.data)
    this.Subscriptions = new Array<Subscription>();
    this.addressForm = new FormGroup({
      type_address: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      reference: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      province: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      cellphone: new FormControl("", [Validators.required]),
    });

    this.checkType();
    this.getInfoInit();
    this.onChanges();
  }

  getInfoInit() {
    /* this.middleService.sendLoading(true); */
    this.Subscriptions.push(Observable.forkJoin([
      this.getAllDepartments(),
      this.getAvailableTypeAddresses(this.data.user_id),
    ]).subscribe(
      () => {
        /* this.middleService.sendLoading(false); */
      }
    ));
  }

  checkType() {
    if(this.data.type === 'edit') {
      this.addressForm.get('type_address').setValue(this.data.address.type_address._id)
      this.addressForm.get('address').setValue(this.data.address.address)
      this.addressForm.get('reference').setValue(this.data.address.reference)
      this.addressForm.get('district').setValue(this.data.address.district._id)
      this.addressForm.get('province').setValue(this.data.address.province._id)
      this.addressForm.get('department').setValue(this.data.address.department._id)
      this.addressForm.get('cellphone').setValue(this.data.address.cellphone)
      this.getProvincesByDepartment(this.data.address.department._id)
      this.getDistrictsByProvince(this.data.address.province._id)
    }
  }

  getAllDepartments() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ubigeoService.getAllDepartments().subscribe((response: Array<any>) => {
        console.log("deps", response);
        this.listDepartments = response;
        resolve({});
      },
      (error) => {
        reject({});
      });
    });
    return waitPromise;
  }

  getProvincesByDepartment(id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._ubigeoService.getProvincesByDepartment(id).subscribe((response: Array<any>)=>{
        console.log("provinces", response);
        this.listProvinces = response;
        resolve({});
      },
      (error) => {
        reject({});
      });
    });
    return waitPromise;
  }

  getDistrictsByProvince(id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._ubigeoService.getDistrictsByProvince(id).subscribe((response: Array<any>) => {
        console.log("districts", response);
        this.listDistricts = response;
        resolve({});
      },
      (error) => {
        reject({});
      });
    });
    return waitPromise;
  }

  getAvailableTypeAddresses(id?: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._userService.getAvailableAddress(id).subscribe((response: Array<any>) => {
        console.log("available addresses", response);
        this.listTypeAddresses = response;
        if(this.data.type === 'edit') {
          this.listTypeAddresses.push(this.data.address.type_address);
        }
        resolve({});
      },
      (error) => {
        reject({});
      });
    });
    return waitPromise;
  }

  createUserAddress(address_data: any, user_id: string) {
    this._userService.createNewAddressCustomer(address_data, user_id).subscribe((response: any) => {
      this.middleService.sendMessage(
        "Usuario",
        "Dirección creada correctamente",
        "ok"
      );
    },
    (error) => {
      this.middleService.sendMessage(
        "Usuario",
        error.error.message,
        "error"
      );
    });
  }

  updateuserAddress(address_data: any, address_id: string) {
    this._userService.updateAddressCustomer(address_data, address_id).subscribe((response: any) => {
      this.middleService.sendMessage(
        "Usuario",
        "Dirección actualizada correctamente",
        "ok"
      );
    },
    (error) => {
      this.middleService.sendMessage(
        "Usuario",
        error.error.message,
        "error"
      );
    });
  }

  onChanges() {
    this.addressForm.get('department').valueChanges.subscribe(change => {
      if(change) {
        this.getProvincesByDepartment(change);
        this.addressForm.get('province').setValue(null);
        this.addressForm.get('district').setValue(null);
      }
    });
    this.addressForm.get('province').valueChanges.subscribe(change => {
      if(change) {
        this.getDistrictsByProvince(change);
        this.addressForm.get('district').setValue(null);
      }
    });
  }

  getNameTypeAddress(id: string) {
    const value: any = this.listTypeAddresses.filter(e => e._id === id);
    return value[0].value;
  }

  save() {
    if(this.addressForm.invalid) {
      this.middleService.sendMessage(
        "Usuario",
        "Complete toda la información de manera correcta",
        "error"
      );
    } else {
      if(this.data.type === 'new') {
        const addressInfo: IAddressInfo = {
          address: this.addressForm.get('address').value,
          cellphone: this.addressForm.get('cellphone').value,
          deleted: false,
          department: this.addressForm.get('department').value,
          district: this.addressForm.get('district').value,
          name: this.getNameTypeAddress(this.addressForm.get('type_address').value),
          province: this.addressForm.get('province').value,
          reference: this.addressForm.get('reference').value,
          type_address: this.addressForm.get('type_address').value,
          user_id: this.data.user_id,
        };
        this.createUserAddress(addressInfo, this.data.user_id);
        this.dialogRef.close({ data: addressInfo });
      } else {
        const addressInfo: IAddressInfo = {
          address: this.addressForm.get('address').value,
          cellphone: this.addressForm.get('cellphone').value,
          deleted: false,
          department: this.addressForm.get('department').value,
          district: this.addressForm.get('district').value,
          name: this.getNameTypeAddress(this.addressForm.get('type_address').value),
          province: this.addressForm.get('province').value,
          reference: this.addressForm.get('reference').value,
          type_address: this.addressForm.get('type_address').value,
          user_id: this.data.user_id,
        };
        this.updateuserAddress(addressInfo, this.data.address._id);
        this.dialogRef.close({ data: addressInfo });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

}
