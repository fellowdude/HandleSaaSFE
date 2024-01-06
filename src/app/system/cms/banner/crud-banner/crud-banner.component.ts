import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  HostListener
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileUploadComponent } from 'src/app/system/components/file-upload/file-upload.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { DateRangeComponent } from 'src/app/system/components/date-range/date-range.component';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { BlockService } from 'src/app/shared/service/block.service';
import { MultimediaGalleryComponent } from 'src/app/system/components/multimedia-gallery/multimedia-gallery.component';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { HeaderService } from 'src/app/system/components/header/header.service';
import { DialogConfirmComponent } from 'src/app/system/components/dialog-confirm/dialog-confirm.component';
import { MatOption, MatSelectChange } from '@angular/material';
import { CategoryService } from 'src/app/shared/service/category.service';
import { CampaignService } from 'src/app/shared/service/campaign.service';
import { BrandService } from '../../../../shared/service/brand.service';
import { ProductService } from '../../../../shared/service/product.service';
import { DynamicTreeViewComponent } from '../../../components/dynamic-tree-view/dynamic-tree-view.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ExperienceService } from 'src/app/shared/service/experience.service';
import { SortArray } from 'src/app/utils/sortArray';
@Component({
  selector: "app-crud-banner",
  templateUrl: "./crud-banner.component.html",
  styleUrls: ["./crud-banner.component.scss"],
})
export class CrudBannerComponent implements OnInit, OnDestroy {
  listImageField: any
  listImageDimension: any
  idBanner: boolean;
  bannerForm: FormGroup;
  selectPicture: any;
  blockForm: FormGroup;
  listAddElement: any;
  idsearchBanner: any;
  imageAdd: any;
  showAddNewElement: boolean;
  listOptionAddElement: any;
  listTypeBlock: any;
  typeBlockSelect: any;
  submittedElement: any;
  submitBanner: any;
  updateElementId: any;
  objChange: any;
  productSelected: any;
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild(FileUploadComponent, { static: false })
  dateRange: DateRangeComponent;
  @ViewChild("dialogDelete", { static: false })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("daterange", { static: false }) date_rage: DateRangeComponent;
  dateRangeSuscription: Subscription;
  url_attachment: string;
  selectRedirectType: string;
  selectedBannerOption: string;
  selectedBannerOptionChild: string;
  directSelectedOptionChild: string;
  urlPermitted: Array<any>;
  redirectOptions: Array<any>;
  redirectOptionChildren: Array<any>;
  redirectOptionChildrenCategories: Array<any>;
  selectedExperienceForCompare: string;
  redirectTypes: Array<any>;
  listProduct: Array<string>;
  headerFixed: boolean;
  editRedirect: boolean;
  tinyEditorConfig;
  listDetail: Array<any>
  constructor(
    private activatedRoute: ActivatedRoute,
    private ldvService: LdvService,
    private router: Router,
    private middleService: MiddleService,
    private blockService: BlockService,
    private headerService: HeaderService,
    private categoryService: CategoryService,
    private campaignService: CampaignService,
    private brandService: BrandService,
    private productService: ProductService,
    private experienceService: ExperienceService
  ) {
    this.listImageField = {}
    this.urlPermitted = [];
    this.listAddElement = [];
    this.listProduct = [];
    this.url_attachment = localStorage.getItem('url_attachment');
    this.tinyEditorConfig = {
      height: "200px",
      menubar: false,
      plugins: [
        "advlist autolink lists link image charmap print",
        "preview anchor searchreplace visualblocks code",
        "fullscreen insertdatetime media table paste",
        "help wordcount autoresize fullscreen",
      ],
      toolbar:
        "undo redo | formatselect | fontsizeselect | bold italic | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent forecolor backcolor | table tabledelete | fullscreen",
    };
  }

