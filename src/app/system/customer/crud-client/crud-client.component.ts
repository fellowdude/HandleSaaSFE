import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/forkJoin";
import { Subscription } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-crud-client',
  templateUrl: './crud-client.component.html',
  styleUrls: ['./crud-client.component.scss']
})
export class CrudClientComponent implements OnInit {
  openModal: boolean;
  @Output() sendAnswer: EventEmitter<any> = new EventEmitter<any>();
  customerForm: FormGroup;
  submitted: boolean;
  Subscriptions: Array<Subscription>;
  listSufix: Array<any>
  listTypeDocument: Array<any>
  constructor(
    private _middlesService: MiddleService,
    private _userService: UserService,
    private _ldvService: LdvService
  ) { }

  ngOnInit() {
    this.openModal = false
    this.Subscriptions = new Array<Subscription>();
    this.submitted = false
    this.customerForm = new FormGroup({
      birth_date: new FormControl(null, [Validators.required]),
      last_name_father: new FormControl(null, [Validators.required]),
      last_name_mother: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      number_card: new FormControl(null, [Validators.required]),
      number_document: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      suffix: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      type_document: new FormControl(null, [Validators.required])
    });

    this.basicInfo()
  }

  get f() {
    return this.customerForm.controls;
  }
  close() {
    this.sendAnswer.emit({ created: false });
    this.openModal = false
  }

  open(infoPreview?) {
    this.customerForm.reset()
    this.submitted = false
    this.openModal = true
    if (infoPreview) {
      this.customerForm.get('number_document').setValue(infoPreview.number_document)
      this.customerForm.get('type_document').setValue(infoPreview.type_document)
      this.customerForm.get('number_card').setValue(infoPreview.code_client)
      
    }
  }
  accept() {
    this.submitted = true
    if (!this.customerForm.invalid) {
      this._middlesService.sendLoading(true)
      this._userService.saveCustomer(this.customerForm.value).subscribe(
        (listInfo) => {
          this._middlesService.sendMessage('Cliente', 'Se ha creado al cliente exitosamente', 'ok')
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

  basicInfo() {
    this._middlesService.sendLoading(true)
    this.Subscriptions.push(Observable.forkJoin([
      this.getListSufix(),
      this.getListTypeDocument()
    ]
    ).subscribe(
      () => {
        this._middlesService.sendLoading(false)
      }
    ));
  }

  getListSufix() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('TYPE-SUFFIX').subscribe((response: any) => {
        console.log('response')
        console.log(response)
        this.listSufix = response
        resolve({});
      });
    });
    return waitPromise;

  }

  getListTypeDocument() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('TYPE-DOCUMENT-CUSTOMER').subscribe((response: any) => {
        console.log('response')
        console.log(response)
        this.listTypeDocument = response
        resolve({});
      });
    });
    return waitPromise;
  }

}
