import { ProductService } from "./../../../shared/service/product.service";
import { CampaignService } from "./../../../shared/service/campaign.service";
import { BrandService } from "./../../../shared/service/brand.service";
import { RulesDispatcherService } from "./../../../shared/service/rules-dispatcher.service";
import { Subscription } from "rxjs";
import { UbigeoService } from "./../../../shared/service/ubigeo.service";
import { DialogConfirmComponent } from "./../../components/dialog-confirm/dialog-confirm.component";
import { Router, ActivatedRoute } from "@angular/router";
import { DiscountRuleService } from "./../../../shared/service/discount-rule.service";
import { LdvService } from "./../../../shared/service/ldv.service";
import { MiddleService } from "./../../../shared/service/middle.service";
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  FormBuilder
} from "@angular/forms";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { MatSelectChange, MatOption } from "@angular/material";
import { ThrowStmt } from "@angular/compiler";
import { CategoryService } from "src/app/shared/service/category.service";
import { SupplierService } from "src/app/shared/service/supplier.service";

@Component({
  selector: "app-crud-discount-rule",
  templateUrl: "./crud-discount-rule.component.html",
  styleUrls: ["./crud-discount-rule.component.scss"]
})
export class CrudDiscountRuleComponent implements OnInit, OnDestroy {
  @Input() isEmbedded: boolean = false;
  @Output() sideBarOpen = new EventEmitter<any>();
  discountRuleForm: FormGroup;
  dateForm: FormGroup;
  idDiscountRule: string;
  discountRuleValues: any[] = [];
  discountRulesNames: any[] = [];
  selectedRuleType: string;
  rules: any;
  listTypeAttr: any;
  listTypeAttrField: any;
  brandList: any;
  campaignList: any;
  categoryList: any;
  sellerList: any;
  listOperators: any;
  listAddSku: any;
  duplicateSKU: boolean;
  listSKUProduct: any;
  listProvincias: Array<any>;
  listDepartamentos: Array<any>;
  listDistritos: Array<any>;
  submitted: boolean;
  headerFixed: boolean;
  embeddedUpdate: boolean = false;
  isDisabled: boolean = false;
  nameExists: string;
  idUbigeo: string;
  selectedAttrbiute: string;
  selectedAttrbiuteField: string;
  departmentSubscription: Subscription;
  provinceSubscription: Subscription;
  districtSubscription: Subscription;
  searchSkuSubscription: Subscription;
  departmentChangesSubscrition: Subscription;
  provinceChangesSubscription: Subscription;
  discountRuleSentSubscription: Subscription;
  ubigeoDataSource: any[] = [];
  listRuleTypeFilter: any;
  listFilters: any;
  filterValues: any;

  fieldsToClear = [
    "name",
    "attrValue",
    "bines",
    "texto",
    "attribute",
    "attributeField",
    "productBrandField",
    "campaignNameField",
    "categoryNameField",
    "sellerNameField",
    "operator"
  ];
  dateFieldsToClear = ["initial_date_offer", "end_date_offer"];

