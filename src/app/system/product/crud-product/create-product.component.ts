import { DialogReasonComponent } from "../../components/dialog-reason/dialog-reason.component";
import { Subscription } from "rxjs";
import { RulesAdminService } from "./../../../shared/service/rules-admin.service";
import { DiscountRuleService } from "./../../../shared/service/discount-rule.service";
import { RulesDispatcherService } from "./../../../shared/service/rules-dispatcher.service";
import { GridComponent } from "./../../components/grid/grid.component";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  NgZone,
  AfterContentInit,
  Input,
} from "@angular/core";
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { FamilyProductService } from "src/app/shared/service/family-product.service";
import { LdvService } from "src/app/shared/service/ldv.service";
import { SupplierService } from "src/app/shared/service/supplier.service";
import { CategoryService } from "src/app/shared/service/category.service";
import { DynamicTreeViewComponent } from "../../components/dynamic-tree-view/dynamic-tree-view.component";
import { ProductService } from "src/app/shared/service/product.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { MiddleService } from "src/app/shared/service/middle.service";
import { MultimediaGalleryComponent } from "../../components/multimedia-gallery/multimedia-gallery.component";
import { DialogConfirmComponent } from "../../components/dialog-confirm/dialog-confirm.component";
import { CompareImageComponent } from "../../components/compare-image/compare-image.component";
import { CompareArray } from "src/app/utils/compareArray";
import { UtilsCode } from "src/app/utils/utilsCode";
import { SupplierMethodSendService } from "src/app/shared/service/supplier-method-send.service";
import { HeaderService } from "../../components/header/header.service";
import { CrudRulesAdminComponent } from "../../rules-admin/crud-rules-admin/crud-rules-admin.component";
import { MatSelectChange, MatOption, MatChipInputEvent, MatChipList, MatRadioChange } from "@angular/material";
import { AttachmentService } from 'src/app/shared/service/attachment.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/forkJoin";
import { ArrayType, EmbeddedTemplateAst } from "@angular/compiler";

import { element } from "protractor";
import { ModalSearchFatherVariationProductComponent } from "../modal-search-father-variation-product/modal-search-father-variation-product.component";
import { SortArray } from "src/app/utils/sortArray";


