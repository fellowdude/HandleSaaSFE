import { DialogReasonComponent } from "./../../components/dialog-reason/dialog-reason.component";
import { ProductService } from "src/app/shared/service/product.service";
import { UtilsCode } from "./../../../utils/utilsCode";
import { HeaderService } from "./../../components/header/header.service";
import { MultimediaGalleryComponent } from "./../../components/multimedia-gallery/multimedia-gallery.component";
import { GridComponent } from "./../../components/grid/grid.component";
import { CrudRulesAdminComponent } from "./../../rules-admin/crud-rules-admin/crud-rules-admin.component";
import { DialogConfirmComponent } from "./../../components/dialog-confirm/dialog-confirm.component";
import { CampaignService } from "./../../../shared/service/campaign.service";
import { RulesAdminService } from "./../../../shared/service/rules-admin.service";
import { DiscountRuleService } from "./../../../shared/service/discount-rule.service";
import { RulesDispatcherService } from "./../../../shared/service/rules-dispatcher.service";
import { Subscription, SubscriptionLike } from "rxjs";
import { MiddleService } from "./../../../shared/service/middle.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  NgZone,
} from "@angular/core";
import { CategoryService } from "src/app/shared/service/category.service";
import { DynamicTreeViewComponent } from "../../components/dynamic-tree-view/dynamic-tree-view.component";
import { LdvService } from "../../../shared/service/ldv.service";
import { AttachmentService } from "src/app/shared/service/attachment.service";
import { TableService } from "src/app/shared/service/table.service";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { FilterCategoryService } from "src/app/shared/service/filter-category.service";
import { UploadExcelComponent } from "../../components/upload-excel/upload-excel.component";
import { RolService } from "src/app/shared/service/rol.service";

@Component({
  selector: "app-crud-campaign",
  templateUrl: "./crud-campaign.component.html",
  styleUrls: ["./crud-campaign.component.scss"],
})
export class CrudCampaignComponent implements OnInit, OnDestroy {
  @ViewChild("dialogDelete", { static: false })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogReason", { static: false })
  dialogReason: DialogReasonComponent;
  @ViewChild("gridListProducts", { static: true })
  gridListProducts: GridComponent;
  @ViewChild("gridListRulesAdmin", { static: true })
  gridListRulesAdmin: GridComponent;
  @ViewChild("cra", { static: false })
  mainCra: CrudRulesAdminComponent;
  @ViewChild("multimediaList", { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild("categoryTree", { static: false })
  selectableCategory: DynamicTreeViewComponent;
  @ViewChild("categoryChangeTree", { static: false })
  selectableChangeCategory: DynamicTreeViewComponent;
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort: CdkVirtualScrollViewport;
  availablefilters: Array<any>;
  selectedFilters: Array<any>;
  selectedFilterControl: FormControl;
  sendFilters: Array<any>;
  filteredSelected: any;
  filteredIndexSelected: number;
  campaignFilterValueToAdd: any;
  listImageDimension: any
  listImageField: any
  filteredProducts: FormArray;
  campaignForm: FormGroup;
  filterForm: FormGroup;
  url_attachment: string;
  listThumbnailImage: any;
  listThumbnailImageMobile: any;
  listButtonImage: any;
  listBannerImage: any;
  listBannerImageMobile: any;
  selectMuti: any;
  selectPicture: any;
  listStampPicture: any;
  headerFixed: boolean;
  submitted = false;
  showRulesAdminForm = true;
  showRulesAdminGrid = false;
  editRulesAdmin = false;
  rulesAdminSaved = false;
  showEditableProducts = false;
  showOptions = true;
  idCampaign: string;
  campaignName: string;
  campaignProducts: any[] = [];
  rulesAdminChangedSubscription: Subscription;
  routerSubscription: Subscription;
  nameChangeSubscription: Subscription;
  valueChagesSubscription: SubscriptionLike;
  rulesAdmin: any;
  discountRules: any[] = [];
  createdDiscountRulesId: string[] = [];
  discountRulesForCreation: any[] = [];
  discountRulesForUpdate: any[] = [];
  productList: any[] = [];
  productsForUpdate: any[] = [];
  productsList: FormArray = new FormArray([]);
  headerRuleFixed: boolean;
  nameChanged: boolean;
  embeddedMessage: any;
  initialPrices: number[] = [];
  indexPriceChanged = [];
  reasons: any;
  groupList: any;
  existChange: any;
  replacePosition: any;
  Subscriptions: Array<Subscription>;
  listFlowArray: any;
  listOptionGroup: any;
  selectFlow: any;
  infoChangePosition: Array<any>;
  infoChangePositionMobile: Array<any>;
  imagePositionMobile: any;
  listAddPicture: Array<any>;
  listAddPictureMobile: Array<any>;
  imageShowSlider: string;
  searchName: any;
  filterData: any;
  filterPerField: boolean;
  searchActive: boolean;
  listProcessFilter: any;
  showSummary: boolean;
  listAdminRules: boolean;
  @ViewChild('uploadExcelFilter', { static: true })
  uploadExcelFilter: UploadExcelComponent;
  @ViewChild('uploadExcelVisibility', { static: true })
  uploadExcelVisibility: UploadExcelComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _middleService: MiddleService,
    private _attachmentService: AttachmentService,
    private _rulesDispatcherService: RulesDispatcherService,
    private _discountRuleService: DiscountRuleService,
    private _rulesAdminService: RulesAdminService,
    private _campaignService: CampaignService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _ldvService: LdvService,
    private headerService: HeaderService,
    private _tableService: TableService,
    private _filterService: FilterCategoryService,
    private _zone: NgZone,
    private _roleService: RolService
  ) {
    this.listProcessFilter = {};
    this.showSummary = false;
    this.availablefilters = [];
    this.selectedFilters = [];
    this.selectedFilterControl = new FormControl('');
    this.sendFilters = [];

    this.listImageDimension = {}
    this.listImageField = {}
    this.url_attachment = localStorage.getItem("url_attachment");
    this.listThumbnailImage = [];
    this.listThumbnailImageMobile = [];
    this.listButtonImage = [];
    this.listBannerImage = [];
    this.listBannerImageMobile = [];
    this.listStampPicture = [];
    this.listFlowArray = [];
    this.listOptionGroup = [];
    this.selectFlow = [];
    this.existChange = {};
    this.infoChangePosition = [];
    this.infoChangePositionMobile = []
    this.imagePositionMobile = 1;
    this.activatedRoute.params.subscribe((params) => {
      this.idCampaign = params.idCampaign;
      params.idCampaign && (this.editRulesAdmin = true);
    });
    this.listAddPicture = [];
    this.listAddPictureMobile = [];
    if (!this.idCampaign) {
      this._filterService.GetAll().subscribe((filterData: Array<any>) => {
        this.availablefilters = filterData;
      });
    }
  }
  @HostListener("window:scroll", ["$event"]) private onWindowScroll(
    $event: Event
  ): void {
    this.scrollEvent($event);
  }

  // public get inverseOfTranslation(): string {
  //   if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
  //     return "-0px";
  //   }
  //   let offset = this.viewPort["_renderedContentOffset"];
  //   return `-${offset}px`;
  // }

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }

