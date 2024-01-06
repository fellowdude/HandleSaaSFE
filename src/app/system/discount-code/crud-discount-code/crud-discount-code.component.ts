import { RulesAdminService } from "./../../../shared/service/rules-admin.service";
import { DiscountRuleService } from "./../../../shared/service/discount-rule.service";
import { RulesDispatcherService } from "./../../../shared/service/rules-dispatcher.service";
import { GridComponent } from "src/app/system/components/grid/grid.component";
import { CrudRulesAdminComponent } from "./../../rules-admin/crud-rules-admin/crud-rules-admin.component";
import { DialogConfirmComponent } from "src/app/system/components/dialog-confirm/dialog-confirm.component";
import { Subscription } from "rxjs";
import { MiddleService } from "./../../../shared/service/middle.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild
} from "@angular/core";
import { DiscountCodeService } from "src/app/shared/service/discount-code.service";
import { LdvService } from "src/app/shared/service/ldv.service";
import { UploadExcelComponent } from "../../components/upload-excel/upload-excel.component";
import { GroupCustomerService } from "src/app/shared/service/group-customer.service";

@Component({
  selector: "app-crud-discount-code",
  templateUrl: "./crud-discount-code.component.html",
  styleUrls: ["./crud-discount-code.component.scss"]
})
export class CrudDiscountCodeComponent implements OnInit, OnDestroy {
  @ViewChild("dialogDelete", { static: false })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("gridListProducts", { static: true })
  gridListProducts: GridComponent;
  @ViewChild("gridListRulesAdmin", { static: true })
  gridListRulesAdmin: GridComponent;
  @ViewChild("cra", { static: false })
  mainCra: CrudRulesAdminComponent;
  @ViewChild('uploadExcelFilter', { static: true })
  uploadExcelFilter: UploadExcelComponent;
  namePage: string;
  discountCodeForm: FormGroup;
  headerFixed: boolean;
  headerRuleFixed: boolean;
  submitted: boolean = false;
  showRulesAdminForm: boolean = false;
  showRulesAdminGrid: boolean = false;
  editRulesAdmin: boolean = false;
  rulesAdminSaved: boolean = false;
  embeddedMessage: any;
  showEditableProducts: boolean = false;
  showOptions: boolean = true;
  idDiscountCode: string;
  rulesAdminChangedSubscription: Subscription;
  routerSubscription: Subscription;
  rulesAdmin: any;
  discountRules: any[] = [];
  createdDiscountRulesId: string[] = [];
  discountRulesForCreation: any[] = [];
  discountRulesForUpdate: any[] = [];
  productList: any[] = [];
  productsList: FormArray = new FormArray([]);
  listTypeDiscount: any;
  codeList: any[] = [];
  groupCustomer: any;
  listResultUserCode: any;
  showSummary: boolean = false;
  showSummaryCoupon: boolean = false;
  listResultCoupon: any;
  listCodeForm: FormGroup;
  lfSubmitted: boolean = false;
  listTypeGroup: any;
  editingCoupon: boolean = false;
  couponType: string;
  deliveryCouponType: string;
  couponIndexUpdating: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _middleService: MiddleService,
    private _rulesDispatcherService: RulesDispatcherService,
    private _discountRuleService: DiscountRuleService,
    private _rulesAdminService: RulesAdminService,
    private _discountCodeService: DiscountCodeService,
    private _groupCustomerService: GroupCustomerService,
    private _ldvService: LdvService
  ) {
    this.listTypeDiscount = [];
    this.namePage = "Códigos de descuento";
    this.activatedRoute.params.subscribe(params => {
      this.idDiscountCode = params.idDiscountCode;
      params.idDiscountCode && (this.editRulesAdmin = true);
    });
  }

  @HostListener("scroll", ["$event"]) private onScroll($event: Event): void {
    $event.srcElement.addEventListener("scroll", this.scrollEvent, true);
  }

  ngOnInit() {
    this.discountCodeForm = new FormGroup({
      active: new FormControl(false, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      have_discount: new FormControl(false, [Validators.required]),
      have_delivery_discount: new FormControl(false, [Validators.required]),
      coupon_discount_type: new FormControl(null),
      coupon_discount_amount: new FormControl(null),
      max_coupon_discount_amount: new FormControl(null),
      delivery_discount_type: new FormControl(false),
      delivery_discount_amount: new FormControl(null),
      max_delivery_discount_amount: new FormControl(null),
      products: this.productsList
    });

    this.listCodeForm = new FormGroup({
      coupon_code: new FormControl(null, [Validators.required]),
      total_used: new FormControl(0),
      capacity: new FormControl(null, [Validators.required]),
      target_type: new FormControl(null, [Validators.required]),
      target_entity: new FormControl(null),
      name_entity: new FormControl(null),
    });
    this.headerRuleFixed = false;
    this.getConfigExcel();
    this.getTypeDiscountCode();
    this.getTypeGroupCode();
    this.getGroupCustomer();
    /* this.initializeProductsGridList(); */
    this.showRulesAdminGridF();
    this.headerFixed = false;
    this.routerSubscription = this.router.events.subscribe(change => {
      if (change instanceof NavigationEnd) {
        this.idDiscountCode = this.activatedRoute.snapshot.params[
          "idDiscountCode"
        ];
        this.getInfoDiscountCode();
      }
    });

    if (this.idDiscountCode) {
      this.getInfoDiscountCode();
    }

    this.rulesAdminChangedSubscription = this._rulesDispatcherService.rulesAdminChanged.subscribe(
      rulesAdmin => {
        if (Object.entries(rulesAdmin).length !== 0) {
          this.rulesAdmin = rulesAdmin;
          this.showOptions = false;
        } else {
          this.rulesAdmin = undefined;
        }
      }
    );

    this.onChanges();
  }

  onChanges(): void {
    this.discountCodeForm.get('have_discount').valueChanges.subscribe(
      (val) => {
        if(val) {
          this.discountCodeForm.get('coupon_discount_type').setValidators([Validators.required]);
          this.discountCodeForm.get('coupon_discount_type').updateValueAndValidity();
          this.discountCodeForm.get('coupon_discount_amount').setValidators([Validators.required]);
          this.discountCodeForm.get('coupon_discount_amount').updateValueAndValidity();
        } else {
          this.discountCodeForm.get('coupon_discount_type').setValue(null);
          this.discountCodeForm.get('coupon_discount_type').clearValidators();
          this.discountCodeForm.get('coupon_discount_type').updateValueAndValidity();
          this.discountCodeForm.get('coupon_discount_type').markAsUntouched();
          this.discountCodeForm.get('coupon_discount_amount').setValue(null);
          this.discountCodeForm.get('coupon_discount_amount').clearValidators();
          this.discountCodeForm.get('coupon_discount_amount').updateValueAndValidity();
          this.discountCodeForm.get('coupon_discount_amount').markAsUntouched();

          this.discountCodeForm.get('max_coupon_discount_amount').setValue(null);
        }
      }
    );

    this.discountCodeForm.get('have_delivery_discount').valueChanges.subscribe(
      (val) => {
        if(val) {
          this.discountCodeForm.get('delivery_discount_type').setValidators([Validators.required]);
          this.discountCodeForm.get('delivery_discount_type').updateValueAndValidity();
          this.discountCodeForm.get('delivery_discount_amount').setValidators([Validators.required]);
          this.discountCodeForm.get('delivery_discount_amount').updateValueAndValidity();
        } else {
          this.discountCodeForm.get('delivery_discount_type').setValue(null);
          this.discountCodeForm.get('delivery_discount_type').clearValidators();
          this.discountCodeForm.get('delivery_discount_type').updateValueAndValidity();
          this.discountCodeForm.get('delivery_discount_type').markAsUntouched();
          this.discountCodeForm.get('delivery_discount_amount').setValue(null);
          this.discountCodeForm.get('delivery_discount_amount').clearValidators();
          this.discountCodeForm.get('delivery_discount_amount').updateValueAndValidity();
          this.discountCodeForm.get('delivery_discount_amount').markAsUntouched();
          
          this.discountCodeForm.get('max_delivery_discount_amount').setValue(null);
        }
      }
    );

    this.discountCodeForm.get('coupon_discount_type').valueChanges.subscribe(
      (val) => {
        if(val) {
          const type: any = this.listTypeDiscount.find(e => e._id == val)
          this.couponType = type.ref1
          if(type.ref1 == 'Porcentaje') {
            this.discountCodeForm.get('coupon_discount_amount').setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
            this.discountCodeForm.get('coupon_discount_amount').updateValueAndValidity();
          } else {
            this.discountCodeForm.get('coupon_discount_amount').clearValidators();
            this.discountCodeForm.get('coupon_discount_amount').updateValueAndValidity();
            this.discountCodeForm.get('coupon_discount_amount').markAsUntouched();
            this.discountCodeForm.get('coupon_discount_amount').setValidators([Validators.required, Validators.min(1)]);
            this.discountCodeForm.get('coupon_discount_amount').updateValueAndValidity();
          }
        }
      }
    );

    this.discountCodeForm.get('delivery_discount_type').valueChanges.subscribe(
      (val) => {
        if(val) {
          const type: any = this.listTypeDiscount.find(e => e._id == val)
          this.deliveryCouponType = type.ref1
          if(type.ref1 == 'Porcentaje') {
            this.discountCodeForm.get('delivery_discount_amount').setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
            this.discountCodeForm.get('delivery_discount_amount').updateValueAndValidity();
          } else {
            this.discountCodeForm.get('delivery_discount_amount').clearValidators();
            this.discountCodeForm.get('delivery_discount_amount').updateValueAndValidity();
            this.discountCodeForm.get('delivery_discount_amount').markAsUntouched();
            this.discountCodeForm.get('delivery_discount_amount').setValidators([Validators.required, Validators.min(1)]);
            this.discountCodeForm.get('delivery_discount_amount').updateValueAndValidity();
          }
        }
      }
    );
  }

  get lcf() {
    return this.listCodeForm.controls;
  }

  addCoupon() {
    if (this.listCodeForm.valid) {
      const newCoupon = this.listCodeForm.value
      const existCoupon = this.codeList.some(e => e.coupon_code.toUpperCase() == newCoupon.coupon_code.toUpperCase())
      if(existCoupon) {
        this._middleService.sendMessage(
          "Código de descuento",
          "Ya existe el mismo código en la lista de cupones",
          "error"
        );
      } else {
        this.listCodeForm.get('total_used').setValue(0)
        if(this.listCodeForm.get('target_entity').value) {
          this.listCodeForm.get('name_entity').setValue(this.groupToString(this.listCodeForm.get('target_entity').value))
        }
        this.codeList.push(this.listCodeForm.value);
        this.lfSubmitted = false;
        this.listCodeForm.markAsUntouched();
        this.listCodeForm.reset();
        this._middleService.sendMessage(
          "Código de descuento",
          "Se agregó el cupón a la lista",
          "ok"
        );
      }
      
    } else {
      this.lfSubmitted = true;
      this._middleService.sendMessage(
        "Código de descuento",
        "Revise los campos obligatorios",
        "error"
      );
    }
    console.log(this.codeList)
  }

  resetAddCoupon($event) {
    console.log("aaaa", $event.value)
    if($event.value.value === 'group') {
      this.listCodeForm.get('target_entity').setValidators([Validators.required]);
      this.listCodeForm.get('target_entity').updateValueAndValidity();
    } else {
      this.listCodeForm.get('target_entity').clearValidators();
      this.listCodeForm.get('target_entity').updateValueAndValidity();
      this.listCodeForm.get('target_entity').markAsUntouched();
    }
    this.lfSubmitted = false;
    this.listCodeForm.markAsUntouched();
    //this.listCodeForm.reset();
  }

  removeCoupon(item) {
    const index = this.codeList.findIndex(e => e == item)
    this.codeList.splice(index, 1)
    console.log(this.codeList)
  }

  editCoupon(item) {
    this.couponIndexUpdating = this.codeList.findIndex(e => e == item)
    const toEdit = this.codeList[this.couponIndexUpdating]
    const type = this.listTypeGroup.find(e=> e._id == toEdit.target_type || e._id == toEdit.target_type._id)
    this.listCodeForm.patchValue({
      coupon_code: toEdit.coupon_code,
      total_used: toEdit.total_used,
      capacity: toEdit.capacity,
      target_type: type,//toEdit.target_type,
      target_entity: toEdit.target_entity,
      name_entity: toEdit.name_entity,
    });
    console.log(this.listCodeForm.value)
    this.editingCoupon = true
  }

  updateCoupon() {
    if (this.listCodeForm.valid) {
      const newCoupon = this.listCodeForm.value
      const existCoupon = this.codeList.some(e => e.coupon_code.toUpperCase() == newCoupon.coupon_code.toUpperCase())
      const index = this.codeList.findIndex(e => e.coupon_code.toUpperCase() == newCoupon.coupon_code.toUpperCase())
      if(existCoupon && index != this.couponIndexUpdating) {
        this._middleService.sendMessage(
          "Código de descuento",
          "Ya existe el mismo código en la lista de cupones",
          "error"
        );
      } else {
      if(this.listCodeForm.get('target_entity').value) {
        if(this.groupToString(this.listCodeForm.get('target_entity').value)) {
          this.listCodeForm.get('name_entity').setValue(this.groupToString(this.listCodeForm.get('target_entity').value))
        }
      }
      console.log(this.listCodeForm.value)
      //this.codeList.splice(this.couponIndexUpdating, 0, this.listCodeForm.value)
      this.codeList[this.couponIndexUpdating] = this.listCodeForm.value
      this.lfSubmitted = false;
      this.listCodeForm.markAsUntouched();
      this.listCodeForm.reset();
      this._middleService.sendMessage(
        "Código de descuento",
        "Se actualizó el cupón",
        "ok"
      );
      this.editingCoupon = false
      }
    } else {
      this.lfSubmitted = true;
      this._middleService.sendMessage(
        "Código de descuento",
        "Revise los campos obligatorios",
        "error"
      );
      this.editingCoupon = false
    }
    //this.editingCoupon = false
    console.log(this.codeList)
  }

  cancelUpdateCoupon() {
    this.editingCoupon = false
    this.lfSubmitted = false
    this.listCodeForm.markAsUntouched()
    this.listCodeForm.reset()
  }

  uploadCustomers() {
    this.uploadExcelFilter.open();
  }

  getConfigExcel() {
    const date = new Date().toISOString().substring(0, 10);
    this.uploadExcelFilter.config = {
      title: 'Carga Masiva de Cupones de Usuarios',
      urlService: '/discount-code/upload-code-user',
      apiDownload: '/discount-code/template/code-user',
      fileDownloadName: 'Carga masiva de cupones de usuarios ' + date + '.xlsx',
    };
  }

  resultInfo(listProcess) {
    console.log(listProcess)
    if(listProcess) {
      this.listResultUserCode = listProcess.info.listProcess;
      this.showSummary = true;
    }
    for(/* let element of this.listResultUserCode */let i = 0; i < this.listResultUserCode.length; i++) {
      const existCoupon = this.codeList.some(e => e.coupon_code.toUpperCase() == this.listResultUserCode[i].coupon_code.toUpperCase())
      if(this.listResultUserCode[i].found && !existCoupon) {
        const userCode = {
          coupon_code: this.listResultUserCode[i].coupon_code,
          total_used: 0,
          capacity: parseInt(this.listResultUserCode[i].capacity),
          target_type: '61294f9ac3b52b4d7882c304',
          target_entity: this.listResultUserCode[i]._id,
          name_entity: this.listResultUserCode[i].user
        }
        this.codeList.push(userCode)
      } else {
        /* if(this.listResultUserCode[i].message == 'Usuario agregado') { */
          this.listResultUserCode[i].message = 'Código ya existente en la lista'
          this.listResultUserCode[i].found = false
        /* } */
      }
    }
    console.log(this.codeList)
  }

  closeSummary() {
    this.showSummary = false;
    this.showSummaryCoupon = false;
  }

  getTypeGroupCode() {
    this._ldvService.getLdvDetail("SONR_GROUP_TYPE").subscribe(
      data => {
        this.listTypeGroup = data;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          "error"
        );
      }
    );
  }

  getGroupCustomer() {
    this._groupCustomerService.getAllGroups().subscribe(
      data => {
        this.groupCustomer = data;
      }, error => {
        this._middleService.sendMessage(
          'Código de descuento',
          error.error.message,
          "error"
        );
      }
    )
  }

  groupToString(val) {
    if(this.groupCustomer && this.groupCustomer.length > 0) {
      const a = this.groupCustomer.find(e => e._id == val)
      if(a) {
        return a.name
      }
    }
    return
    
  }

  typeToString(val) {
    if(this.listTypeGroup && this.listTypeGroup.length > 0) {
      const a = this.listTypeGroup.find(e => e._id == val)
      return a.ref1
    }
    return
    
  }

  switchModal($event) {
    this.headerRuleFixed = $event;
  }

  getTypeDiscountCode() {
    this._ldvService.getLdvDetail("TYPE_DISCOUNT_CODE").subscribe(
      data => {
        this.listTypeDiscount = data;
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          "error"
        );
      }
    );
  }
