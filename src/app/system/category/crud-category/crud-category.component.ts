import { MatOption, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { MatSelectChange } from '@angular/material';
import { RulesDispatcherService } from './../../../shared/service/rules-dispatcher.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  HostListener,
  NgZone,
} from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MultimediaGalleryComponent } from '../../components/multimedia-gallery/multimedia-gallery.component';
import { CategoryService } from 'src/app/shared/service/category.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { DynamicTreeViewComponent } from '../../components/dynamic-tree-view/dynamic-tree-view.component';
import { GridComponent } from '../../components/grid/grid.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { FilterCategoryService } from 'src/app/shared/service/filter-category.service';
import { HeaderService } from '../../components/header/header.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { ExperienceService } from 'src/app/shared/service/experience.service';
import { CrudRulesAdminComponent } from '../../rules-admin/crud-rules-admin/crud-rules-admin.component';
import { Subscription } from 'rxjs';
import { DiscountRuleService } from 'src/app/shared/service/discount-rule.service';
import { RulesAdminService } from 'src/app/shared/service/rules-admin.service';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { PostService } from 'src/app/shared/service/post.service';
import { AttachmentService } from 'src/app/shared/service/attachment.service';
import { UploadExcelComponent } from '../../components/upload-excel/upload-excel.component';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss'],
})
export class CrudCategoryComponent implements OnInit, OnDestroy {
  listProcessFilter: any
  categoryForm: FormGroup;
  filterSelect: boolean;
  originalVisibility: boolean;
  filerForm: FormGroup;
  groupList: any;
  productForm: FormGroup;
  listTypeCategory: any;
  discountTypes: any;
  listOptionGroup: any;
  lisAddPicture: any;
  listAddPicture: Array<any>;
  listAddPictureMobile: Array<any>;
  listStampPicture: any;
  listMenuPicture: Array<any>;
  lisAddPictureMobile: any;
  lisAddBannerPicture: any;
  lisAddBannerPictureMobile: any;
  replacePosition: any;
  listCategory: any;
  objChange: any;
  url_attachment: string;
  idCategory: string;
  selectCategoryBD: string;
  selectFlow: any;
  selectMuti: any;
  selectPicture: any;
  selectCategory: any;
  selectSaveCategory: any;
  submitted: boolean;
  availablefilters: Array<any>;
  selectedFilters: Array<any>;
  sendFilters: Array<any>;
  selectedFilterControl: FormControl;
  filteredSelected: any;
  filteredIndexSelected: number;
  categoryValueToAdd: any;
  headerFixed: boolean;
  infoChangePosition: Array<any>;
  imagePositionMobile: any;
  imageShowSlider: string;
  listImageField: any;
  removedFilterId: number;
  listImageDimension: any
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild('selectCategory', { static: true })
  selectableCategory: DynamicTreeViewComponent;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  @ViewChild('dialogDelete', { static: false })

  // Rules Admin section
  @ViewChild('gridListRulesAdmin', { static: false })
  gridListRulesAdmin: GridComponent;
  @ViewChild('cra', { static: false })
  mainCra: CrudRulesAdminComponent;
  showRulesAdminForm = false;
  showRulesAdminGrid = false;
  showRulesAdminSection = false;
  editRulesAdmin = false;
  rulesAdminSaved = false;
  showOptions = true;
  toogleCategories: boolean;
  headerRuleFixed: boolean;
  nameChanged: boolean;
  Subscriptions: Array<Subscription>;
  rulesAdmin: any;
  discountRules: any[] = [];
  createdDiscountRulesId: string[] = [];
  discountRulesForCreation: any[] = [];
  discountRulesForUpdate: any[] = [];
  typeDiscount = '%';
  verifyParent: any;
  embeddedMessage: any;
  listFlowArray: any;
  validCategoryField: any;

  @ViewChild('dialogDelete', { static: true })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild('dialogDeleteFilter', { static: true })
  dialogConfirmFilter: DialogConfirmComponent;
  typeCategory: any;
  activeDiscount: boolean;
  searchName: any