  @ViewChild("dialogDelete", { static: false })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _middleService: MiddleService,
    private _ldvService: LdvService,
    private _discountRuleService: DiscountRuleService,
    private _ubigeService: UbigeoService,
    private _rulesDispatcherService: RulesDispatcherService,
    private _brandService: BrandService,
    private _campaignService: CampaignService,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService,
    private serviceProduct: ProductService,
    private fb: FormBuilder
  ) {
    this.rules = [];
    this.activatedRoute.params.subscribe(params => {
      this.idDiscountRule = params.idDiscountRule;
    });
    this.dateForm = this.fb.group(
      {
        initial_date_offer: ["", Validators.required],
        end_date_offer: ["", Validators.required]
      },
      { validator: this.checkDates }
    );
  }

  @HostListener("scroll", ["$event"]) private onScroll($event: Event): void {
    $event.srcElement.addEventListener("scroll", this.scrollEvent, true);
  }

  ngOnInit() {
    this.headerFixed = false;
    this.listAddSku = [];
    this.listSKUProduct = [];
    this.duplicateSKU = false;
    this.discountRuleForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      options: new FormControl(null),
      attribute: new FormControl(null, [Validators.required]),
      attributeField: new FormControl(null, [Validators.required]),
      productBrandField: new FormControl(null, [Validators.required]),
      search_sku: new FormControl(""),

      ruleTypeFilter: new FormControl(""),

      filterId: new FormControl(""),
      filterValue: new FormControl(""),
      filterType: new FormControl(""),
      entityFilterId: new FormControl(""),
      entityFilterName: new FormControl(""),
      campaignNameField: new FormControl(null, [Validators.required]), //id de campaña
      categoryNameField: new FormControl(null, [Validators.required]), //id de categoría
      sellerNameField: new FormControl(null, [Validators.required]),
      operator: new FormControl(null, [Validators.required]),
      attrValue: new FormControl(null, [Validators.required]),
      bines: new FormControl(null, [Validators.required]),
      texto: new FormControl(null, [Validators.required]),
      departamento: new FormControl(null),
      provincia: new FormControl(null),
      distrito: new FormControl(null)
    });
    this.getListTypeAttr();
    this.getListOperators();
    this.getRuleTypes();
    this.getAllBrands();
    this.getAllCampaigns();
    this.getAllCategories();
    this.getAllSellers();
    this.getDiscountRulesForValidation();
    this.getLdvRuleTypeFilter();
    if (this.idDiscountRule) {
      this.getInfoDiscountRule();
    }

    this.discountRuleSentSubscription = this._rulesDispatcherService.discountRuleSent.subscribe(
      (discountRule: any) => {
        this.clearValidators(this.fieldsToClear, this.dateFieldsToClear);
        if (Object.entries(discountRule).length !== 0) {
          this.embeddedUpdate = true;
          this.getInfoDiscountRule(discountRule);
        } else {
          this.selectedRuleType = undefined;
          this.idDiscountRule = undefined;
          this.embeddedUpdate = false;
          this.discountRuleForm.reset();
          this.isDisabled = false;
          this.ubigeoDataSource = [];
        }
      }
    );
    this.onChanges();
  }

  getLdvRuleTypeFilter() {
    this._ldvService.getLdvDetail("RULE-TYPE-FILTER").subscribe(val => {
      this.listRuleTypeFilter = val;
    });
  }

  formatFilterTypeId(valueString) {
    if(this.listRuleTypeFilter) {
      return this.listRuleTypeFilter.find(e => e._id === valueString).value
    }
    
  }

  getMinMaxRange() {
    return `valor (${this.filterValues.minValue} - ${this.filterValues.maxValue})`
  }

  getCampaignFilters(val) {
    this.discountRuleForm.get('entityFilterName').setValue('campaña')
    this._campaignService.getCampaignFilters(val).subscribe(
      (val: any) => {
        if(val && val.filters) {
          this.listFilters = val.filters;
        }
      }
    )
  }

  getCategoryFilters(val) {
    this.discountRuleForm.get('entityFilterName').setValue('categoria')
    this._categoryService.getCategoryFilters(val).subscribe(
      (val: any) => {
        if(val && val.filters) {
          this.listFilters = val.filters;
        }
      }
    )
  }

  setArrayFilters(val) {
    for(const fc of this.listFilters) {
      if(fc.filter._id == val) {
        this.filterValues = {
          type: fc.filter.type,
          values: fc.values,
          minValue: fc.minValue ? fc.minValue : undefined,
          maxValue: fc.maxValue ? fc.maxValue : undefined,
        }
      }
    }
  }

  selectFilterValue($event, numberValue?) {
   // this.discountRuleForm.removeControl('filterType');
    switch(typeof $event.value) {
      case 'string':
        this.discountRuleForm.get('filterType').setValue('stringValue')
        /* this.discountRuleForm.addControl('filterType', new FormControl('stringValue')); */
        break;
      case 'boolean':
        this.discountRuleForm.get('filterType').setValue('booleanValue')
        /* this.discountRuleForm.addControl('filterType', new FormControl('booleanValue')); */
        break;
    }
    if(numberValue) {
      this.discountRuleForm.get('filterType').setValue('numberValue')
      /* this.discountRuleForm.addControl('filterType', new FormControl('numberValue')); */
    }
    console.log(this.discountRuleForm.value)
  }

  checkDates(group: FormGroup): { [key: string]: string } | null {
    if (
      group.controls["initial_date_offer"].value >
      group.controls["end_date_offer"].value
    ) {
      return { notValid: "Las fechas ingresadas son inválidas" };
    }
    return null;
  }

  returnDiscountRule() {
    this.router.navigate(["/system/discount-rule"]);
    this.unsubscribeAll();
  }

  get f() {
    return this.discountRuleForm.controls;
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  sendValue(value: string) {
    this.clearValidators(this.fieldsToClear, this.dateFieldsToClear);

    this.selectedRuleType = value;
    const resetValue: any = {};
    for (let key in this.discountRuleForm.controls) {
      resetValue[key] = "";
    }
    resetValue["name"] = this.discountRuleForm.get("name").value;
    switch (value) {
      case "Atributo":
        this.setValidatorsHelper(
          [
            "name",
            "attrValue",
            "attribute",
            "attributeField",
            "productBrandField",
            "campaignNameField",
            "operator"
          ],
          resetValue
        );
        this.discountRuleForm.controls["attribute"].patchValue(
          this.listTypeAttr[0]._id
        );
        this.getListTypeAttrField("RULE_CART");
        break;
      case "Fecha":
        this.setValidatorsHelper(["name"], resetValue);
        this.setValidtorsHelperForDateRange([
          "initial_date_offer",
          "end_date_offer"
        ]);
        break;
      case "Bines":
        this.setValidatorsHelper(["name", "bines"], resetValue);
        break;
      case "Texto":
        this.setValidatorsHelper(["name", "texto"], resetValue);
        break;
      case "Ubigeo":
        this.setValidatorsHelper(["name"], resetValue);
        this.getListDepartaments();
        break;
      case "Primera compra en Tienda":
        this.setValidatorsHelper(["name"], resetValue);
        break;
      case "Primera compra en Campaña":
        this.setValidatorsHelper(["name"], resetValue);
        break;
    }
  }

  setValidatorsHelper(fieldsToValidate: string[], resetValue?) {
    resetValue && this.discountRuleForm.reset(resetValue);
    fieldsToValidate.forEach(field => {
      this.discountRuleForm.get(field).setValidators([Validators.required]);
      this.discountRuleForm.get(field).updateValueAndValidity();
    });
  }

  setValidtorsHelperForDateRange(fieldsToValidate: string[]) {
    fieldsToValidate.forEach(field => {
      this.dateForm.get(field).setValidators([Validators.required]);
      this.dateForm.get(field).updateValueAndValidity();
    });
  }

  getListTypeAttr() {
    this._ldvService.getLdvDetail("ATTR-RDD").subscribe(ldvDetails => {
      this.listTypeAttr = ldvDetails;
    });
  }

  getListTypeAttrField(filter: string, edit?: boolean) {
    this._ldvService.getLdvDetail(filter).subscribe(ldvDetails => {
      this.listTypeAttrField = ldvDetails;
      if (filter === "RULE_CART") {
        this.selectedAttrbiute = "carrito";
      }
      if (!this.embeddedUpdate || edit) {
        if (filter === "RULE_CART") {
          this.discountRuleForm.controls["attributeField"].patchValue(
            this.listTypeAttrField[0]._id
          );
          this.selectedAttrbiute = "carrito";
          this.selectedAttrbiuteField = "monto_sub";
        } else if (filter == "RULE_FILTER") {
          this.discountRuleForm.controls["attributeField"].patchValue(
            this.listTypeAttrField[0]._id
          );
        } else {
          this.discountRuleForm.controls["attributeField"].patchValue(
            this.listTypeAttrField[1]._id
          );
          this.selectedAttrbiute = "producto";
          this.selectedAttrbiuteField = "precio";
        }
      }
    });
  }

  getListOperators() {
    this._ldvService.getLdvDetail("OPERATOR-RDD").subscribe(ldvDetails => {
      this.listOperators = ldvDetails;
    });
  }

  getRuleTypes() {
    this._ldvService.getLdvDetail("TYPE-RDD").subscribe(ldvDetails => {
      this.rules = ldvDetails;
      if (!this.embeddedUpdate) {
        this.discountRuleForm.controls["options"].patchValue(this.rules[0]._id);
        this.selectedRuleType = "Fecha";
        this.setValidatorsHelper(["name"]);
        this.setValidtorsHelperForDateRange([
          "initial_date_offer",
          "end_date_offer"
        ]);
      }
    });
  }

  getAllBrands() {
    this._brandService.getAllBrandsNames().subscribe(brands => {
      this.brandList = brands;
    });
  }

  getAllCampaigns() {
    this._campaignService.getCampaignNames().subscribe(campaignNames => {
      this.campaignList = campaignNames;
    });
  }

  getAllCategories() {
    this._categoryService.getCategoryNames().subscribe(categoryNames => {
      this.categoryList = categoryNames;
    })
  }

  getAllSellers() {
    this._supplierService.getAllSupplier().subscribe(seller => {
      this.sellerList = seller;
    })
  }

  //aqui continuar

  /*   getAllCategories() {
      this._categoryService.getListCategoryAllGroup().subscribe(campaignNames => {
        this.campaignList = campaignNames;
      });
    }
   */
  getDiscountRulesForValidation() {
    this._discountRuleService.getAllNames().subscribe((rdds: any) => {
      rdds.forEach(rdd => {
        this.discountRulesNames.push(rdd.name);
      });
    });
  }

  getListDepartaments() {
    this.departmentSubscription = this._ubigeService
      .getAllDepartments()
      .subscribe((response: Array<any>) => {
        this.listDepartamentos = response;
        this.discountRuleForm.controls["departamento"].patchValue(
          this.listDepartamentos[0]._id
        );
      });
    this.onChanges();
  }

  getInfoDiscountRule(discountRule?) {
    if (discountRule) {
      this.fillTemplate(discountRule);
    } else {
      this._discountRuleService
        .getOne(this.idDiscountRule)
        .subscribe((discountRuleData: any) => {
          this.fillTemplate(discountRuleData);
        });
    }
  }

  fillTemplate(discountRuleData: any) {
    this.selectedRuleType =
      discountRuleData.tipo !== undefined ? discountRuleData.tipo.value : null;
    this.selectedRuleType === "Ubigeo" &&
      this.populateTable(discountRuleData.values);
    this.isDisabled = true;

    if (discountRuleData.ldv_attr_field_id !== undefined) {
      this.getListTypeAttrField(discountRuleData.ldv_attr_field_id.code);
    }

    this.selectedAttrbiute =
      discountRuleData.ldv_attr_id && discountRuleData.ldv_attr_id.value;
    this.selectedAttrbiuteField =
      discountRuleData.ldv_attr_field_id &&
      discountRuleData.ldv_attr_field_id.value;

    if (this.selectedRuleType === "Atributo") {
      if (discountRuleData.ldv_attr_id.value === "campaña") {
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          campaignNameField: discountRuleData.values[0]
        });

        this.setValidatorsHelper(["attribute", "campaignNameField"]);
      } else if (discountRuleData.ldv_attr_id.value === "categoria") {
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          categoryNameField: discountRuleData.values[0]
        });

        this.setValidatorsHelper(["attribute", "categoryNameField"]);
      } else if (discountRuleData.ldv_attr_id.value === "seller") {
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          sellerNameField: discountRuleData.values[0]
        });

        this.setValidatorsHelper(["attribute", "sellerNameField"]);
      } else if (
        discountRuleData.ldv_attr_id.value === "producto" &&
        discountRuleData.ldv_attr_field_id.value === "marca"
      ) {
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          attributeField: discountRuleData.ldv_attr_field_id._id,
          productBrandField: discountRuleData.values[0]
        });
        this.setValidatorsHelper([
          "attribute",
          "attributeField",
          "productBrandField"
        ]);
      } else if(
        discountRuleData.ldv_attr_id.value === "filtros"
      ) {
        console.log(discountRuleData)
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          attributeFiled: discountRuleData.ldv_attr_field_id._id,
          ruleTypeFilter: discountRuleData.values[0].ruleTypeFilter,
          filterId: discountRuleData.values[0].filterId,
          filterValue: discountRuleData.values[0].filterValue,
          entityFilterId: discountRuleData.values[0].entityFilterId,
          entityFilterName: discountRuleData.values[0].entityFilterName,
        });
        if(discountRuleData.values[0].entityFilterName === 'campaña') {
          this.getCampaignFilters(discountRuleData.values[0].entityFilterId);
        } else {
          this.getCategoryFilters(discountRuleData.values[0].entityFilterId);
        }
        setTimeout(()=> {
          this.setArrayFilters(discountRuleData.values[0].filterId)
        }, 2000)
      } else if (
        discountRuleData.ldv_attr_field_id.value === "sku"
      ) {
        this.listAddSku = [];
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          attributeField: discountRuleData.ldv_attr_field_id._id
        });
        this.listAddSku = discountRuleData.values.slice();
        this.setValidatorsHelper(["attribute", "attributeField"]);
      } else {
        this.discountRuleForm.patchValue({
          name: discountRuleData.name,
          options: discountRuleData.tipo._id,
          attribute: discountRuleData.ldv_attr_id._id,
          attributeField: discountRuleData.ldv_attr_field_id._id,
          operator: discountRuleData.operator._id,
          attrValue: discountRuleData.values
        });
        this.setValidatorsHelper([
          "attrValue",
          "attribute",
          "attributeField",
          "operator"
        ]);
      }
    } else if (this.selectedRuleType === "Fecha") {
      this.dateForm.patchValue({
        initial_date_offer: discountRuleData.values[0],
        end_date_offer: discountRuleData.values[1]
        // initial_date_offer: discountRuleData.values[0].substring(0, 16),
        // end_date_offer: discountRuleData.values[1].substring(0, 16)
      });
      this.discountRuleForm.patchValue({
        name: discountRuleData.name,
        options: discountRuleData.tipo._id
      });
    } else if (this.selectedRuleType === "Bines") {
      this.discountRuleForm.patchValue({
        name: discountRuleData.name,
        options: discountRuleData.tipo._id,
        bines: discountRuleData.values.join()
      });
    } else if (this.selectedRuleType === "Texto") {
      this.discountRuleForm.patchValue({
        name: discountRuleData.name,
        options: discountRuleData.tipo._id,
        texto: discountRuleData.values.join()
      });
    } else if (this.selectedRuleType === "Primera compra en Tienda") {
      this.discountRuleForm.patchValue({
        name: discountRuleData.name,
        options: discountRuleData.tipo._id
      });
    } else if (this.selectedRuleType === "Primera compra en Campaña") {
      this.discountRuleForm.patchValue({
        name: discountRuleData.name,
        options: discountRuleData.tipo._id,
        campaignNameField: discountRuleData.values.join()
      });
    } else {
      this.discountRuleForm.patchValue({
        name: discountRuleData.name,
        options: discountRuleData.tipo._id
      });
    }
    this.idDiscountRule = discountRuleData._id;
  }

  selectedAttr(event: MatSelectChange) {
    this.selectedAttrbiute = (event.source.selected as MatOption).viewValue;
    switch (this.selectedAttrbiute) {
      case "carrito": {
        this.getListTypeAttrField("RULE_CART", true);
        this.setValidatorsHelper([
          "attrValue",
          "attribute",
          "attributeField",
          "operator"
        ]);
        break;
      }

      case "producto": {
        this.getListTypeAttrField("RULE_PRODUCT", true);
        this.setValidatorsHelper([
          "attrValue",
          "attribute",
          "attributeField",
          "operator"
        ]);
        break;
      }
      case "primera compra": {
        this.getListTypeAttrField("FIRST_BUY", true);
        this.setValidatorsHelper([
          "attrValue",
          "attribute",
          "attributeField",
          "operator"
        ]);
        break;
      }
      
      case "filtros": {
        this.getListTypeAttrField("RULE_FILTER", true);
        /* this.filterValues = undefined;
        this.listFilters = [];
        this._ldvService.getLdvDetail("RULE-TYPE-FILTER").subscribe(val => {
          this.listRuleTypeFilter = val;
        }); */
        /* this.setValidatorsHelper([
          "attribute",
          "attributeField",
          "ruleTypeFilter",
          "filterId",
          "filterType",
          "filterValue",
        ]); */
        break;
      }

      case "campaña": {
        this.setValidatorsHelper(["attribute", "campaignNameField"]);
        break;
      }

      case "seller": {
        this.setValidatorsHelper(["attribute", "sellerNameField"]);
        break;
      }
    }
  }

  selectedFieldAttr(event: MatSelectChange) {
    this.selectedAttrbiuteField = (event.source
      .selected as MatOption).viewValue;
    switch (this.selectedAttrbiuteField) {
      case "marca":
        this.setValidatorsHelper(["attribute", "productBrandField"]);
        break;

      case "precio":
        this.setValidatorsHelper([
          "attrValue",
          "operator",
          "attribute",
          "attributeField"
        ]);
        break;
      case "sku":
        this.setValidatorsHelper(["attribute"]);
        break;
    }
  }

  confirmDeleteItem() {
    this.dialogConfirm.show(
      "Eliminar Regla de descuento",
      "¿Está seguro que desea eliminar regla de descuento?"
    );
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deleteItem();
    }
  }

  deleteItem() {
    this._middleService.sendLoading(true);
    this._discountRuleService.delete(this.idDiscountRule).subscribe(
      data => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Regla de descuento",
          "La regla de descuento ha sido eliminada correctamente",
          "ok"
        );
        this.router.navigate(["/system/discount-rule"]);
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Regla de descuento",
          error.error.message,
          "error"
        );
      }
    );
  }

  saveDiscountRule(open?: boolean) {
    if (
      this.selectedAttrbiute === "producto" &&
      this.selectedAttrbiuteField === "marca"
    ) {
      this.clearValidatorsHelper(
        ["attrValue", "campaignNameField", "operator", "categoryNameField"],
        this.dateFieldsToClear
      );
    } else if (
      this.selectedAttrbiute === "producto" &&
      this.selectedAttrbiuteField === "sku"
    ) {
      this.clearValidatorsHelper(
        ["attrValue", "campaignNameField", "productBrandField", "operator", "categoryNameField"],
        this.dateFieldsToClear
      );
    } else if (this.selectedAttrbiute === "campaña") {
      this.clearValidatorsHelper(
        ["attrValue", "attributeField", "productBrandField", "operator", "categoryNameField", "sellerNameField"],
        this.dateFieldsToClear
      );
    } else if (this.selectedAttrbiute === "categoria") {
      this.clearValidatorsHelper(
        ["attrValue", "attributeField", "productBrandField", "operator", "campaignNameField", "sellerNameField"],
        this.dateFieldsToClear
      );
    } else if (this.selectedAttrbiute === "seller") {
      this.clearValidatorsHelper(
        ["attrValue", "attributeField", "productBrandField", "operator", "campaignNameField", "categoryNameField"],
        this.dateFieldsToClear
      );
    } else if (
      this.selectedAttrbiute === "carrito" ||
      (this.selectedAttrbiute === "producto" &&
        this.selectedAttrbiuteField === "precio")
    ) {
      this.clearValidatorsHelper(
        ["campaignNameField", "productBrandField"],
        this.dateFieldsToClear
      );
    } else if(
      this.selectedAttrbiute === "filtros"
    ) {
        this.clearValidatorsHelper(
          ["attrValue", "categoryNameField", "campaignNameField", "productBrandField", "operator", "bines", "texto"],
          this.dateFieldsToClear
        );
    }

    if (this.discountRuleForm.valid) {
      this._middleService.sendLoading(true);
      const {
        name,
        operator,
        options,
        attribute,
        attributeField,
        productBrandField,
        campaignNameField,
        categoryNameField,
        sellerNameField,
        attrValue,
        bines,
        texto,
        ruleTypeFilter,
        entityFilterId,
        entityFilterName,
        filterId,
        filterType,
        filterValue,
      } = this.discountRuleForm.value;
      let { initial_date_offer, end_date_offer } = this.dateForm.value;

      if (!this.embeddedUpdate) {
        this.nameExists = this.discountRulesNames.find(
          drrName => drrName === name
        );

        !this.nameExists &&
          (this.nameExists = this._rulesDispatcherService
            .getDiscountRules()
            .find(drr => drr.name === name));

        if (this.nameExists !== undefined) {
          this._middleService.sendLoading(false);
          return;
        }
      }

      let data = null;
      if (this.selectedRuleType === "Atributo") {
        data = {
          name: name,
          ldv_attr_id: attribute
        };
        if (
          this.selectedAttrbiute === "carrito" ||
          (this.selectedAttrbiute === "producto" &&
            this.selectedAttrbiuteField === "precio")
        ) {
          data = {
            ...data,
            ldv_attr_field_id: attributeField,
            values: [attrValue],
            operator: operator,
            tipo: options
          };
        } else if (this.selectedAttrbiute === "producto") {
          if (this.selectedAttrbiuteField === "sku") {
            if (this.listAddSku.length === 0) {

              this._middleService.sendMessage(
                "Regla de descuento",
                "Revise los campos obligatorios",
                "error"
              );
              this._middleService.sendLoading(false);
              return;
            }
          }
          data = {
            ...data,
            ldv_attr_field_id: attributeField,
            values: productBrandField ? [productBrandField] : this.listAddSku.slice()
          };

          this.listAddSku = [];
          this.searchSkuSubscription && open && this.searchSkuSubscription.unsubscribe();
        } else if (this.selectedAttrbiute === "campaña") {
          data = {
            ...data,
            ldv_attr_field_id: "5e2780bc92329d1760c4c3d5",
            values: [campaignNameField]
          };
        } else if (this.selectedAttrbiute === 'filtros') {
          const filter = {
            ruleTypeFilter,
            entityFilterId,
            entityFilterName,
            filterId,
            filterType,
            filterValue,
          }          
          data = {
            ...data,
            ldv_attr_field_id: "613247ba643c925e1465fc6f",
            values: [filter],
          }
        } else if (this.selectedAttrbiute === "categoria") {
          data = {
            ...data,
            ldv_attr_field_id: "61254170d9040d51567ed4d1",
            values: [categoryNameField]
          };
        } else {
          data = {
            ...data,
            ldv_attr_field_id: "6130f5cc7ae70233b8b176b0",
            values: [sellerNameField]
          };
        }
      } else if (this.selectedRuleType === "Bines") {
        if (!this.binesLengthIsCorrect(bines)) {
          this._middleService.sendLoading(false);
          return;
        }
        data = {
          name: name,
          values: [bines],
          tipo: options
        };
      } else if (this.selectedRuleType === "Texto") {
        data = {
          name: name,
          values: [texto],
          tipo: options
        };
      } else if (this.selectedRuleType === "Fecha") {
        let newDate = new Date(end_date_offer);
        newDate.setHours(23);
        newDate.setMinutes(59);
        newDate.setSeconds(59);
        newDate.setMilliseconds(59);
        end_date_offer = newDate;

        // initial_date_offer = new Date(initial_date_offer);
        //Disminución de 5 horas (zona horaria)
        // let millisecondsInit = initial_date_offer.getTime() - 5 * 1000 * 60 * 60;
        // initial_date_offer.setTime(millisecondsInit);
        // initial_date_offer = initial_date_offer.toISOString();

        // end_date_offer = new Date(end_date_offer);
        //Disminución de 5 horas (zona horaria)
        // let millisecondsEnd = end_date_offer.getTime() - 5 * 1000 * 60 * 60;
        // end_date_offer.setTime(millisecondsEnd);
        // end_date_offer = end_date_offer.toISOString();

        this._middleService.sendLoading(false);
        if (!this.dateForm.valid) {

          return this._middleService.sendMessage(
            "Regla de descuento",
            "Revise los campos obligatorios",
            "error"
          );
        }
        data = {
          name: name,
          values: [initial_date_offer, end_date_offer],
          tipo: options
        };
      } else if (this.selectedRuleType === "Primera compra en Tienda") {
        data = {
          name: name,
          values: [],
          tipo: options
        };
      } else if (this.selectedRuleType === "Primera compra en Campaña") {
        data = {
          name: name,
          values: [campaignNameField],
          tipo: options
        };
      } else {

        if (this.ubigeoDataSource.length === 0) {
          this._middleService.sendMessage(
            "Regla de descuento",
            "Revise los campos obligatorios",
            "error"
          );
          this._middleService.sendLoading(false);
          return;
        }
        data = {
          name: name,
          values: this.ubigeoDataSource,
          tipo: options
        };
      }

      if (this.isEmbedded) {
        data.tipo = { _id: options, value: this.selectedRuleType };
      }

      if (this.embeddedUpdate && this.selectedRuleType === "Atributo") {
        this.populateSavedFields(attributeField, data, () =>
          this.updateEmbeddedDiscountRule(data), this.selectedAttrbiute
        );
        if (open) {
          this.sideBarOpen.emit(!open);
        }
        return;
      }

      if (this.embeddedUpdate) {
        this.updateEmbeddedDiscountRule(data);
        if (open) {
          this.sideBarOpen.emit(!open);
        }
        return;
      } else if (this.idDiscountRule) {
        this._discountRuleService
          .updateDiscountRule(data, this.idDiscountRule)
          .subscribe((saveDiscountRule: any) => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              "Regla de descuento",
              "La regla de descuento ha sido actualizada correctamente",
              "ok"
            );
            this.router.navigate([
              "/system/discount-rule/detail/" + this.idDiscountRule
            ]);
          });
      } else {
        if (this.isEmbedded) {
          this.populateSavedFields(attributeField, data, () =>
            this._rulesDispatcherService.addDiscountRule(data), this.selectedAttrbiute
          );
          this._middleService.sendMessage(
            "Regla de descuento",
            "La regla de descuento ha sido añadida correctamente",
            "ok"
          );
          this._middleService.sendLoading(false);
        } else {
          this._discountRuleService
            .createDiscountRuleService(data)
            .subscribe((saveDiscountRule: any) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Regla de descuento",
                "La regla de descuento ha sido creada correctamente",
                "ok"
              );
              this.router.navigate([
                "/system/discount-rule/detail/" + saveDiscountRule.createdId
              ]);
            });
        }
      }
      if (open) {
        this.sideBarOpen.emit(!open);
      } else {
        this.submitted = false;
        this.clearValidators(this.fieldsToClear, this.dateFieldsToClear);
        this.discountRuleForm.reset();
        switch (this.selectedRuleType) {
          case "Fecha":
            this.setValidatorsHelper(["name"]);
            this.setValidtorsHelperForDateRange([
              "initial_date_offer",
              "end_date_offer"
            ]);
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[0]._id
            );
            break;
          case "Bines":
            this.setValidatorsHelper(["name", "bines"]);
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[1]._id
            );
            break;
          case "Ubigeo":
            this.setValidatorsHelper(["name"]);
            this.getListDepartaments();
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[2]._id
            );
            break;
          case "Atributo":
            this.setValidatorsHelper([
              "name",
              "attrValue",
              "attribute",
              "attributeField",
              "productBrandField",
              "campaignNameField",
              "categoryNameField",
              "operator"
            ]);
            this.discountRuleForm.controls["attribute"].patchValue(
              this.listTypeAttr[0]._id
            );
            this.getListTypeAttrField("RULE_CART");
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[3]._id
            );
            break;
          case "Texto":
            this.setValidatorsHelper(["name", "texto"]);
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[4]._id
            );
            break;
          case "Primera compra en Tienda":
            this.setValidatorsHelper(["name"]);
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[5]._id
            );
            break;
          case "Primera compra en Campaña":
            this.setValidatorsHelper(["name", "campaignNameField"]);
            this.discountRuleForm.controls["options"].patchValue(
              this.rules[6]._id
            );
            break;
        }
      }
    } else {

      this._middleService.sendMessage(
        "Regla de descuento",
        "Revise los campos obligatorios",
        "error"
      );
    }
  }

  updateEmbeddedDiscountRule(data: any) {
    this._rulesDispatcherService.updateDiscountRule(this.idDiscountRule, data);
    this._middleService.sendLoading(false);
    this._middleService.sendMessage(
      "Regla de descuento",
      "La regla de descuento ha sido actualizada correctamente",
      "ok"
    );
  }

  populateSavedFields(attributeField: string, data: any, callback, attributeSelected: string) {
    if (attributeSelected === "campaña") {
      this._ldvService
        .getLdvDetailById("5e2780bc92329d1760c4c3d5")
        .subscribe((val: any) => {
          data.ldv_attr_field_id &&
            (data.ldv_attr_field_id = {
              _id: "5e2780bc92329d1760c4c3d5",
              code: val.code,
              value: val.value
            });
          data.ldv_attr_id = {
            _id: data.ldv_attr_id,
            value: attributeSelected
          };
          callback();
        });
    } else if (attributeSelected === "categoria") {
      this._ldvService
        .getLdvDetailById("61254170d9040d51567ed4d1")
        .subscribe((val: any) => {
          data.ldv_attr_field_id &&
            (data.ldv_attr_field_id = {
              _id: "61254170d9040d51567ed4d1",
              code: val.code,
              value: val.value
            });
          data.ldv_attr_id = {
            _id: data.ldv_attr_id,
            value: attributeSelected
          };
          callback();
        });
    } else if (attributeSelected === "filtros") {
      this._ldvService
        .getLdvDetailById("613247ba643c925e1465fc6f")
        .subscribe((val: any) => {
          data.ldv_attr_field_id &&
            (data.ldv_attr_field_id = {
              _id: "613247ba643c925e1465fc6f",
              code: val.code,
              value: val.value
            });
          data.ldv_attr_id = {
            _id: data.ldv_attr_id,
            value: attributeSelected
          };
          callback();
        });
    } else if (attributeSelected === "seller") {
      this._ldvService
        .getLdvDetailById("6130f5cc7ae70233b8b176b0")
        .subscribe((val: any) => {
          data.ldv_attr_field_id &&
            (data.ldv_attr_field_id = {
              _id: "6130f5cc7ae70233b8b176b0",
              code: val.code,
              value: val.value
            });
          data.ldv_attr_id = {
            _id: data.ldv_attr_id,
            value: attributeSelected
          };
          callback();
        });
    } else if (attributeField) {
      this._ldvService
        .getLdvDetailById(attributeField)
        .subscribe((val: any) => {
          data.ldv_attr_field_id &&
            (data.ldv_attr_field_id = {
              _id: attributeField,
              code: val.code,
              value: val.value
            });
          data.ldv_attr_id = {
            _id: data.ldv_attr_id,
            value: attributeSelected
          };
          data.operator && (data.operator = { _id: data.operator });
          callback();
        });
    } else {
      callback();
    }
  }

  onChanges() {
    this.departmentChangesSubscrition = this.discountRuleForm.controls[
      "departamento"
    ].valueChanges.subscribe(val => {
      this.provinceSubscription = this._ubigeService
        .getProvincesByDepartment(val)
        .subscribe((response: Array<any>) => {
          this.listProvincias = response;
          this.discountRuleForm.controls["provincia"].patchValue(
            this.listProvincias[0]._id
          );
        });
    });
    this.provinceChangesSubscription = this.discountRuleForm.controls[
      "provincia"
    ].valueChanges.subscribe(val => {
      this.districtSubscription = this._ubigeService
        .getDistrictsByProvince(val)
        .subscribe((response: Array<any>) => {
          this.listDistritos = response;
          this.discountRuleForm.controls["distrito"].patchValue(
            this.listDistritos[0]._id
          );
        });
    });

    this.searchSkuSubscription = this.discountRuleForm.controls[
      "search_sku"
    ].valueChanges.subscribe(val => {
      if (val && val.length > 2) {
        this.searchSKU(val, "listSKUProduct");
      }
    });
  }

  searchSKU(sku, field) {
    this.serviceProduct.searchSKU(sku).subscribe(
      listProduct => {
        this[field] = listProduct;
      },
      error => {
        this._middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
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
    }
    setTimeout(() => {
      this.f.search_sku.setValue("");
    }, 0);
  }

  deleteSkuList(index, field) {
    this[field].splice(index, 1);
  }

  clearValidatorsHelper(fieldsArray: string[], dates: string[]) {
    fieldsArray.forEach(field => {
      this.discountRuleForm.get(field).clearValidators();
      this.discountRuleForm.get(field).updateValueAndValidity();
    });
    dates.forEach(field => {
      this.dateForm.get(field).clearValidators();
      this.dateForm.get(field).updateValueAndValidity();
    });
  }

  clearValidators(fieldsArray: string[], dates: string[]) {
    this.clearValidatorsHelper(fieldsArray, dates);
    this.unsubscribeAll();
  }

  binesLengthIsCorrect(bines: string) {
    let flag = true;
    const binArr = bines.split(",");
    binArr.forEach(bin => {
      if (bin.trim().length !== 6) {
        this._middleService.sendMessage(
          "Regla de descuento",
          "Los bines deben ser de 6 dígitos",
          "error"
        );
        flag = false;
      }
    });
    return flag;
  }

  addDistrict() {
    const currentId = this.discountRuleForm.controls["distrito"].value;
    const exists = this.ubigeoDataSource.find(dis => dis._id === currentId);

    if (exists) {
      this._middleService.sendMessage(
        "Regla de descuento",
        "No se puede ingresar un distrito repetido",
        "error"
      );
    } else {
      const district = this.listDistritos.find(
        district => district._id === currentId
      );

      this.ubigeoDataSource.push(district);
    }
  }

  deleteDistrict(id: number) {
    this.ubigeoDataSource.splice(id, 1);
  }

  populateTable(data: []) {
    this.ubigeoDataSource = [];
    data.forEach(discountRuleUbigeos => {
      this.ubigeoDataSource.push(discountRuleUbigeos);
    });

    this.getListDepartaments();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    this.departmentSubscription && this.departmentSubscription.unsubscribe();
    this.provinceSubscription && this.provinceSubscription.unsubscribe();
    this.districtSubscription && this.districtSubscription.unsubscribe();
    this.departmentChangesSubscrition &&
      this.departmentChangesSubscrition.unsubscribe();
    this.provinceChangesSubscription &&
      this.provinceChangesSubscription.unsubscribe();
    this.discountRuleSentSubscription &&
      this.discountRuleSentSubscription.unsubscribe();
  }
}