  @HostListener("window:scroll", ["$event"]) private onWindowScroll(
    $event: Event
  ): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.listDetail = []
    this.editRedirect = false;
    this.headerService.sendTitle("Banner");
    this.headerFixed = false;
    this.idBanner = false;
    this.showAddNewElement = false;
    this.listTypeBlock = [];
    this.submittedElement = false;
    this.submitBanner = false;
    this.bannerForm = new FormGroup({
      active: new FormControl(true, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      transition_time: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    this.blockForm = new FormGroup({
      type_banner: new FormControl(null),
      add_video: new FormControl(null),
      video_description: new FormControl(null),
      add_text: new FormControl(null),
      select_type: new FormControl(null),
      value_add: new FormControl(null),
      transition_second: new FormControl(0, [Validators.required]),
      button_label: new FormControl(null),
      redirect: new FormControl(null),
      redirectMobile: new FormControl(null),
      redirect_complete: new FormControl(null),
      text_info: new FormControl(null),
      subtitle: new FormControl(null),
      date_start: new FormControl(null),
      date_end: new FormControl(null),
      hour_start: new FormControl(null),
      hour_end: new FormControl(null),
      redirectOption: new FormControl(null),
      redirectOptionChild: new FormControl(null),
      redirectOptionChildCategory: new FormControl(null),
      redirectType: new FormControl(null),
      search_product: new FormControl(null),
    });
    this.getProductImageSize()
    this.getProductImageDimension()
    this.dateRangeSuscription = this.middleService
      .getDateRange()
      .subscribe((dataRangeCalendar) => {
        this.activatedRoute.params.subscribe((params) => {
          this.idsearchBanner = params.id;
        });
        switch (dataRangeCalendar.fieldChange) {
          case "popup": {
            this.blockForm
              .get("date_start")
              .setValue(dataRangeCalendar.data.date_start);
            this.blockForm
              .get("date_end")
              .setValue(dataRangeCalendar.data.date_end);
            this.blockForm
              .get("hour_start")
              .setValue(dataRangeCalendar.data.hour_start);
            this.blockForm
              .get("hour_end")
              .setValue(dataRangeCalendar.data.hour_end);

            break;
          }
        }
      });
    this.ldvService.getLdvDetail("SONR-TYPE-ADD-ELEMENT").subscribe(
      (listTypeElement) => {
        this.listOptionAddElement = listTypeElement;
      },
      (error) => {}
    );

    this.ldvService.getLdvDetail("SONR-REDIRECT-DOMAIN-VALID").subscribe(
      (listPermited: Array<any>) => {
        this.urlPermitted = listPermited;
      },
      (error) => {}
    );

    this.ldvService.getLdvDetail("SONR-TYPE-BLOCK").subscribe(
      (listTypeBlock) => {
        this.listTypeBlock = listTypeBlock;
      },
      (error) => {}
    );

    this.onChanges();

    if (this.idsearchBanner) {
      this.getDataBanner();
    }
  }

  ngOnDestroy() {
    this.dateRangeSuscription.unsubscribe();
  }

  get f() {
    return this.bannerForm.controls;
  }
  get b() {
    return this.blockForm.controls;
  }

  get redirectType() {
    return this.redirectTypes
      ? this.redirectTypes.find(
          (rt) => rt._id === this.blockForm.get("redirectType").value
        )
      : null;
  }

  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  toogleEditRedirect(value) {
    this.editRedirect = value;
  }

  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this.ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'banner' }).subscribe(
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
      this.ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'banner' }).subscribe(
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
  
  addElement(typeSelect) {
    this.submittedElement = true;
    if (this.date_rage.dateRangeForm.valid && this.blockForm.valid) {
      if (
        (this.imageAdd &&
          this.blockForm.get("select_type").value === "Image") ||
        (this.blockForm.get("select_type").value === "Text" &&
          this.blockForm.get("add_text").value !== "" && this.blockForm.get("add_text").value !== null) ||
        (this.blockForm.get("select_type").value === "Video" &&
          this.blockForm.get("video_description").value !== "" && this.blockForm.get("video_description").value !== null
          && this.blockForm.get("add_video").value !== "" && this.blockForm.get("add_video").value !== null)
      ) {
        if (this.redirectType.value !== "Interno") {
          const [errorValidUrl, valueRedirect] = this.valueRedirect();
          if (!errorValidUrl) {
            const objSave: any = {};
            objSave.type = typeSelect;
            if (typeSelect == "Image") {
              objSave.value = this.imageAdd;
            } else {
              objSave.value = this.b.value_add.value;
            }

            this.blockForm.get("redirect").setValue(valueRedirect);

            this.saveNewElement(objSave);
            this.closeAddElement();
          } else {
            this.middleService.sendMessage("Banner", errorValidUrl, "error");
          }
        } else {
          const objSave: any = {};
          objSave.type = typeSelect;
          if (typeSelect == "Image") {
            objSave.value = this.imageAdd;
          } else {
            objSave.value = this.b.value_add.value;
          }
          this.saveNewElement(objSave);
          this.closeAddElement();
        }
      } else {
        let message = '';
        switch(this.blockForm.get("select_type").value) {
          case "Image": message = "Por favor, ingrese una imagen."; break;
          case "Text": message = "Por favor, ingrese texto a mostrarse."; break;
          case "Video": message = "Por favor, ingrese video descriptivo y url de video."; break;
        }
        this.middleService.sendMessage(
          "Tipo de Banner",
          message,
          "error"
        );
      }
    } else {
      if (!this.date_rage.dateRangeForm.valid) {
        this.date_rage.submitted = true;
        this.date_rage.updateValidity();
      }
      if (!this.blockForm.valid) {
        this.middleService.sendMessage(
          "Banner",
          "Por favor, ingrese los campos obligatorios",
          "error"
        );
      }
    }
  }

  selectProduct(valueSKU) {
    const defaultPath = valueSKU.friendly_url;
    this.blockForm.get('redirect').setValue(`principal/product/catalogo/producto/${valueSKU.friendly_url}`);
    this.blockForm.get('redirect_complete').setValue(`principal/product/catalogo/producto/${valueSKU.friendly_url}`);
    this.blockForm.get('redirectMobile').setValue({
      Redirect: 'product',
      Value: defaultPath,
      Title: valueSKU.name
    });
  }

  closeAddElement() {
    this.showAddNewElement = false;
  }

  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);
  }

  getDataBanner() {
    this.middleService.sendLoading(true);
    this.blockService.getOne(this.idsearchBanner).subscribe(
      (dataBlock: any) => {
        this.typeBlockSelect = true;
        this.bannerForm.patchValue(dataBlock);
        this.listAddElement = dataBlock.content;
        this.orderPosition();
        this.middleService.sendLoading(false);
      },
      () => {}
    );
  }

  deleteDetail(position) {
    console.log(position)
    console.log(this.listDetail)
    this.listDetail.splice(position, 1)
  }

  addDetail() {
    this.listDetail.push({ description: '' })
  }

  orderPosition() {
    for (let i = 0; i < this.listAddElement.length; i++) {
      this.listAddElement[i].position = i + 1;
    }
  }

  downLabel(value) {
    if (value < this.listAddElement.length - 1) {
      const oldValue = this.listAddElement[Number(value) + 1];
      this.listAddElement[value + 1] = this.listAddElement[value];
      this.listAddElement[value] = oldValue;
      this.orderPosition();
    }
  }

  upLabel(value) {
    if (value > 0) {
      const oldValue = this.listAddElement[value - 1];

      this.listAddElement[value - 1] = this.listAddElement[value];

      this.listAddElement[value] = oldValue;
      this.orderPosition();
    }
  }

  valueRedirect() {
    let urlValidate = this.blockForm.get("redirect_complete").value;
    if (!urlValidate || urlValidate == "") {
      return [false, null];
    } else {
      const searchMethod = urlValidate.split("://");
      if (searchMethod.length == 2) {
        urlValidate = searchMethod[1];
      }
      const validUrlDomain = urlValidate.split("/", 1);
      const nextValid = this.urlPermitted.find(
        (item) => item.value == validUrlDomain
      );
      // if (nextValid) {
      const validUrlIndex = urlValidate.indexOf("/");
      const validUrl = urlValidate.slice(validUrlIndex);
      return [null, validUrl];
      /* } else {
        return ["El dominio para la redirección no es válida", null];
      } */
    }
  }

  saveBlock() {
    this.submitBanner = true;
    if (!this.bannerForm.invalid) {
      const dataSend = Object.assign({}, this.bannerForm.value);
      dataSend.content = this.listAddElement;
      console.log(dataSend)
      if (this.idsearchBanner) {
        this.middleService.sendLoading(true);
        this.blockService.update(this.idsearchBanner, dataSend).subscribe(
          (infoCreate) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Banner",
              "El banner ha sido actualizado correctamente",
              "ok"
            );
          },
          (error) => {}
        );
      } else {
        this.middleService.sendLoading(true);
        this.blockService.saveBLock(dataSend).subscribe(
          (infoCreate: any) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Banner",
              "El banner ha sido creado correctamente",
              "ok"
            );
            this.router.navigate(["/system/banner/detail/" + infoCreate._id]);
          },
          (error) => {}
        );
      }
    } else {
      this.middleService.sendLoading(false);
      if (this.blockForm.invalid && !this.bannerForm.invalid) {
        this.middleService.sendMessage(
          "Banner",
          "Por favor, complete correctamente los campos de los contenidos del banner",
          "error"
        );
      } else {
        this.middleService.sendMessage(
          "Banner",
          "Por favor, complete los campos requeridos",
          "error"
        );
      }
    }
  }

  mergeDateWithHour(date, hour) {
    date = new Date(date);
    hour = new Date(hour);
    const mergeYear = date.getFullYear();
    const mergeMonth = date.getMonth();
    const mergeDay = date.getDate();
    let mergeHour = 0;
    let mergeMinute = 0;
    if (hour) {
      mergeHour = hour.getHours();
      mergeMinute = hour.getMinutes();
    }
    const mergeDate = new Date(
      mergeYear,
      mergeMonth,
      mergeDay,
      mergeHour,
      mergeMinute,
      0
    );
    return mergeDate;
  }

  saveNewElement(objSave) { 
    objSave.list_detail = this.listDetail.slice();
    objSave.video_description = this.b.video_description.value;
    objSave.type_banner = this.b.type_banner.value;
    objSave.date_start = this.date_rage.dateRangeForm.get("date_start").value;
    objSave.date_end = this.date_rage.dateRangeForm.get("date_end").value;
    objSave.hour_start = this.date_rage.dateRangeForm.get("hour_start").value;
    objSave.hour_end = this.date_rage.dateRangeForm.get("hour_end").value;
    objSave.transition_second = this.b.transition_second.value;
    objSave.redirectType = this.b.redirectType.value
    if (this.selectRedirectType === "Externo") {
      objSave.redirect = this.b.redirect_complete.value || this.b.redirect.value;
      objSave.redirect_complete =
        this.b.redirect_complete.value || this.b.redirect.value;
        objSave.redirectOption = null;
        objSave.redirectOptionChild = null;
        objSave.redirectOptionChildCategory = null;
        objSave.Redirect = null;
        objSave.Title = null;
        objSave.Value = null;
        objSave.CategoryValue = null;
    } else {
      objSave.redirect = this.b.redirect_complete.value || this.b.redirect.value;
      objSave.redirect_complete =
        this.b.redirect_complete.value || this.b.redirect.value;
      objSave.redirectOption = this.b.redirectOption.value;
      objSave.redirectOptionChild = this.b.redirectOptionChild.value;
      objSave.redirectOptionChildCategory = this.b.redirectOptionChildCategory.value;
      this.b.redirectMobile.value &&
        (objSave.Redirect = this.b.redirectMobile.value.Redirect);
      this.b.redirectMobile.value &&
        (objSave.Title = this.b.redirectMobile.value.Title);
      this.b.redirectMobile.value &&
        (objSave.Value = this.b.redirectMobile.value.Value);
      this.b.redirectMobile.value &&
        (objSave.CategoryValue = this.b.redirectMobile.value.CategoryValue);
    }
      objSave.button_label = this.b.button_label.value;
    objSave.text_info = this.b.text_info.value;
    objSave.subtitle = this.b.subtitle.value;
    objSave.search_product = this.b.search_product.value;
    if (!objSave.date_start) {
      objSave.date_start = new Date();
    }
    if (!objSave.hour_start) {
      objSave.hour_start = new Date();
    }
    objSave.date_select_start = this.mergeDateWithHour(
      objSave.date_start,
      objSave.hour_start
    );
    if (objSave.date_end) {
      objSave.date_select_end = this.mergeDateWithHour(
        objSave.date_end,
        objSave.hour_end
      );
    }
    console.log(objSave)
    if (this.updateElementId >= 0) {
      this.listAddElement[this.updateElementId] = objSave;
    } else {
      this.listAddElement.push(objSave);
    }
    this.orderPosition();
  }

  dataPictureSave($event) {
    this.imageAdd = $event;
  }
  dataPictureDelete() {
    this.imageAdd = null;
  }

  deleteImage(position) {
    this.listAddElement.splice(this.listAddElement.length - position, 1);
    this.orderPosition();
  }

  onChanges(): void {
    this.blockForm.get("type_banner").valueChanges.subscribe((val) => {
      const indexValType = this.listOptionAddElement.findIndex(
        (item) => item._id == val
      );
      if (indexValType >= 0) {
        this.blockForm
          .get("select_type")
          .setValue(this.listOptionAddElement[indexValType].ref1);
      }
    });
    this.blockForm.get("select_type").valueChanges.subscribe((val) => {
      this.imageAdd = null;
      this.blockForm.get("add_text").setValue(null);
      this.blockForm.get("video_description").setValue(null);
    });
    this.blockForm.get("add_video").valueChanges.subscribe((val) => {
      this.blockForm.get("value_add").setValue(this.b.add_video.value);
    });

    this.bannerForm.get("name").valueChanges.subscribe((val) => {
      this.bannerForm
        .get("code")
        .setValue(UtilsCode.cleanString(this.bannerForm.get("name").value));
    });

    this.blockForm.get("add_text").valueChanges.subscribe((val) => {
      this.blockForm.get("value_add").setValue(this.b.add_text.value);
    });

    this.bannerForm.get("type").valueChanges.subscribe((val) => {
      const idTypeblock = this.listTypeBlock.findIndex(
        (item) => item._id == val
      );
      if (idTypeblock >= 0) {
        this.typeBlockSelect = this.listTypeBlock[idTypeblock].value;
      }
    });

    this.blockForm.get("search_product").valueChanges.subscribe((val) => {
      if (val && val.length > 2) {
        this.searchSKU(val, "listProduct");
      }
    });

    this.blockForm.get("redirectOption").valueChanges.subscribe(_ => {
      this.blockForm.get("search_product").setValue("");
    })
  }

  searchSKU(sku, field) {
    this.middleService.sendLoading(true)
    this.productService.searchSKU(sku).subscribe(
      (listProduct) => {
        this.middleService.sendLoading(false)
        this[field] = listProduct;
      },
      (error) => {
        this.middleService.sendLoading(false)
        this.middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
  }

  /* changePosition(value, newValue, element, event) {
    if (event.key == 'Enter') {
      this.listAddElement.splice(value, 1);
      this.listAddElement.splice(newValue, 0, element);
      this.orderPosition()
    }
  } */

  changePositionBlur(value, newValue, element, entity) {
    if (value + 1 != newValue) {
      this.activeChangePosition(value, newValue - 1, element, entity);
    }
  }

  activeChangePosition(value, newValue, element, entity) {
    this[entity].splice(value, 1);
    this[entity].splice(newValue, 0, element);
    setTimeout(() => {
      this[entity][value].position = value + 1;
    }, 0);
    this.orderPosition();
  }

  changePosition(value, newValue, element, event, entity) {
    if (event.key == "Enter") {
      this.activeChangePosition(value, newValue - 1, element, entity);
    }
  }

  deleteContent(index) {
    this.listAddElement.splice(index, 1);
    this.orderPosition();
  }
  async getInfoElement(index) {
    this.resetChildrenDefaultValues();
    this.updateValidityBanner();
    this.setRedirectType();
    await this.fetchBannerOptions(this.listAddElement[index]);
    this.toogleEditRedirect(false);
    this.updateElementId = index;
    const infoAddElement = this.listAddElement[index];

    if (infoAddElement.list_detail) {
      this.listDetail = infoAddElement.list_detail
    }
    this.blockForm.get('type_banner').setValue(infoAddElement.type_banner);
    this.blockForm
      .get("transition_second")
      .setValue(infoAddElement.transition_second);
    this.blockForm.get("button_label").setValue(infoAddElement.button_label);
    this.blockForm
      .get("redirect_complete")
      .setValue(infoAddElement.redirect_complete);

    this.blockForm.get("text_info").setValue(infoAddElement.text_info);

    this.blockForm.get("subtitle").setValue(infoAddElement.subtitle);

    this.blockForm.get("redirect").setValue(infoAddElement.redirect);
    this.blockForm.get("redirectType").setValue(infoAddElement.redirectType);
    this.blockForm
      .get("redirectOption")
      .setValue(infoAddElement.redirectOption);
    let valueRedirectOption = this.redirectOptions.find(el => el._id === this.blockForm.get("redirectOption").value)
    this.selectedOption(null, valueRedirectOption.value);
    this.blockForm.get("redirectMobile").setValue({
      Value: infoAddElement.Value,
      Title: infoAddElement.Title,
      Redirect: infoAddElement.Redirect,
      CategoryValue: infoAddElement.CategoryValue,
    });
    this.blockForm.get('search_product').setValue(infoAddElement.search_product);

    this.blockForm
      .get("video_description")
      .setValue(infoAddElement.video_description);
    switch (infoAddElement.type) {
      case "Text": {
        this.blockForm.get("add_text").setValue(infoAddElement.value);
        break;
      }
      case "Image": {
        this.imageAdd = infoAddElement.value;
        break;
      }
      case 'Video': {
        this.blockForm.get('add_video').setValue(infoAddElement.value);
        this.blockForm.get("add_video").setValidators([Validators.required]);
        this.blockForm.get("add_video").updateValueAndValidity();
        this.blockForm.get("video_description").setValidators([Validators.required]);
        this.blockForm.get("video_description").updateValueAndValidity();
        break;
      }
    }
    this.middleService.sendChangeDateRange("popup", {
      date_end: infoAddElement.date_end,
      date_start: infoAddElement.date_start,
      hour_end: infoAddElement.hour_end,
      hour_start: infoAddElement.hour_start,
    });
    this.showAddNewElement = true;
    this.submittedElement = false;
  }

  async fetchBannerOptions(listElement?: any) {
    const redirectOptions: any = await this.ldvService.getLdvDetail("BANNER_OPTION").toPromise()
    this.redirectOptions = redirectOptions;
    this.redirectOptions = SortArray.orderArrayAlphabetical(this.redirectOptions, 'value');

    if (listElement) {
      const redirectOptionFound = this.redirectOptions.find(
        (ro) => ro._id === listElement.redirectOption
      );
      redirectOptionFound &&
        (this.selectedBannerOption = redirectOptionFound.value);
      redirectOptionFound &&
        this.getRedirectOptionChild(
          redirectOptionFound,
          listElement.redirectOptionChild,
          listElement.redirectOptionChildCategory
        );
    }
  }

  setRedirectType() {
    this.ldvService.getLdvDetail("BANNER_REDIRECT_TYPE").subscribe(
      (redirectTypes: Array<any>) => {
        this.redirectTypes = redirectTypes;
      },
      (error) => {}
    );
  }

  selectedTypeRedirection(event: MatSelectChange) {
    this.selectRedirectType = (event.source.selected as MatOption).viewValue;

    if (this.selectRedirectType === "Interno") {
      this.blockForm.get("redirectOption").setValue(null);
      this.blockForm.get("redirectOptionChild").setValue(null);
    } 

    this.blockForm.get("redirect").setValue(null);
    this.blockForm.get("redirect_complete").setValue(null);

    this.blockForm
      .get("redirect_complete")
      .setValidators([Validators.required]);
    this.blockForm.get("redirect_complete").updateValueAndValidity();
    this.resetChildrenDefaultValues();
  }

  selectedOption(event: MatSelectChange, optionValue: string) {
    this.selectedBannerOption = optionValue ? optionValue : (event.source.selected as MatOption).viewValue;

    switch (this.selectedBannerOption) {
      case "Grupo de categoria": {
        this.directSelectedOptionChild = "Elija un grupo de categoría";
        event && this.setCategoryGroup();
        break;
      }
      case "Categoria": {
        this.directSelectedOptionChild = "Elija una categoría";
        event && this.setCategory();
        break;
      }
      case "Campaña": {
        this.directSelectedOptionChild = "Elija una campaña";
        event && this.setCampaign();
        break;
      }
      case "Producto": {
        this.blockForm.get('redirect_complete').setValue(null);
        this.directSelectedOptionChild = "";
        break;
      }
      case "Experiencia": {
        this.directSelectedOptionChild = "Elija una experiencia";
        event && this.setExperiencia();
        break;
      }
    }
  }

  selectedOptionChild(event: MatSelectChange, idSelected: string, redirectOptionChildrenCategory?: string) {
    let idSelectedBannerOptionChildCompare;
    if (!event) {
      idSelectedBannerOptionChildCompare = idSelected
    } else {
      this.selectedBannerOptionChild = (event.source
        .selected as MatOption).viewValue;
      idSelectedBannerOptionChildCompare = (event.source
        .selected as MatOption).value;
    }
    console.log(this.selectedBannerOption)
    switch (this.selectedBannerOption) {
      case "Grupo de categoria": {
        const categoryGroupFull = this.redirectOptionChildren.find(roc => roc._id.toString() === idSelectedBannerOptionChildCompare.toString());

        const defaultPath = categoryGroupFull.friendly_url;

        const categoryGroupType = UtilsCode.cleanString(
          categoryGroupFull.typeGroupCategory.ref1
        );

        this.blockForm.get('redirect').setValue(`principal/${categoryGroupType}/${defaultPath}`);
        this.blockForm.get('redirect_complete').setValue(`principal/${categoryGroupType}/${defaultPath}`);
        //if (event) {
          this.blockForm.get('redirectMobile').setValue({
            Redirect: categoryGroupType,
            Value: defaultPath,
            Title: this.selectedBannerOptionChild
          });
        //}

        break;
      }
      case "Categoria": {
        const categoryGroupFull = this.redirectOptionChildren.find(roc => roc._id.toString() === idSelectedBannerOptionChildCompare.toString());

        const defaultPath = categoryGroupFull.friendly_url;

        const categoryGroup = UtilsCode.cleanString(categoryGroupFull.group.friendly_url);
        const categoryGroupType = UtilsCode.cleanString(categoryGroupFull.group.typeGroupCategory.ref1);
        console.log(categoryGroupFull)
        this.blockForm.get('redirect').setValue(`principal/${categoryGroupType}/${categoryGroup}/${defaultPath}`);
        this.blockForm.get('redirect_complete').setValue(`principal/${categoryGroupType}/${categoryGroup}/${defaultPath}`);
        //if (event) {
          this.blockForm.get('redirectMobile').setValue({
            Redirect: categoryGroupType,
            Value: categoryGroup,
            CategoryValue: defaultPath,
            Title: this.selectedBannerOptionChild
          });
        //}

        break;
      }
      case "Campaña": {
        const categoryGroupFull = this.redirectOptionChildren.find(roc => roc._id.toString() === idSelectedBannerOptionChildCompare.toString());

        const defaultPath = categoryGroupFull.friendly_url;

        const categoryGroupType = UtilsCode.cleanString(categoryGroupFull.group.typeGroupCategory.ref1);
        const categoryGroupFriendlyUrl = UtilsCode.cleanString(categoryGroupFull.group.friendly_url);

        this.blockForm.get('redirect').setValue(`principal/${categoryGroupType}/${categoryGroupFriendlyUrl}/${defaultPath}`);
        this.blockForm.get('redirect_complete').setValue(`principal/${categoryGroupType}/${categoryGroupFriendlyUrl}/${defaultPath}`);
        //if (event) {
          this.blockForm.get('redirectMobile').setValue({
            Redirect: categoryGroupType,
            Value: defaultPath,
            Title: this.selectedBannerOptionChild
          });
        //}

        break;
      }
      case "Experiencia": {
        this.setExperienceChildrenCategories(idSelectedBannerOptionChildCompare, redirectOptionChildrenCategory);
        break;
      }
    }
  }

  selectedOptionChildCategory(event: MatSelectChange, categoryId: string) {
    let selectedCategoryId;
    if (event) {
      selectedCategoryId = (event.source
        .selected as MatOption).value;
    } else {
      selectedCategoryId = categoryId;
    }

    const categoryFriendlyUrl = this.redirectOptionChildrenCategories.find(roc => roc._id.toString() === selectedCategoryId.toString()).friendly_url;
    const categoryGroupFull = this.redirectOptionChildren.find(roc => roc._id.toString() === this.selectedExperienceForCompare.toString());
    const defaultPath = categoryGroupFull.friendly_url;

    this.blockForm.get('redirect').setValue(`principal/experience/experiencias/${categoryFriendlyUrl}/empresa/${defaultPath}`);
    this.blockForm.get('redirect_complete').setValue(`principal/experience/experiencias/${categoryFriendlyUrl}/empresa/${defaultPath}`);

    this.blockForm.get('redirectMobile').setValue({
      Redirect: 'experience',
      Value: defaultPath,
      Title: this.selectedBannerOptionChild
    });
  }

  getRedirectOptionChild(redirectOptionFound, valUpdate, valCategoryUpdate?: string) {
    switch (redirectOptionFound.value) {
      case "Grupo de categoria": {
        this.setCategoryGroup(valUpdate);
        break;
      }
      case "Categoria": {
        this.setCategory(valUpdate);
        break;
      }
      case "Campaña": {
        this.setCampaign(valUpdate);
        break;
      }
      case "Producto": {
        this.setProduct(valUpdate);
        break;
      }
      case "Experiencia": {
        this.setExperiencia(valUpdate, valCategoryUpdate);
      }
      // case "Marca": {
      //   this.setBrand(valUpdate);
      //   break;
      // }
    }
  }

  resetChildrenDefaultValues() {
    this.redirectOptionChildren = null;
    this.selectedBannerOptionChild = null;
    this.selectedBannerOption = null;
    this.blockForm.get("redirectOptionChild").setValue(null);
  }

  setProduct(valUpdate?: string) {
    this.productService.getAllListProduct().subscribe((products: Array<any>) => {
      this.redirectOptionChildren = products;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      if (valUpdate) {
        this.blockForm.get("redirectOptionChild").setValue(valUpdate);
        this.selectedOptionChild(null, valUpdate);
      } else { 
        this.selectedBannerOptionChild = this.redirectOptionChildren[0].name;
        this.blockForm.get("redirectOptionChild").setValue(this.redirectOptionChildren[0]._id);
        this.selectedOptionChild(null, this.redirectOptionChildren[0]._id);
      }
    })
  }

  setBrand(valUpdate?: string) {
    this.brandService.getAllBrandBasic().subscribe((categories: Array<any>) => {
      this.redirectOptionChildren = categories;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      if (valUpdate) {
        this.blockForm.get("redirectOptionChild").setValue(valUpdate);
        this.selectedOptionChild(null, valUpdate);
      } else { 
        this.selectedBannerOptionChild = this.redirectOptionChildren[0].name;
        this.blockForm.get("redirectOptionChild").setValue(this.redirectOptionChildren[0]._id);
        this.selectedOptionChild(null, this.redirectOptionChildren[0]._id);
      }
    })
  }

  setCategory(valUpdate?: string) {
    this.categoryService.getListCategory().subscribe((categories: Array<any>) => {
      this.redirectOptionChildren = categories;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      if (valUpdate) {
        this.blockForm.get("redirectOptionChild").setValue(valUpdate);
        this.selectedOptionChild(null, valUpdate);
      } else { 
        this.selectedBannerOptionChild = this.redirectOptionChildren[0].name;
        this.blockForm.get("redirectOptionChild").setValue(this.redirectOptionChildren[0]._id);
        this.selectedOptionChild(null, this.redirectOptionChildren[0]._id);
      }
    })
  }

  setExperiencia(valUpdate?: string, valCategoryUpdate?: string) {
    this.experienceService.getAllExperienceList().subscribe((experiences: Array<any>) => {
      this.redirectOptionChildren = experiences;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      if (valUpdate) {
        this.redirectOptionChildrenCategories = experiences.find((experience: any) => experience._id.toString() === valUpdate).categories;        
        this.selectedBannerOptionChild = this.redirectOptionChildren.find(experience => experience._id.toString() === valUpdate.toString()).name;
        this.blockForm.get("redirectOptionChild").setValue(valUpdate);
        this.blockForm.get("redirectOptionChildCategory").setValue(valCategoryUpdate);
        this.selectedOptionChild(null, valUpdate, valCategoryUpdate);
      } else { 
        this.redirectOptionChildrenCategories = experiences.find((experience: any) => experience._id.toString() === this.redirectOptionChildren[0]._id).categories;
        this.selectedBannerOptionChild = this.redirectOptionChildren[0].name;
        this.blockForm.get("redirectOptionChild").setValue(this.redirectOptionChildren[0]._id);
        this.blockForm.get("redirectOptionChildCategory").setValue(this.redirectOptionChildrenCategories[0]._id);
        this.selectedOptionChild(null, this.redirectOptionChildren[0]._id, this.redirectOptionChildrenCategories[0]._id);
      }
    })
  }

  setExperienceChildrenCategories(parentId: string, redirectOptionChildrenCategory: string) {
    this.experienceService.getChildrenCategories(parentId).subscribe((categories: Array<any>) => {
      this.redirectOptionChildrenCategories = categories;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      this.selectedExperienceForCompare = parentId;
      if (redirectOptionChildrenCategory) {
        this.blockForm.get("redirectOptionChildCategory").setValue(redirectOptionChildrenCategory);
      } else {
        this.blockForm.get("redirectOptionChildCategory").setValue(this.redirectOptionChildrenCategories[0]._id);
      }
      this.selectedOptionChildCategory(null, this.blockForm.get("redirectOptionChildCategory").value);
    })
  }

  setCategoryGroup(valUpdate?: string) {
    // this.categoryService.getListCategoryAllGroup() -> esto estaba en prod por si tenemos que cambiar
    this.categoryService.getListCategoryGroup().subscribe((groupCategories: Array<any>) => {
      this.redirectOptionChildren = groupCategories;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      if (valUpdate) {
        this.blockForm.get("redirectOptionChild").setValue(valUpdate);
        this.selectedOptionChild(null, valUpdate);
      } else { 
        this.selectedBannerOptionChild = this.redirectOptionChildren[0].name;
        this.blockForm.get("redirectOptionChild").setValue(this.redirectOptionChildren[0]._id);
        this.selectedOptionChild(null, this.redirectOptionChildren[0]._id);
      }
    })
  }

  setCampaign(valUpdate?: string) {
    this.campaignService.getCampaignNames().subscribe((campaigns: Array<any>) => {
      this.redirectOptionChildren = campaigns;
      this.redirectOptionChildren = SortArray.orderArrayAlphabetical(this.redirectOptionChildren, 'name');
      if (valUpdate) {
        this.blockForm.get("redirectOptionChild").setValue(valUpdate);
        this.selectedOptionChild(null, valUpdate);
      } else { 
        this.selectedBannerOptionChild = this.redirectOptionChildren[0].name;
        this.blockForm.get("redirectOptionChild").setValue(this.redirectOptionChildren[0]._id);
        this.selectedOptionChild(null, this.redirectOptionChildren[0]._id);
      }
    })
  }

  updateValidityBanner() {
    this.blockForm.get("redirectType").setErrors(null);
    this.blockForm.get("redirectType").updateValueAndValidity();
    this.blockForm.get("type_banner").setErrors(null);
    this.blockForm.get("type_banner").updateValueAndValidity();
    this.blockForm.get("redirect_complete").setErrors(null);
    this.blockForm.get("redirect_complete").updateValueAndValidity();
    this.blockForm.get("add_video").setErrors(null);
    this.blockForm.get("add_video").updateValueAndValidity();
    this.blockForm.get("video_description").setErrors(null);
    this.blockForm.get("video_description").updateValueAndValidity();

    this.blockForm.get("redirectType").setValidators([Validators.required]);
    this.blockForm.get("redirectType").updateValueAndValidity();
    this.blockForm.get("type_banner").setValidators([Validators.required]);
    this.blockForm.get("type_banner").updateValueAndValidity();

    this.blockForm.get("add_video").clearValidators();
    this.blockForm.get("add_video").updateValueAndValidity();
    this.blockForm.get("video_description").clearValidators();
    this.blockForm.get("video_description").updateValueAndValidity();

    this.blockForm
      .get("redirect_complete")
      .setValidators([Validators.required]);
    this.blockForm.get("redirect_complete").updateValueAndValidity();
  }

  openAddElement() {
    this.resetChildrenDefaultValues();
    this.listDetail = [];
    this.redirectOptionChildren = null;
    this.updateValidityBanner();
    this.imageAdd = null;
    this.blockForm.reset();
    this.showAddNewElement = true;
    this.submittedElement = false;
    this.updateElementId = -1;
    this.setRedirectType();
    this.fetchBannerOptions();
    this.blockForm.get("transition_second").setValue(0);
    this.blockForm.get("redirect_complete").setValue(null);
    this.blockForm.get("button_label").setValue(null);
    this.middleService.sendChangeDateRange("popup", null);
  }

  returnBanner() {
    this.router.navigate(["/system/banner"]);
  }

  showWindowMultimedia(field, maxSize?, maxDimension?) {

    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    this.multimediaGallery.config.noValidDimension = false;
    this.objChange = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }
  OpenModalDeleteConfirm() {
    const title = "Eliminar Banner";
    const messageModal = "¿Está seguro que desea eliminar?";
    this.dialogConfirm.show(title, messageModal, null, "Banner");
  }
  acceptModal($event) {
    if ($event.accept) {
      this.middleService.sendLoading(true);
      this.blockService.delete(this.idsearchBanner).subscribe(
        (deleteInfo) => {
          this.middleService.sendMessage(
            "Banner",
            "El banner ha sido eliminado correctamente",
            "ok"
          );
          this.middleService.sendLoading(false);
          this.router.navigate(["/system/banner"]);
        },
        (error) => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            "Banner",
            error.error.message,
            "error"
          );
        }
      );
    }
  }
}
