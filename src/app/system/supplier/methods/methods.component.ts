import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { LocationService } from 'src/app/shared/service/location.service';
import { SupplierMethodSendService } from 'src/app/shared/service/supplier-method-send.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { HeaderService } from '../../components/header/header.service';
import { UploadExcelComponent } from '../../components/upload-excel/upload-excel.component';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss'],
})
export class MethodsComponent implements OnInit {
  activeBlock: any;
  methodForm: FormGroup;
  locationForm: FormGroup;
  listMethod: any;
  listCurrency: any;
  submitted: boolean;
  listDepartment: any;
  listProvince: any;
  listDistrict: any;
  listLocation: any;
  headerFixed: boolean;
  allListLocation: any;
  floatOption: boolean;
  filter: any;
  checkAll: boolean;
  idSupplier: any;
  idMethod: any;
  departmentFilter: any;
  provinceFilter: any;
  districtFilter: any;
  enableAddPrice: boolean;
  quantityLocationSelect: any;
  showModalPrice: boolean;
  showUbigeoSection: string;
  showModalTime: boolean;
  priceAddSelect: any;
  submittedLocation: boolean;
  hourTime: any;
  arrayTimeAvailable: any;
  editPriceUbigeo: any;
  objGeneral: any;
  intervalTime: any;
  showSummary: boolean
  listResultAddCard: Array<any>;
  start: boolean
  @ViewChild("uploadExcel", { static: true }) uploadExcel: UploadExcelComponent;
  @ViewChild('dialogDelete', { static: true })
  dialogConfirm: DialogConfirmComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _ldvService: LdvService,
    private _locationService: LocationService,
    private _methodSendService: SupplierMethodSendService,
    private middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.start = true
    this.showModalPrice = false;
    this.submitted = false;
    this.filter = {};
    this.hourTime = {};
    this.objGeneral = {};
    this.intervalTime = {
      time: null
    };
    this.activatedRoute.params.subscribe((params) => {
      this.idSupplier = params.idSupplier;
      this.idMethod = params.idMethod;
    });
  }

  @HostListener('scroll', ['$event']) private onScroll($event: Event): void {
    $event.srcElement.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnInit() {
    this.headerService.sendTitle('Métodos de Envío');
    this.activeBlock = {};
    this.headerFixed = false;
    this.listCurrency = [{ _id: '1', value: 'Soles' }];
    let date = new Date().toISOString().substring(0, 10);
    this.uploadExcel.config = {
      title: "Subir precios por ubigeos",
      urlService: "/method-send/ubigeo-massive",
      apiDownload: "/method-send/ubigeo-massive-donwload",
      fileDownloadName: "Subir ubigeo " + date + ".xlsx",
    };
    this.arrayTimeAvailable = [
      {
        name: 'Lunes',
        active: false,
        value: 1,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Martes',
        active: false,
        value: 2,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Miercoles',
        active: false,
        value: 3,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Jueves',
        active: false,
        value: 4,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Viernes',
        active: false,
        value: 5,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Sabado',
        active: false,
        value: 6,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Domingo',
        active: false,
        value: 0,
        ini_hour: null,
        end_hour: null,
      },
      {
        name: 'Feriado',
        active: false,
        value: 7,
        ini_hour: null,
        end_hour: null,
      },
    ];
    this.checkAll = false;
    this.submittedLocation = false;
    this.quantityLocationSelect = 0;
    this.enableAddPrice = false;
    this.showModalTime = false;
    this.listMethod = [];

    this.locationForm = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),
      /*  rangeMin: new FormControl(null, [Validators.required, Validators.min(0)]),
       rangeMax: new FormControl(null, [Validators.required, Validators.min(0)]), */
      rangeMin: new FormControl(0, [Validators.required]),
      rangeMax: new FormControl(0, [Validators.required]),
    });

    this.methodForm = new FormGroup({
      active: new FormControl(true, [Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      type: new FormControl(null, [Validators.required]),
      code: new FormControl(null),
      codeERP: new FormControl(null),
      message: new FormControl(null),
      description: new FormControl(null, Validators.maxLength(1500)),
      maxDaySchedule: new FormControl(null),
      maxDayDelivery: new FormControl(null),
    });

    this._ldvService.getLdvDetail('SONR-TYPE-METHOD').subscribe(
      (listMethod: Array<any>) => {
        this.listMethod = listMethod;
        this._methodSendService.searchAllBySupplier(this.idSupplier).subscribe(
          (listMethodExist: any) => {
            /*  for (const methodExist of listMethodExist) {
              const searchIndex = listMethod.findIndex(
                (item) => item._id == methodExist.type._id
              );
              if (searchIndex >= 0) {
                listMethod.splice(searchIndex, 1);
              }
            } */
            this.listMethod = listMethod;
          },
          (error) => {
            this.middleService.sendMessage(
              'Métodos de envío',
              error.error.message,
              'error'
            );
          }
        );
      },
      (error) => { }
    );
    this._methodSendService.verifyText(this.idSupplier).subscribe(
      (methodText: any) => {
        this.objGeneral.methodText = methodText.existText;
      },
      (error) => { }
    );

    this._locationService.getDepartment().subscribe(
      (listDepartment) => {
        this.listDepartment = listDepartment;
      },
      (error) => { }
    );

    if (this.idMethod) {
      this.getListDataLocation();
    } else {
      this.getListLocation();
    }

    this.onChanges();
  }

  get f() {
    return this.methodForm.controls;
  }
  get l() {
    return this.locationForm.controls;
  }

  onChanges(): void {
    this.locationForm.get("rangeMin").valueChanges.subscribe((val) => {

      if (!this.start && (val || val == 0)) {
        this.locationForm.get('rangeMax').clearValidators();
        if (this.locationForm.get("rangeMax").errors &&
          !this.locationForm.get("rangeMax").errors.hasOwnProperty('required')) {
          this.locationForm.get("rangeMax").setErrors(null);
        }
        this.locationForm
          .get("rangeMax")
          .setValidators([
            Validators.required,
            Validators.min(val),
            Validators.min(0),
          ]);
        //this.productForm.get('SKU').setValidators([Validators.required]);
        this.locationForm.updateValueAndValidity();

      } else {
        this.start = false
      }

    });

    this.locationForm.get("rangeMax").valueChanges.subscribe((val) => {

      if (!this.start && (val || val == 0)) {
        this.locationForm.get('rangeMin').clearValidators();
        if (this.locationForm.get("rangeMin").errors &&
          !this.locationForm.get("rangeMin").errors.hasOwnProperty('required')) {
          this.locationForm.get("rangeMin").setErrors(null);
        }
        this.locationForm
          .get("rangeMin")
          .setValidators([
            Validators.required,
            Validators.max(val),
            Validators.min(0),
          ]);
        this.locationForm.updateValueAndValidity();

      } else {
        this.start = false
      }

    });
    this.methodForm.get('type').valueChanges.subscribe((val) => {
      this.middleService.sendLoading(true);
      this._ldvService.getLdvDetailById(this.methodForm.get('type').value).subscribe((ldvdetail: any) => {
        this.showUbigeoSection = ldvdetail.value;
        const indexSearch = this.listMethod.findIndex(
          (method) => method._id.toString() == val.toString()
        );

        this.activeBlock.message = false;
        this.activeBlock.available = true;
        this.activeBlock.configuration = false;
        this.activeBlock.maxSchedule = false;
        this.activeBlock.maxDeliver = false;
        this.activeBlock.rangeDay = false;
        this.objGeneral.isGeneral = false;
        this.activeBlock.rangeHour = false;
        if (this.listMethod[indexSearch]) {
          switch (this.listMethod[indexSearch].ref3) {
            case 'general': {
              this.objGeneral.isGeneral = true;
              this.activeBlock.message = true;
              this.activeBlock.available = false;
              this.activeBlock.configuration = true;
              this.activeBlock.maxDeliver = true;
              break;
            }
            case 'programmed': {
              this.activeBlock.configuration = true;
              this.activeBlock.maxSchedule = true;
              break;
            }
            case 'range': {
              this.activeBlock.rangeDay = true;
              break;
            }
            case 'range hour': {
              this.activeBlock.rangeHour = true;
              break;
            }
          }
        }
        this.middleService.sendLoading(false);
      });
    });
  }

  closeSummary() {
    this.showSummary = false;
  }

  resultInfo(listProcess) {
    if (listProcess.messageError) {
      this.middleService.sendMessage(
        "Subida de ubigeos",
        listProcess.messageError,
        "error"
      );
    } else {
      console.log(listProcess.info)
      this.middleService.sendLoading(true)
      this.listResultAddCard = listProcess.info;
      const listExist = this.listLocation.filter(item => item.use == true)
      for (const existLocation of listExist) {
        existLocation.price = null
        existLocation.rangeMin = null
        existLocation.rangeMax = null
        existLocation.use = false;
        existLocation.active = false;
        existLocation.currency = null
      }

      for (const method of listProcess.info) {
        const location = this.listLocation.find(item => item.ubigeo == method.ubigeo)
        if (location) {
          location.price = method.price
          location.rangeMin = method.rangeMin
          location.rangeMax = method.rangeMax
          location.use = true;
          location.active = true;
          location.currency = {
            ref1: 'S/.',
          };
          this.methodForm.get("active").setValue(true);
        }
      }
      this.showSummary = true;
      this.middleService.sendLoading(false)
    }
  }

  addPriceUbigeo(activeUse) {
    this.submittedLocation = true;
    if (this.locationForm.invalid) {
      this.middleService.sendMessage(
        'Método de envio',
        'Revise los campos obligatorios',
        'error'
      );
    } else {
      if (this.locationForm.get('amount').value >= 0) {
        for (const ubigeo of this.allListLocation) {
          if (ubigeo.active) {
            ubigeo.price = this.locationForm.get('amount').value;
            ubigeo.rangeMin = this.locationForm.get('rangeMin').value;
            ubigeo.rangeMax = this.locationForm.get('rangeMax').value;

            const indexCurrency = this.listCurrency.findIndex(
              (item) => item._id == this.locationForm.get('currency').value
            );
            if (indexCurrency >= 0) {
              ubigeo.currency = this.listCurrency[indexCurrency];
            }
            if (activeUse) {
              ubigeo.use = true;
            }
            ubigeo.active = false;
          }
        }
        this.enableAddPrice = false;
        this.getLocation();
        this.closeModalAddPrice();
        this.quantityLocationSelect = 0;
        this.checkAll = false;
      } else {
        this.middleService.sendMessage(
          'Método de envio',
          'Debe ingresar un precio mayor a cero',
          'error'
        );
      }
    }
  }

  addTime(field) {
    this.hourTime[field]++;
    this.validTimer(field, this.hourTime[field]);
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  changeDepartment() {
    this.provinceFilter = null;
    this.districtFilter = null;
    this.getProvince();
    this.getLocation();
    this.verifyStateCheck();
  }

  changeProvince() {
    this.districtFilter = null;
    this.getDistrict();
    this.getLocation();
    this.verifyStateCheck();
  }

  changeDistrict() {
    this.getLocation();
    this.verifyStateCheck();
  }
  changeCheckAll() {
    this.changeStateLocation(this.checkAll);
    this.enableAddPrice = this.checkAll ? true : false;
    this.quantitySelect();
  }

  changeStateLocation(state) {
    for (const location of this.listLocation) {
      location.active = state;
    }
  }
  ubigeoMasive() {
    this.uploadExcel.open();
  }

  changeState(location) {
    const indexSearch = this.allListLocation.findIndex(
      (data) => data.ubigeo == location.ubigeo
    );
    this.allListLocation[indexSearch].use = !this.allListLocation[indexSearch].use;
    const ubigeoActive = this.allListLocation.find(list => list.use);
    ubigeoActive ? this.methodForm.get("active").setValue(true) : this.methodForm.get("active").setValue(false);
  }

  changeStateUbigeo(location) {
    this.getValuesForm(location);
    if (this.locationForm.get("rangeMin").value !== undefined &&
      this.locationForm.get("rangeMax").value !== undefined) {
      this.changeState(location);
    } else {
      this.openModalAddPrice(location, true);
    }
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show(
      'Eliminar Método de envío',
      '¿Esta seguro de eliminar?'
    );
  }

  closeModalAddPrice() {
    if (this.editPriceUbigeo.index >= 0) {
      this.allListLocation[this.editPriceUbigeo.index].active = false;
      this.quantityLocationSelect = 0;
    }
    this.showModalPrice = false;
  }

  closeModalTime() {
    this.showModalTime = false;
  }
  downTime(field) {
    this.hourTime[field]--;
    this.validTimer(field, this.hourTime[field]);
  }

  deletItem() {
    this.middleService.sendLoading(true);
    this._methodSendService.delete(this.idMethod).subscribe(
      (data) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Método de envío',
          'El método de envio ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['/system/supplier/detail/' + this.idSupplier]);
      },
      (error) => {
        this.middleService.sendMessage(
          'Método de envío',
          error.error.message,
          'error'
        );
        this.middleService.sendLoading(false);
      }
    );
  }

  editUbigeo() {
    this.submittedLocation = true;
    if (this.locationForm.invalid) {
      this.middleService.sendMessage(
        'Método de envio',
        'Revise las validaciones de los campos antes de continuar',
        'error'
      );
    } else {
      if (this.locationForm.get('amount').value >= 0) {
        this.allListLocation[
          this.editPriceUbigeo.index
        ].use = this.editPriceUbigeo.use;
        this.allListLocation[
          this.editPriceUbigeo.index
        ].price = this.locationForm.get('amount').value;
        this.allListLocation[
          this.editPriceUbigeo.index
        ].rangeMin = this.locationForm.get("rangeMin").value;
        this.allListLocation[
          this.editPriceUbigeo.index
        ].rangeMax = this.locationForm.get("rangeMax").value;

        const indexCurrency = this.listCurrency.findIndex(
          (item) => item._id == this.locationForm.get('currency').value
        );
        if (indexCurrency >= 0) {
          this.allListLocation[
            this.editPriceUbigeo.index
          ].currency = this.listCurrency[indexCurrency];
        }

        if (this.editPriceUbigeo.use) {
          this.methodForm.get("active").setValue(true);
        } else {
          const ubigeoActive = this.allListLocation.find(list => list.use);
          ubigeoActive ? this.methodForm.get("active").setValue(true) : this.methodForm.get("active").setValue(false);
        }

        this.allListLocation[this.editPriceUbigeo.index].use = this.editPriceUbigeo.use;
        this.quantityLocationSelect = 0;
        this.closeModalAddPrice();
      } else {
        this.middleService.sendMessage(
          'Método de envio',
          'Debe ingresar un precio mayor igual a cero',
          'error'
        );
      }
    }
  }

  getListDataLocation() {

    this.middleService.sendLoading(true);
    this._methodSendService.getById(this.idMethod).subscribe(
      (listLocation: any) => {

        this.methodForm.patchValue(listLocation);
        this.allListLocation = listLocation.ubigeo;
        this.listLocation = listLocation.ubigeo;
        listLocation.available.forEach((day: any) => {
          day.ini_hour = new Date(day.ini_hour);
          day.end_hour = new Date(day.end_hour);
        });
        if (listLocation.intervalTime) {
          listLocation.intervalTime.time = new Date(listLocation.intervalTime.time);
          this.intervalTime = listLocation.intervalTime;
        }
        this.arrayTimeAvailable = listLocation.available;
        this.getLocation();

        this.middleService.sendLoading(false);
      },
      (error) => { }
    );
  }
  getListLocation() {

    this.middleService.sendLoading(true);
    this._locationService.getListLocation().subscribe(
      (listLocation) => {
        this.allListLocation = listLocation;
        this.listLocation = listLocation;
        this.getLocation();

        this.middleService.sendLoading(false);
      },
      (error) => { }
    );
  }
  getLocation() {
    const params: any = {};
    if (this.departmentFilter) {
      params.department = this.departmentFilter;
    }
    if (this.provinceFilter) {
      params.province = this.provinceFilter;
    }
    if (this.districtFilter) {
      params.district = this.districtFilter;
    }

    this.listLocation = [];
    for (const location of this.allListLocation) {
      if (
        (location.id_department == this.departmentFilter ||
          !this.departmentFilter) &&
        (location.id_province == this.provinceFilter || !this.provinceFilter) &&
        (location.id_district == this.districtFilter || !this.districtFilter)
      ) {
        this.listLocation.push(location);
      }
    }
  }


  getListCurrency() {
    this._ldvService.getLdvDetail("SONR-CURRENCY").subscribe(
      (listCurrency: any) => {

        this.listCurrency = listCurrency;
        if (listCurrency.length > 0) {
          this.locationForm.get('currency').setValue(listCurrency[0]._id)
        }
      },
      (error) => { }
    );
  }


  getProvince() {
    this._locationService.getProvince(this.departmentFilter).subscribe(
      (listProvince) => {
        this.listProvince = listProvince;
      },
      (error) => { }
    );
  }

  getDistrict() {
    this._locationService.getDistrict(this.provinceFilter).subscribe(
      (listDistrict) => {
        this.listDistrict = listDistrict;
      },
      (error) => { }
    );
  }

  openModalAddPrice(oneUbigeo?, use?) {
    this.locationForm.reset()
    this.getListCurrency();
    this.showModalPrice = true;
    this.editPriceUbigeo = {};
    this.editPriceUbigeo.index = -1;
    this.locationForm.get('amount').setValue(0);
    this.locationForm.get('currency').setValue(null);
    /*    this.locationForm.get("rangeMin").setValue(0);
       this.locationForm.get("rangeMax").setValue(0); */
    this.submittedLocation = false;
    if (oneUbigeo) {
      for (const ubigeo of this.allListLocation) {
        ubigeo.active = false;
      }
      this.getValuesForm(oneUbigeo);
      this.allListLocation[this.editPriceUbigeo.index].active = true;
      this.quantityLocationSelect = 1;
      if (use) {
        this.editPriceUbigeo.use = true;
      }
    }
  }

  getValuesForm(oneUbigeo) {
    this.editPriceUbigeo = {};
    this.editPriceUbigeo.index = -1;

    const indexSearch = this.allListLocation.findIndex(
      (data) => data.ubigeo == oneUbigeo.ubigeo
    );

    this.locationForm
      .get('amount')
      .setValue(this.allListLocation[indexSearch].price);

    if (this.allListLocation[indexSearch].currency) {
      this.locationForm
        .get('currency')
        .setValue(this.allListLocation[indexSearch].currency._id);
    }

    this.locationForm
      .get("rangeMin")
      .setValue(this.allListLocation[indexSearch].rangeMin);

    this.locationForm
      .get("rangeMax")
      .setValue(this.allListLocation[indexSearch].rangeMax);

    this.editPriceUbigeo.index = indexSearch;
    this.editPriceUbigeo.use = this.allListLocation[indexSearch].use;
  }

  openModalTime(positionTime, moment) {
    this.hourTime.hour = 0;
    this.hourTime.minute = 0;
    this.hourTime.errorSave = false;
    this.hourTime.useAll = false;
    if (this.arrayTimeAvailable[positionTime][moment]) {
      this.hourTime.hour = this.arrayTimeAvailable[positionTime][
        moment
      ].getHours();
      this.hourTime.minute = this.arrayTimeAvailable[positionTime][
        moment
      ].getMinutes();
    }
    this.hourTime.positionTime = positionTime;
    this.hourTime.moment = moment;
    this.hourTime.intervalReserve = false;
    this.showModalTime = true;
  }

  openIntervalTime(moment) {
    this.hourTime.hour = 0;
    this.hourTime.minute = 0;
    this.hourTime.errorSave = false;
    this.hourTime.useAll = false;
    if (this.intervalTime[moment]) {
      this.hourTime.hour = this.intervalTime[moment].getHours();
      this.hourTime.minute = this.intervalTime[moment].getMinutes();
    }
    this.hourTime.moment = moment;
    this.hourTime.intervalReserve = true;
    this.showModalTime = true;
  }

  outFilter(value) {
    switch (value) {
      case 'department': {
        this.departmentFilter = null;
        this.provinceFilter = null;
        this.districtFilter = null;
        this.listProvince = [];
        this.listDistrict = [];
        break;
      }
      case 'province': {
        this.provinceFilter = null;
        this.districtFilter = null;
        this.listDistrict = [];

        break;
      }
      case 'district': {
        this.districtFilter = null;
        break;
      }
    }
    this.getLocation();
    this.verifyStateCheck();
  }

  saveTime() {
    this.validSetTime();
    if (!this.hourTime.errorSave) {
      if (this.hourTime.useAll) {
        for (const time of this.arrayTimeAvailable) {
          time[this.hourTime.moment] = new Date(
            0,
            0,
            0,
            this.hourTime.hour,
            this.hourTime.minute,
            0
          );
        }
      } else {
        this.arrayTimeAvailable[this.hourTime.positionTime][
          this.hourTime.moment
        ] = new Date(0, 0, 0, this.hourTime.hour, this.hourTime.minute, 0);
      }
      this.closeModalTime();
    }
  }

  saveIntervalTime() {
    this.intervalTime[this.hourTime.moment] = new Date(0, 0, 0, this.hourTime.hour, this.hourTime.minute, 0);
    this.closeModalTime();
  }

  validSetTime() {
    this.hourTime.errorSave = false;
    if (this.hourTime.useAll) {
      for (const time of this.arrayTimeAvailable) {
        const infoChange: any = {};
        infoChange.ini_hour = time.ini_hour;
        infoChange.end_hour = time.end_hour;
        infoChange[this.hourTime.moment] = new Date(
          0,
          0,
          0,
          this.hourTime.hour,
          this.hourTime.minute,
          0
        );
        if (infoChange.ini_hour && infoChange.end_hour) {
          if (infoChange.end_hour <= infoChange.ini_hour) {
            this.hourTime.errorSave = true;
            this.hourTime.meesageError =
              'Existe una hora de inicio mayor a la hora de fin. Revise en el resto de dias';
            break;
          }
        }
      }
    } else {
      const infoChange: any = {};
      infoChange.ini_hour = this.arrayTimeAvailable[
        this.hourTime.positionTime
      ].ini_hour;
      infoChange.end_hour = this.arrayTimeAvailable[
        this.hourTime.positionTime
      ].end_hour;
      infoChange[this.hourTime.moment] = new Date(
        0,
        0,
        0,
        this.hourTime.hour,
        this.hourTime.minute,
        0
      );
      if (infoChange.ini_hour >= infoChange.end_hour) {
        this.hourTime.errorSave = true;
        this.hourTime.meesageError =
          'La hora de inicio debe ser menor a la hora de fin';
      }
    }
  }
  quantitySelect() {
    this.quantityLocationSelect = 0;
    for (const location of this.allListLocation) {
      if (location.active) {
        this.quantityLocationSelect++;
      }
    }
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  saveMethod() {
    const method = this.listMethod.find(method => method._id == this.methodForm.get('type').value);
    const ubigeoSelected = this.listLocation.find(list => list.active);
    if (this.methodForm.get("active").value || method.value == 'Recojo en tienda') {
      this.submitted = true;
      if (!this.methodForm.invalid) {
        this.middleService.sendLoading(true);
        const dataSend = Object.assign({}, this.methodForm.value);
        dataSend.id_supplier = this.idSupplier;
        dataSend.ubigeo = this.allListLocation;
        dataSend.available = this.arrayTimeAvailable;
        dataSend.intervalTime = this.intervalTime;
        if (this.idMethod) {
          let validGeneral = true;
          if (this.objGeneral.isGeneral && this.objGeneral.methodText) {
            if (this.objGeneral.methodText !== this.idMethod) {
              validGeneral = false;
            }
          }
          if (validGeneral) {
            this._methodSendService
              .updateMethod(this.idMethod, dataSend)
              .subscribe(
                (infoSave) => {
                  this.middleService.sendLoading(false);
                  this.middleService.sendMessage(
                    'Método de Envío',
                    'El método de envío ha sido actualizado correctamente',
                    'ok'
                  );
                },
                (error) => {
                  this.middleService.sendLoading(false);
                  this.middleService.sendMessage(
                    'Método de Envío',
                    error.error.message,
                    'error'
                  );
                }
              );
          } else {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              'Método de envío',
              'Solo puede tener un método de envio de tipo GENERAL',
              'error'
            );
          }
        } else {
          if (this.objGeneral.isGeneral && this.objGeneral.methodText) {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              'Método de envío',
              'Solo puede tener un método de envio de tipo GENERAL',
              'error'
            );
          } else {
            this._methodSendService.saveMethod(dataSend).subscribe(
              (infoSave) => {
                this.middleService.sendLoading(false);
                this.middleService.sendMessage(
                  'Método de envío',
                  'El método de envío ha sido creado correctamente',
                  'ok'
                );
                this.router.navigate([
                  '/system/supplier/detail/' + this.idSupplier,
                ]);
              },
              (error) => {
                this.middleService.sendLoading(false);
                this.middleService.sendMessage(
                  'Método de envío',
                  error.error.message,
                  'error'
                );
              }
            );
          }
        }
      } else {
        this.middleService.sendMessage(
          'Método de envío',
          'Revise los campos obligatorios',
          'error'
        );
      }
    } else {
      this.middleService.sendMessage(
        'Método de envío',
        'Debe de seleccionar al menos un ubigeo.',
        'error'
      );
    }
  }

  validTimer(field, value) {
    let maxvalue = 0;
    switch (field) {
      case 'hour': {
        maxvalue = 24;
        break;
      }
      case 'minute': {
        maxvalue = 59;
        break;
      }
    }
    if (value > maxvalue) {
      this.hourTime[field] = maxvalue;
    }
    if (value < 0) {
      this.hourTime[field] = 0;
    }
  }
  verifyStateCheck() {
    this.checkAll = true;
    this.enableAddPrice = false;
    for (const location of this.listLocation) {
      if (!location.active) {
        this.checkAll = false;
      } else {
        if (!this.enableAddPrice) {
          this.enableAddPrice = true;
        }
      }
    }
  }

  returnSupplier() {
    if (localStorage.getItem('methosSupplier')) {
      this.router.navigate(["/system/product"]);
    } else {
      this.router.navigate(["/system/supplier/detail/" + this.idSupplier]);
    }
  }
}
