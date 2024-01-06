import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { DynamicTreeViewComponent } from '../../components/dynamic-tree-view/dynamic-tree-view.component';
import { MultimediaGalleryComponent } from '../../components/multimedia-gallery/multimedia-gallery.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/service/category.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { EmailFormService } from 'src/app/shared/service/email-form.service';
import { MapsLocationComponent } from '../../components/maps-location/maps-location.component';
import { ExperienceService } from 'src/app/shared/service/experience.service';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { GroupEmailService } from 'src/app/shared/service/group-email.service';
import { ListInformationComponent } from '../../components/list-information/list-information.component';
import { HeaderService } from '../../components/header/header.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Subscription } from 'rxjs';
import { AttachmentService } from 'src/app/shared/service/attachment.service';
import { SortArray } from 'src/app/utils/sortArray';


@Component({
  selector: 'app-crud-experience',
  templateUrl: './crud-experience.component.html',
  styleUrls: ['./crud-experience.component.scss'],
})
export class CrudExperienceComponent implements OnInit, OnDestroy {
  @ViewChild('mapsLocation', { static: true })
  mapsLocation: MapsLocationComponent;
  @ViewChild('listInformation', { static: false })
  listInformation: ListInformationComponent;
  listImageField: any
  listImageDimension: any
  fieldListAutomatic: Array<any>;
  idExperience: String;
  detailGroupEmail: any;
  experienceForm: FormGroup;
  createBenefit: boolean;
  videoForm: FormGroup;
  groupList: any;
  headerFixed: boolean;
  listTypeButton: Array<any>;
  lisAddGaleryVideos: any;
  listCategory: any;
  listDetailProduct: any;
  lisAddPicture: any;
  lisMainAddPicture: any;
  lisMainAddPictureMobile: any;
  lisMainLogoAddPicture: any;
  lisMainLogoAddPictureMobile: any;
  listDetailAdvantage: any;
  listAdvantage: any;
  listAddress: any;
  advantageInfo: any;
  lisNewAdvantage: any;
  lisNewAdvantage_mobile: any;
  imageMain: any;
  imageMain_mobile: any;
  lisBannerAddPicture: any;
  lisBannerAddPictureMobile: any;
  lisBannerLogoAddPicture: any;
  lisBannerLogoAddPictureMobile: any;
  listCurrency: any;
  listFormContact: any;
  listTypePrice: any;
  listTypeEmailForm: any;
  listActionEmailForm: any;
  listMainAccionEmailForm: any;
  listGroupEmail: any;
  objChange: any;
  nameWindow: any;
  selectCategory: any;
  selectPicture: any;
  showMoreButton: boolean;
  floatOption: boolean;
  imagePositionMobile: any;
  imageShowSlider: string;
  url_attachment: string;
  selectMuti: any;
  submitted: boolean;
  showAddDetail: boolean;
  updateDetailBenefit: any;
  oldBenefitData: any;
  typePrice: any;
  submittedBenefit: boolean;
  nameChanged = false;
  listDetailExperience = [];
  listInitialDetail = [
    { name: 'Título', value: 'titulo' },
    { name: 'Descripción', value: 'description' },
    { name: 'Creada por', value: 'creada_por' },
    { name: 'Condiciones', value: 'condiciones' },
  ];
  valueAddDescription: any;
  tinyEditorConfig;

  @ViewChild('selectCategory', { static: true })
  selectableCategory: DynamicTreeViewComponent;

