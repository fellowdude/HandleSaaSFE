import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { SupplierService } from 'src/app/shared/service/supplier.service';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { ISupplierLocalInfo } from './structure/supplier-local.interface';

@Component({
  selector: 'app-crud-supplier-local',
  templateUrl: './crud-supplier-local.component.html',
  styleUrls: ['./crud-supplier-local.component.scss']
})
export class CrudSupplierLocalComponent implements OnInit {

  localForm: FormGroup;
  listDepartments: Array<any>;
  listProvinces: Array<any>;
  listDistricts: Array<any>;
  Subscriptions: Array<Subscription>;
  submitted: boolean = false;

  constructor(public dialogRef: MatDialogRef<CrudSupplierLocalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ubigeoService: UbigeoService,
    private _supplierService: SupplierService,
    private middleService: MiddleService) {
      dialogRef.disableClose = true;
      this.listDepartments = [];
      this.listProvinces = [];
      this.listDistricts = [];
    }

  ngOnInit() {
    console.log("data", this.data)
    this.Subscriptions = new Array<Subscription>();
    this.localForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      province: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    });

    this.checkType();
    this.getInfoInit();
    this.onChanges();
  }

  get f() {
    return this.localForm.controls;
  }

  getInfoInit() {
    /* this.middleService.sendLoading(true); */
    this.Subscriptions.push(Observable.forkJoin([
      this.getAllDepartments(),
    ]).subscribe(
      () => {
        /* this.middleService.sendLoading(false); */
      }
    ));
  }

  checkType() {
    if(this.data.type === 'edit') {
      this.localForm.get('name').setValue(this.data.local.name)
      this.localForm.get('address').setValue(this.data.local.address)
      this.localForm.get('district').setValue(this.data.local.district._id)
      this.localForm.get('province').setValue(this.data.local.province._id)
      this.localForm.get('department').setValue(this.data.local.department._id)
      this.localForm.get('phone').setValue(this.data.local.phone)
      this.localForm.get('email').setValue(this.data.local.email)
      this.getProvincesByDepartment(this.data.local.department._id)
      this.getDistrictsByProvince(this.data.local.province._id)
    }
  }

  validatePhoneInput(event: KeyboardEvent) {
    console.log("aaaa")
    UtilsCode.validatePhoneInput(event);
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

  createSupplierLocal(local_data: any, supplier_id: string) {
    this._supplierService.createNewSupplierLocal(local_data, supplier_id).subscribe((response: any) => {
      this.middleService.sendMessage(
        "Seller",
        "Sede creada correctamente",
        "ok"
      );
      this.middleService.sendLoading(false);
    },
    (error) => {
      this.middleService.sendMessage(
        "Seller",
        error.error.message,
        "error"
      );
    });
  }

  updateSupplierLocal(local_data: any, local_id: string) {
    this._supplierService.updateSupplierLocal(local_data, local_id).subscribe((response: any) => {
      this.middleService.sendMessage(
        "Seller",
        "Sede actualizada correctamente",
        "ok"
      );
      this.middleService.sendLoading(false);
    },
    (error) => {
      this.middleService.sendMessage(
        "Seller",
        error.error.message,
        "error"
      );
    });
  }

  onChanges() {
    this.localForm.get('department').valueChanges.subscribe(change => {
      if(change) {
        this.getProvincesByDepartment(change);
        this.localForm.get('province').setValue(null);
        this.localForm.get('district').setValue(null);
      }
    });
    this.localForm.get('province').valueChanges.subscribe(change => {
      if(change) {
        this.getDistrictsByProvince(change);
        this.localForm.get('district').setValue(null);
      }
    });
  }

  save() {
    this.middleService.sendLoading(true);
    this.submitted = true;
    if(this.localForm.invalid) {
      this.middleService.sendMessage(
        "Seller",
        "Complete toda la información de manera correcta",
        "error"
      );
    } else {
      if(this.data.type === 'new') {
        const supplierLocalInfo: ISupplierLocalInfo = {
          name: this.localForm.get('name').value,
          department: this.localForm.get('department').value,
          province: this.localForm.get('province').value,
          district: this.localForm.get('district').value,
          address: this.localForm.get('address').value,
          phone: this.localForm.get('phone').value,
          email: this.localForm.get('email').value,
          supplier_id: this.data.supplier_id,
        };
        this.createSupplierLocal(supplierLocalInfo, this.data.supplier_id);
        this.dialogRef.close({ data: supplierLocalInfo });
      } else {
        const supplierLocalInfo: ISupplierLocalInfo = {
          name: this.localForm.get('name').value,
          department: this.localForm.get('department').value,
          province: this.localForm.get('province').value,
          district: this.localForm.get('district').value,
          address: this.localForm.get('address').value,
          phone: this.localForm.get('phone').value,
          email: this.localForm.get('email').value,
          supplier_id: this.data.supplier_id,
        };
        this.updateSupplierLocal(supplierLocalInfo, this.data.local._id);
        this.dialogRef.close({ data: supplierLocalInfo });
      }
    }
  }

  close() {
    this.dialogRef.close({ data: null });
  }

}