  scrollDown() {
    const x = window.scrollX;
    const y = window.scrollY;
    this.viewPort.scrollToIndex(this.filteredProducts.length - 1);
    setTimeout(() => {
      const items = document.getElementsByClassName("column-table");
      items[items.length - 1].scrollIntoView();
      window.scrollTo(x, y);
    }, 10);
  }

  ngOnInit() {
    this.validAdminRules()
    this.getConfigExcel()
    this.getConfigExcelVisibility()
    this.getProductImageSize()
    this.getProductImageDimension()
    this.searchName = {};
    this.Subscriptions = new Array<Subscription>();
    this.headerService.sendTitle("Campañas");
    this.campaignForm = new FormGroup({
      active: new FormControl(false, [Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      filters: new FormControl(),
      discount_name: new FormControl(null, [Validators.maxLength(50)]),
      image_stamp: new FormControl(null),
      active_stamp: new FormControl(false),
      friendly_url: new FormControl("", [Validators.required]),
      products: this.productsList,
      delivery: new FormControl(false),
      group: new FormControl("", [Validators.required]),
      flow: new FormControl(null, [Validators.required]),
      query: new FormControl(""),
    });
    this.filterForm = new FormGroup({
      filter: new FormControl(false, [Validators.required]),
      filterFlow: new FormControl(),
    });
    this.onChanges();
    this.initializeProductsGridList();
    this.showRulesAdminGridF();
    this.headerFixed = false;
    this.headerRuleFixed = false;
    this.nameChanged = false;
    this.routerSubscription = this.router.events.subscribe((change) => {
      if (change instanceof NavigationEnd) {
        this.idCampaign = this.activatedRoute.snapshot.params["idCampaign"];
        this.getInfoCampaign();
      }
    });

    if (this.idCampaign) {
      this.getInfoCampaign();
    }

    this.rulesAdminChangedSubscription = this._rulesDispatcherService.rulesAdminChanged.subscribe(
      (rulesAdmin) => {
        if (Object.entries(rulesAdmin).length !== 0) {
          this.rulesAdmin = rulesAdmin;
          this.showOptions = false;
        } else {
          this.rulesAdmin = undefined;
        }
      }
    );

    this.getListGroup();
  }

  initializeProductsGridList() {
    this.gridListProducts.columns = [
      {
        field: "name",
        title: "Producto",
        type: "text",
      },
      {
        field: "SKU",
        title: "SKU",
        type: "text",
      },
      {
        field: "price",
        title: "Precio",
        type: "currency",
        currency: "currency.ref1",
        align: "right",
      },
    ];
    this.gridListProducts.config.pagQuantity = 20;
    this.gridListProducts.config.getService = "/campaign/searchAllProducts";
    this.gridListProducts.config.select = true;
    this.gridListProducts.config.selectGetObject = true;
    this.gridListProducts.config.preventInitialSelect = true;
    this.gridListProducts.config.filterProductsByCampaign =
      this.idCampaign || "new";
    this.gridListProducts.config.listItemSelect = this.productList;
    this.gridListProducts.config.errorConfig = true;
    this.gridListProducts.config.entity = "Producto";
  }

  showRulesAdminGridF() {
    this.gridListRulesAdmin.columns = [
      {
        field: "name",
        title: "Administrador de reglas de descuento",
        type: "text",
      },
    ];
    this.gridListRulesAdmin.config.pagQuantity = 20;
    this.gridListRulesAdmin.config.getService = "/rules-admin/search";
    this.gridListRulesAdmin.config.redirectId = true;
    this.gridListRulesAdmin.config.entity =
      "Administrador de reglas de descuento";
  }

  returnCampaign() {
    this.rulesAdminChangedSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.nameChangeSubscription.unsubscribe();
    this._rulesDispatcherService.deleteRulesAdmin();
    this.router.navigate(["/system/campaign"]);
  }

  get f() {
    return this.campaignForm.controls;
  }

  uploadCampaignFilter() {
    this.uploadExcelFilter.open();
  }

  uploadVisibility() {
    this.uploadExcelVisibility.open();
  }

  resultInfoFilter(listProcess) {
    console.log(listProcess)
    this.listProcessFilter = listProcess;
    this.showSummary = true;
  }

  resultInfoExcel(listProcess) {
    console.log(listProcess);
    if (listProcess.info.listProcess.length == 0) {
      //this._rulesDispatcherService.deleteAllDiscountRules();
      this._middleService.sendMessage(
        "Campaña",
        "La campaña ha sido actualizada correctamente",
        "ok",
        1000
      );
      setTimeout(() => {
        window.location.reload();
      }, 500);

    } else {
      this.listProcessFilter = listProcess;
      this.showSummary = true;
    }
  }

  closeSummary() {
    this.showSummary = false;
    if (this.listProcessFilter.processType == 'massive-product-active') {
      window.location.reload();
      // this.getInfoCampaign();
      // this._middleService.sendLoading(true);
      // setTimeout(() => {
      //   this._middleService.sendLoading(false);
      //   this._middleService.sendMessage(
      //     "Campaña",
      //     "La campaña ha sido actualizada",
      //     "ok"
      //   );
      // }, 1500);
    }
  }

  getConfigExcel() {
    const date = new Date().toISOString().substring(0, 10);
    this.uploadExcelFilter.config = {
      title: 'Carga Masiva de filtros de Campaña',
      urlService: '/campaign/upload-filter-product-campaign/' + this.idCampaign,
      apiDownload: '/campaign/template/campaign-list-filter/' + this.idCampaign,
      fileDownloadName: 'Carga masiva de filtros campaña ' + date + '.xlsx',
    };
  }

  getConfigExcelVisibility() {
    const date = new Date().toISOString().substring(0, 10);
    this.uploadExcelVisibility.config = {
      title: 'Activación Masiva de Productos',
      urlService: '/campaign/upload-visibility-products-campaign/' + this.idCampaign,
      apiDownload: '/campaign/template/campaign-list-visibility/' + this.idCampaign,
      fileDownloadName: 'Activación masiva de productos de campaña ' + date + '.xlsx',
    };
  }

  addByName(event, name, selectPicture, nameModel) {
    if (event.key == "Enter") {
      if (name) {
        this._middleService.sendLoading(true);
        this._attachmentService.getByName(name).subscribe(
          (picture: any) => {
            this[selectPicture][0] = picture.name;
            this._middleService.sendLoading(false);
            this.searchName[nameModel] = null;
          },
          (error) => {
            this._middleService.sendMessage(
              "Producto",
              error.error.message,
              "error"
            );
            this._middleService.sendLoading(false);
          }
        );
      }
    }
  }

  updatePosition(entity, entityChange) {
    this[entityChange] = [];
    for (let i = 1; i <= this[entity].length; i++) {
      this[entityChange].push(i);
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



  changePositionBlur(value, newValue, element, entity, entityChange, event) {
    console.log(event)
    console.log('*******************************************')
    if (value + 1 != newValue) {


      this.activeChangePosition(value, newValue - 1, element, entity, entityChange, event);

    }
  }

  activeChangePosition(value, newValue, element, entity, entityChange, event) {
    console.log('-------------------------------------')
    console.log(value)
    console.log(newValue)
    this[entity].splice(value, 1);
    this[entity].splice(newValue, 0, element);
    setTimeout(() => {
      this[entityChange][value] = value + 1;
    }, 0);
    this.updatePosition(entity, entityChange);

  }

  changePosition(value, newValue, element, event, entity, entityChange) {
    if (event.key == "Enter") {
      event.target.blur()
    }
    event.additionals = true
  }

  validAdminRules() {
    this._roleService.validAccessRoleWindow('/campaign', 'ADMINRULES').subscribe(
      (validRole: boolean) => {
        this.listAdminRules = validRole
      }
    )
  }

  deleteImageBase(position, field, entityChange) {
    this[field].splice(position, 1);
    if (position > this[field].length) {
      this.imagePositionMobile = this[field].length;
      position = this[field].length;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
    this.updatePosition(field, entityChange);
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

  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  toggleShowRulesAdminForm() {
    this.showRulesAdminForm = true;
    this.showRulesAdminGrid = false;
    this.showOptions = false;
  }

  toggleShowRulesAdminGrid() {
    if (this.mainCra) {
      if (
        (this.mainCra.adminRuleForm.controls["name"].value !== null &&
          this.mainCra.adminRuleForm.controls["name"].value !== "" &&
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

  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);
  }

  showWindowMultimedia(field, multi, replacePosition?, limitSelect?, maxSize?, maxDimension?) {
    this.replacePosition = replacePosition;
    this.selectMuti = false;
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    this.multimediaGallery.config.noValidDimension = false;
    if (multi) {
      this.multimediaGallery.config.typeInfo = "multi";
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow(limitSelect);
  }

  dataPictureSave($event) {
    if (this.selectMuti) {
      for (const picture of $event) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = picture;
        } else {
          this[this.selectPicture].push({
            link: picture,
            urlredirect: "",
            title: "",
            subtitle: "",
          });
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

  deleteImage(position, field) {
    this[field].splice(this[field].length - position, 1);
  }

  getListGroup() {
    this._categoryService
      .getListCategoryAllGroup()
      .subscribe((listGroup: any) => {
        this.groupList = listGroup.filter(
          (item) => item.typeGroupCategory.ref1 == "product"
        );
        this.getListTypeGroup("product");
      });
  }

  onChanges() {
    this.nameChangeSubscription = this.campaignForm
      .get("name")
      .valueChanges.subscribe((val) => {
        this.nameChanged = true;
        this.campaignForm
          .get("friendly_url")
          .setValue(UtilsCode.cleanString("camp_" + val));
      });

    this.Subscriptions.push(
      this.campaignForm.get("group").valueChanges.subscribe((val) => {
        this.selectFlow = [];
        if (this.groupList) {
          const groupCategory = this.groupList.find((item) => item._id == val);
          if (groupCategory) {
            this.getListTypeGroup(groupCategory.typeGroupCategory.ref1);
          }
        }
      })
    );

    this.Subscriptions.push(
      this.filterForm.get("filterFlow").valueChanges.subscribe((val) => {
        const findInfo = this.listFlowArray.find(
          (item) => item.nameList == val
        );
        if (findInfo) {
          this.selectFlow = findInfo.flow;
        }
      })
    );
  }

  searchData() {
    if (this.campaignForm.get('query').value === "") {
      this.filteredProducts = (this.campaignForm.get('products') as any).controls.map((p, index) => ({ ...p, index }));
      return;
    }
    const queryLower = this.campaignForm.get('query').value.toLowerCase();
    this.filteredProducts = (this.campaignForm.get('products') as any).controls
      .filter((p, index) => {
        if (this.productList[index].name.toLowerCase().includes(queryLower) ||
          (this.productList[index].SKU ?
            this.productList[index].SKU.toLowerCase().includes(queryLower) : false)) {
          return p;
        }
      })
      .map((p, index) => {
        return { ...p, index: (this.campaignForm.get('products') as any).controls.indexOf(p) };
      });
  }


  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'campania' }).subscribe(
        (listInfo: any) => {

          if (listInfo.length > 0) {
            this.listImageField = listInfo[0].value
          }
          resolve({})
        }, (error) => {
          resolve({})
          this._middleService.sendMessage('Campaña', error.error.message, 'error')
        }
      )
    });
    return waitPromise;
  }

  getProductImageDimension() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'products' }).subscribe(
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
  getProductFormGroup(index: number): FormGroup {
    return (this.campaignForm.get("products") as any).controls[index];
  }

  getListTypeGroup(typeGroup) {
    this._ldvService
      .getLdvDetail("SONR-CATEGORY-GROUP")
      .subscribe((dataLdv: any) => {
        this.listOptionGroup = [];
        if (this.campaignForm.get("group").value) {
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
      newOption.nameList = "";
      newOption.flow = [];

      let searchId = totalPush - 1;
      while (searchId >= 0) {
        if (searchId < totalPush - 1) {
          newOption.nameList = newOption.nameList + " - ";
        }
        newOption.nameList =
          newOption.nameList + this.listOptionGroup[searchId].value;
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
      let valuename = "";
      for (let m = 0; m < this.selectFlow.length; m++) {
        if (m > 0) {
          valuename = valuename + " - ";
        }
        valuename = valuename + this.selectFlow[m].name;
      }

      this.filterForm.get("filterFlow").setValue(valuename);
    }
    this.listFlowArray = listFlow;
  }

  deleteRulesAdminF() {
    const title = "Administrador de reglas de descuento";
    const messageModal = "Perderá los cambios recientes ¿Desea continuar?";
    this.dialogConfirm.show(title, messageModal, null, "rulesAdmin");
  }

  confirmDeleteItem() {
    const title = "Eliminar Campaña";
    const messageModal = "¿Está seguro que desea eliminar?";
    this.dialogConfirm.show(title, messageModal, null, "Campaña");
  }

  acceptModal($event) {
    if ($event.accept) {
      if ($event.entity === "Campaña") {
        this.deleteItem();
      } else if ($event.entity === "Products") {
        const productsToDelete = [];
        for (const product of this.productList) {
          if (product.campaignName !== this.campaignName) {
            productsToDelete.push(product);
          }
        }
        this.validateRepeated();
      } else {
        this.showRulesAdminForm = false;
        this.showRulesAdminGrid = true;
        this.rulesAdminSaved = false;
        this._rulesDispatcherService.deleteRulesAdmin();
      }
    }
  }

  deleteItem() {
    this._middleService.sendLoading(true);

    this._campaignService.deleteCampaign(this.idCampaign).subscribe((data) => {
      this.navigateBackWhenCampaignIsDeleted();
    });
  }

  navigateBackWhenCampaignIsDeleted() {
    this._middleService.sendLoading(false);
    this._middleService.sendMessage(
      "Campaña",
      "La campaña ha sido eliminada correctamente",
      "ok"
    );
    this.router.navigate(["/system/campaign"]);
  }

  confirmDeleteProduct(index: number) {
    this.productList.splice(index, 1);
    this.productsList.removeAt(index);
    this.campaignForm.controls.products.patchValue(this.productsList);
    /* (<FormArray>this.campaignForm.get("products")).removeAt(index); */
  }

  // onEditRulesAdmin() {
  //   this.editRulesAdmin = true;
  //   this.showRulesAdminForm = true;
  // }

  unmountRulesAdminAndShowOptions() {
    this.showOptions = true;
    this.showRulesAdminForm = false;
  }

  updateProducts($event) {
    let found = false;
    this.productList.forEach((product, index) => {
      if (product._id === $event._id) {
        found = true;
        this.productList.splice(index, 1);
        this.productsList = this.campaignForm.get("products") as FormArray;
        this.productsList.removeAt(index);
        this.productsList.controls = [...this.productsList.controls]; // force change detection (for virtual scroll to work)
        if (product.campaign && product.campaign === this.idCampaign) {
          this.productsForUpdate.push(product);
        }
        // this.campaignForm.get('products').patchValue([this.productsList]);
        this.searchData();
        return;
      }
    });
    if (!found) {
      this.productList.push($event);
      const index = this.campaignProducts.findIndex(
        (product) => product.productId._id === $event._id
      );

      if (index !== -1) {
        $event.exclusive = this.campaignProducts[index].exclusive;
      }

      this.productsList = this.campaignForm.get("products") as FormArray;
      this.productsList.push(
        new FormGroup({
          price: new FormControl( // revisar
            $event.campaign_price !== undefined
              ? $event.campaign_price !== 0
                ? $event.campaign_price
                : $event.special_price
              : $event.special_price,
            // [
            //   Validators.required,
            //   Validators.min(0),
            //   Validators.max($event.special_price),
            // ]
          ),
          active: new FormControl($event.active),
          exclusive: new FormControl(
            $event.exclusive !== undefined ? $event.exclusive : false
          ),
          stock: new FormControl(
            $event.stock /* [Validators.required,
          Validators.min(0), Validators.max($event.stock)] */
          ),
          sold: new FormControl($event.sold ? $event.sold : 0),
          _id: new FormControl($event._id),
        })
      );
      this.productsList.controls = [...this.productsList.controls]; // force change detection (for virtual scroll to work)
      this.searchData();
    }
    this.scrollDown();
  }

  switchModal($event) {
    this.headerRuleFixed = $event;
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

  getInfoCampaign() {
    this._campaignService.getOne(this.idCampaign).subscribe((campaign: any) => {
      this.productsList = new FormArray([]);
      campaign.products = campaign.products.filter((product) => product.productId)
      for (const product of campaign.products) {
        this.productsList.push(
          new FormGroup({
            price: new FormControl( // revisar
              product.productId.campaign_price === undefined
                ? product.productId.special_price
                : product.productId.campaign_price,
              // [
              //   Validators.required,
              //   Validators.min(0),
              //   Validators.max(product.productId.special_price),
              // ]
            ),
            active: new FormControl(product.productId.active),
            exclusive: new FormControl(product.exclusive),
            stock: new FormControl(
              product.stock /* [Validators.required,
            Validators.min(0), Validators.max(product.productId.stock)] */
            ),
            sold: new FormControl(product.sold ? product.sold : 0),
            _id: new FormControl(product.productId._id),
          })
        );
      }

      this.productsList.value.forEach((product) => {
        this.initialPrices.push(product.price);
      });

      campaign.image_stamp && this.listStampPicture.push(campaign.image_stamp);

      this.campaignProducts = campaign.products;
      this.campaignName = campaign.name;

      this.campaignForm.setControl("products", this.productsList);

      this.filteredProducts = this.campaignForm.get("products").value.map((p) => ({
        ...p,
        index: this.campaignForm.get("products").value.indexOf(p),
      }))

      this.showRulesAdminForm = true;

      campaign.rules_admin.rules.forEach((rule) => {
        // Populate service discountRules array
        this._rulesDispatcherService.addDiscountRule(rule.rddId);
      });

      this.campaignForm.patchValue({
        name: campaign.name,
        active: campaign.active,
        delivery: campaign.delivery,
        group: campaign.group,
        discount_name: campaign.discount_name,
        active_stamp: campaign.active_stamp,
        friendly_url: campaign.friendly_url,
        flow: campaign.flow,
      });

      // populate template and service for rules admin object
      this._rulesDispatcherService.setRulesAdminChanged(campaign.rules_admin);

      this.selectFlow = campaign.flow;

      campaign.images_banner_link
        ? (this.listAddPicture = campaign.images_banner_link)
        : (this.listAddPicture = []);

      campaign.images_banner_link_app
        ? (this.listAddPictureMobile = campaign.images_banner_link_app)
        : (this.listAddPictureMobile = []);

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

      this.updatePosition("listAddPicture", "infoChangePosition");
      this.updatePosition("listAddPictureMobile", "infoChangePositionMobile");

      campaign.image_thumbnail &&
        this.listThumbnailImage.push(campaign.image_thumbnail);
      campaign.image_thumbnail_mobile &&
        this.listThumbnailImageMobile.push(campaign.image_thumbnail_mobile);
      campaign.image_button && this.listButtonImage.push(campaign.image_button);
      campaign.image_banner && this.listBannerImage.push(campaign.image_banner);
      campaign.image_banner_mobile &&
        this.listBannerImageMobile.push(campaign.image_banner_mobile);

      // populate array of products
      campaign.products.map((product, index) => {
        this.productList.push(product.productId);
      });

      this.gridListProducts.updateSelectItem();

      //load filters
      this._filterService.GetAll().subscribe((filterData: Array<any>) => {
        this.availablefilters = filterData;
        if (campaign.filters) {
          campaign.filters.forEach((element) => {
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



    });
  }

  configureMessage($event: any) {
    this.embeddedMessage = $event.message;
    this.rulesAdminSaved = $event.value;
  }

  getReason($event) {
    this.reasons = $event;
    this.validateRepeated();
  }

  validateProductSave() {
    this.mainCra && this.mainCra.saveAdminRule();

    if (!this.mainCra) {
      this._middleService.sendMessage(
        "Administrador de reglas de descuento",
        "Debe crear o seleccionar un administrador de reglas",
        "error"
      );
      return;
    }

    if (!this.rulesAdminSaved) {
      this.embeddedMessage();
      return;
    }

    if (this.productList.length === 0) {
      this._middleService.sendMessage(
        "Campaña",
        "Debe agregar al menos un producto descontado",
        "error"
      );
      return;
    }

    // if (
    //   !this.listThumbnailImage.length ||
    //   !this.listButtonImage.length ||
    //   !this.listBannerImage.length
    // ) {
    //   this._middleService.sendMessage(
    //     "Campaña",
    //     "Debe de agregar las imágenes requeridas",
    //     "error"
    //   );
    //   return;
    // }

    let foundProductPreventSave = false;
    let foundProductAllowOverwrite = false;

    for (const product of this.productList) {
      if (
        product.campaignName &&
        product.campaignActive &&
        product.campaignName !== this.campaignName
      ) {
        foundProductPreventSave = true;
        continue;
      } else if (
        product.campaignName &&
        !product.campaignActive &&
        product.campaignName !== this.campaignName
      ) {
        foundProductAllowOverwrite = true;
      }
    }

    if (foundProductPreventSave) {
      const title = "Guardar productos";
      const messageModal =
        "Algunos productos pertenecen a campañas activas. Si desea guardar debe deshabilitar o eliminar los productos de la campaña respectiva";
      this.dialogConfirm.show(title, messageModal, null, "Products", true);
    } else if (foundProductAllowOverwrite) {
      const title = "Guardar productos";
      const messageModal =
        "Algunos productos pertenecen a otras campañas. Al guardar se sobreescribirán los datos. ¿Desea continuar?";
      this.dialogConfirm.show(title, messageModal, null, "Products");
    } else {
      // let priceChanged = false;
      // this.productsList.value.forEach((product, index) => {
      //   if (this.initialPrices.length > index) {
      //     if (product.price !== this.initialPrices[index]) {
      //       priceChanged = true;
      //       this.indexPriceChanged.push(index);
      //     }
      //   }
      // });
      // if (priceChanged && this.idCampaign) {
      //   this.dialogReason.show("Campaña", null, null, true);
      // } else {
      this.validateRepeated();
      // }
    }
  }

  validateRepeated() {
    this._middleService.sendLoading(true);
    this.submitted = true;
    if (!this.idCampaign) {
      this._campaignService
        .searchFriendlyURL(
          this.campaignForm.get("friendly_url").value,
          this.campaignForm.get("name").value
        )
        .subscribe(
          (res: any) => {
            this.campaignForm.get("friendly_url").setValue(res.friendly_url);
            this.saveCampaign();
          },
          (error) => {
            this._middleService.sendMessage(
              "Campaña",
              error.error.message,
              "error"
            );
            this._middleService.sendLoading(false);
          }
        );
    } else if (this.idCampaign && this.nameChanged) {
      this._campaignService
        .searchFriendlyURL(
          this.campaignForm.get("friendly_url").value,
          this.campaignForm.get("name").value,
          this.idCampaign
        )
        .subscribe(
          (res: any) => {
            this.campaignForm.get("friendly_url").setValue(res.friendly_url);
            this.saveCampaign();
          },
          (error) => {
            this._middleService.sendMessage(
              "Campaña",
              error.error.message,
              "error"
            );
            this._middleService.sendLoading(false);
          }
        );
    } else {
      this.saveCampaign();
    }
  }
  addCampaignFilter() {
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
    }
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
  addValuetoCampaignArray() {
    console.log('test')

    if (this.campaignFilterValueToAdd) {
      if (!this.filteredSelected.values) {
        this.filteredSelected.values = [];
        this.filteredSelected.values.push(this.campaignFilterValueToAdd);
      } else {
        this.filteredSelected.values.push(this.campaignFilterValueToAdd);
      }
    }
  }
  saveCampaign() {
    if (!this.sendFilters || this.sendFilters.length !== 0) {
      this.sendFilters = [];
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
    this.campaignForm.controls.filters.patchValue(this.sendFilters);
    this.campaignForm.get("flow").setValue(this.selectFlow);
    if (this.campaignForm.valid) {
      this.campaignForm.get("image_stamp").setValue(this.listStampPicture);

      // save in chain
      this.discountRules = this._rulesDispatcherService.getDiscountRules();

      this.discountRulesForCreation = [];
      this.discountRulesForUpdate = [];

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
    } else {
      this._middleService.sendLoading(false);
      this._middleService.sendMessage(
        "Campaña",
        "Revise los campos obligatorios",
        "error"
      );
    }
  }

  updateExistingDiscountRules(rdds: any[]) {
    this._discountRuleService
      .updateManyDiscountRules(rdds)
      .subscribe(null, (error) => {
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
            this.createCampaign(savedRulesAdmin.createdId);
          },
          (error) => {
            this._middleService.sendLoading(false);
            console.log(error);
          }
        );
    } else {
      this._rulesAdminService.createRulesAdmin(this.rulesAdmin).subscribe(
        (savedRulesAdmin: any) => {
          this.createCampaign(savedRulesAdmin.createdId);
        },
        (error) => {
          this._middleService.sendLoading(false);
          console.log(error);
        }
      );
    }
  }

  createCampaign(rulesAdminId: string) {
    const {
      name,
      active,
      friendly_url,
      delivery,
      image_stamp,
      active_stamp,
      discount_name,
      flow,
      filters,
    } = this.campaignForm.value;

    const products = [];
    this.productList.forEach((product, index) => {
      const found = this.indexPriceChanged.find((iPrice) => iPrice === index);

      if (found !== undefined) {
        this.productList[index] = Object.assign(
          this.productList[index],
          this.reasons
        );
      }

      product.campaign_price = this.campaignForm.controls["products"].value[index].price;
      products.push({
        productId: product._id,
        price: this.campaignForm.controls["products"].value[index].price,
        exclusive: this.campaignForm.controls["products"].value[index].exclusive,
        stock: this.campaignForm.controls["products"].value[index].stock,
        sold: this.campaignForm.controls["products"].value[index].sold,
      });
    });

    const data: any = {
      name,
      image_stamp,
      active_stamp,
      active,
      delivery,
      discount_name,
      friendly_url,
      products,
      rules_admin: rulesAdminId,
      flow,
      filters,
      group: this.campaignForm.controls["group"].value,
    };

    if (this.listThumbnailImage.length > 0) {
      data.image_thumbnail = this.listThumbnailImage[0];
    } else {
      data.image_thumbnail = "";
    }

    if (this.listThumbnailImageMobile.length > 0) {
      data.image_thumbnail_mobile = this.listThumbnailImageMobile[0];
    } else {
      data.image_thumbnail_mobile = "";
    }

    if (this.listButtonImage.length > 0) {
      data.image_button = this.listButtonImage[0];
    } else {
      data.image_button = "";
    }

    if (this.listBannerImage.length > 0) {
      data.image_banner = this.listBannerImage[0];
    } else {
      data.image_banner = "";
    }

    if (this.listBannerImageMobile.length > 0) {
      data.image_banner_mobile = this.listBannerImageMobile[0];
    } else {
      data.image_banner_mobile = "";
    }

    data.images_banner_link = this.listAddPicture;
    data.images_banner_link_app = this.listAddPictureMobile;

    if (this.idCampaign) {
      this._campaignService
        .updateCampaign(data, this.idCampaign)
        .subscribe((savedCampaign: any) => {
          this.productList.forEach((product) => {
            delete product.__v;
            product.campaign = savedCampaign._id;
          });
          this.productsForUpdate.forEach((productForUpDate) => {
            productForUpDate.campaign = undefined;
            productForUpDate.campaign_price = undefined;
            this.productList.push(productForUpDate);
          });
          this._productService.updateManyCampaign(this.productList).subscribe(
            (response: any) => {
              this.nameChanged = false;
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Campaña",
                "La campaña ha sido actualizada correctamente",
                "ok"
              );
              setTimeout(() => {
                this.router
                  .navigateByUrl("/", { skipLocationChange: true })
                  .then(() => this.router.navigate(["/system/campaign"]));
              }, 1000);
            },
            (error) => {
              this._middleService.sendLoading(false);
              const message =
                error.status === 403
                  ? "Lo sentimos. No tiene permisos para realizar esta operación"
                  : "Lo sentimos. Ha ocurrido un error.";

              this._middleService.sendMessage("Campaña", message, "error");
            }
          );
        });
    } else {
      this._campaignService
        .createCampagin(data)
        .subscribe((savedCampaign: any) => {
          this.productList.forEach((product) => {
            delete product.__v;
            product.campaign = savedCampaign.createdId;
          });
          this.productsForUpdate.forEach((productForUpDate) => {
            productForUpDate.campaign = undefined;
            productForUpDate.campaign_price = undefined;
            this.productList.push(productForUpDate);
          });
          this._productService.updateManyCampaign(this.productList).subscribe(
            (response: any) => {
              this.nameChanged = false;
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Campaña",
                "La campaña ha sido creada correctamente",
                "ok"
              );
              setTimeout(() => {
                this.router
                  .navigateByUrl("/", { skipLocationChange: true })
                  .then(() => this.router.navigate(["/system/campaign"]));
              }, 1000);
            },
            (error) => {
              this._middleService.sendLoading(false);
              const message =
                error.status === 403
                  ? "Lo sentimos. No tiene permisos para realizar esta operación"
                  : "Lo sentimos. Ha ocurrido un error.";

              this._middleService.sendMessage("Campaña", message, "error");
            }
          );
        });
    }
  }

  openItem(idItem) {
    let url = `system/product/detail/${idItem}`;
    window.open(url, "_blank");
  }

  validateInput(event: KeyboardEvent) {
    const pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ@0-9 -\.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (event.key == "Enter") {
      this.searchData();
    }
  }

  cleanPerField() {
    for (const field of this.productList) {
      field.filter = null;
      field.upFilter = false;
      field.downFilter = false;
    }
  }

  updateDataField(_id, infoField, value, url, data) {
    this._middleService.sendLoading(true);
    let infoBody = {};
    infoBody[infoField] = value;
    this._tableService.updateEntity(url, _id, infoBody).subscribe(
      (update: any) => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Producto",
          "Se ha realizado la actualización",
          "ok"
        );
        this.productList.map((prod) => {
          if (prod.SKU == update.SKU) {
            prod.active = update.active;
            return;
          }
        });
      },
      (error) => {
        data[infoField] = !data[infoField];
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
  }

  ngOnDestroy() {
    this._rulesDispatcherService.deleteRulesAdmin();
    this.rulesAdminChangedSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.nameChangeSubscription.unsubscribe();
    this.valueChagesSubscription && this.valueChagesSubscription.unsubscribe();
    this.Subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
