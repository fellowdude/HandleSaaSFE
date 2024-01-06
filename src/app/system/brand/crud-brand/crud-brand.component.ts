import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { BrandService } from 'src/app/shared/service/brand.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { MultimediaGalleryComponent } from '../../components/multimedia-gallery/multimedia-gallery.component';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { CompareArray } from 'src/app/utils/compareArray';
import { CompareImageComponent } from '../../components/compare-image/compare-image.component';
import { HeaderService } from '../../components/header/header.service';
import { CompareVideoComponent } from '../../components/compare-video/compare-video.component';
import { Subscription } from 'rxjs';
import { AttachmentService } from 'src/app/shared/service/attachment.service';
import { LdvService } from 'src/app/shared/service/ldv.service';

@Component({
  selector: 'app-crud-brand',
  templateUrl: './crud-brand.component.html',
  styleUrls: ['./crud-brand.component.scss']
})
export class CrudBrandComponent implements OnInit, OnDestroy {
  idBrand: boolean;
  brandForm: FormGroup;
  videoForm: FormGroup;
  showMoreButton: boolean;
  headerFixed: boolean;
  lisAddPicture: any;
  lisAddPictureMobile: any;
  lisAddLogoPicture: any;
  lisAddLogoPictureMobile: any;
  lisAddGaleryPicture: any;
  lisAddGaleryVideos: any;
  listStampPicture: any;
  lisAddBanner: any;
  lisAddLogoBanner: any;
  submitted: boolean;
  selectPicture: any;
  selectMuti: any;
  imagePositionMobile: any;
  imageShowSlider: string;
  url_attachment: string;
  objChange: any;
  isSupplier: boolean;
  penddingRequest: boolean;
  approve_user: boolean;
  switchNewData: boolean;
  toggleMultimediaSection: boolean;
  nameChanged: boolean;
  typeRequest: any;
  dataReplace: any;
  infoCompare: any;
  existChange: any;
  denyMessage: string;
  replacePosition: any;
  showDenyMessage: boolean;
  @ViewChild(FileUploadComponent, { static: false })
  uploadImage: FileUploadComponent;
  @ViewChild(DialogConfirmComponent, { static: true })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild('compareBannerImage', { static: true })
  compareBannerImage: CompareImageComponent;
  @ViewChild('compareLogoImage', { static: true })
  compareLogoImage: CompareImageComponent;