  @ViewChild('uploadExcelFilter', { static: true })
  uploadExcelFilter: UploadExcelComponent;
  listResultFilter: Array<any>;
  showSummary: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService,
    private _middleService: MiddleService,
    private _ldvService: LdvService,
    private _productService: ProductService,
    private _experienceService: ExperienceService,
    private _filterService: FilterCategoryService,
    private _zone: NgZone,
    private _rulesDispatcherService: RulesDispatcherService,
    private _discountRuleService: DiscountRuleService,
    private _rulesAdminService: RulesAdminService,
    private headerService: HeaderService,
    private _postService: PostService,
    private _attachmentService: AttachmentService,
  ) {
    this.listProcessFilter = {}
    this.listResultFilter = [];
    this.showSummary = false;
    this.listImageField = {}
    this.listImageDimension = {}
    this.typeCategory = '';
    this.listTypeCategory = [];
    this.discountTypes = [];
    this.listCategory = [];
    this.selectFlow = [];
    this.filterSelect = false;
    this.submitted = false;
    this.nameChanged = false;
    this.selectCategory = [];
    this.selectedFilters = [];
    this.sendFilters = [];
    this.availablefilters = [];
    this.listOptionGroup = [];
    this.verifyParent = {};
    this.validCategoryField = {};
    this.selectedFilterControl = new FormControl('');
    this.activatedRoute.params.subscribe((params) => {
      this.idCategory = params.idCategory;
      params.idCategory && (this.editRulesAdmin = true);
    });
    this.infoChangePosition = [];
    this.imagePositionMobile = 1;
    this.lisAddPicture = [];
    this.listAddPicture = [];
    this.listAddPictureMobile = [];
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.getConfigExcel()
    this.searchName = {}
    this.Subscriptions = new Array<Subscription>();
    this.getProductImageSize()
    this.getProductImageDimension()
    this.ldvValidCategoryInfo();
    this.listFlowArray = [];
    this.activeDiscount = true;
    this.toogleCategories = true;
    this.headerFixed = false;
    this.headerService.sendTitle('Categorías');
    this.headerRuleFixed = false;
    this.gridList.actions = [
      {
        icon: 'fas fa-trash-alt',
        action: 'delete',
        fieldReturn: '_id',
        color: '#ff4081',
      },
    ];
    this.selectedFilters = [];

    this.gridList.config.pagQuantity = 20;

    this.gridList.config.valueFilter = this.idCategory;

    this.url_attachment = localStorage.getItem('url_attachment');
    this.lisAddPicture = [];
    this.listStampPicture = [];
    this.listMenuPicture = [];
    this.lisAddPictureMobile = [];
    this.lisAddBannerPicture = [];
    this.lisAddBannerPictureMobile = [];
    this.categoryForm = new FormGroup({
      visibility: new FormControl(false, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      flow: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      meta_description: new FormControl(null, [Validators.required]),
      friendly_url: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      image_link: new FormControl(null),
      image_stamp: new FormControl(null),
      image_menu: new FormControl(null),
      active_stamp: new FormControl(false),
      image_banner: new FormControl(null),
      image_link_mobile: new FormControl(null),
      image_banner_mobile: new FormControl(null),
      position: new FormControl(null, [Validators.required]),
      parent: new FormControl(null),
      nivel: new FormControl(null),
      filters: new FormControl(),
      active_discount: new FormControl(false),
      type_discount: new FormControl(null),
      discount_amount: new FormControl(null),
    });

    this.filerForm = new FormGroup({
      filter: new FormControl(false, [Validators.required]),
      filterFlow: new FormControl(),
    });

    this.productForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
    this.getListEntity();

    this.getDiscountTypes();

    this.Subscriptions.push(this.router.events.subscribe((change) => {
      if (change instanceof NavigationEnd) {
        this.idCategory = this.activatedRoute.snapshot.params['idCategory'];
        this.getInfoCategory();
      }
    }));

    if (!this.idCategory) {
      this._filterService.GetAll().subscribe((filterData: Array<any>) => {
        this.availablefilters = filterData;
      });
    }
    this.getListType();
    this.getListGroup();
    this.Subscriptions.push(this._rulesDispatcherService.rulesAdminChanged.subscribe(
      (rulesAdmin) => {
        if (Object.entries(rulesAdmin).length !== 0) {
          this.rulesAdmin = rulesAdmin;
          this.showOptions = false;
        } else {
          this.rulesAdmin = undefined;
        }
      }
    ));

    this.onChanges();
  }

  get f() {
    return this.categoryForm.controls;
  }

  /*  getGridList() {
    this.gridList.config.getService = "/product/search";
    this.gridList.config.redirect = "system/product/detail/";
    this.gridList.config.entity = "Producto";
  } */

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

  updatePosition(entity) {
    this.infoChangePosition = [];
    for (let i = 1; i <= this[entity].length; i++) {
      this.infoChangePosition.push(i);
    }
  }

  upLabel(value, entity) {
    if (value > 0) {
      const oldValue = this[entity][value - 1];
      this[entity][value - 1] = this[entity][value];
      this[entity][value] = oldValue;
    }
  }

  downLabel(value, entity) {
    if (value < this[entity].length - 1) {
      const oldValue = this[entity][Number(value) + 1];
      this[entity][value + 1] = this[entity][value];
      this[entity][value] = oldValue;
    }
  }

  getProductImageDimension() {

    this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'category' }).subscribe(
      (listInfo: any) => {
        if (listInfo.length > 0) {
          this.listImageDimension = listInfo[0].value
        }
      }, (error) => {
        this._middleService.sendMessage('Categorias', error.error.message, 'error')
      }
    )
  }

  getProductImageSize() {

    this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'category' }).subscribe(
      (listInfo: any) => {
        if (listInfo.length > 0) {
          this.listImageField = listInfo[0].value
        }
      }, (error) => {
        this._middleService.sendMessage('Categorias', error.error.message, 'error')
      }
    )
  }


  changePositionBlur(value, newValue, element, entity) {
    if ((value + 1) != newValue) {
      this.activeChangePosition(value, newValue - 1, element, entity);
    }
  }

  activeChangePosition(value, newValue, element, entity) {
    this[entity].splice(value, 1);
    this[entity].splice(newValue, 0, element);
    setTimeout(() => {
      this.infoChangePosition[value] = value + 1;
    }, 0);
    this.updatePosition(entity);
  }

  changePosition(value, newValue, element, event, entity) {
    if (event.key == 'Enter') {
      this.activeChangePosition(value, newValue - 1, element, entity);
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
    this.updatePosition(field);
  }

  nextImage(field) {
    if (this.imagePositionMobile >= this[field].length) {
      this.imagePositionMobile = 1;
    } else {
      this.imagePositionMobile++;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
  }
  previousImage(field) {
    if (this.imagePositionMobile <= 1) {
      this.imagePositionMobile = this[field].length;
    } else {
      this.imagePositionMobile--;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
  }

  ldvValidCategoryInfo() {
    this._ldvService.getLdvDetail('CATEGORY-OPTION').subscribe(
      (infoLdv: Array<any>) => {

        for (const ldvOption of infoLdv) {
          switch (ldvOption.value) {
            case false:
            case 'false': {
              this.validCategoryField[ldvOption.ref1] = false;
              break;
            }
            case true:
            case 'true': {
              this.validCategoryField[ldvOption.ref1] = true;
              break;
            }
          }

          setTimeout(() => {
            this.validCategoryField['rules_admin'] && this.showRulesAdminGridF();
          });

        }
      }, (error) => {
        this._middleService.sendMessage('Categoría', error.error.message, 'error');
      }
    );
  }

  // Rules Admin SECTION

  switchModal($event) {
    this.headerRuleFixed = $event;
  }

  showRulesAdminGridF() {
    this.gridListRulesAdmin.columns = [
      {
        field: 'name',
        title: 'Administrador de reglas de descuento',
        type: 'text',
      },
    ];
    this.gridListRulesAdmin.config.pagQuantity = 20;
    this.gridListRulesAdmin.config.getService = '/rules-admin/search';
    this.gridListRulesAdmin.config.redirectId = true;
    this.gridListRulesAdmin.config.entity =
      'Administrador de reglas de descuento';
    this.gridListRulesAdmin.getInfo();
  }

  toogleCategoriesPanel() {
    this.toogleCategories = !this.toogleCategories;
  }

  toggleShowRulesAdminForm() {
    this.showRulesAdminForm = true;
    this.showRulesAdminGrid = false;
    this.showOptions = false;
  }

  toggleShowRulesAdminGrid() {
    if (this.mainCra) {
      if (
        (this.mainCra.adminRuleForm.controls['name'].value !== null &&
          this.mainCra.adminRuleForm.controls['name'].value !== '' &&
          this.rulesAdmin === undefined) ||
        this.mainCra.rulesAdminAdded
      ) {
        this.deleteRulesAdminF();
      } else {
        this.showRulesAdminForm = false;
        this.showRulesAdminGrid = true;
      }
    } else {
      this.showRulesAdminForm = false;
      this.showRulesAdminGrid = true;
    }
  }

  deleteAdminRule() {
    this.mainCra.deleteAdminRule();
  }

  deleteRulesAdminF() {
    const title = 'Administrador de reglas de descuento';
    const messageModal = 'Perderá los cambios recientes ¿Desea continuar?';
    this.dialogConfirm.show(title, messageModal, null, 'rulesAdmin');
  }

  unmountRulesAdminAndShowOptions() {
    this.showOptions = true;
    this.showRulesAdminForm = false;
  }

  getRulesAdminId($event) {
    this._middleService.sendLoading(true);
    this.showRulesAdminForm = true;
    this.showRulesAdminGrid = false;
    this.editRulesAdmin = true;
    this._rulesAdminService
      .getOne($event.field)
      .subscribe((rulesAdSer: any) => {
        rulesAdSer.rules.forEach((rule) => {
          // Populate service discountRules array
          this._rulesDispatcherService.addDiscountRule(rule.rddId);
        });

        this._rulesDispatcherService.setRulesAdminChanged(rulesAdSer);

        this._middleService.sendLoading(false);
      });
  }

  updateExistingDiscountRules(rdds: any[]) {
    this._discountRuleService
      .updateManyDiscountRules(rdds)
      .subscribe(null, (error) => {
        this._middleService.sendLoading(false);
        console.log(error);
      });
  }

  saveRulesAdmin(ids?: string[]) {
    let idCounter = 0;
    this.rulesAdmin.rules.forEach((rule) => {
      if (rule.rddId._id === undefined) {
        rule.rddId._id = ids[idCounter];
        idCounter++;
      }
    });

    delete this.rulesAdmin.__v; // allow saving

    if (this.rulesAdmin._id) {
      this._rulesAdminService
        .updateRulesAdmin(this.rulesAdmin, this.rulesAdmin._id)
        .subscribe(
          (savedRulesAdmin: any) => {
            this.createCategory(savedRulesAdmin.createdId);
          },
          (error) => {
            this._middleService.sendLoading(false);
            console.log(error);
          }
        );
    } else {
      this._rulesAdminService.createRulesAdmin(this.rulesAdmin).subscribe(
        (savedRulesAdmin: any) => {
          this.createCategory(savedRulesAdmin.createdId);
        },
        (error) => {
          this._middleService.sendLoading(false);
          console.log(error);
        }
      );
    }
  }

  // END Rules Admin SECTION

  selectDiscountType(event: MatSelectChange) {
    this.typeDiscount = (event.source.selected as MatOption).viewValue;
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

  confirmDeleteItem() {
    const title = 'Eliminar Categoría';
    const messageModal = '¿Está seguro que desea eliminar?';
    this.dialogConfirm.show(title, messageModal, null, 'Categoría');
  }




  acceptModal($event) {
    if ($event.accept) {
      if ($event.entity === 'Categoría') {
        this._categoryService.deleteCategory(this.idCategory).subscribe(
          () => {
            this._middleService.sendMessage(
              'Categoria',
              'La categoría ha sido eliminada correctamente',
              'ok'
            );
            this.router.navigate(['/system/category']);
          },
          (error) => {
            this._middleService.sendMessage(
              'Categoria',
              error.error.message,
              'error'
            );
          }
        );
      } else {
        this.showRulesAdminForm = false;
        this.showRulesAdminGrid = true;
        this.rulesAdminSaved = false;
        this._rulesDispatcherService.deleteRulesAdmin();
      }
    }
  }

  acceptModalFilter($event) {
    //$event.preventDefault();
    this.selectedFilters.forEach((item, index) => {
      if (item._id == this.removedFilterId) {
        this.selectedFilters.splice(index, 1);
      }
    });
    this.sendFilters.forEach((item, index) => {
      if (item == this.removedFilterId) {
        this.sendFilters.splice(index, 1);
      }
    });
    if (this.filteredSelected && this.filteredSelected._id == this.removedFilterId) {
      this.filteredSelected = this.selectedFilters[this.selectedFilters.length - 1];
    }
  }

  actionAnswer(event) {
    this._middleService.sendLoading(true);
    switch (this.typeCategory) {
      case 'Experiencias': {
        this._experienceService
          .deleteCategoryProduct(event.field, this.idCategory)
          .subscribe(
            (deleteInfo) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Categoria',
                'La experiencia ha sido eliminada de la categoría',
                'ok'
              );
              this.gridList.getInfo();
            },
            (error) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Categoria',
                error.error.message,
                'error'
              );
            }
          );
        break;
      }
      case 'Productos': {
        this._productService
          .deleteCategoryProduct(event.field, this.idCategory)
          .subscribe(
            (deleteInfo) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Categoria',
                'El producto ha sido eliminado de la categoría',
                'ok'
              );
              this.gridList.getInfo();
            },
            (error) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Categoria',
                error.error.message,
                'error'
              );
            }
          );
        break;
      }
      case 'Publicación': {
        this._postService
          .deleteCategoryPost(event.field, this.idCategory)
          .subscribe(
            (deleteInfo) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Categoria',
                'La publicación ha sido eliminada de la categoría',
                'ok'
              );
              this.gridList.getInfo();
            },
            (error) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Categoria',
                error.error.message,
                'error'
              );
            }
          );
        break;
      }
    }
  }

  getListGroup() {
    this._middleService.sendLoading(true);
    this._categoryService.getListCategoryAllGroup().subscribe((listGroup) => {
      this._middleService.sendLoading(false);
      this.groupList = listGroup;
      if (this.idCategory) {
        this.getInfoCategory();
      }
    });
  }

  addFilter() {
    const existFlow = this.selectFlow.findIndex(
      (item) =>
        String(item.id_flow) == String(this.filerForm.get('filter').value)
    );
    if (existFlow < 0) {
      const index = this.listOptionGroup.findIndex(
        (item) => item._id == this.filerForm.get('filter').value
      );
      if (index >= 0) {
        const obj: any = {};
        obj.id_flow = this.filerForm.get('filter').value;
        obj.name = this.listOptionGroup[index].value;
        obj.position = this.listOptionGroup[index].position;
        this.listOptionGroup[index].select = true;
        this.selectFlow.push(obj);
      }
    }
    this.selectFlow.sort(function (a, b) {
      if (a.position < b.position) {
        return 1;
      }
      if (a.position > b.position) {
        return -1;
      }
      return 0;
    });
  }

  onChanges(): void {
    this.Subscriptions.push(this.filerForm
      .get('filterFlow')
      .valueChanges.subscribe((val) => {

        const findInfo = this.listFlowArray.find(item => item.nameList == val);

        if (findInfo) {
          this.selectFlow = findInfo.flow;
        }

      }));

    this.Subscriptions.push(this.categoryForm
      .get('group')
      .valueChanges.subscribe((val) => {
        this.selectFlow = [];
        if (this.groupList) {
          const groupCategory = this.groupList.find((item) => item._id == val);
          if (groupCategory) {
            this.getListTypeGroup(groupCategory.typeGroupCategory.ref1);
            /*  switch (groupCategory.typeGroupCategory.ref1) {
               case "experiencias": {
                 this.getListTypeGroup("experience");
                 break;
               }
               case "catalogo": {
                 this.getListTypeGroup("product");
                 break;
               }
               default: {
                 this.getListTypeGroup(groupCategory.friendly_url);
               }
             } */
          }

          if (groupCategory.friendly_url == 'blog') {
            this.activeDiscount = false;
          }
          this.getListCategory(val);
        }

      }));
    // if (!this.idCategory) {
    this.categoryForm.get('name').valueChanges.subscribe((val) => {
      this.nameChanged = true;
      this.categoryForm
        .get('friendly_url')
        .setValue(UtilsCode.cleanString(val));
    });
    // }

    this.categoryForm.get('type').valueChanges.subscribe((val) => {
      this.filterSelectChange(val);
    });
    this.categoryForm.get('active_discount').valueChanges.subscribe((val) => {
      if (val) {
        // grid-list of rules-admin
        this.categoryForm
          .get('discount_amount')
          .setValidators([Validators.required]);
        this.categoryForm.get('discount_amount').updateValueAndValidity();
        this.showRulesAdminSection = true;
      } else {
        this.categoryForm.get('discount_amount').clearValidators();
        this.categoryForm.get('discount_amount').updateValueAndValidity();
        this.showRulesAdminSection = false;
      }
    });
  }

  filterSelectChange(val) {
    const index = this.listTypeCategory.findIndex((item) => item._id == val);
    if (index >= 0) {
      this.filterSelect =
        this.listTypeCategory[index].ref1 == 'true' ? true : false;
      if (!this.filterSelect) {
        this.selectFlow = [];
      }
    }
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

  deleteFlow(position) {
    const index = this.listOptionGroup.findIndex(
      (item) => item.value == this.selectFlow[position].name
    );
    if (index >= 0) {
      this.listOptionGroup[index].select = null;
      this.selectFlow.splice(position, 1);
    }
  }

  getListTypeGroup(typeGroup) {
    this._ldvService
      .getLdvDetail('SONR-CATEGORY-GROUP')
      .subscribe((dataLdv: any) => {
        this.listOptionGroup = [];
        if (this.categoryForm.get('group').value) {

          for (const category of dataLdv) {

            if (category.ref6 == typeGroup) {
              this.listOptionGroup.push(category);
            }
          }
        }
        this.listProcess();
      });
  }

  listProcess() {

    this.listOptionGroup.sort(function (a, b) {
      if (a.position > b.position) {
        return 1;
      }
      if (a.position < b.position) {
        return -1;
      }
      return 0;
    });


    let totalPush = 1;
    const listFlow = [];
    for (let i = 0; i < this.listOptionGroup.length; i++) {
      const newOption: any = {};
      newOption.nameList = '';
      newOption.flow = [];

      let searchId = totalPush - 1;
      while (searchId >= 0) {
        if (searchId < (totalPush - 1)) {
          newOption.nameList = newOption.nameList + ' - ';
        }
        newOption.nameList = newOption.nameList + this.listOptionGroup[searchId].value;
        const newObj: any = {};
        newObj.id_flow = this.listOptionGroup[searchId]._id;
        newObj.name = this.listOptionGroup[searchId].value;
        newObj.position = this.listOptionGroup[searchId].position;
        newOption.flow.push(newObj);
        searchId--;
      }

      listFlow.push(newOption);
      totalPush++;
    }

    if (this.selectFlow) {
      let valuename = '';
      for (let m = 0; m < this.selectFlow.length; m++) {
        if (m > 0) {
          valuename = valuename + ' - ';
        }
        valuename = valuename + this.selectFlow[m].name;
      }

      this.filerForm.get('filterFlow').setValue(valuename);
    }
    this.listFlowArray = listFlow;
  }

  getListType() {
    this._ldvService
      .getLdvDetail('SONR-TYPE-CATEGORY')
      .subscribe((dataLdv: any) => {
        const infoType = dataLdv.findIndex((item) => item.value == 'Selección');
        if (infoType >= 0) {
          this.categoryForm.get('type').setValue(dataLdv[infoType]._id);
        }
        this.listTypeCategory = dataLdv;
      });
  }

  getDiscountTypes() {
    this._ldvService.getLdvDetail('DISCOUNT_TYPE').subscribe((dataLdv: any) => {
      if (dataLdv) {
        if (dataLdv.length > 0) {
          this.categoryForm.get('type_discount').setValue(dataLdv[0]._id);
          this.discountTypes = dataLdv;
        }
      }
    });
  }
  getListCategory(group) {
    this._middleService.sendLoading(true);
    this._categoryService.getAllCategory(group).subscribe(
      (listCategory: any) => {
        this.listCategory = listCategory;
        this.selectableCategory.fillDataSource(this.listCategory);
        this.checkedCategory();
        this._middleService.sendLoading(false);
      },
      () => { }
    );
  }
  dataPictureSave($event) {
    if (this.selectMuti) {
      for (const picture of $event) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = picture;
        } else {
          this[this.selectPicture].push({ link: picture, urlredirect: '', title: '', subtitle: '' });
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
  }

  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);

  }

  deleteImage(position, field) {
    this[field].splice(this[field].length - position, 1);
  }

  returnCategory() {
    for (const subs of this.Subscriptions) {
      subs.unsubscribe();
    }
    this._rulesDispatcherService.deleteRulesAdmin();
    this.router.navigate(['/system/category']);
  }

  getListEntity() {
    this._ldvService.getAllEntity().subscribe((listEntity) => { });
  }

  getInfoCategory() {
    this._middleService.sendLoading(true);
    this._categoryService
      .getOne(this.idCategory)
      .subscribe((categoryData: any) => {
        const infoGroup = this.groupList.find(
          (item) => item._id == String(categoryData.group)
        );

        switch (infoGroup.typeGroupCategory.ref1) {
          case 'experience': {
            this.typeCategory = 'Experiencias';
            this.gridList.config.getService = '/experience/search';
            this.gridList.config.redirect = 'system/experience/detail/';
            this.gridList.config.entity = 'Experiencias';
            this.gridList.columns = [
              { field: 'name', title: 'Experiencia', type: 'text' },
              {
                field: 'active',
                title: 'Visible',
                type: 'boolean',
                align: 'center',
                replace: [
                  {
                    value: true,
                    replace: 'Visible',
                    type: 'label',
                    background: '#e8f5e9',
                    color: '#3dd47a',
                  },
                  {
                    value: false,
                    replace: 'No Visible',
                    type: 'label',
                    background: '#fce4ec',
                    color: '#fd96b9',
                  },
                ],
              },
            ];
            break;
          }
          case 'product': {
            this.typeCategory = 'Productos';
            this.gridList.config.getService = '/product/searchAll';
            this.gridList.config.redirect = 'system/product/detail/';
            this.gridList.config.entity = 'Producto';
            this.gridList.columns = [
              { field: 'name', title: 'Producto', type: 'text' },
              { field: 'brand.name', title: 'Marca', type: 'text' },
              { field: 'supplier.name', title: 'Seller', type: 'text' },
              { field: 'SKU', title: 'SKU', type: 'text' },
              {
                field: 'active',
                title: 'Visible',
                type: 'boolean',
                align: 'center',
                replace: [
                  {
                    value: true,
                    replace: 'Visible',
                    type: 'label',
                    background: '#e8f5e9',
                    color: '#3dd47a',
                  },
                  {
                    value: false,
                    replace: 'No Visible',
                    type: 'label',
                    background: '#fce4ec',
                    color: '#fd96b9',
                  },
                ],
              },
            ];
            break;
          }
          case 'blog': {
            this.typeCategory = 'Publicación';
            this.gridList.config.getService = '/post/search';
            this.gridList.config.redirect = 'system/blog/post/detail/';
            this.gridList.config.entity = 'Publicación';
            this.gridList.columns = [
              { field: 'title', title: 'Título', type: 'text' },
            ];
            break;
          }
        }

        this.gridList.getInfo();

        this.selectCategoryBD = categoryData.parent;
        this.selectCategory.push(categoryData.parent);

        if (categoryData.flow) {
          setTimeout(() => {
            this.selectFlow = categoryData.flow;
          });
        }

        this.categoryForm.patchValue(categoryData);
        categoryData.image_link &&
          this.lisAddPicture.push(categoryData.image_link);

        categoryData.image_stamp &&
          this.listStampPicture.push(categoryData.image_stamp);

        categoryData.image_link_mobile &&
          this.lisAddPictureMobile.push(categoryData.image_link_mobile);

        this.originalVisibility = categoryData.visibility;

        // categoryData.image_banner &&
        //   this.lisAddBannerPicture.push(categoryData.image_banner);

        // categoryData.image_banner_mobile &&
        //   this.lisAddBannerPictureMobile.push(categoryData.image_banner_mobile);

        categoryData.images_banner_link ?
          this.listAddPicture = categoryData.images_banner_link : this.listAddPicture = [];

        categoryData.images_banner_link_app ?
          this.listAddPictureMobile = categoryData.images_banner_link_app : this.listAddPictureMobile = [];

        categoryData.image_menu &&
          this.listMenuPicture.push(categoryData.image_menu);

        if (this.listAddPicture) {
          this.imageShowSlider = this.listAddPicture[
            this.listAddPicture.length - this.imagePositionMobile
          ];
        }

        if (this.listAddPictureMobile) {
          this.imageShowSlider = this.listAddPictureMobile[
            this.listAddPictureMobile.length - this.imagePositionMobile
          ];
        }

        this.updatePosition('listAddPicture');
        this.updatePosition('listAddPictureMobile');

        this.filterSelectChange(categoryData.type);
        this._filterService.GetAll().subscribe((filterData: Array<any>) => {
          this.availablefilters = filterData;
          if (categoryData.filters) {
            categoryData.filters.forEach((element) => {
              const exists = this.availablefilters.find((searchItem) => {
                return searchItem._id == element.filter;
              });
              if (exists) {
                this.selectedFilters.push({
                  _id: exists._id,
                  filter: element.filter,
                  name: exists.name,
                  minValue: element.minValue,
                  maxValue: element.maxValue,
                  values: element.values,
                  unit: exists.unit,
                  bindedTo: exists.bindedTo,
                  binded: exists.binded,
                  type: exists.type,
                });
              }
            });
          }

          if (this.sendFilters) {
            this.sendFilters.forEach((item) => {
              const exists = this.availablefilters.find((searchItem) => {
                return searchItem._id == item;
              });
              if (exists) {
              }
            });
          }
        });

        if (categoryData.rules_admin) {
          this.categoryForm.get('active_discount').patchValue(true);

          this.showRulesAdminForm = true;
          this.showRulesAdminSection = true;

          setTimeout(() => {
            categoryData.rules_admin.rules.forEach((rule) => {
              // Populate service discountRules array
              this._rulesDispatcherService.addDiscountRule(rule.rddId);
            });

            // populate template and service for rules admin object
            this._rulesDispatcherService.setRulesAdminChanged(
              categoryData.rules_admin
            );
          });
        }
      });
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

  searchCategoryChecked(listObj) {
    if (!listObj.children) {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
        this.selectSaveCategory.push(listObj);
      }
    } else {
      if (listObj.checked) {
        this.selectCategory.push(listObj)._id;
        this.selectSaveCategory.push(listObj);
      }
      for (const categoryChildren of listObj.children) {
        this.searchCategoryChecked(categoryChildren);
      }
    }
  }

  existInFlow(listObj, idCategory) {
    if (!listObj.children) {
      if (!this.verifyParent.found) {
        this.verifyParent.list.push(listObj._id);
        const cateInArray = this.verifyParent.list.findIndex(
          (item) => String(item) == String(idCategory)
        );
        if (cateInArray >= 0) {
          this.verifyParent.found = true;
        }
        if (!this.verifyParent.found) {
          this.verifyParent.list = [];
        }
      }
    } else {
      if (!this.verifyParent.found) {
        this.verifyParent.list.push(listObj._id);
      }

      for (const categoryChildren of listObj.children) {
        this.existInFlow(categoryChildren, idCategory);
      }
    }
  }

  configureMessage($event: any) {
    this.embeddedMessage = $event.message;
    this.rulesAdminSaved = $event.value;
  }

  validateUrlAndSave() {

    this._middleService.sendLoading(true);
    if (!this.idCategory) {
      this._categoryService.searchFriendlyURL(this.categoryForm.get('friendly_url').value).subscribe((res: any) => {
        this.categoryForm.get('friendly_url').setValue(res.friendly_url);
        this.saveCategory();
      }, error => {
        this._middleService.sendLoading(false);
      });
    } else if (this.idCategory && this.nameChanged) {
      this._categoryService.searchFriendlyURL(this.categoryForm.get('friendly_url').value, this.idCategory).subscribe((res: any) => {
        this.categoryForm.get('friendly_url').setValue(res.friendly_url);
        this.saveCategory();
      }, error => {
        this._middleService.sendLoading(false);
      });
    } else {
      this.saveCategory();
    }
  }

  saveCategory() {
    const active_discount = this.categoryForm.get('active_discount').value;

    if (active_discount === true) {
      // Rules admin section
      this.mainCra && this.mainCra.saveAdminRule();

      if (!this.mainCra) {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          'Categoría',
          'Debe crear o seleccionar un administrador de reglas',
          'error'
        );
        return;
      }

      // Si rules admin no se pudo guardar, dime por qué
      if (!this.rulesAdminSaved) {
        this._middleService.sendLoading(false);
        this.embeddedMessage();
        return;
      }

      // END Rules admin section
    }

    this.submitted = true;
    this.selectSaveCategory = [];
    if (!this.sendFilters || this.sendFilters.length !== 0) {
      this.sendFilters = [];
    }

    for (const category of this.listCategory) {
      this.searchCategoryChecked(category);
    }

    for (const filter of this.selectedFilters) {
      this.sendFilters.push({
        _id: filter._id,
        filter: filter._id,
        values: filter.values,
        minValue: filter.minValue,
        maxValue: filter.maxValue,
      });
    }
    this.categoryForm.controls.filters.patchValue(this.sendFilters);
    let errorExist = false;
    if (this.selectSaveCategory.length > 1) {
      this._middleService.sendLoading(false);
      this._middleService.sendMessage(
        'Seleccionar Padre',
        'Solo puedes seleccionar a una categoria padre',
        'error'
      );
      errorExist = true;
    } else {
      if (this.selectSaveCategory.length > 0) {
        this.verifyParent.found = false;
        this.verifyParent.list = [];
        for (const category of this.listCategory) {
          this.existInFlow(category, this.selectSaveCategory[0]._id);
        }

        const existInFamily = this.verifyParent.list.findIndex(
          (item) => item == this.idCategory
        );

        const ExistChange =
          this.selectSaveCategory[0]._id !=
          this.categoryForm.get('parent').value;
        if (existInFamily >= 0 && ExistChange) {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            'Seleccionar Padre',
            'No puede ser padre de si mismo, o de uno de sus hijos',
            'error'
          );
          errorExist = true;
        } else {
          this.categoryForm
            .get('parent')
            .setValue(this.selectSaveCategory[0]._id);
          this.categoryForm
            .get('nivel')
            .setValue(this.selectSaveCategory[0].nivel + 1);
          if (this.selectCategoryBD != this.selectSaveCategory[0]._id) {
            if (this.selectSaveCategory[0].children) {
              this.categoryForm
                .get('position')
                .setValue(this.selectSaveCategory[0].children.length + 1);
            } else {
              this.categoryForm.get('position').setValue(1);
            }
          }
        }
      } else {
        this.categoryForm.get('parent').setValue(null);
        this.categoryForm.get('nivel').setValue(0);
      }

      if (!errorExist) {
        this.categoryForm.get('flow').setValue(this.selectFlow);
        this.categoryForm.get('image_link').setValue(this.lisAddPicture);
        this.categoryForm.get('image_stamp').setValue(this.listStampPicture);
        this.categoryForm.get('image_menu').setValue(this.listMenuPicture)
        this.categoryForm
          .get('image_link_mobile')
          .setValue(this.lisAddPictureMobile);

        this.categoryForm
          .get('image_banner')
          .setValue(this.lisAddBannerPicture);

        this.categoryForm
          .get('image_banner_mobile')
          .setValue(this.lisAddBannerPictureMobile);
        if (!this.categoryForm.invalid) {

          if (active_discount === true) {
            // Rules Admin Section
            // save in chain

            this.discountRulesForCreation = [];
            this.discountRulesForUpdate = [];

            this.discountRules = this._rulesDispatcherService.getDiscountRules();
            this.discountRules.forEach((rdd) => {
              if (rdd.__v === undefined) {
                this.discountRulesForCreation.push(rdd);
              } else {
                this.discountRulesForUpdate.push(rdd);
              }
            });

            this.updateExistingDiscountRules(this.discountRulesForUpdate);

            if (this.discountRulesForCreation.length !== 0) {
              this._discountRuleService
                .createManyDiscountRules(this.discountRulesForCreation)
                .subscribe(
                  (savedIds: string[]) => {
                    this.saveRulesAdmin(savedIds);
                  },
                  (error) => {
                    this._middleService.sendLoading(false);
                    console.log(error);
                  }
                );
            } else {
              this.saveRulesAdmin();
            }
            // END Rules Admin Section
          } else {
            this.createCategory();
          }
        } else {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            'Categoría',
            'Revise los campos obligatorios',
            'error'
          );
        }
      }
    }
  }

  createCategory(rulesAdminId?: string) {
    const dataSend = this.categoryForm.value;
    if (rulesAdminId) {
      dataSend['rules_admin'] = rulesAdminId;
      dataSend['active_discount'] = true;
    } else {
      dataSend['rules_admin'] = null;
      dataSend['active_discount'] = false;
    }

    dataSend.images_banner_link = this.listAddPicture;
    dataSend.images_banner_link_app = this.listAddPictureMobile;

    if (this.idCategory) {
      this._categoryService
        .updateCategory(dataSend, this.idCategory)
        .subscribe((saveCategory: any) => {
          this.nameChanged = false;
          this._middleService.sendLoading(false);
          const messageCreate = 'La categoría ha sido actualizada correctamente';
          this._middleService.sendMessage('Categoría', messageCreate, 'ok');
          this.router.navigate(['/system/category']);
          // con este cambio no se generan inconsistencias al mostrar el
          // administrador de reglas de descuento
          // this.router
          //   .navigateByUrl("/", { skipLocationChange: true })
          //   .then(() =>
          //     this.router.navigate([
          //       "/system/category/detail/" + this.idCategory
          //     ])
          //   );
        });
    } else {
      this._categoryService.createCategory(dataSend).subscribe(
        (saveCategory: any) => {
          this.nameChanged = false;
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            'Categoría',
            'La categoría ha sido creada correctamente',
            'ok'
          );
          this.router.navigate(['/system/category']);
        },
        (error) => {
          this._middleService.sendMessage(
            'Categoria',
            error.error.message,
            'error'
          );
          this._middleService.sendLoading(false);
        }
      );
    }
  }

  showWindowMultimedia(field, multi, replacePosition?, limitSelect?, maxSize?, maxDimension?) {

    this.replacePosition = replacePosition;
    this.selectMuti = false;
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    if (multi) {
      this.multimediaGallery.config.typeInfo = 'multi';
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow(limitSelect);
  }
  addCategoryFilter() {
    if (this.selectedFilterControl.value != '') {
      const exists = this.selectedFilters.find((item) => {
        return item._id === this.selectedFilterControl.value._id;
      });
      if (!exists) {
        this.selectedFilters.push(this.selectedFilterControl.value);
      }
    }
  }
  removeFilter($event, id) {
    $event.preventDefault();
    this.removedFilterId = id;
    const title = 'Eliminar Filtro';
    const messageModal = '¿Está seguro que desea eliminar?';
    this.dialogConfirmFilter.show(title, messageModal, null, 'Filtro');
    /*$event.preventDefault();
    this.selectedFilters.forEach((item, index) => {
      if (item._id == id) {
        this.selectedFilters.splice(index, 1);
      }
    });
    this.sendFilters.forEach((item, index) => {
      if (item == id) {
        this.sendFilters.splice(index, 1);
      }
    });
    if (this.filteredSelected && this.filteredSelected._id == id) {
      this.filteredSelected = this.selectedFilters[this.selectedFilters.length - 1];
    }*/
  }
  showValuesFilter(item, filterIndex) {
    this.filteredSelected = item;
    this.filteredIndexSelected = filterIndex;
  }

  removeOptionFilter(option) {
    this._zone.run(() => {
      for (let i = 0; i < this.filteredSelected.values.length; i++) {
        if (this.filteredSelected.values[i] == option) {
          this.filteredSelected.values.splice(i, 1);
          break;
        }
      }
    });
  }

  addValuetoCategoryArray() {
    if (this.categoryValueToAdd) {
      if (!this.filteredSelected.values) {
        this.filteredSelected.values = [];
        this.filteredSelected.values.push(this.categoryValueToAdd);
      } else {
        this.filteredSelected.values.push(this.categoryValueToAdd);
      }
    }
  }

  ngOnDestroy() {
    this._rulesDispatcherService.deleteRulesAdmin();
    for (const subs of this.Subscriptions) {
      subs.unsubscribe();
    }
  }


  uploadProductListPrice() {
    this.uploadExcelFilter.open();
  }

  resultInfoFilter(listProcess) {
    console.log(listProcess)
    this.listProcessFilter = listProcess;
    this.showSummary = true;
  }

  closeSummary() {
    this.showSummary = false;
  }

  getConfigExcel() {
    const date = new Date().toISOString().substring(0, 10);
    this.uploadExcelFilter.config = {
      title: 'Carga Masiva de filtros',
      urlService: '/category/upload-filter-product/' + this.idCategory,
      apiDownload: '/category/template/category-list-filter/' + this.idCategory,
      fileDownloadName: 'Carga masiva de filtros' + date + '.xlsx',
    };
  }

  moveFilter(index, movement) {
    console.log(this.selectedFilters);
    console.log(this.sendFilters);
    let tmp = movement === 1 ? this.selectedFilters[index - 1] : this.selectedFilters[index + 1]
    if(movement === 1){
      this.selectedFilters[index - 1] = this.selectedFilters[index];
    } else {
      this.selectedFilters[index + 1] = this.selectedFilters[index];
    }
    this.selectedFilters[index] = tmp;
  }
}
