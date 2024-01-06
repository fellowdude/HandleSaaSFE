import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "src/app/shared/service/category.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { UtilsCode } from "src/app/utils/utilsCode";
import { DialogConfirmComponent } from "src/app/system/components/dialog-confirm/dialog-confirm.component";
import { HeaderService } from "src/app/system/components/header/header.service";
import { LdvService } from 'src/app/shared/service/ldv.service';
import { MultimediaGalleryComponent } from "src/app/system/components/multimedia-gallery/multimedia-gallery.component";
import { AttachmentService } from "src/app/shared/service/attachment.service";

@Component({
  selector: "app-crud-group-category",
  templateUrl: "./crud-group-category.component.html",
  styleUrls: ["./crud-group-category.component.scss"],
})
export class CrudGroupCategoryComponent implements OnInit {
  listImageField: any
  listImageDimension: any
  categoryGroupForm: FormGroup;
  idGroupCategory: string;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  submitted: boolean;
  headerFixed: boolean;
  listTypeGroupCategory: Array<any>
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  replacePosition;
  selectMuti: any;
  selectPicture: any;
  lisMainAddPicture;
  lisMainAddPictureMobile;
  lisMainAddPictureIntro;
  lisMainAddIconMenu
  searchName: any;
  infoChangePosition: Array<any>;
  lisAddPicture: any;
  imagePositionMobile;
  imageShowSlider: string;
  url_attachment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService,
    private _middleService: MiddleService,
    private _ldvService: LdvService,
    private headerService: HeaderService,
    private _attachmentService: AttachmentService
  ) {
    this.lisMainAddPicture = [];
    this.lisMainAddPictureMobile = [];
    this.lisMainAddPictureIntro = [];
    this.lisMainAddIconMenu = [];
    this.infoChangePosition = [];
    this.lisAddPicture = [];
    this.imagePositionMobile = 1;
    this.url_attachment = localStorage.getItem('url_attachment');
    this.activatedRoute.params.subscribe((params) => {
      this.idGroupCategory = params.idGroup;
    });
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.listImageField = {}
    this.listImageDimension = {}
    this.searchName = {}
    this.listTypeGroupCategory = []
    this.headerService.sendTitle("Grupo de Categorías");
    this.headerFixed = false;
    this.submitted = false;
    this.categoryGroupForm = new FormGroup({
      active: new FormControl(false, [
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      typeGroupCategory: new FormControl(null, [
        Validators.required
      ]),
      friendly_url: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl(null),
      position: new FormControl(null, [Validators.required, Validators.min(1)]),
      image_web: new FormControl(null, []),
      image_intro: new FormControl(null, []),
      image_app: new FormControl(null, []),
      menu_icon: new FormControl(null,[]),
    });
    if (this.idGroupCategory) {
      this.getGroupDetail();
    }
    this.onChanges();
    this.getListGroupCategory()
    this.getProductImageSize()
    this.getProductImageDimension()
  }
  get f() {
    return this.categoryGroupForm.controls;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show(
      "Eliminar Grupo de Categoría",
      "¿Esta seguro de eliminar?"
    );
  }

  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'category_group' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageField = listInfo[0].value
          }
          resolve({})
        }, (error) => {
          resolve({})
          this._middleService.sendMessage('Producto', error.error.message, 'error')
        }
      )
    });
    return waitPromise;
  }

  getProductImageDimension() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'category_group' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageDimension = listInfo[0].value
          }
          resolve({})
        }, (error) => {
          this._middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }

  deletItem() {
    this._middleService.sendLoading(true)
    this._categoryService.deleteGroup(this.idGroupCategory).subscribe(
      (data) => {
        this._middleService.sendLoading(false)
        this._middleService.sendMessage(
          "Eliminar",
          "El grupo de categoría ha sido eliminado correctamente",
          "ok"
        );
        this.router.navigate(["/system/categories-groups"]);
      },
      (error) => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Eliminar",
          error.error.message,
          "error"
        );
      }
    );
  }

  getGroupDetail() {
    this._middleService.sendLoading(true);
    this._categoryService
      .getGroupById(this.idGroupCategory)
      .subscribe((categoryInfo: any) => {
        this._middleService.sendLoading(false);
        this.categoryGroupForm.patchValue(categoryInfo);
        if (categoryInfo.image_web) {
          this.lisMainAddPicture.push(categoryInfo.image_web);
        }
        if (categoryInfo.image_app) {
          this.lisMainAddPictureMobile.push(categoryInfo.image_app);
        }
        if (categoryInfo.image_intro) {
          this.lisMainAddPictureIntro.push(categoryInfo.image_intro);
        }
        if(categoryInfo.menu_icon){
          this.lisMainAddIconMenu.push(categoryInfo.menu_icon);
        }
      });
  }

  getListGroupCategory() {
    this._ldvService.getLdvDetail('TYPE-GROUP-CATEGORY').subscribe(
      (listGroupCategory: Array<any>) => {
        this.listTypeGroupCategory = listGroupCategory
      }, (error) => {
        this._middleService.sendMessage('Grupo de categorias', error.error.message, 'error')
      }
    )
  }

  onChanges(): void {
    if (!this.idGroupCategory) {
      this.categoryGroupForm.get("name").valueChanges.subscribe((val) => {
        this.categoryGroupForm
          .get("friendly_url")
          .setValue(UtilsCode.cleanString(val));
      });
    }

    /* this.categoryGroupForm.get("friendly_url").valueChanges.subscribe((val) => {
      this.categoryGroupForm
        .get("friendly_url")
        .setValue(UtilsCode.cleanString(val));
    }); */
  }

  saveGroup() {
    this.submitted = true;
    if (!this.categoryGroupForm.invalid) {
      if (!this.idGroupCategory) {
        this.categoryGroupForm
          .get("friendly_url")
          .setValue(
            UtilsCode.cleanString(
              this.categoryGroupForm.get("friendly_url").value
            )
          );
      }

      if (this.lisMainAddPicture.length > 0) {
        this.categoryGroupForm
          .get('image_web')
          .setValue(this.lisMainAddPicture[0]);
      } else {
        this.categoryGroupForm.get('image_web').setValue('');
      }

      if (this.lisMainAddPictureMobile.length > 0) {
        this.categoryGroupForm
          .get('image_app')
          .setValue(this.lisMainAddPictureMobile[0]);
      } else {
        this.categoryGroupForm.get('image_app').setValue('');
      }
      if (this.lisMainAddPictureIntro.length > 0) {
        this.categoryGroupForm
          .get('image_intro')
          .setValue(this.lisMainAddPictureIntro[0]);
      } else {
        this.categoryGroupForm.get('image_intro').setValue('');
      }
      if (this.lisMainAddIconMenu.length > 0) {
        this.categoryGroupForm
          .get('menu_icon')
          .setValue(this.lisMainAddIconMenu[0]);
      } else {
        this.categoryGroupForm.get('menu_icon').setValue('');
      }
      this._middleService.sendLoading(true);
      if (this.idGroupCategory) {
        this._categoryService
          .updateGroup(this.categoryGroupForm.value, this.idGroupCategory)
          .subscribe(
            (updateCategory) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Grupo categoría",
                "El grupo de categoría ha sido actualizado correctamente",
                "ok"
              );
              this.router.navigate(["/system/categories-groups"]);
            },
            (error) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Grupo de categoría",
                error.error.message,
                "error"
              );
            }
          );
      } else {
        this._categoryService
          .createGroup(this.categoryGroupForm.value)
          .subscribe(
            (saveInfo: any) => {
              this._middleService.sendMessage(
                "Grupo categoría",
                "El grupo de categoría ha sido creado correctamente",
                "ok"
              );
              this._middleService.sendLoading(false);
              this.router.navigate(["/system/categories-groups"]);
            },
            (error) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Grupo de categoría",
                error.error.message,
                "error"
              );
            }
          );
      }
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

  returnGroup() {
    this.router.navigate(["/system/categories-groups"]);
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
  updatePosition(entity, changeArray) {
    this[changeArray] = new Array();
    this[changeArray] = [];
    for (let i = 1; i <= this[entity].length; i++) {
      this[changeArray].push(i);
    }
  }
  addByName(event, name, selectPicture, nameModel) {

    if (event.key == 'Enter') {
      if (name) {
        this._middleService.sendLoading(true)
        this._attachmentService.getByName(name).subscribe(
          (picture: any) => {

            this[selectPicture][0] = picture.name;
            this._middleService.sendLoading(false)
            this.searchName[nameModel] = null
          }, (error) => {
            this._middleService.sendMessage('Producto', error.error.message, 'error')
            this._middleService.sendLoading(false)
          }
        )
      }

    }
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
}