  @ViewChild('compareListPicture', { static: true })
  compareListPicture: CompareImageComponent;
  @ViewChild('compareListPictureMobile', { static: true })
  compareListPictureMobile: CompareImageComponent;
  @ViewChild('compareLisAddLogoPicture', { static: true })
  compareLisAddLogoPicture: CompareImageComponent;
  @ViewChild('compareLisAddLogoPictureMobile', { static: true })
  compareLisAddLogoPictureMobile: CompareImageComponent;
  @ViewChild('compareLisAddGaleryPicture', { static: true })
  compareLisAddGaleryPicture: CompareImageComponent;
  @ViewChild('compareLisAddGaleryVideos', { static: true })
  compareLisAddGaleryVideos: CompareVideoComponent;
  infoChangePosition: Array<any>;
  infoChangePositionVideo: Array<any>;
  subscriptions: Array<Subscription>;
  searchName: any
  listImageDimension: any
  listImageField: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private router: Router,
    private middleService: MiddleService,
    private _sanitizer: DomSanitizer,
    private headerService: HeaderService,
    private _attachmentService: AttachmentService,
    private _ldvService: LdvService
  ) {
    this.isSupplier = true;
    this.submitted = false;
    this.showMoreButton = false;
    this.idBrand = false;
    this.infoChangePosition = [];
    this.infoChangePositionVideo = [];
    this.lisAddPicture = [];
    this.lisAddPictureMobile = [];
    this.lisAddLogoPicture = [];
    this.lisAddLogoPictureMobile = [];
    this.lisAddGaleryPicture = [];
    this.lisAddGaleryVideos = [];
    this.lisAddBanner = [];
    this.lisAddLogoBanner = [];
    this.listStampPicture = [];
    this.infoCompare = {};
    this.existChange = {};
    this.subscriptions = [];
    this.url_attachment = localStorage.getItem('url_attachment');
    this.activatedRoute.params.subscribe(params => {
      this.idBrand = params.id;
    });
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.listImageField = {}
    this.listImageDimension = {}
    this.getProductImageDimension()
    this.getProductImageSize()
    this.searchName = {}
    this.headerService.sendTitle('Marcas');
    this.toggleMultimediaSection = true;
    this.switchNewData = false;
    this.headerFixed = false;
    this.brandForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      show_logo_representative: new FormControl(false),
      friendly_url: new FormControl(null),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1500)
      ]),
      image: new FormControl(null),
      salient: new FormControl(null)
    });

    this.videoForm = new FormGroup({
      url: new FormControl(null)
    });

    if (this.idBrand) {
      this.getDataBrand();
    }

    this.onChanges();
  }
  get f() {
    return this.brandForm.controls;
  }
  get g() {
    return this.videoForm.controls;
  }

  onChanges() {
    this.subscriptions.push(this.brandForm.get('name').valueChanges.subscribe(val => {
      this.nameChanged = true;
      this.brandForm.get('friendly_url').setValue(UtilsCode.cleanString(val));
    }));

    this.subscriptions.push(this.brandForm.get('show_logo_representative').valueChanges.subscribe(val => {

      if (val) {
        if (this.lisAddLogoPicture.length <= 0 || this.lisAddLogoPictureMobile <= 0) {
          this.middleService.sendMessage('Marca', 'Debe seleccionar una imagen para los logos', 'error')
          this.brandForm.get('show_logo_representative').setValue(false)
        }
      }
    }));


  }

  upLabel(value, entity) {
    if (value > 0) {

      const oldValue = this[entity][value - 1];

      this[entity][value - 1] = this[entity][value];

      this[entity][value] = oldValue;
    }
  }

  addByName(event, name, selectPicture, nameModel) {

    if (event.key == 'Enter') {
      if (name) {
        this.middleService.sendLoading(true)
        this._attachmentService.getByName(name).subscribe(
          (picture: any) => {

            this[selectPicture][0] = picture.name;
            this.middleService.sendLoading(false)
            this.searchName[nameModel] = null
          }, (error) => {
            this.middleService.sendMessage('Producto', error.error.message, 'error')
            this.middleService.sendLoading(false)
          }
        )
      }

    }
  }

  downLabel(value, entity) {
    if (value < this[entity].length - 1) {
      const oldValue = this[entity][Number(value) + 1];
      this[entity][value + 1] = this[entity][value];
      this[entity][value] = oldValue;
    }
  }

  updatePosition(entity, changeArray) {
    this[changeArray] = [];
    for (let i = 1; i <= this[entity].length; i++) {
      this[changeArray].push(i);
    }
  }



  changePositionBlur(value, newValue, element, event, entity, arrayChangePosition) {
    if ((value + 1) != newValue) {
      this.activeChangePosition(value, newValue - 1, element, entity, arrayChangePosition);
    }
  }

  activeChangePosition(value, newValue, element, entity, arrayChangePosition) {
    this[entity].splice(value, 1);
    this[entity].splice(newValue, 0, element);
    setTimeout(() => {
      this[arrayChangePosition][value] = value + 1;
    }, 0);

    this.updatePosition(entity, arrayChangePosition);

  }

  changePosition(value, newValue, element, event, entity, arrayChangePosition) {
    if (event.key == 'Enter') {
      this.activeChangePosition(value, newValue - 1, element, entity, arrayChangePosition);
    }
  }

  /* changePosition(value, newValue, element, event, entity, arrayChangePosition, actived?) {
    if (event.key == 'Enter') {
      this[entity].splice(value, 1);
      this[entity].splice(newValue, 0, element);
      setTimeout(() => {
        this[arrayChangePosition][value] = value
      }, 0);
      this.updatePosition(entity, arrayChangePosition)
  
    }
  } */

  toggleMultimedia() {
    this.toggleMultimediaSection = !this.toggleMultimediaSection;
  }

  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);
  }

  setImageCompare(request_change, fieldActually, fieldChange, componentName) {
    if (request_change) {
      let newArray = [];
      if (!Array.isArray(request_change[fieldChange])) {
        newArray = Object.assign([], [request_change[fieldChange]]);
      } else {
        newArray = Object.assign([], request_change[fieldChange]);
      }
      if (request_change) {
        this.existChange[fieldActually] = CompareArray.compare(
          this[fieldActually],
          newArray
        );
      }

      if (this.existChange[fieldActually]) {
        this.sendImageCompare(this[fieldActually], newArray, componentName);
      }
    }
  }

  sendImageCompare(arrayActually, arrayChange, componentName) {
    this[componentName].config = {
      arrayActually: arrayActually,
      arrayChange: arrayChange
    };
  }

  /*   seeChangeRequest() {
      this.switchNewData = !this.switchNewData;
      if (this.switchNewData) {
        this.fillInfoBrand(this.dataReplace);
      } else {
        this.getDataBrand();
      }
    } */

  addVideo() {
    if (this.videoForm.get('url').value) {
      this.lisAddGaleryVideos.push(this.videoForm.get('url').value);
      this.videoForm.reset();
      this.updatePosition('lisAddGaleryVideos', 'infoChangePositionVideo');
    }
  }
  acceptModal($event) {
    if ($event.accept) {
      this.deleteBrand();
    }
  }

  acceptRequest() {
    this.answerRequest('approve');
  }

  denyRequest(messageDeny) {
    if (this.denyMessage) {
      this.answerRequest('deny', messageDeny);
      this.showDenyMessage = false;
    }
  }
  closeMessageDeny() {
    this.showDenyMessage = false;
  }

  getProductImageSize() {

    this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'brand' }).subscribe(
      (listInfo: any) => {
        if (listInfo.length > 0) {
          this.listImageField = listInfo[0].value
        }
      }, (error) => {
        this.middleService.sendMessage('Marcas', error.error.message, 'error')
      }
    )
  }

  getProductImageDimension() {

    this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'brand' }).subscribe(
      (listInfo: any) => {
        if (listInfo.length > 0) {
          this.listImageDimension = listInfo[0].value
        }
      }, (error) => {
        this.middleService.sendMessage('Marcas', error.error.message, 'error')
      }
    )
  }
  openMessageDeny() {
    this.denyMessage = null;
    this.showDenyMessage = true;
  }

  answerRequest(answer, messageDeny?) {
    this.middleService.sendLoading(true);
    this.brandService
      .answerRequest(this.idBrand, { answer, messageDeny })
      .subscribe(
        (answerFinish: any) => {
          this.middleService.sendLoading(false);
          this.getDataBrand();
          this.middleService.sendMessage(
            'Solicitud de aprobación',
            'La solicitud ha sido respondida',
            'ok'
          );
        },
        error => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Product',
            error.error.message,
            'error'
          );
        }
      );
  }

  changeStatusMore() {
    this.showMoreButton = !this.showMoreButton;
  }
  dataPictureSave($event) {
    if (this.selectMuti) {
      for (const picture of $event) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = picture;
        } else {
          this[this.selectPicture].push(picture);
        }
      }
    } else {
      if ($event.length > 0) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = $event;
        } else {
          this[this.selectPicture].push($event);
        }
      }
    }
    this.updatePosition('lisAddGaleryPicture', 'infoChangePosition');
  }
  deleteImage(position, field) {

    this[field].splice(position, 1);
    if (field == 'lisAddLogoPicture' || field == 'lisAddLogoPictureMobile') {
      if (this.lisAddLogoPicture.length <= 0 || this.lisAddLogoPictureMobile <= 0) {
        this.brandForm.get('show_logo_representative').setValue(false)
      }
    }

  }
  deleteBrand() {
    this.middleService.sendLoading(true);
    this.brandService.delete(this.idBrand).subscribe(
      deleteInfo => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Marca',
          'La marca ha sido eliminada correctamente',
          'ok'
        );
        this.router.navigate(['/system/brand']);
      },
      error => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage('Marca', error.error.message, 'error');
      }
    );
  }

  fillInfoBrand(dataBrand) {
    this.isSupplier = dataBrand.isSupplier;


    this.lisAddPicture = [];
    if (dataBrand.image_link) {
      this.lisAddPicture.push(dataBrand.image_link);
    }
    this.setImageCompare(
      dataBrand.request_change,
      'lisAddPicture',
      'image_link',
      'compareListPicture'
    );

    this.lisAddPictureMobile = [];
    if (dataBrand.image_link_mobile) {
      this.lisAddPictureMobile.push(dataBrand.image_link_mobile);
    }
    this.setImageCompare(
      dataBrand.request_change,
      'lisAddPictureMobile',
      'image_link_mobile',
      'compareListPictureMobile'
    );



    this.lisAddBanner = [];
    if (dataBrand.image_banner) {
      this.lisAddBanner.push(dataBrand.image_banner);

      this.setImageCompare(
        dataBrand.request_change,
        'lisAddBanner',
        'image_banner',
        'compareBannerImage'
      );
    }
    this.lisAddLogoBanner = [];
    if (dataBrand.image_logo_banner) {
      this.lisAddLogoBanner.push(dataBrand.image_logo_banner);
    }

    this.setImageCompare(
      dataBrand.request_change,
      'lisAddLogoBanner',
      'image_logo_banner',
      'compareLogoImage'
    );

    this.lisAddLogoPicture = [];
    if (dataBrand.image_logo_link) {
      this.lisAddLogoPicture.push(dataBrand.image_logo_link);
    }

    this.listStampPicture = [];

    if (dataBrand.image_stamp) {
      this.listStampPicture.push(dataBrand.image_stamp);
    }

    this.setImageCompare(
      dataBrand.request_change,
      'lisAddLogoPicture',
      'image_logo_link',
      'compareLisAddLogoPicture'
    );


    this.lisAddLogoPictureMobile = [];
    if (dataBrand.image_logo_link_mobile) {
      this.lisAddLogoPictureMobile.push(dataBrand.image_logo_link_mobile);
    }

    this.setImageCompare(
      dataBrand.request_change,
      'lisAddLogoPictureMobile',
      'image_logo_link_mobile',
      'compareLisAddLogoPictureMobile'
    );

    this.lisAddGaleryPicture = [];
    if (dataBrand.galery_image) {
      this.lisAddGaleryPicture = dataBrand.galery_image;
    }

    this.setImageCompare(
      dataBrand.request_change,
      'lisAddGaleryPicture',
      'galery_image',
      'compareLisAddGaleryPicture'
    );
    this.lisAddGaleryVideos = [];
    if (dataBrand.galery_videos) {
      this.lisAddGaleryVideos = dataBrand.galery_videos;
    }

    this.setImageCompare(
      dataBrand.request_change,
      'lisAddGaleryVideos',
      'galery_videos',
      'compareLisAddGaleryVideos'
    );

    this.brandForm.patchValue(dataBrand);
    this.middleService.sendLoading(false);
  }
  getDataBrand() {
    this.middleService.sendLoading(true);
    this.brandService.getById(this.idBrand).subscribe(
      (dataBrand: any) => {
        this.infoCompare = dataBrand;
        this.approve_user = dataBrand.approve_user;
        this.penddingRequest = dataBrand.pending_request;
        if (dataBrand.request) {
          this.typeRequest = dataBrand.request.type;
          if (dataBrand.request_change) {
            this.dataReplace = dataBrand.request_change;
          }
        }
        this.fillInfoBrand(dataBrand);
        // this.middleService.sendLoading(false);
        this.updatePosition('lisAddGaleryPicture', 'infoChangePosition');
        this.updatePosition('lisAddGaleryVideos', 'infoChangePositionVideo');
      },
      err => { }
    );
  }

  returnBrand() {
    if (localStorage.getItem('returnListRequest')) {
      this.router.navigate([localStorage.getItem('returnListRequest')]);
    } else {
      this.router.navigate(['/system/brand']);
    }
  }

  OpenModalDeleteConfirm() {
    const messageModal =
      '¿Esta seguro de eliminar la marca ' + this.brandForm.value.name + ' ?';
    this.dialogConfirm.show('Eliminar Marca', messageModal);
  }

  async validateFriendlyUrl() {
    this.middleService.sendLoading(true);
    if (!this.idBrand) {
      this.brandService.searchFriendlyURL(this.brandForm.get('friendly_url').value).subscribe((res: any) => {
        this.brandForm.get('friendly_url').setValue(res.friendly_url);
        this.saveBrand();
      }, error => {
        this.middleService.sendLoading(false);
        return;
      });
    } else if (this.idBrand && this.nameChanged) {
      this.brandService.searchFriendlyURL(this.brandForm.get('friendly_url').value, this.idBrand).subscribe((res: any) => {
        this.brandForm.get('friendly_url').setValue(res.friendly_url);
        this.saveBrand();
      }, error => {
        this.middleService.sendLoading(false);
        return;
      });
    }
  }

  async saveBrand(navEdit?) {
    this.submitted = true;
    if (!this.brandForm.invalid) {
      const dataSend = Object.assign({}, this.brandForm.value);
      dataSend.image_link = '';
      dataSend.image_logo_link = '';
      dataSend.image_logo_link_mobile = ''
      dataSend.image_banner = '';
      dataSend.image_logo_banner = ''
      dataSend.image_stamp = ''
      if (this.lisAddPicture.length > 0) {
        dataSend.image_link = this.lisAddPicture[0];
      }
      if (this.lisAddPictureMobile.length > 0) {
        dataSend.image_link_mobile = this.lisAddPictureMobile[0];
      }
      if (this.lisAddBanner.length > 0) {
        dataSend.image_banner = this.lisAddBanner[0];
      }
      if (this.lisAddLogoBanner.length > 0) {
        dataSend.image_logo_banner = this.lisAddLogoBanner[0];
      }
      if (this.lisAddLogoPicture.length > 0) {
        dataSend.image_logo_link = this.lisAddLogoPicture[0];
      }

      if (this.listStampPicture.length > 0) {
        dataSend.image_stamp = this.listStampPicture[0]
      }
      if (this.lisAddLogoPictureMobile.length > 0) {
        dataSend.image_logo_link_mobile = this.lisAddLogoPictureMobile[0];
      }
      dataSend.galery_image = this.lisAddGaleryPicture;
      dataSend.galery_videos = this.lisAddGaleryVideos;
      if (this.idBrand) {
        this.brandService.updateBrand(this.idBrand, dataSend).subscribe(
          (infoUpadte: any) => {
            this.middleService.sendLoading(false);
            let messageCreate = 'La marca ha sido actualizada correctamente';
            if (infoUpadte.inRequest) {
              messageCreate =
                'Se ha enviado la solicitud para la edición de la marca';
            }
            this.middleService.sendMessage('Marca', messageCreate, 'ok');
            this.submitted = false;
            this.router.navigate(['/system/brand']);
          },
          error => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              'Marca',
              error.error.message,
              'error'
            );
            this.submitted = false;
          }
        );
      } else {
        this.brandService.saveBrand(dataSend).subscribe(
          (infoSave: any) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              'Marca',
              'La marca ha sido creada correctamente',
              'ok'
            );
            this.router.navigate(['/system/brand']);
            this.submitted = false;
          },
          error => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              'Marca',
              error.error.message,
              'error'
            );
            this.submitted = false;
          }
        );
      }
    } else {
      this.middleService.sendLoading(false);
      this.middleService.sendMessage(
        'Marca',
        'Revise los campos obligatorios',
        'error'
      );
    }
  }

  showWindowMultimedia(field, multi, replacePosition?, maxSize?, maxDimension?) {
    this.replacePosition = replacePosition;
    this.selectMuti = false;
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.noValidDimension = false;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    if (multi) {
      this.multimediaGallery.config.typeInfo = 'multi';
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