  @ViewChild(FileUploadComponent, { static: false })
  uploadImage: FileUploadComponent;
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild('dialogDelete', { static: true })
  dialogConfirm: DialogConfirmComponent;
  Subscriptions: Array<Subscription>;
  toogleProduct: boolean;
  toggleMultimediaSection: boolean;
  toogleCategories: boolean;
  infoChangePosition: Array<any>;
  infoChangePositionVideo: Array<any>;
  replacePosition;
  currentAddress;
  searchName: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _ldvService: LdvService,
    private _experienceService: ExperienceService,
    private serviceLdv: LdvService,
    private serviceCategory: CategoryService,
    private middleService: MiddleService,
    private router: Router,
    private _groupEmailService: GroupEmailService,
    private _emailFormService: EmailFormService,
    private headerService: HeaderService,
    private _attachmentService: AttachmentService
  ) {
    this.listImageField = {}
    this.listImageDimension = {}
    this.infoChangePosition = [];
    this.infoChangePositionVideo = [];
    this.selectCategory = [];
    this.imagePositionMobile = 1;
    this.detailGroupEmail = [];
    this.url_attachment = localStorage.getItem('url_attachment');
    this.lisAddGaleryVideos = [];
    this.lisAddPicture = [];
    this.listAdvantage = [];
    this.lisMainAddPicture = [];
    this.lisMainAddPictureMobile = [];
    this.lisMainLogoAddPicture = [];
    this.lisMainLogoAddPictureMobile = [];
    this.lisNewAdvantage = [];
    this.lisNewAdvantage_mobile = [];
    this.imageMain = [];
    this.imageMain_mobile = [];
    this.listDetailAdvantage = [];
    this.listActionEmailForm = [];
    this.listMainAccionEmailForm = [];
    this.listAddress = [];
    this.lisBannerAddPicture = [];
    this.lisBannerAddPictureMobile = [];
    this.listDetailProduct = [];
    this.lisBannerLogoAddPicture = [];
    this.lisBannerLogoAddPictureMobile = [];
    this.listFormContact = [];
    this.listGroupEmail = [];
    this.advantageInfo = {};
    this.showAddDetail = false;
    this.submitted = false;

    this.idExperience = this.activatedRoute.snapshot.params['idExperience'];
    this.nameWindow = 'Experiencias';
    this.videoForm = new FormGroup({
      url: new FormControl(null, [Validators.required]),
    });
    this.tinyEditorConfig = {
      /*  height: '200px', */
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print',
        'preview anchor searchreplace visualblocks code',
        'fullscreen insertdatetime media table paste',
        'help wordcount fullscreen'
      ],
      toolbar:
        'undo redo | formatselect | fontsizeselect | bold italic | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent forecolor backcolor | table tabledelete | fullscreen'
    };
  }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.searchName = {}
    this.Subscriptions = new Array<Subscription>();
    this.toogleProduct = true;
    this.toggleMultimediaSection = true;
    this.toogleCategories = true;
    this.valueAddDescription = null;
    this.listDetailExperience = JSON.parse(
      JSON.stringify(this.listInitialDetail)
    );
    this.submittedBenefit = false;
    this.headerService.sendTitle('Experiencias');
    this.listTypeButton = [
      {
        value: 'primary',
        name: 'Primario',
      },
      {
        value: 'secondary',
        name: 'Secundario',
      },
    ];

    this.headerFixed = false;
    this.typePrice = [
      {
        key: 'fixed',
        value: 'Fijo',
      },
      {
        key: 'range',
        value: 'Rango',
      },
    ];
    this.videoForm = new FormGroup({
      url: new FormControl(null),
    });
    this.experienceForm = new FormGroup({
      active: new FormControl(false, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email_contact: new FormControl(null),
      group_email: new FormControl(null),
      schedule: new FormControl(''),
      phone: new FormControl(''),
      group: new FormControl('', [Validators.required]),
      detail_list: new FormControl(),
      image_cover: new FormControl(),
      image_logo_cover: new FormControl(),
      image_banner: new FormControl(),
      image_logo_banner: new FormControl(),
      image_banner_mobile: new FormControl(),
      image_logo_banner_mobile: new FormControl(),

      image_cover_mobile: new FormControl(),
      image_logo_cover_mobile: new FormControl(),
      categories: new FormControl(),
      videos_link: new FormControl(''),
      galery_videos: new FormControl(''),
      images_link: new FormControl(''),
      list_advantage: new FormControl(),
      list_action_email_form: new FormControl(),
      list_main_action_email_form: new FormControl(),
      list_address: new FormControl(),
      search_sku: new FormControl(''),
      friendly_url: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      meta_description: new FormControl('', [Validators.required]),
    });

    this.onChanges();
    this.getInfoIni();

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
  getInfoIni() {
    this.middleService.sendLoading(true);
    this.Subscriptions.push(Observable.forkJoin([
      this.getListGroupEmail(),
      this.getEmailForm(),
      this.getListGroup(),
      this.setPrice(),
      this.setCurrency(),
      this.getProductImageSize(),
      this.getProductImageDimension(),
      this.getLdvAutomaticSetBenefit(),
    ]
    ).subscribe(
      () => {
        this.middleService.sendLoading(false);
        if (this.idExperience) {
          this.getDataExperience();
        }

      }
    ));
  }



  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'experience' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageField = listInfo[0].value
          }
          resolve({})
        }, (error) => {
          resolve({})
          this.middleService.sendMessage('Producto', error.error.message, 'error')
        }
      )
    });
    return waitPromise;
  }

  getProductImageDimension() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'experience' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageDimension = listInfo[0].value
          }
          resolve({})
        }, (error) => {
          this.middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }

  setPrice() {
    const waitPromise = new Promise((resolve, reject) => {
      this.serviceLdv.getLdvDetail('PRICE-TYPE').subscribe(
        (infoData) => {
          this.listTypePrice = JSON.stringify(infoData);
          resolve({});
        },
        (error) => { }
      );
    });
    return waitPromise;
  }

  setCurrency() {
    const waitPromise = new Promise((resolve, reject) => {
      this.serviceLdv.getLdvDetail('SONR-CURRENCY-EXPERIENCE').subscribe(
        (infoData) => {
          this.listCurrency = infoData;
          resolve({});
        },
        (error) => { }
      );
    });
    return waitPromise;
  }

  get f() {
    return this.experienceForm.controls;
  }
  get g() {
    return this.videoForm.controls;
  }

  getLdvAutomaticSetBenefit() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('AUTOFILL-BENEFIT').subscribe(
        (fieldList: Array<any>) => {
          this.fieldListAutomatic = fieldList;
          resolve({});
        }, (error) => {
          this.middleService.sendMessage('Experiencias', error.error.message, 'error');
          resolve({});
        }
      );
    });
    return waitPromise;
  }

  toogleOption() {
    this.toogleProduct = !this.toogleProduct;
  }

  toggleMultimedia() {
    this.toggleMultimediaSection = !this.toggleMultimediaSection;
  }

  toogleCategoriesPanel() {
    this.toogleCategories = !this.toogleCategories;
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

  onChanges(): void {
    this.experienceForm.get('group').valueChanges.subscribe((val) => {
      this.getListCategory(val);
    });

    this.experienceForm.get('group_email').valueChanges.subscribe((val) => {
      this.selectDetailGroup(val);
    });

    this.experienceForm.get('name').valueChanges.subscribe((val) => {
      this.nameChanged = true;
      this.experienceForm.get('friendly_url').setValue(UtilsCode.cleanString(val));
    });
  }

  deleteDetail(position) {
    this.listDetailAdvantage.splice(position, 1);
  }
  deleteDetailAdavnge(position) {
    this.listDetailAdvantage.splice(position, 1);
    this.cleanTypeDetail();
  }

  openListContact(val) {
    this.selectDetailGroup(val);
    this.listInformation.open(this.detailGroupEmail);
    console.log(this.listMainAccionEmailForm)
  }

  clearEmailCopy(field, position) {
    delete this[field][position].copy_email
    console.log(this[field][position])
  }

  selectDetailGroup(val) {
    if (this.listGroupEmail) {
      const indexGroup = this.listGroupEmail.findIndex(
        (item) => item._id == val
      );
      if (indexGroup >= 0) {
        this.detailGroupEmail = this.listGroupEmail[indexGroup].list_contact;
      } else {
        this.detailGroupEmail = [];
      }
    }
  }

  updatePosition(entity, changeArray) {
    this[changeArray] = new Array();
    this[changeArray] = [];
    for (let i = 1; i <= this[entity].length; i++) {
      this[changeArray].push(i);
    }
  }

  upLabelActive(event) {
    if (event) {
      this.upLabel(event.value, event.entity);
    }
  }
  upLabel(value, entity) {
    if (value > 0) {

      const oldValue = this[entity][value - 1];

      this[entity][value - 1] = this[entity][value];

      this[entity][value] = oldValue;
    }
  }

  downLabelActive(event) {
    if (event) {
      this.upLabel(event.value, event.entity);
    }
  }

  downLabel(value, entity) {
    if (value < this[entity].length - 1) {
      const oldValue = this[entity][Number(value) + 1];
      this[entity][value + 1] = this[entity][value];
      this[entity][value] = oldValue;
    }
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show(
      'Eliminar Experiencia',
      '¿Esta seguro de eliminar?'
    );
  }
  cleanTypeDetail() {
    this.listDetailExperience = JSON.parse(
      JSON.stringify(this.listInitialDetail)
    );

    for (const description of this.listDetailAdvantage) {
      const indexList = this.listDetailExperience.findIndex(
        (item) => item.value == description.field
      );

      if (indexList >= 0) {
        this.listDetailExperience.splice(indexList, 1);
      }
    }
  }

  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);
  }

  // listDetailAdvantage
  addDetailAdvantage(field) {
    /* const searchAction = this.listDetailExperience.find(
      (item) => item.value == this.valueAddDescription
    );
    if (searchAction) {
      this[field].push({
        title: searchAction.name,
        field: this.valueAddDescription,
        description: '',
      });
      this.cleanTypeDetail();
    } */
    this[field].push({
      title: '',
      field: '',
      description: '',
    });
  }

  addDetail(field) {
    this.toogleProduct = true;
    this[field].push({ title: '', description: '' });
  }

  deletItem() {
    this._experienceService.delete(this.idExperience).subscribe(
      (data) => {
        this.middleService.sendMessage(
          'Experiencias',
          'La experiencia  ha sido eliminada',
          'ok'
        );
        this.router.navigate(['/system/experience']);
      },
      (error) => { }
    );
  }

  saveAdvantage(action) {
    this.submittedBenefit = true;
    if (
      this.advantageInfo.title &&
      this.lisNewAdvantage.length > 0 &&
      this.lisNewAdvantage_mobile.length > 0 &&
      this.imageMain.length > 0 &&
      this.imageMain_mobile.length > 0 &&
      this.listDetailAdvantage.length > 0
    ) {
      if (this.lisNewAdvantage.length > 0) {
        this.advantageInfo.image_thumbnail = this.lisNewAdvantage[0];
      }
      if (this.lisNewAdvantage_mobile.length > 0) {
        this.advantageInfo.image_thumbnail_mobile = this.lisNewAdvantage_mobile[0];
      }
      if (this.imageMain.length > 0) {
        this.advantageInfo.image_description = this.imageMain[0];
      }
      if (this.imageMain_mobile.length > 0) {
        this.advantageInfo.image_description_mobile = this.imageMain_mobile[0];
      }
      if (this.listDetailAdvantage.length > 0) {
        this.advantageInfo.description = this.listDetailAdvantage;
      }
      if (action == 'create') {
        this.listAdvantage.push(this.advantageInfo);
      }
      if (action == 'update') {
        this.listAdvantage[this.updateDetailBenefit] = this.advantageInfo;
      }
      this.showAddDetail = false;

      this.setPosition();
    }
  }

  addVideo() {
    if (this.videoForm.get('url').value) {
      this.lisAddGaleryVideos.push(this.videoForm.get('url').value);
      this.videoForm.reset();
      this.updatePosition('lisAddGaleryVideos', 'infoChangePositionVideo');
    }
  }

  closeAdvange() {
    this.showAddDetail = false;
  }
  closeWindow() {
    this.showAddDetail = false;
  }

  checkedCategory() {
    if (this.listCategory) {
      for (const category of this.selectCategory) {
        for (const node of this.listCategory) {
          this.recursiveCheckedCheck(node, category, 'children');
        }
      }
    }
  }

  searchCategoryChecked(listObj) {
    const indexItem = this.selectCategory.findIndex(
      (item) => item == listObj._id
    );
    if (indexItem >= 0) {
      this.selectCategory.splice(indexItem, 1);
    }
    if (!listObj.children) {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
      }
    } else {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
      }
      for (const categoryChildren of listObj.children) {
        this.searchCategoryChecked(categoryChildren);
      }
    }
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
    this.updatePosition('lisAddPicture', 'infoChangePosition');
  }

  delete(field, position) {
    this[field].splice(position, 1);
  }

  changePositionActive(eventActive) {
    if (eventActive) {

      this.changePosition(
        eventActive.value,
        eventActive.newValue,
        eventActive.element.activation,
        eventActive.event,
        eventActive.entity, 'infoChangePosition', true);
    }
  }

  changePositionBlur(value, newValue, element, event, entity, arrayChangePosition, actived?) {
    if ((value + 1) != newValue) {
      this.activeChangePosition(value, newValue - 1, element, entity, arrayChangePosition, actived);
    }
  }

  activeChangePosition(value, newValue, element, entity, arrayChangePosition, actived?) {
    this[entity].splice(value, 1);
    this[entity].splice(newValue, 0, element);
    setTimeout(() => {
      this[arrayChangePosition][value] = value + 1;
    }, 0);
    if (actived) {
      this.setPosition();
    } else {
      this.updatePosition(entity, arrayChangePosition);
    }
  }

  changePosition(value, newValue, element, event, entity, arrayChangePosition, actived?) {

    if (event.key == 'Enter') {
      this.activeChangePosition(value, newValue - 1, element, entity, arrayChangePosition, actived);
    }
  }

  deleteImageBase(position, field) {
    this[field].splice(position, 1);
    if (position > this[field].length) {
      this.imagePositionMobile = this[field].length;
      position = this[field].length;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
    this.updatePosition('lisAddPicture', 'infoChangePosition');
  }

  deleteImage(position, field) {
    this[field].splice(position, 1);
    if (position > this[field].length) {
      this.imagePositionMobile = this[field].length;
      position = this[field].length;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
  }


  setPosition() {
    for (let i = 0; i < this.listAdvantage.length; i++) {
      this.listAdvantage[i].position = i + 1;
      this.listAdvantage[i].newPosition = i + 1;
    }
  }
  getDataExperience() {
    this.middleService.sendLoading(true);
    this._experienceService.getById(this.idExperience).subscribe(
      (experienceData: any) => {
        this.experienceForm.patchValue(experienceData);
        this.listDetailProduct = experienceData.detail_list;
        this.lisAddPicture = experienceData.images_link;
        this.listAddress = experienceData.list_address;
        this.lisAddGaleryVideos = experienceData.videos_link;
        for (const experience of experienceData.list_action_email_form) {
          experience.backListField = experience.listField;
          this.addListField(experience);
          if (experience.fieldListAutomatic && experience.backListField &&
            experience.fieldListAutomatic.length > 0 && experience.backListField.length > 0) {
            experience.fieldListAutomatic[0].field_replace = experience.backListField[0].field_replace;
          }
        }

        this.listActionEmailForm = experienceData.list_action_email_form;
        this.listMainAccionEmailForm =
          experienceData.list_main_action_email_form;
        this.listAdvantage = experienceData.list_advantage;
        this.setPosition();
        this.selectCategory = experienceData.categories;

        if (experienceData.image_cover) {
          this.lisMainAddPicture.push(experienceData.image_cover);
        }

        if (experienceData.image_cover_mobile) {
          this.lisMainAddPictureMobile.push(experienceData.image_cover_mobile);
        }

        if (experienceData.image_logo_cover) {
          this.lisMainLogoAddPicture.push(experienceData.image_logo_cover);
        }

        if (experienceData.image_logo_cover_mobile) {
          this.lisMainLogoAddPictureMobile.push(
            experienceData.image_logo_cover_mobile
          );
        }

        if (experienceData.image_banner) {
          this.lisBannerAddPicture.push(experienceData.image_banner);
        }

        if (experienceData.image_banner_mobile) {
          this.lisBannerAddPictureMobile.push(
            experienceData.image_banner_mobile
          );
        }

        if (experienceData.image_logo_banner) {
          this.lisBannerLogoAddPicture.push(experienceData.image_logo_banner);
        }

        if (experienceData.image_logo_banner_mobile) {
          this.lisBannerLogoAddPictureMobile.push(
            experienceData.image_logo_banner_mobile
          );
        }
        this.updatePosition('lisAddPicture', 'infoChangePosition');
        this.updatePosition('lisAddGaleryVideos', 'infoChangePositionVideo');
        this.middleService.sendLoading(false);
      },
      (error) => {
        this.middleService.sendLoading(false);
      }
    );
  }

  getListGroupEmail() {
    const waitPromise = new Promise((resolve, reject) => {
      this._groupEmailService.getList().subscribe(
        (listGroup) => {
          this.listGroupEmail = listGroup;
          this.listGroupEmail = SortArray.orderArrayAlphabetical(this.listGroupEmail, 'name');
          resolve({});
        },
        (error) => {
          this.middleService.sendMessage(
            this.nameWindow,
            error.error.message,
            'error'
          );
        }
      );
    });
    return waitPromise;
  }

  getListCategory(group) {
    this.middleService.sendLoading(true);
    this.serviceCategory.getAllCategory(group).subscribe(
      (listCategory: any) => {
        this.middleService.sendLoading(false);
        this.listCategory = listCategory;
        this.selectableCategory.fillDataSource(this.listCategory);
        this.checkedCategory();
      },
      () => { }
    );
  }

  getListGroup() {

    const waitPromise = new Promise((resolve, reject) => {
      this._categoryService.getListCategoryGroup().subscribe((listGroup: any) => {
        this.groupList = listGroup.filter(
          (item) => item.typeGroupCategory.ref1 == 'experience'
        );
      });
      resolve({});
      /*  this._categoryService.getListCategoryGroup().subscribe((listGroup: any) => {
         const searchExperience = listGroup.find(
           (item) => item.name == "Experiencias"
         );
         if (searchExperience) {
           this.groupList = listGroup;
           this.experienceForm.get("group").setValue(searchExperience._id);
         }
       }); */
    });
    return waitPromise;
  }

  async getEmailForm() {
    const waitPromise = new Promise((resolve, reject) => {
      this._emailFormService.getListEmailForm().subscribe((listEmail) => {
        this.listTypeEmailForm = listEmail;
        this.listTypeEmailForm = SortArray.orderArrayAlphabetical(this.listTypeEmailForm, 'name');
        resolve({});
      });
    });
    return waitPromise;
  }

  addListField(formEmail) {
    formEmail.fieldListAutomatic = JSON.parse(JSON.stringify(this.fieldListAutomatic));
    const indexType = this.listTypeEmailForm.findIndex(item => item._id == formEmail.email_form);
    if (indexType >= 0) {

      formEmail.listField = this.listTypeEmailForm[indexType].request_field;
      formEmail.listField = SortArray.orderArrayAlphabetical(formEmail.listField, 'name');
    }
  }

  updateSlug(event) {
    this.advantageInfo.slug = UtilsCode.cleanString(event);
  }
  newAdvantage() {
    this.submittedBenefit = false;
    this.advantageInfo = {};
    this.advantageInfo.listPrice = JSON.parse(this.listTypePrice);
    this.listDetailExperience = JSON.parse(
      JSON.stringify(this.listInitialDetail)
    );

    this.lisNewAdvantage = [];
    this.lisNewAdvantage_mobile = [];
    this.imageMain = [];
    this.imageMain_mobile = [];
    this.listDetailAdvantage = [];
    this.showAddDetail = true;
    this.updateDetailBenefit = null;
    this.createBenefit = true;
  }
  newActionForm(field) {
    if (!this[field]) {
      this[field] = [];
    }
    /* this[field].push({}); */
    const newObj: any = {}
    this[field] = [newObj, ...this[field]]
  }
  openAdvantageModal(event) {
    this.openAdvantage(event.activation, event.index);
  }
  deleteAdvantage(event) {
    this.deleteImage(event.index, 'listAdvantage');
  }
  openAdvantage(infoOpen, position) {
    this.oldBenefitData = Object.assign({}, infoOpen);
    this.advantageInfo = {};
    this.listDetailAdvantage = infoOpen.description;
    this.advantageInfo.title = infoOpen.title;
    this.advantageInfo.active = infoOpen.active;
    this.advantageInfo._id = infoOpen._id;
    this.lisNewAdvantage = [];
    this.lisNewAdvantage_mobile = [];
    this.imageMain = [];
    this.imageMain_mobile = [];
    if (infoOpen.listPrice.length > 0) {
      this.advantageInfo.listPrice = infoOpen.listPrice;
    } else {
      this.advantageInfo.listPrice = JSON.parse(this.listTypePrice);
    }
    if (infoOpen.image_thumbnail) {
      this.lisNewAdvantage.push(infoOpen.image_thumbnail);
    }
    if (infoOpen.image_thumbnail_mobile) {
      this.lisNewAdvantage_mobile.push(infoOpen.image_thumbnail_mobile);
    }
    if (infoOpen.image_description) {
      this.imageMain.push(infoOpen.image_description);
    }
    if (infoOpen.image_description_mobile) {
      this.imageMain_mobile.push(infoOpen.image_description_mobile);
    }
    this.showAddDetail = true;
    this.updateDetailBenefit = position;
    this.createBenefit = false;
    if (!this.advantageInfo.slug) {
      this.updateSlug(this.advantageInfo.title);
    }
    this.cleanTypeDetail();
  }

  openMap() {
    this.mapsLocation.open();
  }

  editAddress(lat, lng, pos, address, objAddress) {
    this.currentAddress = objAddress;
    this.mapsLocation.open(lat, lng, pos, address);
  }

  recursiveCheckedCheck(node: any, categorieSearch, statusSearch) {
    if (!node.children) {
      if (node._id === categorieSearch) {
        node.checked = true;
      }
    } else {
      if (node._id === categorieSearch) {
        node.checked = true;
      }

      for (const children of node.children) {
        this.recursiveCheckedCheck(children, categorieSearch, statusSearch);
      }
    }
  }

  returnExperience() {
    this.router.navigate(['/system/experience']);
  }

  validateUrlAndSave() {
    this.submitted = true;
    this.middleService.sendLoading(true);
    if (!this.idExperience) {
      this._experienceService.searchFriendlyURL(this.experienceForm.get('friendly_url').value).subscribe((res: any) => {
        this.experienceForm.get('friendly_url').setValue(res.friendly_url);
        this.saveExperience();
      }, error => {
        this.middleService.sendLoading(false);
      });
    } else if (this.idExperience && this.nameChanged) {
      this._experienceService.searchFriendlyURL(this.experienceForm.get('friendly_url').value, this.idExperience).subscribe((res: any) => {
        this.experienceForm.get('friendly_url').setValue(res.friendly_url);
        this.saveExperience();
      }, error => {
        this.middleService.sendLoading(false);
      });
    } else {
      this.saveExperience();
    }
  }

  saveExperience() {
    if (this.listCategory) {
      for (const category of this.listCategory) {
        this.searchCategoryChecked(category);
      }
    }
    if (this.experienceForm.invalid) {
      this.middleService.sendLoading(false);
      this.middleService.sendMessage(
        'Experiencias',
        'Revise los campos obligatorios',
        'error'
      );
    } else {
      let continueAction = true;
      let continueButton = true;
      for (const action of this.listMainAccionEmailForm) {
        if (
          !action.button_name ||
          !action.email_form ||
          !action.type_button ||
          !action.email
        ) {
          continueAction = false;
        }
      }

      for (const buttons of this.listActionEmailForm) {
        if (
          !buttons.button_name ||
          !buttons.email_form ||
          !buttons.type_button ||
          !buttons.email
        ) {
          continueButton = false;
        }
      }

      if (continueAction) {
        if (continueButton) {
          for (const detail of this.listDetailProduct) {
            detail.field = UtilsCode.cleanString(detail.title);
          }

          for (const advantage of this.listAdvantage) {
            for (const detail of advantage.description) {
              detail.field = UtilsCode.cleanString(detail.title);
            }
          }
          this.experienceForm
            .get('detail_list')
            .setValue(this.listDetailProduct);
          this.experienceForm.get('images_link').setValue(this.lisAddPicture);
          this.experienceForm.get('list_address').setValue(this.listAddress);
          this.experienceForm
            .get('videos_link')
            .setValue(this.lisAddGaleryVideos);
          this.experienceForm
            .get('list_action_email_form')
            .setValue(this.listActionEmailForm);

          this.experienceForm
            .get('list_main_action_email_form')
            .setValue(this.listMainAccionEmailForm);

          this.experienceForm
            .get('list_advantage')
            .setValue(this.listAdvantage);
          this.experienceForm.get('categories').setValue(this.selectCategory);
          if (this.lisMainAddPicture.length > 0) {
            this.experienceForm
              .get('image_cover')
              .setValue(this.lisMainAddPicture[0]);
          } else {
            this.experienceForm.get('image_cover').setValue('');
          }

          if (this.lisMainAddPictureMobile.length > 0) {
            this.experienceForm
              .get('image_cover_mobile')
              .setValue(this.lisMainAddPictureMobile[0]);
          } else {
            this.experienceForm.get('image_cover_mobile').setValue('');
          }

          if (this.lisAddGaleryVideos.length > 0) {
            this.experienceForm
              .get('galery_videos')
              .setValue(this.lisAddGaleryVideos);
          } else {
            this.experienceForm.get('galery_videos').setValue('');
          }
          if (this.lisMainLogoAddPicture.length > 0) {
            this.experienceForm
              .get('image_logo_cover')
              .setValue(this.lisMainLogoAddPicture[0]);
          } else {
            this.experienceForm.get('image_logo_cover').setValue('');
          }

          if (this.lisMainLogoAddPictureMobile.length > 0) {
            this.experienceForm
              .get('image_logo_cover_mobile')
              .setValue(this.lisMainLogoAddPictureMobile[0]);
          } else {
            this.experienceForm.get('image_logo_cover_mobile').setValue('');
          }

          if (this.lisBannerAddPicture.length > 0) {
            this.experienceForm
              .get('image_banner')
              .setValue(this.lisBannerAddPicture[0]);
          } else {
            this.experienceForm.get('image_banner').setValue('');
          }

          if (this.lisBannerAddPictureMobile.length > 0) {
            this.experienceForm
              .get('image_banner_mobile')
              .setValue(this.lisBannerAddPictureMobile[0]);
          } else {
            this.experienceForm.get('image_banner_mobile').setValue('');
          }

          if (this.lisBannerLogoAddPicture.length > 0) {
            this.experienceForm
              .get('image_logo_banner')
              .setValue(this.lisBannerLogoAddPicture[0]);
          } else {
            this.experienceForm.get('image_logo_banner').setValue('');
          }

          if (this.lisBannerLogoAddPictureMobile.length > 0) {
            this.experienceForm
              .get('image_logo_banner_mobile')
              .setValue(this.lisBannerLogoAddPictureMobile[0]);
          } else {
            this.experienceForm.get('image_logo_banner_mobile').setValue('');
          }

          if (this.idExperience) {
            this._experienceService
              .update(this.idExperience, this.experienceForm.value)
              .subscribe(
                (updateInfo) => {
                  this.submitted = false;
                  this.middleService.sendLoading(false);
                  this.middleService.sendMessage(
                    'Experiencia',
                    'La experiencia ha sido actualizada correctamente',
                    'ok'
                  );
                  this.router.navigate(['/system/experience']);
                },
                (error) => {
                  this.middleService.sendLoading(false);
                  console.log(error);
                  this.middleService.sendMessage(
                    'Experiencia',
                    error.error.message,
                    'error'
                  );
                }
              );
          } else {
            this._experienceService.create(this.experienceForm.value).subscribe(
              (data: any) => {
                // createdId
                this.middleService.sendLoading(false);
                this.router.navigate(['/system/experience']);
                this.middleService.sendMessage(
                  'Experiencia',
                  'La experiencia ha sido creada correctamente',
                  'ok'
                );
              },
              (error) => {
                this.middleService.sendLoading(false);
                this.middleService.sendMessage(
                  'Experiencia',
                  error.error.message,
                  'error'
                );
              }
            );
          }
        } else {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Experiencia',
            'Revise los botones de acción de beneficios, todos los campos son obligatorios',
            'error'
          );
        }
      } else {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Experiencia',
          'Revise los botones de de acción, todos los campos son obligatorios',
          'error'
        );
      }
    }
  }

  showWindowMultimedia(field, multi, replacePosition?, maxSize?, maxDimension?) {
    this.replacePosition = replacePosition;
    this.selectMuti = false;
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    this.multimediaGallery.config.noValidDimension = false;
    if (multi) {
      this.multimediaGallery.config.typeInfo = 'multi';
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }

  getInfoMap(infoMaps) {
    const { newLocation, pos } = infoMaps;
    let map: any = {};
    if (pos !== undefined) {
      map = this.currentAddress;
      map.lat = newLocation.lat;
      map.lng = newLocation.lng;
      map.address = newLocation.address;
      /* this.listAddress[pos] = map; */
    } else {
      map.lat = newLocation.lat;
      map.lng = newLocation.lng;
      map.address = newLocation.address;
      map.phone = '';
      this.listAddress.push(map);
    }
  }

  validateInput(event: KeyboardEvent) {
    UtilsCode.validatePhoneInput(event);
  }

  ngOnDestroy() {
    for (const subs of this.Subscriptions) {
      subs.unsubscribe();
    }
  }

}