/*   initializeProductsGridList() {
    this.gridListProducts.columns = [
      {
        field: "name",
        title: "Producto",
        type: "text"
      },
      {
        field: "SKU",
        title: "SKU",
        type: "text"
      }
    ];
    this.gridListProducts.config.pagQuantity = 20;
    this.gridListProducts.config.getService = "/product/searchAll";
    this.gridListProducts.config.select = true;
    this.gridListProducts.config.listItemSelect = this.productList;
    this.gridListProducts.config.selectGetObject = true;
    this.gridListProducts.config.errorConfig = true
    this.gridListProducts.config.entity = "Producto";
  } */

  showRulesAdminGridF() {
    this.gridListRulesAdmin.columns = [
      {
        field: "name",
        title: "Administrador de reglas de descuento",
        type: "text"
      }
    ];
    this.gridListRulesAdmin.config.pagQuantity = 20;
    this.gridListRulesAdmin.config.getService = "/rules-admin/search";
    this.gridListRulesAdmin.config.redirectId = true;
    this.gridListRulesAdmin.config.entity =
      "Administrador de reglas de descuento";
  }

  returnDiscountCode() {
    this.rulesAdminChangedSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this._rulesDispatcherService.deleteRulesAdmin();
    this.router.navigate(["/system/discount-code"]);
  }

  get f() {
    return this.discountCodeForm.controls;
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
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

  deleteRulesAdminF() {
    const title = "Eliminar administrador de regla de descuento";
    const messageModal = "¿Está seguro de eliminar?";
    this.dialogConfirm.show(title, messageModal, null, "rulesAdmin");
  }

  confirmDeleteItem() {
    const title = "Eliminar código de descuento";
    const messageModal = "¿Está seguro que desea eliminar?";
    this.dialogConfirm.show(title, messageModal, null, "Código de descuento");
  }

  acceptModal($event) {
    if ($event.accept) {
      if ($event.entity === "Código de descuento") {
        this.deleteItem();
      } else {
        this.rulesAdminSaved = false;
        this._rulesDispatcherService.deleteRulesAdmin();
      }
    }
  }

  configureMessage($event: any) {
    this.embeddedMessage = $event.message;
    this.rulesAdminSaved = $event.value;
  }

  deleteItem() {
    this._middleService.sendLoading(true);
    this._discountCodeService
      .deleteDiscountCode(this.idDiscountCode)
      .subscribe(data => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Código de descuento",
          "El código de descuento ha sido eliminado correctamente",
          "ok"
        );
        this.router.navigate(["/system/discount-code"]);
      });
  }

  confirmDeleteProduct(index: number) {
    this.productList.splice(index, 1);
    //(<FormArray>this.discountCodeForm.get('products')).removeAt(index);
    this.discountCodeForm.controls.products.patchValue(this.productsList);
  }

  onEditRulesAdmin() {
    this.editRulesAdmin = true;
    this.showRulesAdminForm = true;
  }

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
        (<FormArray>this.discountCodeForm.get("products")).removeAt(index);
        /*  this.discountCodeForm.controls.products.patchValue(this.productsList); */
        return;
      }
    });

    if (!found) {
      this.productList.push($event);
      this.productsList.push(
        new FormGroup({
          price: new FormControl($event.price, [])
        })
      );
      /* this.discountCodeForm.controls.products.patchValue(this.productsList); */
      (<FormArray>this.discountCodeForm.get("products")).patchValue(
        this.productList
      );
    }
  }

  getRulesAdminId($event) {
    this._middleService.sendLoading(true);
    this.showRulesAdminForm = true;
    this.showRulesAdminGrid = false;
    this.editRulesAdmin = true;
    this._rulesAdminService
      .getOne($event.field)
      .subscribe((rulesAdSer: any) => {
        rulesAdSer.rules.forEach(rule => {
          /* Populate service discountRules array */
          this._rulesDispatcherService.addDiscountRule(rule.rddId);
        });

        this._rulesDispatcherService.setRulesAdminChanged(rulesAdSer);

        this._middleService.sendLoading(false);
      });
  }

  getInfoDiscountCode() {
    this._discountCodeService
      .getOne(this.idDiscountCode)
      .subscribe((discountCode: any) => {
        /* this.productsList = new FormArray([]);
        for (const product of discountCode.products) {
          this.productsList.push(new FormGroup({}));
        } */
        this.discountCodeForm.patchValue({
          active: discountCode.active,
          name: discountCode.name,
          have_discount: discountCode.have_discount,
          have_delivery_discount: discountCode.have_delivery_discount,
          coupon_discount_type: discountCode.coupon_discount_type,
          coupon_discount_amount: discountCode.coupon_discount_amount,
          max_coupon_discount_amount: discountCode.max_coupon_discount_amount,
          delivery_discount_type: discountCode.delivery_discount_type,
          delivery_discount_amount: discountCode.delivery_discount_amount,
          max_delivery_discount_amount: discountCode.max_delivery_discount_amount,
        }); 

        this.codeList = discountCode.coupons;
        console.log("codes" , this.codeList)
        
        /* this.discountCodeForm.setControl("products", this.productsList); */
        this.showRulesAdminForm = true;

        setTimeout(() => {
          discountCode.rules_admin.rules.forEach(rule => {
            /* Populate service discountRules array */
            this._rulesDispatcherService.addDiscountRule(rule.rddId);
          });

          /* populate template and service for rules admin object */
          this._rulesDispatcherService.setRulesAdminChanged(
            discountCode.rules_admin
          );

          /* this.gridListProducts.updateSelectItem(); */
        });

        /* populate array of products */
        /* discountCode.products.forEach(product => {
          this.productList.push(product.productId);
        }); */
      });
  }

  saveDiscountCode() {
    if(!this.discountCodeForm.get('have_discount').value && !this.discountCodeForm.get('have_delivery_discount').value) {
      this._middleService.sendMessage(
        "Código de descuento",
        "Debe seleccionar al menos un descuento",
        "error"
      );
      return;
    }

    this.mainCra && this.mainCra.saveAdminRule();

    if (!this.mainCra) {
      this._middleService.sendMessage(
        "Código de descuento",
        "Debe crear o seleccionar un administrador de reglas",
        "error"
      );
      return;
    }

    if (!this.rulesAdminSaved) {
      this.embeddedMessage();
      return;
    }

    /* if (this.productList.length === 0) {
      this._middleService.sendMessage(
        "Código de descuento",
        "Debe agregar al menos un producto descontado",
        "error"
      );
      return;
    } */

    /* if (this.codeList.length == 0) {
      this._middleService.sendMessage(
        "Código de descuento",
        "Debe agregar un código de descuento a la lista",
        "error"
      );
      return;
    } */

    this.submitted = true;
    if (this.discountCodeForm.valid) {
      this._middleService.sendLoading(true);
      /* save in chain */

      this.discountRulesForCreation = [];
      this.discountRulesForUpdate = [];

      this.discountRules = this._rulesDispatcherService.getDiscountRules();
      this.discountRules.forEach(rdd => {
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
            error => {
              console.log(error);
            }
          );
      } else {
        this.saveRulesAdmin();
      }
    } else {
      this._middleService.sendMessage(
        "Código de descuento",
        "Revise los campos obligatorios",
        "error"
      );
    }
  }

  updateExistingDiscountRules(rdds: any[]) {
    this._discountRuleService
      .updateManyDiscountRules(rdds)
      .subscribe(null, error => {
        console.log(error);
      });
  }

  saveRulesAdmin(ids?: string[]) {
    let idCounter = 0;
    this.rulesAdmin.rules.forEach(rule => {
      if (rule.rddId._id === undefined) {
        rule.rddId._id = ids[idCounter];
        idCounter++;
      }
    });

    delete this.rulesAdmin.__v; /* prevent bugs */

    if (this.rulesAdmin._id) {
      this._rulesAdminService
        .updateRulesAdmin(this.rulesAdmin, this.rulesAdmin._id)
        .subscribe(
          (savedRulesAdmin: any) => {
            this.createDiscountCode(savedRulesAdmin.createdId);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this._rulesAdminService.createRulesAdmin(this.rulesAdmin).subscribe(
        (savedRulesAdmin: any) => {
          this.createDiscountCode(savedRulesAdmin.createdId);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  createDiscountCode(rulesAdminId: string) {
    const { 
      name,
      active,
      have_discount,
      have_delivery_discount,
      coupon_discount_type,
      coupon_discount_amount,
      max_coupon_discount_amount,
      delivery_discount_type,
      delivery_discount_amount,
      max_delivery_discount_amount
    } = this.discountCodeForm.value;

    const products = [];
    this.productList.forEach((product, index) => {
      products.push({
        productId: product._id,
        price: this.discountCodeForm.controls["products"].value[index].price
      });
    });

    this.codeList.map(e => {
      console.log(e)
      e.target_type = e.target_type._id ? e.target_type._id : e.target_type
      /* delete e.name_entity */
    })

    const data: any = {
      name,
      active,
      have_discount,
      have_delivery_discount,
      rules_admin: rulesAdminId,
      coupons: this.codeList,
    };

    if(data.have_discount) {
      data.coupon_discount_type = coupon_discount_type
      data.coupon_discount_amount = coupon_discount_amount
      data.max_coupon_discount_amount = max_coupon_discount_amount
    }
    if(data.have_delivery_discount) {
      data.delivery_discount_type = delivery_discount_type
      data.delivery_discount_amount = delivery_discount_amount
      data.max_delivery_discount_amount = max_delivery_discount_amount
    }

    if (this.idDiscountCode) {
      this._discountCodeService
        .updateDiscountCode(data, this.idDiscountCode)
        .subscribe((savedDiscountCode: any) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Código de descuento",
            "El código de descuento ha sido actualizado correctamente",
            "ok"
          );
          this.router.navigate(["/system/discount-code"]);
        },
        (error) => {
          this.showSummaryCoupon = true
          this.listResultCoupon = error.error.infoSend.listProcess
          console.log(error)
          this._middleService.sendMessage(
            "Código de descuento",
            error.error.message,
            "error"
          );
          this._middleService.sendLoading(false);
        });
    } else {
      this._discountCodeService
        .createDiscountCode(data)
        .subscribe((savedDiscountCode: any) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Código de descuento",
            "El código de descuento ha sido creado correctamente",
            "ok"
          );
          this.router.navigate(["/system/discount-code"]);
        },
        (error) => {
          this._middleService.sendMessage(
            "Código de descuento",
            error.error.message,
            "error"
          );
          this._middleService.sendLoading(false);
        });
    }
  }

  ngOnDestroy() {
    this._rulesDispatcherService.deleteRulesAdmin();
    this.rulesAdminChangedSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