declare var $: any;
interface fatherVariation {
  type: string,
  variation_name: string,
  value: Array<string>
};
@Component({
  selector: "app-crud-product",
  templateUrl: "./crud-product.component.html",
  styleUrls: ["./crud-product.component.scss"],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  listImagesFatherVariatons: any;
  selectedFatherVariationImage: any;
  @ViewChild("multimediaListFatherVariations", { static: true })
  multimediaFatherVariations: MultimediaGalleryComponent;
  removable = true;
  /*   @ViewChild("chipList", { static: false }) chipList: MatChipList; */
  chipListArray: Array<any>;
  variationFatherList: any;
  @ViewChild("fatherVariationProductSearch", { static: true }) fatherVariationProductSearch: ModalSearchFatherVariationProductComponent
  existingFather: boolean = false;
  myVariations: Array<any>;
  mySelectedVariations: Array<any>;
  haveVariations: boolean = false;
  imFather: boolean = false;
  nameFather: any;
  haveFather: boolean = false;
  checkVariations: boolean = false;
  myFather: Array<any>;
  fatherCharged: boolean = false;
  is_variation_product_luxury: boolean = false;
  valid_father_children: boolean = true;
  no_variation: boolean = true;
  is_my_father_active: boolean;
  myRequest: any;
  routerSubscription: Subscription;
  searchName: any;
  public editorOptions: Object = { key: 'enmilgi1hpdA6xl==', placeholderText: 'Ingrese detalle', };
  idProduct: String;
  haveProductVariation: boolean
  variation_changed: boolean = false;
  firstInfo: boolean
  firstInfoProduct: boolean
  productForm: FormGroup;
  videoForm: FormGroup;
  groupList: any;
  listCategoryGroups: Array<any>;
  listCategories: Array<any>;
  listFamily: any;
  listTypeProduct: any;
  listTypeCurrency: any;
  listSupplier: any;
  listBrand: any;
  listSupplierDelivery: any
  listCategory: Array<any>;
  listCategoryChange: Array<any>;
  listDetailProduct: any;
  listProductPack: Array<string>;
  listProductFather: Array<any>
  listSKUProduct: any;
  listAddSku: any;
  listAddPack: any;
  lisAddPicture: any;
  lisMainAddPicture: any;
  lisMainAddPictureMobile: any;
  lisBannerAddPicture: any;
  lisBannerAddPictureMobile: any;
  lisBannerLogoAddPicture: any;
  lisBannerLogoAddPictureMobile: any;
  listAddSkuRelated: any;
  listAddPackChange: any;
  headerFixed: boolean;
  isSupplier: boolean;
  objChange: any;
  selectCategories: any;
  selectPicture: any;
  submitted: any;
  duplicateSKU: boolean;
  duplicatePACK: boolean;
  showMoreButton: boolean;
  floatOption: boolean;
  imagePositionMobile: any;
  imageShowSlider: string;
  url_attachment: string;
  selectMuti: any;
  submitFiltersArray: Array<any>;
  listCategoriesFilter: Array<any>;
  penddingRequest: any;
  approve_user: boolean;
  typeRequest: string;
  dataReplace: any;
  switchNewData: boolean;
  infoCompare: any;
  existChange: any;
  selectChangeCategory: any;
  infoSelectMethod: any;
  listMethod: any;
  openSelectMehod: boolean;
  selectMethodDetail: Array<any>;
  listChangetMethodDetail: any;
  listMethodChange: any;
  headerRuleFixed: boolean;
  denyMessage: string;
  showDenyMessage: boolean;
  discountTypes: any;
  available_max_method_product: any;
  validProductField: any
  toogleProduct: boolean
  toggleMultimediaSection: boolean;
  toogleCategories: boolean;
  fatherproductDetail: any
  replacePosition: any
  listImageField: any
  limitGalleryOut: boolean
  maxGallery: any
  detailDiference: Array<any>
  haveERP: boolean;
  //Rules Admin section
  @ViewChild("gridListRulesAdmin", { static: false })
  gridListRulesAdmin: GridComponent;
  @ViewChild("cra", { static: false })
  mainCra: CrudRulesAdminComponent;
  showRulesAdminForm: boolean = false;
  showRulesAdminGrid: boolean = false;
  showRulesAdminSection: boolean = false;
  editRulesAdmin: boolean = false;
  rulesAdminSaved: boolean = false;
  showOptions: boolean = true;
  nameChanged: boolean = false;
  Subscriptions: Array<Subscription>;
  rulesAdmin: any;
  discountRules: any[] = [];
  createdDiscountRulesId: string[] = [];
  discountRulesForCreation: any[] = [];
  discountRulesForUpdate: any[] = [];
  typeDiscount: string = "%";
  priceJustification: string;
  specialPriceJustification: string;
  initialPrice: number;
  initialSpecialPrice: number;
  campaign_price: number = 0;
  embeddedMessage: any;
  panelOpenState = true;
  previewStock: any;
  tinyEditorConfig;
  lisAddGaleryVideos: any;
  infoChangePosition: Array<any>
  listImageDimension: any
  childNode: any = {};
  codeSupplier: string;
  lisImageBackgroundDiscount;
  @ViewChild("categoryTree", { static: false })
  selectableCategory: DynamicTreeViewComponent;
  @ViewChild("categoryChangeTree", { static: false })
  selectableChangeCategory: DynamicTreeViewComponent;
  @ViewChild(FileUploadComponent, { static: false })
  uploadImage: FileUploadComponent;
  @ViewChild("multimediaList", { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogReason", { static: false })
  dialogReason: DialogReasonComponent;
  @ViewChild("compareMainImage", { static: false })
  compareMainImage: CompareImageComponent;
  @ViewChild("compareMainMobileImage", { static: false })
  compareMainMobileImage: CompareImageComponent;
  @ViewChild("compareBannerImage", { static: false })
  compareBannerImage: CompareImageComponent;
  @ViewChild("compareBannerMobileImage", { static: false })
  compareBannerMobileImage: CompareImageComponent;
  @ViewChild("compareLogoMobileImage", { static: false })
  compareLogoMobileImage: CompareImageComponent;
  @ViewChild("compareLogoImage", { static: false })
  compareLogoImage: CompareImageComponent;
  @ViewChild("compareLisAddPicture", { static: false })
  compareLisAddPicture: CompareImageComponent;
  @ViewChild(DynamicTreeViewComponent, { static: true })
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listAddSku, event.previousIndex, event.currentIndex);
  }
  dropPack(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listAddPack, event.previousIndex, event.currentIndex);
  }
  constructor(
    private serviceFamily: FamilyProductService,
    private activatedRoute: ActivatedRoute,
    private _attachmentService: AttachmentService,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService,
    private _productService: ProductService,
    private serviceMethod: SupplierMethodSendService,
    private middleService: MiddleService,
    private headerService: HeaderService,
    private _rulesDispatcherService: RulesDispatcherService,
    private _discountRuleService: DiscountRuleService,
    private _rulesAdminService: RulesAdminService,
    private _ldvService: LdvService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.listImageField = {}
    this.listImageDimension = {}
    this.infoChangePosition = []
    this.toogleProduct = true
    this.toggleMultimediaSection = true;
    this.toogleCategories = true;
    this.imagePositionMobile = 1;
    this.url_attachment = localStorage.getItem("url_attachment");
    this.listImagesFatherVariatons = [];
    this.lisAddPicture = [];
    this.lisMainAddPicture = [];
    this.lisMainAddPictureMobile = [];
    this.lisBannerAddPicture = [];
    this.lisBannerAddPictureMobile = [];
    this.listDetailProduct = [];
    this.lisBannerLogoAddPicture = [];
    this.lisBannerLogoAddPictureMobile = [];
    this.lisImageBackgroundDiscount = [];
    this.listChangetMethodDetail = [];
    this.listCategory = [];
    this.listCategoryChange = [];
    this.selectCategories = [];
    this.selectChangeCategory = [];
    this.validProductField = {}
    this.discountTypes = [];
    this.approve_user = false;
    this.activatedRoute.params.subscribe((params) => {
      this.idProduct = params.id;
      params.id && (this.editRulesAdmin = true);
    });
    this.existChange = {};
    this.infoSelectMethod = [];
    this.selectMethodDetail = [];
    this.listMethodChange = null;
    this.tinyEditorConfig = {
      /*  height: '200px', */
      branding: false,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print autoresize',
        'preview anchor searchreplace visualblocks code',
        'fullscreen insertdatetime media table paste',
        'help wordcount fullscreen'
      ],
      toolbar:
        'undo redo | formatselect | fontsizeselect | bold italic | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent forecolor backcolor | table tabledelete | fullscreen'
    }
  }
  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  ngOnInit() {
    this.is_variation_product_luxury = false;
    this.codeSupplier = '';
    this.limitGalleryOut = false
    this.searchName = {}
    this.Subscriptions = new Array<Subscription>();
    this.fatherproductDetail = {}
    this.lisAddGaleryVideos = [];
    this.previewStock = 0;
    this.headerService.sendTitle("Catálogo de Productos");
    this.switchNewData = false;
    this.listCategoriesFilter = [];
    this.duplicateSKU = false;
    this.duplicatePACK = false;
    this.existingFather = false;
    this.listAddSku = [];
    this.listAddPack = [];
    this.listSKUProduct = [];
    this.listProductPack = [];
    this.listProductFather = []
    this.headerFixed = false;
    this.infoCompare = {};
    this.headerRuleFixed = false;
    this.mySelectedVariations = [];
    this.myVariations = [];
    this.imFather = false;
    this.Subscriptions.push(this.router.events.subscribe((change) => {
      if (change instanceof NavigationEnd) {
        this.idProduct = this.activatedRoute.snapshot.params["id"];
        /* this.haveVariations = false; */
        this.fatherCharged = false;
        this.haveFather = false;
        this.showRulesAdminForm = false;
        this.showRulesAdminSection = false;
        this._rulesDispatcherService.deleteRulesAdmin();
        /* this.getDataProduct(); */
        this.getInfoIni();
      }
    }));
    /*     this._productService.checkValidFatherChildren(this.idProduct).subscribe(
          valid => {
            console.log(valid)
            this.middleService.sendLoading(false);
            if (valid == true) {
              this.valid_father_children = false;
            } else {
              this.valid_father_children = true;
            }
          },
          (error) => {
            this.middleService.sendLoading(false);
            console.log(error)
          }); */


    /* this.routerSubscription = this.router.events.subscribe(change => {
      if (change instanceof NavigationEnd) {
        this.idProduct = this.activatedRoute.snapshot.params['idProduct'];
        this.getDataProduct();
      }
    }); */
    this.productForm = new FormGroup({
      active: new FormControl(false, [Validators.required]),
      is_variation: new FormControl(false, [Validators.required]), //dolche
      is_product_variation_select: new FormControl(false),
      type_variation: new FormControl(null),
      father_base_variation: new FormControl(""),
      variation_father: new FormArray([
        /* this.initFatherVariation(), */
      ]),
      father_variation_code: new FormControl(""),
      variations: new FormControl([]),
      has_dedication: new FormControl(false, [Validators.required]),
      product_father: new FormControl(null),
      featured: new FormControl(false),
      show_discount: new FormControl(false),
      type: new FormControl("", [Validators.required]),
      is_pack: new FormControl(false),
      currency: new FormControl("", [Validators.required]),
      supplier: new FormControl("", [Validators.required]),
      supplier_delivery: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      group: new FormControl("", /* [Validators.required] */),
      name: new FormControl("", [Validators.required]),
      small_name: new FormControl(""),
      model_product: new FormControl(""),
      list_method: new FormControl([]),
      detail_list: new FormControl(),
      videos_link: new FormControl(""),
      url_nm_travel: new FormControl(""),
      /*   taxBuy: new FormControl("", [Validators.required]),
        taxSent: new FormControl("", [Validators.required]), */
      clasification: new FormControl(""),
      price: new FormControl("", [Validators.required, Validators.min(0)]),
      special_price: new FormControl(0, [
        Validators.min(0),
      ]),
      special_offer: new FormControl(""),
      show_special_offer: new FormControl(null),
      initial_date_offer: new FormControl(""),
      end_date_offer: new FormControl(""),
      stock: new FormControl(0, [Validators.required]),
      SKU: new FormControl(""),
      show_in_stock_out: new FormControl(false, [Validators.required]),
      last_unit: new FormControl(false, [Validators.required]),
      search_sku: new FormControl(""),
      search_pack: new FormControl(""),
      search_father: new FormControl(""),
      friendly_url: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      meta_description: new FormControl("", [Validators.required]),
      filter_values: new FormControl(),
      active_discount: new FormControl(false),
      type_discount: new FormControl(null),
      discount_amount: new FormControl(null),
      description_discount: new FormControl(null)
    });
    this.videoForm = new FormGroup({
      url: new FormControl(null)
    });
    this.submitted = false;
    this.onChanges();
    this.getInfoIni();
  }

  changeMyFatherActiveStatus($event) {
    if (this.idProduct) {
      if (this.productForm.get('is_product_variation_select').value && this.productForm.get('type_variation').value === 'V') {
        this._productService.changeMyFatherActiveStatus(this.productForm.get('father_base_variation').value, $event.checked).subscribe(
          res => {
            this.middleService.sendMessage(
              "Producto",
              "Se actualizó la visibilidad del producto base",
              "ok"
            );
            this.is_my_father_active = $event.checked;
          },
          (error) => {
            console.log("event", $event)
            this.middleService.sendLoading(false);
            $event.source.checked = false;
            this.is_my_father_active = false;
            this.middleService.sendMessage(
              "Producto",
              error.error.message,
              "error"
            );
            console.log(error)
          }
        )
      }
    }
  }

  checkValidFatherVariationActive($event) {
    if (this.productForm.get("type_variation").value === "B" && $event.checked) {
      this._productService.checkValidFatherVariationActive(this.idProduct).subscribe(
        valid => {
          this.middleService.sendLoading(false);
          if (valid == true) {
            this.productForm.get("active").setValue(true);
          } else {
            this.middleService.sendMessage(
              "Producto",
              "No se encontró ningún hijo activo",
              "error"
            );
            this.productForm.get("active").setValue(false);
          }
        },
        (error) => {
          this.middleService.sendLoading(false);
          console.log(error)
        }
      );
    } else {
      return;
    }
  }

  initValueVariation(v?: string, des?: string) {
    return new FormGroup({
      value: new FormControl(v || "", [Validators.required]),
      description: new FormControl(des || null),
    })
  }

  initFatherVariation(t?: string, v_name?: string) {
    return new FormGroup({
      type: new FormControl(t || '', [Validators.required]),
      variation_name: new FormControl(v_name || '', [Validators.required]),
      /*  value: new FormControl([], [Validators.required]) */
      value: new FormArray([/* this.initValueVariation() */])
    });
  }

  cleanFields() {
    this.productForm.get('type_variation').setValue('');
    this.productForm.get('is_product_variation_select').setValue(false);
    this.productForm.get('name').setValue('');
    this.productForm.get('variations').setValue([]);
    this.productForm.get('supplier_delivery').setValue(null);
    if (!this.isSupplier) {
      this.productForm.get('supplier').setValue(null);
    }

    this.productForm.get('SKU').setValue('');
    this.productForm.get('currency').setValue('');
    this.productForm.get('brand').setValue('');
    this.productForm.get('taxBuy').setValue('');
    this.productForm.get('taxSent').setValue('');
    this.productForm.get('type').setValue('');
    this.productForm.get('group').setValue('');
    this.productForm.get('active_discount').setValue('');
    this.productForm.get('discount_amount').setValue('');


    this.productForm.get('type_variation').markAsUntouched();
    this.productForm.get('is_product_variation_select').markAsUntouched();
    this.productForm.get('name').markAsUntouched();
    this.productForm.get('variations').markAsUntouched();
    this.productForm.get('supplier_delivery').markAsUntouched();
    this.productForm.get('supplier').markAsUntouched();
    this.productForm.get('SKU').markAsUntouched();
    this.productForm.get('currency').markAsUntouched();
    this.productForm.get('brand').markAsUntouched();
    this.productForm.get('taxBuy').markAsUntouched();
    this.productForm.get('taxSent').markAsUntouched();
    this.productForm.get('type').markAsUntouched();
    this.productForm.get('group').markAsUntouched();
    this.productForm.get('active_discount').markAsUntouched();
    this.productForm.get('discount_amount').markAsUntouched();

    this.getDiscountTypes();
    this.selectMethodDetail = [];
    this.productForm.get('list_method').setValue([]);
    this.productForm.get('father_base_variation').setValue('');
    this.selectCategories = [];
    this.listCategoriesFilter = [];
    /* this._categoryService
      .getCategoriesFiltersByCategoryArray(this.selectCategories)
      .subscribe((response: Array<any>) => {
        response.forEach((element) => {
          element.filters.forEach((filter, index) => {
            index === 0 && (filter.index = index, filter.categoryName = element.name);
            const exists = this.listCategoriesFilter.find((object) => {
              return filter._id == object._id;
            });
            if (!exists && !exists && !filter.filter.binded) {
              const patch = this.submitFiltersArray.find((values) => {
                return values.filter_id == filter._id;
              });
              if (patch) {
                if (filter.filter.type == "boolean") {
                  filter.booleanValue = patch.booleanValue;
                } else if (
                  filter.filter.type == "radio" ||
                  filter.filter.type == "checkbox"
                ) {
                  filter.stringValue = patch.stringValue;
                } else {
                  filter.numberValue = patch.numberValue;
                }
              }
              this.listCategoriesFilter.push(filter);
            }
          });
        });
      }); */
    this.lisAddPicture = [];
    this.showOptions = true;
    this.mySelectedVariations = [];
    this.myVariations = [];
    this.codeSupplier = '';
    this.showRulesAdminForm = false;
    this.showRulesAdminSection = false;
    this._rulesDispatcherService.deleteRulesAdmin();
    this.listDetailProduct = [];
    this.listAddSku = [];
    this.haveFather = false;
    this.nameFather = '';
    this.haveVariations = false;
    this.fatherCharged = false;
    console.log(this.productForm.value)
  }

  manageVariations($event) {
    if ($event.value === "V" || $event.checked === false) {
      //@ts-ignore
      while (this.productForm.controls['variation_father'].length !== 0) {
        //@ts-ignore
        this.productForm.controls['variation_father'].removeAt(0);
      }
      this.haveFather = true;
    } else if ($event.value === "B" && this.existingFather) {
      this.haveFather = false;
      const control = <FormArray>this.productForm.get('variation_father');
      /* control.push(this.initFatherVariation()); */
    }

    if ($event.checked === false) {
      this.cleanFields();

    }
    if ($event.value === "B") {
      this.cleanFields();
      this.productForm.get('is_product_variation_select').setValue(true);
      this.productForm.get('type_variation').setValue("B");
      this.haveFather = false;
      //Hardcode tallas y colores
      const control = <FormArray>this.productForm.get('variation_father');
      control.push(this.initFatherVariation('TEXT', 'Tallas'))
      control.push(this.initFatherVariation('COLOR', 'Colores'))
    }
    if ($event.value === "V") {
      this.cleanFields();
      this.productForm.get('is_product_variation_select').setValue(true);
      this.productForm.get('type_variation').setValue("V");
      this.haveFather = true;
    }

  }

  openFatherVariationModal() {
    this.fatherVariationProductSearch.open();
  }

  listProductSelect(event) {
    console.log(event);
    this.selectCategories = [];
    this.myVariations = [];
    this.mySelectedVariations = [];
    this._rulesDispatcherService.deleteRulesAdmin();

    for (const product of event.listProduct) {
      this.middleService.sendLoading(true);
      this._productService.getById(product._id).subscribe(
        (dataProduct: any) => {
          console.log("father", dataProduct)
          this.haveFather = true;
          this.nameFather = dataProduct.name;
          this.myVariations = dataProduct.variation_father;
          console.log("variaciones", this.myVariations)
          this.listDetailProduct = dataProduct.detail_list;
          this.listAddSku = dataProduct.related_products;
          this.lisMainAddPicture[0] = dataProduct.image_cover;
          this.lisBannerAddPicture[0] = dataProduct.image_banner;
          this.lisMainAddPictureMobile[0] = dataProduct.image_cover_mobile;
          this.lisBannerLogoAddPicture[0] = dataProduct.image_logo_banner;
          this.productForm.get('father_base_variation').setValue(dataProduct._id);
          this.productForm.get('name').setValue(dataProduct.name);
          this.productForm.get('supplier').setValue(dataProduct.supplier._id);
          this.productForm.get('supplier_delivery').setValue(dataProduct.supplier_delivery._id);
          this.productForm.get('list_method').setValue(dataProduct.list_method);
          this.productForm.get('brand').setValue(dataProduct.brand._id);
          this.productForm.get('currency').setValue(dataProduct.currency._id);
          this.productForm.get('taxBuy').setValue(dataProduct.taxBuy);
          this.productForm.get('taxSent').setValue(dataProduct.taxSent);
          this.productForm.get('type').setValue(dataProduct.type);
          this.productForm.get('group').setValue(dataProduct.group);
          this.productForm.get('active_discount').setValue(dataProduct.active_discount);
          this.productForm.get('discount_amount').setValue(dataProduct.discount_amount);
          this.productForm.get('type_discount').setValue(dataProduct.type_discount);
          this.productForm.get('price').setValue(dataProduct.price);
          this.productForm.get('special_price').setValue(dataProduct.special_price);

          if (dataProduct.rules_admin) {
            this.showRulesAdminForm = true;
            this.showRulesAdminSection = true;
            setTimeout(() => {
              dataProduct.rules_admin.rules.forEach((rule) => {
                //Populate service discountRules array
                this._rulesDispatcherService.addDiscountRule(rule.rddId);
              });

              //populate template and service for rules admin object
              this._rulesDispatcherService.setRulesAdminChanged(
                dataProduct.rules_admin
              );
            });
          }
      this.selectCategories = dataProduct.categories

          this._categoryService
      .getCategoriesFiltersByCategoryArray(this.selectCategories)
      .subscribe((response: Array<any>) => {
        console.log("respo", response)
        response.forEach((element) => {
          element.filters.forEach((filter, index) => {
            filter.category_id = element._id
            /* index === 0 && (filter.index = index, filter.categoryName = element.name); */
            const exists = this.listCategoriesFilter.find((object) => {
              return filter._id == object._id;
            });
            if (/* !exists && !exists &&  */!filter.filter.binded) {
              const patch = this.submitFiltersArray.find((values) => {
                return (values.category_id === filter.category_id && values.filter_id === filter._id);
              });
              console.log("patch", patch)
              if (patch) {
                if (filter.filter.type == "boolean") {
                  filter.booleanValue = patch.booleanValue;
                } else if (
                  filter.filter.type == "radio" ||
                  filter.filter.type == "checkbox"
                ) {
                  filter.stringValue = patch.stringValue;
                } else {
                  filter.numberValue = patch.numberValue;
                }
              }
              if(!this.listCategoriesFilter.some(e => e.categoryName === element.name)) {
                (filter.index = 0, filter.categoryName = element.name);
              }
              /* filter.category_id = element._id */
              filter.values = SortArray.orderArrayAlphabetical(filter.values);
              this.listCategoriesFilter.push(filter);
            }
          });
        });
      });

          /* for (const c of dataProduct.categories) {
            const index = this.selectCategories.findIndex(
              (category) => category == c._id
            );

            this.isSupplier && (this.selectCategories = []);

            this.listCategoriesFilter = [];

            if (index == -1) {
              this.selectCategories = [...this.selectCategories, c._id];
            } else if (!this.isSupplier) {
              this.selectCategories.splice(index, 1);
            }

            if (this.selectCategories.length > 0) {
              this.middleService.sendLoading(true);
              this._categoryService
                .getCategoriesFiltersByCategoryArray(this.selectCategories)
                .subscribe((response: Array<any>) => {
                  response.forEach((element) => {
                    element.filters.forEach((filter, index) => {
                      if (!filter.filter.binded) {
                        index === 0 && (filter.index = index, filter.categoryName = element.name);
                        this.listCategoriesFilter.push(filter);
                      }
                    });
                  });
                  this.middleService.sendLoading(false);
                });
            }
            this.checkedCategory(c._id);
          } */
          this.fatherCharged = true;
        },
        (error) => {
          this.router.navigate(["/system/product"]);
          this.middleService.sendMessage(
            "Producto",
            error.error.message,
            "error"
          );
        }
      );
    }
  }

  radioChange(event: MatRadioChange, data, i) {
    if (this.haveVariations || this.checkVariations) {
      this.mySelectedVariations[i].selected = event.value;
    } else {
      var obj = this.myVariations.filter(x => x._id === data._id)[0];
      obj.selected = event.value;
      if (!this.mySelectedVariations.some(x => x._id === data._id)) {
        this.mySelectedVariations.push(obj);
      }
    }
    console.log(this.mySelectedVariations);
  }

  allSelectedVariations(i): boolean {
    if (this.mySelectedVariations.length < this.myVariations.length) {
      if (this.mySelectedVariations[i]) {
        if (this.mySelectedVariations[i].selected) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  checkedVariations() {
    let myVars = [];
    let mySelectedVars = [];
    mySelectedVars = this.mySelectedVariations.map(function (e) {
      return e.selected;
    });
    console.log("mys", mySelectedVars);
    myVars = this.mySelectedVariations.map(function (e) {
      /* return {
        _id: e._id,
        type: e.type,
        variation_name: e.variation_name,
        value: e.value.map(function (sube) {
          if (mySelectedVars.some(e => e === sube)) {
            return {
              value: sube,
              checked: true
            }
          } else {
            return {
              value: sube,
              checked: false
            }
          }
        })
      } */
      return {
        _id: e._id,
        type: e.type,
        variation_name: e.variation_name,
        value: e.value.map(function (sube) {
          if (mySelectedVars.some(e => e.value === sube.value)) {
            return {
              _id: sube._id,
              description: sube.description,
              value: sube.value,
              checked: true
            }
          } else {
            return {
              _id: sube._id,
              description: sube.description,
              value: sube.value,
              checked: false
            }
          }
        }),
      }
    });
    console.log(this.mySelectedVariations)
    this.myVariations = myVars;
    for (let i = 0; i < this.mySelectedVariations.length; i++) {
      this.mySelectedVariations[i].selected = mySelectedVars[i];
      this.myVariations[i].selected = mySelectedVars[i];
    }
  }

  variationsWereChecked(dataProduct?: any) {
    this.haveVariations = true;
    this.imFather = false;
    let myVarsE = [];
    let mySelectedVarsE = [];
    console.log(dataProduct.variations)
    mySelectedVarsE = dataProduct.variations.map(function (e) {
      /* return {
        _id: e.value._id,
        value: e.value.value,
        description: e.value.description
      } */
      return e.value;
    })
    console.log("my sv", mySelectedVarsE)
    myVarsE = dataProduct.listFatherVariationUse.map(function (e) {
      /* e.value.map(function (sube) {
   if (mySelectedVarsE.some(e => e === sube)) {
     return {
       value: sube,
       checked: true
     }
   } else {
     return {
       value: sube,
       checked: false
     }
   }
 }) */
      return {
        _id: e._id,
        type: e.type,
        variation_name: e.variation_name,
        value: e.value.map(function (sube) {
          if (mySelectedVarsE.some(g => g.value === sube.value)) {
            console.log("sube", sube)
            console.log("g", mySelectedVarsE)
            return {
              _id: sube._id,
              description: sube.description,
              value: sube.value,
              checked: true
            }
          } else {
            return {
              _id: sube._id,
              description: sube.description,
              value: sube.value,
              checked: false
            }
          }
        }),
      }
    });

    this.mySelectedVariations = dataProduct.listFatherVariationUse.map(function (e) {
      /* return {
       _id: e._id,
       type: e.type,
       variation_name: e.variation_name,
       value: e.value,
     } */
      return {
        _id: e._id,
        type: e.type,
        variation_name: e.variation_name,
        value: e.value,
      }
    });
    /* this.mySelectedVariations = dataProduct.variations; */
    this.myVariations = myVarsE;
    for (let i = 0; i < this.mySelectedVariations.length; i++) {
      this.mySelectedVariations[i].selected = mySelectedVarsE[i];
      this.myVariations[i].selected = mySelectedVarsE[i];
    }
  }

  viewFather() {
    /* this.idProduct = this.productForm.get('father_base_variation').value; */
    this.router.navigate(['/system/product/detail/' + this.productForm.get('father_base_variation').value]);
  }

  getInfoIni() {
    this.middleService.sendLoading(true);
    this.Subscriptions.push(Observable.forkJoin([
      this.validSupplier(),
      this.validHaveERP(null),
      this.getFamily(),
      this.getTypeProduct(),
      this.getCurrency(),
      this.getSupplier(),
      this.getListGroup(),
      this.getProductImageSize(),
      this.getProductImageDimension(),
      this.ldvValidProductInfo(),
      this.ldvlimitGallery(),
      this.getDiscountTypes(),
      this.getMaxMethodAvailable(),
      this.getDiscountRules(),
      this.checkValidFatherChildren(),
    ]
    ).subscribe(
      () => {
        this.middleService.sendLoading(false)
        this.middleService.sendLoading(false);
        if (this.idProduct) {
          this.firstInfo = true;
          this.firstInfoProduct = true
          this.existingFather = false;
          this.getDataProduct();
        }
      }
    ));
  }

  disabledFields() {
    if (this.typeRequest === 'U') {
      this.productForm.controls.name.disable()
      this.productForm.controls.meta_description.disable()
      this.productForm.controls.title.disable()
      this.productForm.controls.price.disable()
      this.productForm.controls.special_price.disable()
      this.productForm.controls.stock.disable()
    }
  }

  checkFatherActiveStatus(idFather: string) {
    if (this.idProduct) {
      this._productService.checkFatherActiveStatus(idFather).subscribe(
        active => {
          console.log("active", active)
          this.middleService.sendLoading(false);
          if (active == true) {
            this.is_my_father_active = true;
          } else {
            this.is_my_father_active = false;
          }
        },
        (error) => {
          this.middleService.sendLoading(false);
          console.log(error)
        });
    }
  }

  checkValidFatherChildren() {
    const waitPromise = new Promise((resolve, reject) => {
      if (this.idProduct) {
        this._productService.checkValidFatherChildren(this.idProduct).subscribe(
          valid => {
            console.log("v", valid)
            this.middleService.sendLoading(false);
            if (valid == true) {
              this.valid_father_children = false;
            } else {
              this.valid_father_children = true;
            }
            console.log("padre válido", this.valid_father_children)
            resolve({});
          },
          (error) => {
            this.middleService.sendLoading(false);
            console.log(error)
            reject({});
          });
      } else {
        resolve({});
      }
    });
    return waitPromise;
  }

  getDiscountRules() {
    const waitPromise = new Promise((resolve, reject) => {
      this.Subscriptions.push(this._rulesDispatcherService.rulesAdminChanged.subscribe(
        (rulesAdmin) => {
          if (Object.entries(rulesAdmin).length !== 0) {
            this.rulesAdmin = rulesAdmin;
            this.showOptions = false;
          } else {
            this.rulesAdmin = undefined;
          }
          resolve({});
        }
      ));
    });
    return waitPromise;
  }
  getFamily() {
    const waitPromise = new Promise((resolve, reject) => {
      this.serviceFamily.getAllFamily().subscribe(
        (listFamily) => {
          this.listFamily = listFamily;
          resolve({})
        },
        (err) => { }
      );
    });
    return waitPromise;
  }
  getTypeProduct() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail("TYPE-PRODUCT").subscribe(
        (ldvList) => {
          this.listTypeProduct = ldvList;
          resolve({})
        },
        (err) => { }
      );
    });
    return waitPromise;
  }
  getCurrency() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail("SONR-CURRENCY").subscribe(
        (listCurrency) => {
          this.listTypeCurrency = listCurrency;
          resolve({})
        },
        (err) => { }
      );
    });
    return waitPromise;
  }
  getSupplier() {
    const waitPromise = new Promise((resolve, reject) => {
      this._supplierService.getAllSupplier().subscribe(
        (listSupplier) => {
          this.listSupplier = listSupplier;
          resolve({});
        },
        () => { }
      );
    });
    return waitPromise;
  }
  get f() {
    return this.productForm.controls;
  }
  get g() {
    return this.videoForm.controls;
  }
  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'products' }).subscribe(
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
  scrollEvent = (event: any): void => {
    //const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };
  validateInput(event: KeyboardEvent) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
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
          this.middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }
  // start CRUD RULES ADMIN section
  updatePosition(entity) {
    this.infoChangePosition = []
    for (let i = 1; i <= this[entity].length; i++) {
      this.infoChangePosition.push(i)
    }
  }
  upLabel(value, entity) {
    if (value > 0) {
      const oldValue = this[entity][value - 1]
      this[entity][value - 1] = this[entity][value]
      this[entity][value] = oldValue
    }
  }
  downLabel(value, entity) {
    if (value < this[entity].length - 1) {
      const oldValue = this[entity][Number(value) + 1]
      this[entity][value + 1] = this[entity][value]
      this[entity][value] = oldValue
    }
  }
  changePositionBlur(value, newValue, element, entity) {
    if ((value + 1) != newValue) {
      this.activeChangePosition(value, newValue - 1, element, entity)
    }
  }
  activeChangePosition(value, newValue, element, entity) {
    this[entity].splice(value, 1);
    this[entity].splice(newValue, 0, element);
    setTimeout(() => {
      this.infoChangePosition[value] = value + 1
    }, 0);
    this.updatePosition(entity)
  }
  changePosition(value, newValue, element, event, entity) {
    if (event.key == 'Enter') {
      this.activeChangePosition(value, newValue - 1, element, entity)
    }
  }
  ldvValidProductInfo() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('PRODUCT-OPTION').subscribe(
        (infoLdv: Array<any>) => {
          for (const ldvOption of infoLdv) {
            switch (ldvOption.value.toString()) {
              case 'false': {
                if (ldvOption.ref1 == "regular_price") {
                  this.productForm.removeControl("price");
                }
                this.validProductField[ldvOption.ref1] = false
                break
              }
              case 'true': {
                if (ldvOption.ref1 == "variation_product_luxury") {

                  this.is_variation_product_luxury = true;
                } else {
                  this.validProductField[ldvOption.ref1] = true
                }
                break
              }
            }
          }
          setTimeout(() => {
            this.validProductField['rules_admin'] && this.showRulesAdminGridF();
            resolve({})
          })
        }, (error) => {
          this.middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }
  ldvlimitGallery() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('SONR-LIMIT-GALLERY').subscribe(
        (infoLdv: Array<any>) => {
          if (infoLdv.length > 0) {
            if (infoLdv[0].value) {
              this.maxGallery = infoLdv[0].value.product
            }
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
  addVideo() {
    if (this.videoForm.get("url").value) {
      this.lisAddGaleryVideos.push(this.videoForm.get("url").value);
      this.videoForm.reset();
    }
  }
  unmountRulesAdminAndShowOptions() {
    this.showOptions = true;
    this.showRulesAdminForm = false;
  }
  switchModal($event) {
    this.headerRuleFixed = $event;
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
    this.gridListRulesAdmin.getInfo();
  }
  getRulesAdminId($event) {
    this.middleService.sendLoading(true);
    this.showRulesAdminForm = true;
    this.showRulesAdminGrid = false;
    this.editRulesAdmin = true;
    this._rulesAdminService
      .getOne($event.field)
      .subscribe((rulesAdSer: any) => {
        rulesAdSer.rules.forEach((rule) => {
          //Populate service discountRules array
          this._rulesDispatcherService.addDiscountRule(rule.rddId);
        });
        this._rulesDispatcherService.setRulesAdminChanged(rulesAdSer);
        this.middleService.sendLoading(false);
      });
  }
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
  deleteRulesAdminF() {
    const title = "Administrador de reglas de descuento";
    const messageModal = "Perderá los cambios recientes ¿Desea continuar?";
    this.dialogConfirm.show(title, messageModal, null, "rulesAdmin");
  }
  updateExistingDiscountRules(rdds: any[]) {
    this._discountRuleService
      .updateManyDiscountRules(rdds)
      .subscribe(null, (error) => {
        console.log(error);
      });
  }
  saveRulesAdmin(dataSend, ids?: string[]) {
    let idCounter = 0;
    this.rulesAdmin.rules.forEach((rule) => {
      if (rule.rddId._id === undefined) {
        rule.rddId._id = ids[idCounter];
        idCounter++;
      }
    });
    delete this.rulesAdmin.__v; //allow saving
    if (this.rulesAdmin._id) {
      this._rulesAdminService
        .updateRulesAdmin(this.rulesAdmin, this.rulesAdmin._id)
        .subscribe(
          (savedRulesAdmin: any) => {
            this.saveProduct(dataSend, savedRulesAdmin.createdId);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this._rulesAdminService.createRulesAdmin(this.rulesAdmin).subscribe(
        (savedRulesAdmin: any) => {
          this.saveProduct(dataSend, savedRulesAdmin.createdId);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  // end CRUD RULES ADMIN section
  selectDiscountType(event: MatSelectChange) {
    this.typeDiscount = (event.source.selected as MatOption).viewValue;
  }
  getDiscountTypes() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('DISCOUNT_TYPE').subscribe((dataLdv: any) => {
        this.productForm.get('type_discount').setValue(dataLdv[0]._id);
        this.discountTypes = dataLdv;
        resolve({});
      });
    });
    return waitPromise;
  }
  validSupplier() {
    const waitPromise = new Promise((resolve, reject) => {
      this._supplierService.validIsSupplier().subscribe(
        (val: any) => {
          this.isSupplier = val.isSupplier;
          /* if(val.isSupplier) {
            this.codeSupplier = val.supplier.code;
          } */
          if (val.isSupplier) {
            this.productForm.get("supplier").setValue(val.idSupplier);
            this.listCategoryGroups = val.supplier.visible_category_groups || [];
            this.listCategories = val.supplier.visible_categories || [];
            if (!val.supplier.visible_category_groups || !val.supplier.visible_categories) {
              this.middleService.sendMessage(
                "Categorías visibles",
                'No se han asignado categorías a su seller. Por favor, contáctese con el administrador',
                "error"
              );
            }
          } else {
            console.log("is sup", this.isSupplier)
            if (this.isSupplier === false) {
              this.productForm.get('clasification').setValidators([Validators.required]);
              this.productForm.get('clasification').updateValueAndValidity();
            } else {
              this.productForm.get('clasification').clearValidators();
              this.productForm.get('clasification').updateValueAndValidity();
              this.productForm.get('clasification').reset();
            }
          }
          this.getListGroup();
          resolve({});
        },
        (error) => {
          this.middleService.sendLoading(false)
          this.middleService.sendMessage(
            "Producto",
            error.error.message,
            "error"
          );
          resolve({});
        }
      );
    });
    return waitPromise;
  }
  onChanges(): void {
    this.productForm.get("search_sku").valueChanges.subscribe((val) => {
      if (val.length > 2) {
        this.searchSKU(val, "listSKUProduct");
      }
    });
    this.productForm.get("search_pack").valueChanges.subscribe((val) => {
      if (val.length > 2) {
        this.searchSKU(val, "listProductPack");
      }
    });
    this.productForm.get("is_variation").valueChanges.subscribe((val) => {
      if (!this.firstInfo) {
        if (!val) {
          if (!this.haveProductVariation && this.productForm.get('product_father').value) {
            this.deleteFather()
          }
        } else {
          if (!this.haveProductVariation) {
            this.productForm.get('is_pack').setValue(false)
            this.listAddPack = []
          } else {
            this.productForm.get('is_variation').setValue(false)
            this.middleService.sendMessage('Producto', 'Este producto es un producto base, no puede ser variación', 'error')
          }
        }
      } else {
        this.firstInfo = false
      }
    });
    this.productForm.get("search_father").valueChanges.subscribe((val) => {
      if (val.length > 2) {
        this.searchListFather(val, "listProductFather");
      }
    });
    this.productForm.get("name").valueChanges.subscribe((val) => {
      this.nameChanged = true;
      this.productForm.get("friendly_url").setValue(UtilsCode.cleanString(val));
    });
    this.productForm.get("supplier_delivery").valueChanges.subscribe((val) => {
      if (typeof val == "string") {
        this.getMethodSupplier(val);
      }
    });
    this.productForm.get("supplier").valueChanges.subscribe((val) => {
      
      if (val) {
        if (!val.hasOwnProperty("_id")) {
          if (!this.firstInfoProduct) {
            this.productForm.get("supplier_delivery").setValue(null);
            this.productForm.get("brand").setValue(null);
            this.productForm.get('list_method').setValue([]);
          } else {
            this.firstInfo = false
          }


          this.validHaveERP(val)
          this.getListBrand(val);
          this.getListSupplierDelivery(val)
        }
      }
    });
    this.productForm.get("group").valueChanges.subscribe((val) => {
      if (val) {
        this.getListCategory(val);
      }
    });
    this.productForm.get("active_discount").valueChanges.subscribe((val) => {
      if (val) {
        //grid-list of rules-admin
        this.productForm
          .get("discount_amount")
          .setValidators([Validators.required]);
        this.productForm.get("discount_amount").updateValueAndValidity();
        this.showRulesAdminSection = true;
      } else {
        this.productForm.get("discount_amount").clearValidators();
        this.productForm.get("discount_amount").updateValueAndValidity();
        this.showRulesAdminSection = false;
      }
    });
    this.productForm.get("stock").valueChanges.subscribe((val) => {
      if (this.productForm.get("stock").value != this.previewStock) {
        this.previewStock = Math.round(val);
        this.productForm.get("stock").setValue(this.previewStock);
      }
    });
    this.productForm.get("price") && this.productForm.get("price").valueChanges.subscribe((val) => {
      /* this.productForm.get("type_variation").valueChanges.subscribe((val) => { */
      /*          if (val === "B") {
                this.productForm.get('price').clearValidators();
                this.productForm.get('price').updateValueAndValidity();
                this.productForm.get('price').reset();
              } else { */
      this.productForm
        .get("special_price")
        .setValidators([
          Validators.required,
          Validators.max(val),
          Validators.min(0),
        ]);
      /*   } */
      /* }); */

    });
    this.productForm.get("special_price").valueChanges.subscribe((val) => {
      this.productForm.get("price") && this.productForm
        .get("price")
        .setValidators([
          Validators.required,
          Validators.min(val),
        ]);
    });

    //If is_variation_type_select === true
    this.productForm.get("is_product_variation_select").valueChanges.subscribe((val) => {
      if (val) {
        //Type variation
        this.productForm.get("type_variation").setValidators([Validators.required]);
        this.productForm.get("type_variation").updateValueAndValidity();

      } else {
        //Type variation
        this.productForm.get("type_variation").clearValidators();
        this.productForm.get("type_variation").updateValueAndValidity();
        this.productForm.get("type_variation").reset();

        //Father variations
        this.productForm.get("variation_father").clearValidators();
        this.productForm.get("variation_father").updateValueAndValidity();
        this.productForm.get("variation_father").reset();
      }
    });

    this.productForm.get("type_variation").valueChanges.subscribe((val) => {
      if (val === "B") {
        //Father variations
        this.productForm.get("variation_father").setValidators([Validators.required]);
        this.productForm.get("variation_father").updateValueAndValidity();

        //Variations
        this.productForm.get('variations').clearValidators();
        this.productForm.get('variations').updateValueAndValidity();
        this.productForm.get('variations').reset();

        //Modelo
        this.productForm.get('model_product').clearValidators();
        this.productForm.get('model_product').updateValueAndValidity();
        this.productForm.get('model_product').reset();

        //SKU
        this.productForm.get('SKU').clearValidators();
        this.productForm.get('SKU').updateValueAndValidity();
        this.productForm.get('SKU').reset();

        //Cantidad
        this.productForm.get('stock').clearValidators();
        this.productForm.get('stock').updateValueAndValidity();
        this.productForm.get('stock').reset();
        this.productForm.get('stock').setValue(0);

        //URL
        this.productForm.get('url_nm_travel').clearValidators();
        this.productForm.get('url_nm_travel').updateValueAndValidity();
        this.productForm.get('url_nm_travel').reset();

        //Price
        /* this.productForm.get('price').setValidators([Validators.required]);
        this.productForm.get('price').updateValueAndValidity(); */
        /* this.productForm.get('price').clearValidators();
        this.productForm.get('price').updateValueAndValidity();
        this.productForm.get('price').reset(); */

        //SEO title
        this.productForm.get('title').clearValidators();
        this.productForm.get('title').updateValueAndValidity();
        this.productForm.get('title').reset();

        //SEO description
        this.productForm.get('meta_description').clearValidators();
        this.productForm.get('meta_description').updateValueAndValidity();
        this.productForm.get('meta_description').reset();

        //SEO url
        this.productForm.get('friendly_url').clearValidators();
        this.productForm.get('friendly_url').updateValueAndValidity();
        this.productForm.get('friendly_url').reset();

        if (this.haveERP && !this.isSupplier) {
          this.productForm.get('clasification').setValidators([Validators.required]);
          this.productForm.get('clasification').updateValueAndValidity();
        } else {
          this.productForm.get("clasification").clearValidators();
          this.productForm.get("clasification").updateValueAndValidity();
          this.productForm.get("clasification").reset();
        }

        /* if(this.isSupplier) {
          this.validSupplier();
        } */
        this.productForm.get('father_variation_code').setValidators([Validators.required]);
        this.productForm.get('father_variation_code').updateValueAndValidity();

      } else if (val === "V") {
        this.productForm.get("clasification").clearValidators();
        this.productForm.get("clasification").updateValueAndValidity();
        this.productForm.get("clasification").reset();

        //Father variations
        this.productForm.get("variation_father").clearValidators();
        this.productForm.get("variation_father").updateValueAndValidity();
        this.productForm.get("variation_father").reset();

        //Variations
        this.productForm.get('variations').setValidators([Validators.required]);
        this.productForm.get('variations').updateValueAndValidity();

        this.productForm.get("father_variation_code").clearValidators();
        this.productForm.get("father_variation_code").updateValueAndValidity();
        this.productForm.get("father_variation_code").reset();

        //Modelo
        if (this.haveERP) {
          this.productForm.get('model_product').setValidators([Validators.required]);
          this.productForm.get('model_product').updateValueAndValidity();
        }

        //SKU
        if (!this.haveERP) {
          this.productForm.get('SKU').setValidators([Validators.required]);
          this.productForm.get('SKU').updateValueAndValidity();
        }
        //Cantidad
        this.productForm.get('stock').setValidators([Validators.required]);
        this.productForm.get('stock').updateValueAndValidity();

        //Price
        /* this.productForm.get('price').setValidators([Validators.required]);
        this.productForm.get('price').updateValueAndValidity(); */

        //SEO title
        this.productForm.get('title').setValidators([Validators.required]);
        this.productForm.get('title').updateValueAndValidity();

        //SEO description
        this.productForm.get('meta_description').setValidators([Validators.required]);
        this.productForm.get('meta_description').updateValueAndValidity();

        //SEO url
        this.productForm.get('friendly_url').setValidators([Validators.required]);
        this.productForm.get('friendly_url').updateValueAndValidity();
      }
    })
  }

  getFatherVariation(form) {
    return form.controls.variation_father.controls;
  }

  getVariationValue(form) {
    return form.controls.value.controls;
  }

  addVariationSection(i) {
    const control = <FormArray>this.productForm.get('variation_father');
    control.push(this.initFatherVariation());

    /*     if (<FormArray>this.productForm.get('variation_father').value[i]) {
          console.log("hola")
          const control2 = <FormArray>this.productForm.controls.variation_father.value[i];
          control.push(this.initVariationValue());
          //@ts-ignore
        }
        console.log(this.productForm.get('variation_father').value) */
  }

  removeFatherVariation(i) {
    const control = <FormArray>this.productForm.get('variation_father');
    control.removeAt(i);
  }

  cleanValueVariations(i) {
    //@ts-ignore
    const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
    const tempValues = control.value;
    console.log("temp", tempValues)
    while (tempValues.length > 0) {
      tempValues.splice(0, 1);
      control.removeAt(0);
    }
    //@ts-ignore
    control.setValue(tempValues);
  }

  addColorVariationEmpty(i) {
    //@ts-ignore
    const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
    const tempValues = control.value;
    control.push(this.initValueVariation());
    tempValues.push({ value: '#fbfbfb', description: '' });

    //@ts-ignore
    control.setValue(tempValues);
    console.log(this.productForm.get('variation_father').value)
  }

  addColorVariationEmptyChange(i) {
    this.infoCompare.request_change.variation_father[i].value.push({ value: '#fbfbfb', description: '' });
  }

  addColorVariation(event, i) {
    const value = event.target.value;
    /* const input = event.target.input; */
    console.log(event);

    if ((value || '').trim()) {
      //@ts-ignore
      const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
      const tempValues = control.value;
      control.push(this.initValueVariation());
      tempValues.push({ value, description: '' });

      //@ts-ignore
      control.setValue(tempValues);
      console.log(this.productForm.get('variation_father').value)
    }
    event.target.value = '#fbfbfb';
    event.preventDefault();
  }

  addColorColor(event, i, k, fvvk) {
    const value = event.target.value;
    console.log(fvvk)
    //@ts-ignore
    const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
    //@ts-ignore
    const valueToEdit = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value.value[k];

    const tempValues = control.value;
    const index = tempValues.indexOf(valueToEdit);

    if (index >= 0) {
      tempValues[index].value = fvvk;
    }

    //@ts-ignore
    control.setValue(tempValues);
    console.log(this.productForm.get('variation_father').value)
    event.target.value = fvvk;
    event.preventDefault();
  }

  addColorColorChange(event, i, k, fvvk) {
    this.infoCompare.request_change.variation_father[i].value[k].value = fvvk;
    event.target.value = fvvk;
    event.preventDefault();
    console.log(this.infoCompare.request_change.variation_father)
  }

  addColorDescription(event, i, k, fvvk) {
    const value = event.target.value;
    console.log(fvvk)
    /* if ((value || '').trim()) { */
    //@ts-ignore
    const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
    //@ts-ignore
    const valueToEdit = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value.value[k];

    const tempValues = control.value;
    const index = tempValues.indexOf(valueToEdit);

    if (index >= 0) {
      /* tempValues[index].description = value; */
      tempValues[index].description = fvvk;
    }

    //@ts-ignore
    control.setValue(tempValues);
    console.log(this.productForm.get('variation_father').value)
    event.preventDefault();
  }

  addColorDescriptionChange(event, i, k, fvvk) {
    this.infoCompare.request_change.variation_father[i].value[k].description = fvvk;
    event.preventDefault();
    console.log(this.infoCompare.request_change.variation_father)
  }

  addChipFatherVariation(event: MatChipInputEvent, i, k) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      //@ts-ignore
      const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
      const tempValues = control.value;
      control.push(this.initValueVariation());
      tempValues.push({ value, description: '' });
      /* tempValues.push(value); */
      //@ts-ignore
      control.setValue(tempValues);
      /* control.value.setValue(tempValues); */
      console.log(this.productForm.get('variation_father').value)
    }
    // Reset the input value
    input.value = '';
  }

  addChipFatherVariationChange(event: MatChipInputEvent, i) {
    const input = event.input;
    const value = event.value;
    this.infoCompare.request_change.variation_father[i].value.push({
      value, description: ''
    });
    input.value = '';
  }

  removeChipFatherVariation(i, k) {
    //@ts-ignore
    const control = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
    //@ts-ignore
    const valueToDelete = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value.value[k];
    const tempValues = control.value;
    const index = tempValues.indexOf(valueToDelete);

    if (index >= 0) {
      tempValues.splice(index, 1);
      control.removeAt(index);
    }
    console.log(tempValues);
  }

  removeChipFatherVariationChange(i, k) {
    this.infoCompare.request_change.variation_father[i].value.splice(k, 1);
  }

  selectImageFatherVariations($event, entity, k) {

    this.selectedFatherVariationImage = entity;
    this.dataPictureSaveFatherVariation($event);
  }

  checkSupplier(field, multi, maxSize?, maxDimension?, position?) {
    if (!this.productForm.get('supplier').value) {
      this.middleService.sendMessage(
        "Producto",
        "Primero seleccione un seller.",
        "error"
      );
      return;
    } else {
      this.showWindowMultimediaFatherVariations(field, multi, maxSize, maxDimension, position);
    }
  }

  showWindowMultimediaFatherVariations(field, multi, maxSize?, maxDimension?, position?) {
    this.selectMuti = multi;
    this.multimediaFatherVariations.config.maxImageSelect = 1;
    this.multimediaFatherVariations.config.maxSize = maxSize;
    this.multimediaFatherVariations.config.maxDimension = maxDimension;
    this.multimediaFatherVariations.config.returnInfoUsed = { position };
    this.multimediaFatherVariations.config.noValidDimension = false;
    if (multi) {
      this.multimediaFatherVariations.config.typeInfo = "multi";
      this.multimediaFatherVariations.config.maxImageSelect = null;
    } else {
      this.multimediaFatherVariations.config.typeInfo = "simple";
      this.multimediaFatherVariations.config.maxImageSelect = null;
    }
    this.selectedFatherVariationImage = field;
    this.multimediaFatherVariations.getAllMultimedia();
    this.multimediaFatherVariations.openWindow();
  }

  dataPictureSaveFatherVariation($event) {
    console.log($event);
    if (this.selectMuti) {
      //@ts-ignore
      const control = <FormArray>this.productForm.controls.variation_father.controls[$event.infoSet.position].controls.value;
      const tempValues = control.value;

      for (const picture of $event.listImage) {
        control.push(this.initValueVariation());
        tempValues.push({ value: picture, description: '' });
      }
      console.log(tempValues);
      //@ts-ignore
      control.setValue(tempValues);
      /* control.setValue(tempValues); */
    }
    this.validLimitGallery();
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
  addDetail() {
    this.toogleProduct = true
    this.listDetailProduct.push({ title: "", description: "" });
  }
  acceptModal($event) {
    if ($event.accept) {
      //modification to delete rules admin
      if ($event.entity === "rulesAdmin") {
        this.showRulesAdminForm = false;
        this.showRulesAdminGrid = true;
        this.rulesAdminSaved = false;
        this._rulesDispatcherService.deleteRulesAdmin();
      } else {
        this.deletItem();
      }
    }
  }
  addMethod(addAll?: boolean) {
    let continueMethod = true;
    const selectMethod = [];
    for (const method of this.listMethod) {
      if (addAll) {
        selectMethod.push(method._id);
      } else {
        if (method.select) {
          selectMethod.push(method._id);
        }
      }
    }
    if (this.available_max_method_product) {
      if (selectMethod.length > this.available_max_method_product) {
        continueMethod = false;
        this.middleService.sendMessage(
          "Métodos de envio",
          "Solo puede seleccionar " +
          this.available_max_method_product +
          " metodo de envio.",
          "error"
        );
      }
    }
    if (continueMethod) {
      this.productForm.get("list_method").setValue(selectMethod);
      this.searchMethodDetail(
        "selectMethodDetail",
        this.productForm.get("list_method").value
      );
      this.closeSelectMehod();
    }
  }
  addAllMethods() {
    this.addMethod(true);
  }
  removeMethod(id) {
    const temporaListMethod = this.productForm.get("list_method").value;
    let indexMethod = temporaListMethod.findIndex((item) => item == id);
    if (indexMethod >= 0) {
      temporaListMethod.splice(indexMethod, 1);
    }
    this.productForm.get("list_method").setValue(temporaListMethod);
    indexMethod = this.selectMethodDetail.findIndex((item) => item._id == id);
    if (indexMethod >= 0) {
      this.selectMethodDetail.splice(indexMethod, 1);
    }
    indexMethod = this.listMethod.findIndex((item) => item._id == id);
    if (indexMethod) {
      this.listMethod[indexMethod].select = false;
    }
  }
  searchMethodDetail(variable, arrayData) {
    this[variable] = [];
    for (const method of this.listMethod) {
      for (const selectMethod of arrayData) {
        if (method._id == selectMethod) {
          this[variable].push(method);
        }
      }
    }
  }
  acceptRequest() {
    /*  this.answerRequest("approve"); */
    this.answerModifyRequest("approve");
  }
  denyRequest(messageDeny) {
    if (this.denyMessage) {
      this.answerRequest("deny", messageDeny);
      this.showDenyMessage = false;
    }
  }
  closeMessageDeny() {
    this.showDenyMessage = false;
  }
  openMessageDeny() {
    this.denyMessage = null;
    this.showDenyMessage = true;
  }
  methodSelect() {
    if (this.listMethod) {
      if (this.validProductField['group_supplier_methods']) {
        this.selectMethodDetail = this.listMethod.slice();
        this.addAllMethods();
      } else {
        this.searchMethodDetail(
          "selectMethodDetail",
          this.productForm.get("list_method").value
        );
      }
      if (this.listMethodChange) {
        this.searchMethodDetail(
          "listChangetMethodDetail",
          this.listMethodChange
        );
      }
    }
  }
  getMethodSupplier(val) {
    this.middleService.sendLoading(true);
    this.serviceMethod.searchBySupplier(val).subscribe(
      (listMethod: any) => {
        this.listMethod = this.updateSelectMethodSelect(listMethod);
        this.methodSelect();
        this.middleService.sendLoading(false);
      },
      (error) => {
        this.middleService.sendMessage(
          "Productos",
          error.message.message,
          "error"
        );
      }
    );
  }
  updateSelectMethodSelect(listMethod) {
    if (!this.validProductField['group_supplier_methods']) {
      for (const existMethod of this.productForm.get("list_method").value) {
        const found = listMethod.findIndex((item) => item._id == existMethod);
        if (found >= 0) {
          listMethod[found].select = true;
        }
      }
    } else {
      listMethod.forEach((method) => {
        method.select = true;
      })
    }
    listMethod.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    return listMethod;
  }
  validHaveERP(supplier) {
    const waitPromise = new Promise((resolve, reject) => {
      this._supplierService.verifyHaveERPSupplier(supplier).subscribe(
        (haveInfo: any) => {
          this.haveERP = haveInfo.haveERP;
          if (!this.haveERP) {
            this.codeSupplier = haveInfo.code + '-';
          } else {
            this.codeSupplier = '';
          }
          setTimeout(() => {
            if (haveInfo.haveERP) {
              if (!this.productForm.get('taxBuy') && !this.productForm.get('taxSent')) {
                this.productForm.setControl('taxBuy', new FormControl('', Validators.required))
                this.productForm.addControl('taxBuy', new FormControl('', Validators.required));
                this.productForm.setControl('taxSent', new FormControl('', Validators.required))
                this.productForm.addControl('taxSent', new FormControl('', Validators.required));
                /* if(this.idProduct && this.isSupplier === false) {
                  this.productForm.get('clasification').setValidators([Validators.required]);
                  this.productForm.get('clasification').updateValueAndValidity();
                } else {
                  this.productForm.get('clasification').clearValidators();
                  this.productForm.get('clasification').updateValueAndValidity();
                  this.productForm.get('clasification').reset();
                } */
              }
              this.productForm.get("type_variation").valueChanges.subscribe((val) => {
                if (val === "B") { //if base product
                  //Modelo
                  this.productForm.get('model_product').clearValidators();
                  this.productForm.get('model_product').updateValueAndValidity();
                  this.productForm.get('model_product').reset();


                } else {
                  if (this.haveERP) {
                    this.productForm.get('model_product').setValidators([Validators.required]);
                    this.productForm.get('model_product').updateValueAndValidity();
                  }
                }
              });

            } else {
              this.productForm.setControl('taxBuy', new FormControl())
              this.productForm.addControl('taxBuy', new FormControl());
              this.productForm.setControl('taxSent', new FormControl())
              this.productForm.addControl('taxSent', new FormControl());
              this.productForm.setControl('model_product', new FormControl());

              this.productForm.get('clasification').clearValidators();
              this.productForm.get('clasification').updateValueAndValidity();
              this.productForm.get('clasification').reset();

              this.productForm.get("type_variation").valueChanges.subscribe((val) => {
                if (val === "B") { //if base product
                  //SKU
                  this.productForm.get('SKU').clearValidators();
                  this.productForm.get('SKU').updateValueAndValidity();
                  this.productForm.get('SKU').reset();
                } else {
                  if (!this.haveERP) {
                    this.productForm.get('SKU').setValidators([Validators.required]);
                    this.productForm.get('SKU').updateValueAndValidity();
                  }
                }
              });

            }
          }, 0);
          resolve({});
        }, (error) => {
          this.middleService.sendMessage('Productos', error.error.message, 'error')
          resolve({});
        }
      )
    });
    return waitPromise;
  }
  answerRequest(answer, messageDeny?) {
    this.middleService.sendLoading(true);
    this._productService
      .answerRequest(this.idProduct, { answer, messageDeny })
      .subscribe(
        (answerFinish: any) => {
          this.middleService.sendLoading(false);
          if (answer == "deny") {
            this.router.navigate(["/system/list-request"]);
          } else {
            this.router.navigate(["/system/list-request"]);
            //this.getDataProduct();
          }
          this.middleService.sendMessage(
            "Producto",
            "La solicitud ha sido respondida",
            "ok"
          );
        },
        (error) => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            "Producto",
            error.error.message,
            "error"
          );
        }
      );
  }

  answerModifyRequest(answer, messageDeny?) {
    this.middleService.sendLoading(true);
    this._productService
      .answerModifyRequest(this.idProduct, { answer, messageDeny }, this.infoCompare.request_change)
      .subscribe(
        (answerFinish: any) => {
          this.middleService.sendLoading(false);
          if (answer == "deny") {
            this.router.navigate(["/system/list-request"]);
          } else {
            this.router.navigate(["/system/list-request"]);
            //this.getDataProduct();
          }
          this.middleService.sendMessage(
            "Producto",
            "La solicitud ha sido respondida",
            "ok"
          );
        },
        (error) => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            "Producto",
            error.error.message,
            "error"
          );
        }
      );
  }


  confirmDeleteItem(idItem) {
    let subMessage = null
    if (this.haveProductVariation) {
      subMessage = 'Todos los productos varición relacionados, tambien serán eliminados'
    }
    this.dialogConfirm.show("Eliminar Producto", "¿Esta seguro de eliminar?", subMessage);
  }
  deleteDetail(position) {
    this.listDetailProduct.splice(position, 1);
  }
  deletItem() {
    this.middleService.sendLoading(true);
    this._productService.delete(this.idProduct).subscribe(
      (data) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          "Producto",
          "El producto ha sido eliminado correctamente",
          "ok"
        );
        this.router.navigate(["/system/product"]);
      },
      (error) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
  }
  getMaxMethodAvailable() {
    const waitPromise = new Promise((resolve, reject) => {
      this._productService.maxMethodAvailable().subscribe(
        (infoMehodMax) => {
          this.available_max_method_product = infoMehodMax;
          resolve({});
        },
        (error) => {
          this.middleService.sendMessage(
            "Producto",
            error.error.message,
            "error"
          );
          resolve({});
        }
      );
    });
    return waitPromise;
  }
  getDataProduct() {
    this.middleService.sendLoading(true);
    this._productService.getById(this.idProduct).subscribe(
      (dataProduct: any) => {
        if (dataProduct.product_variation) {
          this.haveProductVariation = dataProduct.product_variation.length > 0
        }
        this.available_max_method_product =
          dataProduct.available_max_method_product;
        this.infoCompare = dataProduct;
        this.approve_user = dataProduct.approve_user;
        this.penddingRequest = dataProduct.pending_request;
        if (dataProduct.request) {
          this.typeRequest = dataProduct.request.type;
          let variations = [];
          if (dataProduct.request_change) {
            if (dataProduct.request_change.variation_father) {
              variations = dataProduct.variation_father.map(function (e) {
                return {
                  type: e.type,
                  variation_name: e.variation_name,
                  value: e.value.map(function (sube) {
                    return {
                      value: sube.value,
                      description: sube.description
                    }
                  })
                }
              })
            }
            if (
              JSON.stringify(variations) !==
              JSON.stringify(this.infoCompare.request_change.variation_father)) {
              this.variation_changed = true;
            } else {
              this.variation_changed = false;
            }
            this.dataReplace = dataProduct.request_change;
          }
          if (this.typeRequest === 'C') {
            this.myRequest = dataProduct.request;
          }
        }
        this.fillInfoProduct(dataProduct);
        this.lisAddGaleryVideos = [];
        if (dataProduct.videos_link) {
          this.lisAddGaleryVideos = dataProduct.videos_link;
        }
        if (dataProduct.SKU) {
          const cleanSKU = dataProduct.SKU.split('-');
          if (cleanSKU.length > 1) {
            cleanSKU.shift();
            this.productForm.get("SKU").patchValue(cleanSKU.join('-'));
          }
        }
        if (dataProduct.campaign) {
          this.campaign_price = dataProduct.campaign_price;
          this.productForm
            .get("special_price")
            .setValidators([
              Validators.required,
              Validators.max(dataProduct.price),
              Validators.min(this.campaign_price)
            ]);
        }
        console.log("precio campaña", this.campaign_price)

        if (dataProduct.type_variation === "B" || dataProduct.type_variation === "V") {
          this._rulesDispatcherService.deleteRulesAdmin();
        }

        if (dataProduct.rules_admin) {
          this.productForm.get("active_discount").patchValue(true);
          this.showRulesAdminForm = true;
          this.showRulesAdminSection = true;
          setTimeout(() => {
            dataProduct.rules_admin.rules.forEach((rule) => {
              //Populate service discountRules array
              this._rulesDispatcherService.addDiscountRule(rule.rddId);
            });
            //populate template and service for rules admin object
            this._rulesDispatcherService.setRulesAdminChanged(
              dataProduct.rules_admin
            );
          });
        }
        if (dataProduct.product_father) {
          this.addFatherProduct(dataProduct.product_father)
        }
        this.updatePosition('lisAddPicture')
        if (this.penddingRequest && this.approve_user) {
          this.disabledFields()
        }
        this.middleService.sendLoading(false);

      },
      (error) => {
        this.router.navigate(["/system/product"]);
        this.middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
  }
  async arrayPackProduct(arrayProduct) {
    return new Promise((resolve) => {
      const arraySearch = [];
      const newArray = JSON.parse(JSON.stringify(arrayProduct));
      for (const product of newArray) {
        arraySearch.push(product.product);
      }
      this._productService.searchArray(arraySearch).subscribe(
        (listProduct: Array<any>) => {
          const returnArray = [];
          for (const product of newArray) {
            product.product = listProduct.find(
              (item) => item._id == product.product
            );
            if (product.product) {
              returnArray.push(product);
            }
          }
          resolve(returnArray);
        },
        (error) => {
          this.middleService.sendMessage(
            "Producto",
            error.message.message,
            "error"
          );
        }
      );
    });
  }
  async fillInfoProduct(dataProduct) {
    if (dataProduct.variation_father && !this.existingFather) {
      this.haveVariations = false;
      this.existingFather = true;
      this.productForm.get('variations').setValue([]);

      const control = <FormArray>this.productForm.get('variation_father')
      while (control.length !== 0) {
        //@ts-ignore
        this.productForm.controls['variation_father'].removeAt(0);
      }
      for (let i = 0; i < dataProduct.variation_father.length; i++) {
        /* const control = <FormArray>this.productForm.get('variation_father')
        let l = control.length;
        while (l >= dataProduct.variation_father.length) {
          l--;
          control.removeAt(l);
        } */
        control.push(this.initFatherVariation(/* dataProduct.variation_father[i].type, dataProduct.variation_father[i].variation_name */));

        for (let j = 0; j < dataProduct.variation_father[i].value.length; j++) {
          //@ts-ignore
          const control2 = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
          /* const tempValues = dataProduct.variation_father[i].value; */
          /* const tempValue =dataProduct.variation_father[i].value.forEach(function(v) {
            const e = {
              "variation_name": v.variation_name,
              "type": v.type,
              "value": {
                "value":
              },
            };
          }) */
          control2.push(this.initValueVariation(/* dataProduct.variation_father[i].value.value, dataProduct.variation_father[i].value.description */));

          //@ts-ignore
          /* control2.setValue(tempValues); */

        }
        console.log(this.productForm.get('variation_father').value)
      }
      this.fatherCharged = true;
    }

    if (dataProduct.father_base_variation) {
      this.checkFatherActiveStatus(dataProduct.father_base_variation);
    }

    if (dataProduct.type_variation === "B") {
      this.imFather = true;
      let index;
      if (dataProduct.father_variation_code) {
        for (let i = 0; i < dataProduct.father_variation_code.length; i++) {
          if (dataProduct.father_variation_code[i] === '-') {
            index = i;
          }
        }
        dataProduct.father_variation_code = dataProduct.father_variation_code.substring(index + 1);
      }
    }

    this.productForm.patchValue(dataProduct);

    const price = this.productForm.get("price") && (this.productForm.get("price").value);
    const specialPrice = this.productForm.get("special_price").value;
    /*  if (dataProduct.type_variation !== 'B') { */
    this.productForm.get("special_price").setValidators([
      Validators.required,
      Validators.max(price),
      Validators.min(this.campaign_price)
    ]);
    this.productForm.get("price") && this.productForm.get("price").setValidators([
      Validators.required,
      Validators.min(specialPrice)
    ]);
    /* } else if (dataProduct.type_variation === 'B') {
      this.productForm.get("special_price").setValidators([]);
      this.productForm.get("price").setValidators([]);
    } */

    this.initialPrice = price;
    this.initialSpecialPrice = specialPrice;
    if (dataProduct.detail_list) {
      this.listDetailProduct = dataProduct.detail_list;
    } else {
      this.listDetailProduct = [];
    }
    this.selectChangeCategory = null;
    if (dataProduct.request_change) {
      if (
        CompareArray.compare(
          dataProduct.categories,
          dataProduct.request_change.categories
        )
      ) {
        this.selectChangeCategory = dataProduct.request_change.categories;
      }
    }
    if (dataProduct.brand) {
      this.productForm.get("brand").setValue(dataProduct.brand._id);
    }
    if (dataProduct.supplier) {
      this.productForm.get("supplier").setValue(dataProduct.supplier._id);
    }

    if (dataProduct.stock) {
      this.productForm.get("stock").setValue(dataProduct.stock);
    }
    if (dataProduct.listFatherVariationUse) {
      this.haveFather = true;
      this.variationsWereChecked(dataProduct);
    }

    /* if (dataProduct.listFatherVariationUse) {
      this.haveVariations = true;
      this.imFather = false;
      let myVars = [];
      let mySelectedVars = [];
      mySelectedVars = dataProduct.variations.map(function (e) {
        return e.value;
      })
      console.log(mySelectedVars)
      myVars = dataProduct.listFatherVariationUse.map(function (e) {
        return {
          _id: e._id,
          type: e.type,
          variation_name: e.variation_name,
          value: e.value.map(function (sube) {
            if (mySelectedVars.some(e => e === sube)) {
              return {
                value: sube,
                checked: true
              }
            } else {
              return {
                value: sube,
                checked: false
              }
            }
          })
        }
      });

      this.mySelectedVariations = dataProduct.listFatherVariationUse.map(function (e) {
        return {
          _id: e._id,
          type: e.type,
          variation_name: e.variation_name,
          value: e.value,
        }
      });

      this.myVariations = myVars;
      for (let i = 0; i < this.mySelectedVariations.length; i++) {
        this.mySelectedVariations[i].selected = mySelectedVars[i];
        this.myVariations[i].selected = mySelectedVars[i];
      }
    } */

    this.validHaveERP(dataProduct.supplier._id)
    if (dataProduct.supplier_delivery) {
      this.productForm
        .get("supplier_delivery")
        .setValue(dataProduct.supplier_delivery._id);
    }
    if (dataProduct.currency) {
      this.productForm.get("currency").setValue(dataProduct.currency._id);
    }
    this.submitFiltersArray = dataProduct.filter_values || [];
    this.selectCategories = dataProduct.categories;
    console.log("submit filters", this.submitFiltersArray)
    this._categoryService
      .getCategoriesFiltersByCategoryArray(this.selectCategories)
      .subscribe((response: Array<any>) => {
        console.log("respo", response)
        response.forEach((element) => {
          element.filters.forEach((filter, index) => {
            filter.category_id = element._id
            /* index === 0 && (filter.index = index, filter.categoryName = element.name); */
            const exists = this.listCategoriesFilter.find((object) => {
              return filter._id == object._id;
            });
            if (/* !exists && !exists &&  */!filter.filter.binded) {
              const patch = this.submitFiltersArray.find((values) => {
                return (values.category_id === filter.category_id && values.filter_id === filter._id);
              });
              console.log("patch", patch)
              if (patch) {
                if (filter.filter.type == "boolean") {
                  filter.booleanValue = patch.booleanValue;
                } else if (
                  filter.filter.type == "radio" ||
                  filter.filter.type == "checkbox"
                ) {
                  filter.stringValue = patch.stringValue;
                } else {
                  filter.numberValue = patch.numberValue;
                }
              }
              if(!this.listCategoriesFilter.some(e => e.categoryName === element.name)) {
                (filter.index = 0, filter.categoryName = element.name);
              }
              /* filter.category_id = element._id */
              filter.values = SortArray.orderArrayAlphabetical(filter.values);
              this.listCategoriesFilter.push(filter);
            }
          });
        });
      });
    if (dataProduct.related_products) {
      this.listAddSku = dataProduct.related_products;
    }
    if (dataProduct.pack_products) {
      this.listAddPack = [];
      for (const productOack of dataProduct.pack_products) {
        productOack.code_ERP = productOack.SKU
        this.listAddPack.push(productOack)
      }
    } else {
      this.listAddPack = [];
    }
    this.listChangetMethodDetail = null;
    if (dataProduct.request_change) {
      if (
        CompareArray.compare(
          dataProduct.list_method,
          dataProduct.request_change.list_method
        )
      ) {
        if (this.listMethod) {
          this.searchMethodDetail(
            "listChangetMethodDetail",
            dataProduct.request_change.list_method
          );
        } else {
          this.listMethodChange = dataProduct.request_change.list_method;
          this.methodSelect();
        }
      }
    }
    if (dataProduct.request_change) {


      this.existChange.related_detail_list = false
      this.detailDiference = dataProduct.request_change.detail_list
      if (dataProduct.request_change.detail_list.length != dataProduct.detail_list.length) {
        this.existChange.related_detail_list = true
      } else {
        for (const oldData of dataProduct.detail_list) {
          const existDiferenceTitle = dataProduct.request_change.detail_list.find(item => item.title == oldData.title)
          if (!existDiferenceTitle) {

            this.existChange.related_detail_list = true
            break;
          } else {

            if (existDiferenceTitle.description != oldData.description) {
              this.existChange.related_detail_list = true
              break
            }
          }
        }
      }
      this.listAddSkuRelated = dataProduct.request_change.related_products;
      this.existChange.related_products = CompareArray.compare(
        dataProduct.related_products,
        dataProduct.request_change.related_products,
        ["_id"]
      );
      this.listAddPackChange = await this.arrayPackProduct(
        dataProduct.request_change.pack_products
      );
      this.existChange.pack_products = CompareArray.compare(
        dataProduct.pack_products,
        dataProduct.request_change.pack_products,
        ["product", "quantity"]
      );
    }
    this.lisAddPicture = dataProduct.images_link;
    this.lisImageBackgroundDiscount = [];
    if (dataProduct.image_background_discount) {
      this.lisImageBackgroundDiscount.push(dataProduct.image_background_discount);
    }
    this.lisMainAddPicture = [];
    if (dataProduct.image_cover) {
      this.lisMainAddPicture.push(dataProduct.image_cover);
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisMainAddPicture",
      "image_cover",
      "compareMainImage"
    );
    this.validLimitGallery()
    this.lisMainAddPictureMobile = [];
    if (dataProduct.image_cover_mobile) {
      this.lisMainAddPictureMobile.push(dataProduct.image_cover_mobile);
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisMainAddPictureMobile",
      "image_cover_mobile",
      "compareMainMobileImage"
    );
    this.lisBannerAddPicture = [];
    if (dataProduct.image_banner) {
      this.lisBannerAddPicture.push(dataProduct.image_banner);
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisBannerAddPicture",
      "image_banner",
      "compareBannerImage"
    );
    this.lisBannerAddPictureMobile = [];
    if (dataProduct.image_banner_mobile) {
      this.lisBannerAddPictureMobile.push(dataProduct.image_banner_mobile);
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisBannerAddPictureMobile",
      "image_banner_mobile",
      "compareBannerMobileImage"
    );
    this.lisBannerLogoAddPicture = [];
    if (dataProduct.image_logo_banner) {
      this.lisBannerLogoAddPicture.push(dataProduct.image_logo_banner);
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisBannerLogoAddPicture",
      "image_logo_banner",
      "compareLogoImage"
    );
    this.lisBannerLogoAddPictureMobile = [];
    if (dataProduct.image_logo_banner_mobile) {
      this.lisBannerLogoAddPictureMobile.push(
        dataProduct.image_logo_banner_mobile
      );
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisBannerLogoAddPictureMobile",
      "image_logo_banner_mobile",
      "compareLogoMobileImage"
    );
    if (this.lisAddPicture) {
      this.imageShowSlider = this.lisAddPicture[
        this.lisAddPicture.length - this.imagePositionMobile
      ];
    }
    this.setImageCompare(
      dataProduct.request_change,
      "lisAddPicture",
      "images_link",
      "compareLisAddPicture"
    );
  }
  validLimitGallery() {
    if (this.isSupplier) {
      if (this.lisAddPicture.length >= this.maxGallery) {
        this.limitGalleryOut = true
      }
    }
  }
  displayFilters($event) {
    console.log("initial categories", this.selectCategories)
    console.log($event)
    if ($event.checked === true) {
      const index = this.selectCategories.findIndex(
        (category) => category == $event._id
      );
      console.log("index if true", index)
      /* this.isSupplier && (this.selectCategories = []); */
      /* this.listCategoriesFilter = []; */
      if (index == -1) {
        this.selectCategories = [...this.selectCategories, $event._id];
      } /* else if (!this.isSupplier) {
        this.selectCategories.splice(index, 1);
      } */
      this.checkedCategory($event);
    } else {
      const filters = $event.filters;
      const index = this.selectCategories.findIndex(
        (category) => category == $event._id
      );
      const id_category_removed = this.selectCategories[index];
      console.log("index if false", index)
      if (index !== -1) {
        /* this.listCategoriesFilter.forEach((filter, index) => { */
          /* if(filters.some(e => e[index].filter._id === filter)) {
            const iR = this.listCategoriesFilter.findIndex(filter);
            this.listCategoriesFilter.splice(iR, 1);
          } */
          /* console.log("filter", filter)
          if(filter.category_id === id_category_removed) {
            this.listCategoriesFilter.splice(index, 1);
          } */
          /*  */
        /* }) */
        this.listCategoriesFilter = this.listCategoriesFilter.filter(e => e.category_id !== id_category_removed)
        
        this.selectCategories.splice(index, 1)
        console.log("removed", id_category_removed)
      }
    }
    if (this.selectCategories.length > 0) {
      console.log("final categories", this.selectCategories)
      console.log('initial filtros categoría', this.listCategoriesFilter)
      this.middleService.sendLoading(true);
      /* this.listCategoriesFilter = []; */
      this._categoryService
        .getCategoriesFiltersByCategoryArray(this.selectCategories)
        .subscribe((response: Array<any>) => {
          /* console.log('listas de categorias')
          console.log(response) */
          response.forEach((element) => {
            element.filters.forEach((filter, index) => {
              if (!filter.filter.binded) {
                /* index === 0 && (filter.index = index, filter.categoryName = element.name); */
                if(!this.listCategoriesFilter.some(e => e.categoryName === element.name)) {
                  (filter.index = 0, filter.categoryName = element.name);
                }
                filter.category_id = element._id
                if(!this.listCategoriesFilter.some(value => 
                  value.category_id === filter.category_id && value.filter._id === filter._id)) {
                  this.listCategoriesFilter.push(filter);
                } else {
                  /* this.listCategoriesFilter.push(filter); */
                }
                
              }
            });
          });
          this.middleService.sendLoading(false);
          /* console.log("final categories", this.selectCategories) */
        });
    }

    console.log('final filtros categoría', this.listCategoriesFilter)
  }
  sendImageCompare(arrayActually, arrayChange, componentName) {
    if (this[componentName]) {
      this[componentName].config = {
        arrayActually: arrayActually,
        arrayChange: arrayChange,
      };
    }
  }
  selectMehod() {
    this.getMethodSupplier(this.productForm.get("supplier_delivery").value);
    this.openSelectMehod = true;
  }
  closeSelectMehod() {
    this.openSelectMehod = false;
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
  getListGroup() {
    const waitPromise = new Promise((resolve, reject) => {
      this._categoryService.getListCategoryGroup().subscribe((listGroup: any) => {
        this.groupList = listGroup.filter(
          (item) => {
            if (this.isSupplier) {
              if (item.typeGroupCategory.ref1 === "product" &&
                this.listCategoryGroups.findIndex(itemGroup => itemGroup._id == item._id) !== -1) {
                return item;
              }
            } else {
              if (item.typeGroupCategory.ref1 === "product") {
                return item;
              }
            }
          }
        );
        this.groupList = SortArray.orderArrayAlphabetical(this.groupList, 'name');

        const searchValue = this.groupList.find(item => item.name == 'Tienda')
        if (searchValue) {
          this.productForm.get('group').setValue(searchValue._id)
        }
        resolve({})
        /*  if (searchExperience) {
           this.groupList = listGroup;
           this.productForm.get("group").setValue(searchExperience._id);
         } */
      });
    });
    return waitPromise;
  }
  configureMessage($event: any) {
    this.embeddedMessage = $event.message;
    this.rulesAdminSaved = $event.value;
  }
  getReason($event) {
    this.continueProductSave($event);
  }

  createVariations(vari): any { //for variations children
    const variationsSelected = [];
    vari.forEach(function (v) {
      /* const e = {
        "variation_name": v.variation_name,
        "type": v.type,
        "value": v.selected,
      }; */
      const e = {
        "variation_name": v.variation_name,
        "type": v.type,
        "value": /* v.selected.value,
        "description": v.selected.description, */{
          "value": v.selected.value,
          "description": v.selected.description,
        },
      };
      console.log(variationsSelected)
      variationsSelected.push(e);
    });
    return variationsSelected;
  }

  handleChangeRequest(value, property) {
    this.infoCompare.request_change[property] = value
    if (property === 'name') {
      this.infoCompare.request_change.friendly_url = UtilsCode.cleanString(this.infoCompare.request_change.name);
    }
  }

  async createProduct(navEdit?) {
    if (this.productForm.get("active_discount").value === true) {
      // start RULES ADMIN SECTION
      this.mainCra && this.mainCra.saveAdminRule();
      if (!this.mainCra) {
        this.middleService.sendMessage(
          "Producto",
          "Debe crear o seleccionar un administrador de reglas",
          "error"
        );
        return;
      }
      if (!this.rulesAdminSaved) {
        this.embeddedMessage();
        return;
      }
      // end RULES ADMIN section
    }
    if (this.selectMethodDetail.length == 0 && (this.productForm.get("active").value || this.productForm.get("show_discount").value)) {
      this.middleService.sendMessage(
        "Producto",
        "El producto debe de contar con método de envío.",
        "error"
      );
      return;
    }

    const cvf = <FormArray>this.productForm.get('variation_father');
    if (cvf.length == 0 && this.productForm.get('type_variation').value === "B") {
      this.middleService.sendMessage(
        "Producto",
        "Se debe agregar al menos una variación al producto base.",
        "error"
      );
      return;
    }

    for (let i = 0; i < cvf.length; i++) {
      //@ts-ignore
      const c = <FormArray>this.productForm.controls.variation_father.controls[i].controls.value;
      //@ts-ignore
      const t = <FormArray>this.productForm.controls.variation_father.controls[i].controls.type;
      console.log(t)
      if (!t.value) {
        this.middleService.sendMessage(
          "Producto",
          "Seleccione el tipo de variación para poder asignarle algún valor",
          "error"
        );
        return;
      }
      if (c.length === 0) {
        this.middleService.sendMessage(
          "Producto",
          "Agregue al menos un valor a su variación o variaciones agregadas",
          "error"
        );
        return;
      }
    }

    if (this.myVariations && this.myVariations.length !== this.mySelectedVariations.length) {
      this.middleService.sendMessage(
        "Producto",
        "Se debe seleccionar una variación de cada tipo.",
        "error"
      );
      return;
    }

    if (this.productForm.get("type_variation").value === "V" && !this.productForm.get('father_base_variation').value) {
      this.middleService.sendMessage(
        "Producto",
        "Debe seleccionar un producto base.",
        "error"
      );
      return;
    }

    let reasons = [false, false];
    if (this.productForm.get("price") && this.initialPrice !== this.productForm.get("price").value) {
      reasons[0] = true;
    }
    if (
      this.initialSpecialPrice !== this.productForm.get("special_price").value
    ) {
      reasons[1] = true;
    }
    if ((reasons[0] || reasons[1]) && this.idProduct) {
      this.dialogReason.show("Producto", reasons[0], reasons[1]);
    } else {
      this.middleService.sendLoading(true);
      this.submitted = true;
      console.log(this.productForm.value)
      console.log(this.productForm.get('special_price').errors)

      const controls = this.productForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          console.log("error", name)
        }
      }

      //Variations children
      if (this.productForm.get('type_variation').value === 'V' && this.mySelectedVariations.length === this.myVariations.length) {
        this.checkedVariations();
        let variValues = this.createVariations(this.mySelectedVariations);
        console.log("vari to send", variValues)
        console.log(this.mySelectedVariations)
        if (variValues.length === this.myVariations.length) {
          this.productForm.get('variations').setValue([]);
          this.productForm.get('variations').setValue(variValues);
          this.checkVariations = true;
        } else {
          this.productForm.get('variations').setValue([]);
          console.log("falta seleccionar variaciones")
        }
      }


      if (!this.productForm.invalid/*  && this.selectCategory.length > 0 */) {
        if (!this.idProduct) {
          this._productService.searchFriendlyURL(this.productForm.get("friendly_url").value).subscribe((res: any) => {
            this.productForm.get("friendly_url").setValue(res.friendly_url);
            this.continueProductSave();
          }, error => {
            this.middleService.sendLoading(false);
          });
        } else if (this.idProduct && this.nameChanged) {
          this._productService.searchFriendlyURL(this.productForm.get("friendly_url").value, this.idProduct).subscribe((res: any) => {
            this.productForm.get("friendly_url").setValue(res.friendly_url);
            this.continueProductSave();
          }, error => {
            this.middleService.sendLoading(false);
          });
        } else {
          this.continueProductSave();
        }
      } else {
        console.log('pppppppppppppppppppppppppppppppp')
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          "Producto",
          "Revise los campos obligatorios",
          "error"
        );

      }
    }
  }
  continueProductSave(reason?: any) {
    if (!this.productForm.invalid /* && this.selectCategory.length > 0 */) {
      if (this.productForm.get('is_variation').value && !this.productForm.get('small_name').value) {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          "Producto",
          "Revise los campos obligatorios",
          "error"
        );
      } else {
        let dataSend = Object.assign({}, this.productForm.value);
        if (reason) {
          dataSend = Object.assign(dataSend, reason);
        }
        // this.selectCategories = [];
        // for (const category of this.listCategory) {
        //   this.searchCategoryChecked(category);
        // }
        // dataSend.categories = this.selectCategories;
        dataSend.categories = this.selectCategories;
        dataSend.images_link = this.lisAddPicture;
        if (this.lisMainAddPicture.length) {
          dataSend.image_cover = this.lisMainAddPicture[0];
        } else {
          dataSend.image_cover = "";
        }
        if (this.lisImageBackgroundDiscount.length) {
          dataSend.image_background_discount = this.lisImageBackgroundDiscount[0];
        } else {
          dataSend.image_background_discount = "";
        }
        if (this.lisMainAddPictureMobile.length) {
          dataSend.image_cover_mobile = this.lisMainAddPictureMobile[0];
        } else {
          dataSend.image_cover_mobile = "";
        }
        if (this.lisBannerAddPicture.length) {
          dataSend.image_banner = this.lisBannerAddPicture[0];
        } else {
          dataSend.image_banner = "";
        }
        if (this.lisBannerAddPictureMobile.length) {
          dataSend.image_banner_mobile = this.lisBannerAddPictureMobile[0];
        } else {
          dataSend.image_banner_mobile = "";
        }
        if (this.lisBannerLogoAddPicture.length) {
          dataSend.image_logo_banner = this.lisBannerLogoAddPicture[0];
        } else {
          dataSend.image_logo_banner = "";
        }
        if (this.lisBannerLogoAddPictureMobile.length) {
          dataSend.image_logo_banner_mobile = this.lisBannerLogoAddPictureMobile[0];
        } else {
          dataSend.image_logo_banner_mobile = "";
        }
        dataSend.detail_list = this.listDetailProduct;
        dataSend.related_products = this.listAddSku;
        dataSend.pack_products = [];
        dataSend.filter_values = [];


        this.listCategoriesFilter.forEach((item) => {
          if (item.filter.type == "radio" || item.filter.type == "checkbox") {
            dataSend.filter_values.push({
              filter_id: item._id,
              stringValue: item.stringValue,
              category_id: item.category_id
            });
          } else if (item.filter.type == "boolean") {
            dataSend.filter_values.push({
              filter_id: item._id,
              booleanValue: item.booleanValue,
              category_id: item.category_id
            });
          } else {
            dataSend.filter_values.push({
              filter_id: item._id,
              numberValue: item.numberValue,
              category_id: item.category_id
            });
          }
        });
        let continueUpdate = true
        for (const pack of this.listAddPack) {
          const obj: any = {};
          if (pack.product) {
            obj.product = pack.product._id;
            obj.quantity = pack.quantity;
            obj.code_ERP = pack.product.SKU;
            dataSend.pack_products.push(obj);
          } else {
            continueUpdate = false
            break;
          }
        }
        if (continueUpdate) {
          if (this.productForm.get("active_discount").value === true) {
            // start RULES ADMIN section
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
                    this.saveRulesAdmin(dataSend, savedIds);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            } else {
              this.saveRulesAdmin(dataSend);
            }
            //end RULES ADMIN section
          } else {
            this.saveProduct(dataSend);
          }
        } else {
          this.middleService.sendLoading(false)
          this.middleService.sendMessage('Producto', 'Los productos asociados a este producto, no tiene el identificador unico', 'error')
        }
      }
    } else {
      this.middleService.sendLoading(false);
      this.middleService.sendMessage(
        "Producto",
        "Revise los campos obligatorios",
        "error"
      );
    }
  }
  saveProduct(dataSend, rulesAdminId?: string) {
    this.productForm.get("price") && (this.initialPrice = this.productForm.controls["price"].value);
    this.initialSpecialPrice = this.productForm.controls["special_price"].value;
    if (rulesAdminId) {
      dataSend["rules_admin"] = rulesAdminId;
      dataSend["active_discount"] = true;
    } else {
      dataSend["rules_admin"] = null;
      dataSend["active_discount"] = false;
    }
    let validChildProduct = true
    for (const validProduct of dataSend.pack_products) {
      if (validProduct.quantity <= 0) {
        validChildProduct = false
      }
    }
    dataSend.videos_link = this.lisAddGaleryVideos;
    dataSend.SKU = this.codeSupplier + dataSend.SKU;
    dataSend.haveERP = this.haveERP;
    dataSend.name = dataSend.name.trimStart()
    if (this.typeRequest === 'C') {
      dataSend.request = this.myRequest
    }
    if (validChildProduct) {
      if (this.idProduct) {
        this._productService.update(this.idProduct, dataSend).subscribe(
          (infoUpadte: any) => {
            this.middleService.sendLoading(false);
            let messageCreate = "El producto ha sido actualizado correctamente";
            if (this.typeRequest === 'C') {
              messageCreate = "La creación del producto ha sido aprovada correctamente";
            }
            if (infoUpadte.inRequest) {
              messageCreate =
                "Se ha enviado la solicitud para la actualización del producto";
            }
            this.middleService.sendMessage("Producto", messageCreate, "ok");
            this._rulesDispatcherService.deleteRulesAdmin();
            this.nameChanged = false;
            //this.getDataProduct();
            this.router.navigate(["/system/product"]);
          },
          (error) => {
            this.nameChanged = false;
            this.middleService.sendMessage(
              "Producto",
              error.error.message,
              "error"
            );
            this.middleService.sendLoading(false);
          }
        );
      } else {
        this._productService.saveProduct(dataSend).subscribe(
          (infoSave: any) => {
            this.middleService.sendLoading(false);
            this.nameChanged = false;
            let messageCreate = "El producto ha sido creado correctamente";
            if (infoSave.inRequest) {
              messageCreate =
                "Se ha enviado la solicitud para la creación del producto";
            }
            if (this.typeRequest === 'C') {
              messageCreate = "El producto ha sido creado correctamente";
            }
            this.middleService.sendMessage("Producto", messageCreate, "ok");
            this.router.navigate(["/system/product"]);
          },
          (error) => {
            this.nameChanged = false;
            this.middleService.sendMessage(
              "Producto",
              error.error.message,
              "error"
            );
            this.middleService.sendLoading(false);
          }
        );
      }
    } else {
      this.middleService.sendLoading(false);
      this.middleService.sendMessage('Producto', 'No puede tener productos asociados con cantidad cero', 'error')
    }
  }
  checkedCategory(nodeSelected?: any) {
    if (this.listCategory) {
      for (const category of this.selectCategories) {
        for (const node of this.listCategory) {
          this.recursiveCheckedCheck(node, category, "children");
        }
      }
    }
  }
  checkedChangeCategory() {
    if (this.selectChangeCategory) {
      if (this.listCategoryChange) {
        for (const category of this.selectChangeCategory) {
          for (const node of this.listCategoryChange) {
            this.recursiveCheckedCheck(node, category, "children");
          }
        }
      }
    }
  }
  dataPictureSave($event) {
    if (this.selectMuti) {
      for (const picture of $event) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = picture
        } else {
          this[this.selectPicture].push(picture);
        }
      }
    } else {
      if ($event.length > 0) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = $event
        } else {
          this[this.selectPicture].push($event);
        }
      }
    }
    this.validLimitGallery()
    this.updatePosition('lisAddPicture')
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
  deleteImageBase(position, field) {
    this[field].splice(position, 1);
    if (position > this[field].length) {
      this.imagePositionMobile = this[field].length;
      position = this[field].length;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
    this.updatePosition('lisAddPicture')
  }
  deleteImage(position, field, event?) {
    this[field].splice(this[field].length - position, 1);
    if (position > this[field].length) {
      this.imagePositionMobile = this[field].length;
      position = this[field].length;
    }
    this.imageShowSlider = this[field][
      this[field].length - this.imagePositionMobile
    ];
  }
  nextImage() {
    if (this.imagePositionMobile >= this.lisAddPicture.length) {
      this.imagePositionMobile = 1;
    } else {
      this.imagePositionMobile++;
    }
    this.imageShowSlider = this.lisAddPicture[
      this.lisAddPicture.length - this.imagePositionMobile
    ];
  }
  previousImage() {
    if (this.imagePositionMobile <= 1) {
      this.imagePositionMobile = this.lisAddPicture.length;
    } else {
      this.imagePositionMobile--;
    }
    this.imageShowSlider = this.lisAddPicture[
      this.lisAddPicture.length - this.imagePositionMobile
    ];
  }
  recursiveCheckedCheck(node: any, categorieSearch, statusSearch) {
    if (!node.children) {
      if (node._id === categorieSearch) {
        this.isSupplier && node.parent && (this.childNode = node);
        node.checked = true;
      } /* else if (this.isSupplier) {
        node.checked = false;
      } */
    } else {
      if (node._id === categorieSearch) {
        node.checked = true;
      } /* else if (this.isSupplier) {
        node.checked = false;
      } */
      for (const children of node.children) {
        this.recursiveCheckedCheck(children, categorieSearch, statusSearch);
      }
    }
  }
  returnProducts() {
    for (const subs of this.Subscriptions) {
      subs.unsubscribe();
    }
    this._rulesDispatcherService.deleteRulesAdmin();
    if (localStorage.getItem("returnListRequest")) {
      this.router.navigate([localStorage.getItem("returnListRequest")]);
    } else {
      this.router.navigate(["/system/product"]);
    }
  }
  searchCategoryChecked(listObj) {
    if (!listObj.children) {
      if (listObj.checked) {
        this.selectCategories.push(listObj._id);
      }
    } else {
      if (listObj.checked) {
        this.selectCategories.push(listObj._id);
      }
      for (const categoryChildren of listObj.children) {
        this.searchCategoryChecked(categoryChildren);
      }
    }
  }
  searchListFather(sku, field) {
    this.middleService.sendLoading(true)
    this._productService.searchFatherSKU(sku).subscribe(
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
  searchSKU(sku, field) {
    this.middleService.sendLoading(true)
    this._productService.searchSKU(sku).subscribe(
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
  selectImageMainWeb($event, entity) {
    this.selectPicture = entity
    this.dataPictureSave($event.image)
  }
  showWindowMultimedia(field, multi, replacePosition?, maxSize?, maxDimension?) {
    this.replacePosition = replacePosition
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    this.multimediaGallery.config.noValidDimension = false;
    if (multi) {
      this.multimediaGallery.config.typeInfo = "multi";
      this.multimediaGallery.config.maxImageSelect = null;
    } else {
      this.multimediaGallery.config.typeInfo = "simple";
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }
  addSKU(valueSKU, field, entity) {
    //listAddSku
    //listAddPack
    const searchExist = this[field].filter(function (el) {
      return el.SKU === valueSKU.SKU;
    });
    if (searchExist.length > 0) {
      this["duplicate" + entity] = true;
      setTimeout(() => {
        this["duplicate" + entity] = false;
      }, 2000);
    } else {
      this[field].push(valueSKU);
      console.log(this.listAddSku)
    }
    setTimeout(() => {
      this.productForm.get("search_sku").setValue("");
    }, 0);
  }
  clear() {
    this.productForm.get('product_father').setValue(null)
    this.productForm.get('taxBuy').setValue(null)
    this.productForm.get('taxSent').setValue(null)
    this.productForm.get('clasification').setValue(null)
    this.productForm.get('type').setValue(null)
    this.productForm.get('supplier').setValue(null)
    this.productForm.get('supplier_delivery').setValue(null)
    this.productForm.get('brand').setValue(null)
    this.productForm.get('group').setValue("")
    this.productForm.get('list_method').setValue([])
    this.productForm.get('active').setValue(false)
    this.lisBannerLogoAddPicture = []
    this.lisBannerLogoAddPictureMobile = []
    this.lisBannerAddPicture = []
    this.lisBannerAddPictureMobile = []
    this.selectCategories = []
  }
  addFatherProduct(valueFather) {
    if (this.idProduct != valueFather._id) {
      this.productForm.get('search_father').setValue("")
      this.fatherproductDetail = valueFather
      this.productForm.get('product_father').setValue(valueFather._id)
      this.productForm.get('taxBuy').setValue(valueFather.taxBuy)
      this.productForm.get('taxSent').setValue(valueFather.taxSent)
      this.productForm.get('clasification').setValue(valueFather.clasification)
      this.productForm.get('type').setValue(valueFather.type)
      this.productForm.get('supplier').setValue(valueFather.supplier)
      this.productForm.get('supplier_delivery').setValue(valueFather.supplier_delivery)
      this.productForm.get('brand').setValue(valueFather.brand)
      this.productForm.get('group').setValue(valueFather.group)
      this.productForm.get('list_method').setValue(valueFather.list_method)
      this.productForm.get('active').setValue(valueFather.active)
      if (valueFather.image_logo_banner) {
        this.lisBannerLogoAddPicture.push(valueFather.image_logo_banner)
      }
      if (valueFather.image_logo_banner_mobile) {
        this.lisBannerLogoAddPictureMobile.push(valueFather.image_logo_banner_mobile)
      }
      if (this.lisBannerAddPicture.length > 0) {
        this.lisBannerAddPicture = []
      }
      if (valueFather.image_banner) {
        this.lisBannerAddPicture.push(valueFather.image_banner)
      }
      if (valueFather.image_banner_mobile) {
        this.lisBannerAddPictureMobile.push(valueFather.image_banner_mobile)
      }
      this.selectCategories = valueFather.categories
    } else {
      this.middleService.sendMessage('Productos', 'No puedes seleccionar al mismo producto como producto base', 'error')
    }
  }
  addPack(valueSKU, field, entity) {
    const searchExist = this[field].filter(function (el) {
      return el.product.SKU === valueSKU.SKU;
    });
    if (searchExist.length > 0) {
      this["duplicate" + entity] = true;
      setTimeout(() => {
        this["duplicate" + entity] = false;
      }, 2000);
    } else {
      const obj: any = {};
      obj.product = {};
      obj.product.SKU = valueSKU.SKU;
      obj.product.name = valueSKU.name;
      obj.product._id = valueSKU._id;
      obj.product.code_ERP = valueSKU.code_ERP;
      obj.quantity = 0;
      this[field].push(obj);
    }
    setTimeout(() => {
      this.f.search_pack.setValue("");
    }, 0);
  }
  deleteFather() {
    this.fatherproductDetail = {}
    this.listProductFather = []
    this.clear()
  }
  changeStatusMore() {
    this.showMoreButton = !this.showMoreButton;
  }
  deleteSkuList(index, field) {
    this[field].splice(index, 1);
  }
  getListBrand(idSupplier) {
    this.middleService.sendLoading(true)
    this._supplierService.getBrand(idSupplier).subscribe(
      (listBrand) => {
        this.middleService.sendLoading(false)
        this.listBrand = listBrand;
      },
      () => {
        this.middleService.sendLoading(false)
      }
    );
  }
  getListSupplierDelivery(idSupplier) {
    this.middleService.sendLoading(true)
    this._supplierService.getAllSupplierDeliverySupplier(idSupplier).subscribe(
      (listSupplierDelivery) => {
        this.middleService.sendLoading(false)
        this.listSupplierDelivery = listSupplierDelivery;
      },
      () => {
        this.middleService.sendLoading(false)
      }
    );
  }
  getListCategory(group) {
    this.middleService.sendLoading(true);
    this._categoryService.getAllCategory(group).subscribe(
      (listCategory: any) => {
        this.middleService.sendLoading(false);
        this.listCategory = JSON.parse(JSON.stringify(listCategory));
        this.listCategoryChange = JSON.parse(JSON.stringify(listCategory));
        if (this.selectableCategory) {
          this.selectableCategory.fillDataSource(this.listCategory);
        }
        if (this.selectableCategory) {
          this.selectableChangeCategory.fillDataSource(this.listCategoryChange);
        }
        this.checkedCategory();
        this.checkedChangeCategory();
      },
      () => { }
    );
  }
  ngOnDestroy() {
    this._rulesDispatcherService.deleteRulesAdmin();
    for (const subs of this.Subscriptions) {
      subs.unsubscribe();
    }
  }
}