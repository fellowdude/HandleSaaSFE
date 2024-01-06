import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MapsLocationComponent } from '../../components/maps-location/maps-location.component';
import { EnterpriseService } from 'src/app/shared/service/enterprise.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { MultimediaGalleryComponent } from '../../components/multimedia-gallery/multimedia-gallery.component';
import { HeaderService } from '../../components/header/header.service';
import { UtilsCode } from '../../../utils/utilsCode';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @ViewChild('mapsLocation', { static: true }) mapsLocation: MapsLocationComponent;
  @ViewChild('multimediaList', { static: true }) multimediaGallery: MultimediaGalleryComponent;
  companyForm: FormGroup;
  headerFixed: boolean;
  objChange: any;
  iconField: any;
  infoIcon: any; // implementar
  urlImgSearch: string;
  showAddIcon: boolean;
  submitted: boolean; // implementar
  constructor(
    private _infoEnterprise: EnterpriseService,
    private middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.companyForm = new FormGroup({
      bussiness_name: new FormControl('', [Validators.required]),
      contact_phone: new FormControl('', [Validators.required]),
      contact_address: new FormControl('', [Validators.required]),
      contact_email: new FormControl('', [Validators.required]),
      position_lat: new FormControl(null, [Validators.required]),
      position_lng: new FormControl(null, [Validators.required]),
      marker_position: new FormControl(),
      bussiness_img: new FormControl(),
      contact_phone_img: new FormControl(),
      contact_address_img: new FormControl(),
      contact_email_img: new FormControl(),
      mobile_version: new FormControl()
    });
    this.showAddIcon = false;
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle('Datos de Empresa');
    this.headerFixed = false;
    this.getInfoCompany();
  }
  get f() {
    return this.companyForm.controls;
  }

  openChangeIcon(field, value) {
    this.iconField = field;
    this.infoIcon = value;
    this.showAddIcon = true;
  }

  goToURL(url) {
    window.open(url);
  }

  selectImageMainWeb() {
    // implementar
  }

  dataPictureDelete() {
    this.companyForm.get('marker_position').setValue(null);
  }

  iconChange(value) {
    this.companyForm.get(this.iconField).setValue(value);
    this.closeAddIcon();
  }
  closeAddIcon() {
    this.showAddIcon = false;
  }
  openMap() {
    this.mapsLocation.open();
  }
  getInfoMap(infoMaps) {
    this.f.position_lat.setValue(infoMaps.newLocation.lat);
    this.f.position_lng.setValue(infoMaps.newLocation.lng);
    this.f.contact_address.setValue(infoMaps.newLocation.address);
  }
  getInfoCompany() {
    this.middleService.sendLoading(true);
    this._infoEnterprise.getInfoCompany().subscribe(
      (dataCompany: any) => {
        this.middleService.sendLoading(false);
        this.companyForm.patchValue(dataCompany.data);
        this.urlImgSearch = dataCompany.imgUrl;
      },
      (error) => {
        this.middleService.sendLoading(false);
      }
    );
  }
  showWindowMultimedia(field) {
    this.objChange = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }
  setSeleccionado(event) {
    if (event) {
      this.companyForm.get(this.objChange).setValue(event);
    }
  }
  updateInfo() {
    if (!this.companyForm.invalid) {
      this._infoEnterprise.updateInfoCompany(this.companyForm.value).subscribe(
        dataCompany => {
          this.middleService.sendMessage(
            'Empresa',
            'La información ha sido actualizada correctamente',
            'ok'
          );
        },
        err => {

        }
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


  validatePhoneInput(event: KeyboardEvent) {
    UtilsCode.validatePhoneInput(event);
  }
}
