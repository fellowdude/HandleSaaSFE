import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, fakeAsync, tick } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule  } from '@angular/common/http/testing';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { SearchInArrayPipe } from '../../../shared/pipe/search-in-array.pipe';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { FieldValuePipe } from '../../../shared/pipe/field-value.pipe';
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { HeaderService } from '../../components/header/header.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { RulesAdminService } from 'src/app/shared/service/rules-admin.service';
import { RulesDispatcherService } from 'src/app/shared/service/rules-dispatcher.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { SupplierService } from 'src/app/shared/service/supplier.service';
import { DiscountRuleService } from 'src/app/shared/service/discount-rule.service';
import { SupplierMethodSendService } from "src/app/shared/service/supplier-method-send.service";
import { CategoryService } from 'src/app/shared/service/category.service';
import { GridComponent } from '../../components/grid/grid.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox' 
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs'
import { FamilyProductService } from 'src/app/shared/service/family-product.service'; 
import { ProductComponent } from '../product.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let router : Router;
  let route: ActivatedRoute;
  let middleService: MiddleService;
  let headerService: HeaderService;
  let serviceProduct: ProductService;
  let rulesDispatcherService: RulesDispatcherService;
  let rulesAdminService: RulesAdminService;
  let discountRuleService: DiscountRuleService;
  let ldvService: LdvService;
  let serviceSupplier: SupplierService;
  let serviceMethod: SupplierMethodSendService;
  let categoryService: CategoryService;
  let serviceFamily: FamilyProductService;
  let serviceLdv: LdvService;
  let serviceCategory: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductComponent, SearchInArrayPipe, GridComponent, FieldValuePipe, DialogConfirmComponent, ProductComponent ],
      imports: [ FormsModule, ReactiveFormsModule, BrowserAnimationsModule, 
        HttpClientTestingModule, FroalaEditorModule, FroalaViewModule, MatAutocompleteModule, MatTooltipModule, MatSlideToggleModule, 
        MatSelectModule, MatCheckboxModule, MatInputModule,
        RouterTestingModule.withRoutes([ {path: "system/product", component: ProductComponent }]) ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    headerService = TestBed.get(HeaderService);
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    middleService = TestBed.get(MiddleService);
    serviceProduct = TestBed.get(ProductService);
    rulesDispatcherService = TestBed.get(RulesDispatcherService);
    rulesAdminService = TestBed.get(RulesAdminService);
    discountRuleService = TestBed.get(DiscountRuleService);
    ldvService = TestBed.get(LdvService);
    serviceSupplier = TestBed.get(SupplierService);
    serviceMethod = TestBed.get(SupplierMethodSendService);
    categoryService = TestBed.get(CategoryService);
    serviceFamily = TestBed.get(FamilyProductService);
    serviceLdv = TestBed.get(LdvService);
    serviceCategory = TestBed.get(CategoryService);
  });

  it('Deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia la propiedad imagePositionMobile comenzar en 1', () => {
    expect(component.imagePositionMobile).toEqual(1);
  });

  it('Deberia la propiedad url_attachment ser igual a localStorage.getItem("url_attachment")', () => {
    expect(component.url_attachment).toEqual(localStorage.getItem("url_attachment"));
  });

  it('Deberia la propiedad lisAddPicture ser igual a un arreglo vacio', () => {
    expect(component.lisAddPicture).toEqual([]);
  });

  it('Deberia la propiedad lisMainAddPicture ser igual a un arreglo vacio', () => {
    expect(component.lisMainAddPicture).toEqual([]);
  });

  it('Deberia la propiedad lisBannerAddPicture ser igual a un arreglo vacio', () => {
    expect(component.lisBannerAddPicture).toEqual([]);
  });

  it('Deberia la propiedad listDetailProduct ser igual a un arreglo vacio', () => {
    expect(component.listDetailProduct).toEqual([]);
  });

  it('Deberia la propiedad lisBannerLogoAddPicture ser igual a un arreglo vacio', () => {
    expect(component.lisBannerLogoAddPicture).toEqual([]);
  });

  it('Deberia la propiedad listChangetMethodDetail ser igual a un arreglo vacio', () => {
    expect(component.listChangetMethodDetail).toEqual([]);
  });

  it('Deberia la propiedad listCategory ser igual a un arreglo vacio', () => {
    expect(component.listCategory).toEqual([]);
  });

  it('Deberia la propiedad listCategoryChange ser igual a un arreglo vacio', () => {
    expect(component.listCategoryChange).toEqual([]);
  });

  it('Deberia la propiedad selectCategory ser igual a un arreglo vacio', () => {
    expect(component.selectCategory).toEqual([]);
  });

  it('Deberia la propiedad selectChangeCategory ser igual a un arreglo vacio', () => {
    expect(component.selectChangeCategory).toEqual([]);
  });

  it('Deberia la propiedad discountTypes ser igual a un arreglo vacio', () => {
    expect(component.discountTypes).toEqual([]);
  });

  it('Deberia la propiedad approve_user ser igual a false', () => {
    expect(component.approve_user).toBeFalsy();
  });

  it('Deberia llarmarse al metodo subscribe de route.params', () => {
    let spy = spyOn(route.params,"subscribe").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia la propiedad existChange ser igual a {}', () => {
    expect(component.existChange).toEqual({});
  });

  it('Deberia la propiedad infoSelectMethod ser igual a un arreglo vacio', () => {
    expect(component.infoSelectMethod).toEqual([]);
  });

  it('Deberia la propiedad selectMethodDetail ser igual a un arreglo vacio', () => {
    expect(component.selectMethodDetail).toEqual([]);
  });

  it('Deberia la propiedad listMethodChange ser igual a null', () => {
    expect(component.listMethodChange).toBeNull();
  });

  it('Deberia la propiedad previewStock ser igual a 0 despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.previewStock).toEqual(0);
  });

  it('Deberia el metodo sendTitle de headerService ejecutarse despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Catálogo de Productos");
  });

  it('Deberia la propiedad switchNewData ser igual a false despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.switchNewData).toBeFalsy();
  });

  it('Deberia la propiedad listCategoriesFilter ser igual a un arreglo vacio despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.listCategoriesFilter).toEqual([]);
  });

  it('Deberia la propiedad duplicateSKU ser igual a false despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.duplicateSKU).toBeFalsy();
  });
  
  it('Deberia la propiedad duplicatePACK ser igual a false despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.duplicatePACK).toBeFalsy();
  });
  
  it('Deberia la propiedad listAddSku ser igual a un arreglo vacio despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.listAddSku).toEqual([]);
  });
  
  it('Deberia la propiedad listAddPack ser igual a un arreglo vacio despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.listAddPack).toEqual([]);
  });

  it('Deberia la propiedad listSKUProduct ser igual a un arreglo vacio despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.listSKUProduct).toEqual([]);
  });

  it('Deberia la propiedad listProductPack ser igual a un arreglo vacio despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.listProductPack).toEqual([]);
  });

  it('Deberia la propiedad headerFixed ser igual a false despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.headerFixed).toBeFalsy();
  });

  it('Deberia la propiedad infoCompare ser igual a {} despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.infoCompare).toEqual({});
  });

  it('Deberia la propiedad headerRuleFixed ser igual a false despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.headerRuleFixed).toBeFalsy();
  });

  it('Deberia llamarse al metodo subscribe() de router.events despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(router.events, "subscribe").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia la propiedad routerSubscription ser del tipo Subscription despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.routerSubscription).toEqual(jasmine.any(Subscription));
  });

  it('Deberia la propiedad productForm ser del tipo FormGroup despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.productForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia la propiedad submitted ser igual a false despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.submitted).toBeFalsy();
  });

  it('Deberia ejecutarse el metodo showRulesAdminGridF() despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "showRulesAdminGridF").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo validSupplier() despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "validSupplier").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo getBasicInfo() despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "getBasicInfo").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo onChanges() despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "onChanges").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo getListGroup() despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "getListGroup").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo getDiscountTypes() despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "getDiscountTypes").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo getDataProduct() si existe un idProduct despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "getDataProduct").and.callThrough();

    component.idProduct = '1';

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo subscribe() de rulesDispatcherService.rulesAdminChanged despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(rulesDispatcherService.rulesAdminChanged, "subscribe").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia la propiedad rulesAdminChangedSubscription ser del tipo Subscription despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.rulesAdminChangedSubscription).toEqual(jasmine.any(Subscription));
  });

  it('Deberia existir el metodo get f()', () => {
    let spyprop = spyOnProperty(component, "f", "get").and.callThrough();

    expect(spyprop).toBeTruthy();
  });
  
  it('Deberia la propiedad showOptions ser igual a "true" despues de ejecutarse unmountRulesAdminAndShowOptions()', () => {
    component.unmountRulesAdminAndShowOptions();

    expect(component.showOptions).toBeTruthy();
  });

  it('Deberia la propiedad showRulesAdminForm ser igual a "false" despues de ejecutarse unmountRulesAdminAndShowOptions()', () => {
    component.unmountRulesAdminAndShowOptions();

    expect(component.showRulesAdminForm).toBeFalsy();
  });

  it('Deberia la propiedad headerRuleFixed ser igual al parametro "$event" despues de ejecutarse switchModal()', () => {
    let mockevent: any;

    component.switchModal(mockevent);

    expect(component.headerRuleFixed).toEqual(mockevent);
  });

  it('Deberia la propiedad columns de gridListRulesAdmin ser igual a "mockcolumns" despues de ejecutarse showRulesAdminGridF()', () => {
    let mockcolumns = [
      {
        field: "name",
        title: "Administrador de reglas de descuento",
        type: "text"
      }
    ];
    
    component.showRulesAdminGridF();

    expect(component.gridListRulesAdmin.columns).toEqual(mockcolumns);
  });

  it('Deberia la propiedad pagQuantity de gridListRulesAdmin.config ser igual a "20" despues de ejecutarse showRulesAdminGridF()', () => {
    component.showRulesAdminGridF();

    expect(component.gridListRulesAdmin.config.pagQuantity).toEqual(20);
  });

  it('Deberia la propiedad getService de gridListRulesAdmin.config ser igual a "/rules-admin/search" despues de ejecutarse showRulesAdminGridF()', () => {
    component.showRulesAdminGridF();

    expect(component.gridListRulesAdmin.config.getService).toEqual("/rules-admin/search");
  });

  it('Deberia la propiedad redirectId de gridListRulesAdmin.config ser igual a "true" despues de ejecutarse showRulesAdminGridF()', () => {
    component.showRulesAdminGridF();

    expect(component.gridListRulesAdmin.config.redirectId).toBeTruthy();
  });

  it('Deberia la propiedad entity de gridListRulesAdmin.config ser igual a "Administrador de reglas de descuento" despues de ejecutarse showRulesAdminGridF()', () => {
    component.showRulesAdminGridF();

    expect(component.gridListRulesAdmin.config.entity).toEqual("Administrador de reglas de descuento");
  });

  it('Deberia existir el metodo getRulesAdminId($event)', () => {
    let spy = spyOn(component, "getRulesAdminId").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia el metodo sendLoading() de middleService llamarse despues de ejecutarse getRulesAdminId()', () => {
    let mockevent = {field: true};
  
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.getRulesAdminId(mockevent);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia la propiedad showRulesAdminForm ser igual a "true" despues de ejecutarse getRulesAdminId()', () => {
    let mockevent = {field: true};

    component.getRulesAdminId(mockevent);

    expect(component.showRulesAdminForm).toBeTruthy();
  });

  it('Deberia la propiedad showRulesAdminGrid ser igual a "false" despues de ejecutarse getRulesAdminId()', () => {
    let mockevent = {field: true};

    component.getRulesAdminId(mockevent);

    expect(component.showRulesAdminGrid).toBeFalsy();
  });

  it('Deberia la propiedad showRulesAdminGrid ser igual a "true" despues de ejecutarse getRulesAdminId()', () => {
    let mockevent = {field: true};

    component.getRulesAdminId(mockevent);

    expect(component.editRulesAdmin).toBeTruthy();
  });

  it('Deberia la propiedad showRulesAdminForm ser "true" despues de ejecutarse toggleShowRulesAdminForm()', () => {
    component.toggleShowRulesAdminForm();

    expect(component.showRulesAdminForm).toBeTruthy();
  });

  it('Deberia la propiedad showRulesAdminGrid ser "false" despues de ejecutarse toggleShowRulesAdminForm()', () => {
    component.toggleShowRulesAdminForm();

    expect(component.showRulesAdminGrid).toBeFalsy();
  });

  it('Deberia la propiedad showOptions ser "false" despues de ejecutarse toggleShowRulesAdminForm()', () => {
    component.toggleShowRulesAdminForm();

    expect(component.showOptions).toBeFalsy();
  });

  xit('xDeberia existir el metodo toggleShowRulesAdminGrid()', () => {
    let spy = spyOn(component, "toggleShowRulesAdminGrid").and.callThrough();
    
    expect(spy).toBeTruthy();
  });

  it('Deberia llamarse al metodo show() de dialogConfirm despues de ejecutarse deleteRulesAdminF()', () => {
    const mocktitle = "Administrador de reglas de descuento";
    const mockmessageModal = "Perderá los cambios recientes ¿Desea continuar?";

    let spy = spyOn(component.dialogConfirm,"show").and.callThrough();

    component.deleteRulesAdminF();

    expect(spy).toHaveBeenCalledWith(mocktitle, mockmessageModal, null, "rulesAdmin");
  });

  it('Deberia llamarse al metodo updateManyDiscountRules() de discountRuleService despues de ejecutarse updateExistingDiscountRules()', () => {
    let mockrdds: any[];

    let spy = spyOn(discountRuleService, "updateManyDiscountRules").and.callThrough();

    component.updateExistingDiscountRules(mockrdds);

    expect(spy).toHaveBeenCalledWith(mockrdds);
  });

  it('Deberia estar definido el metodo saveRulesAdmin()', () => {
    let spy = spyOn(component, "saveRulesAdmin").and.callThrough();

    expect(spy).toBeTruthy();
  });
  
  it('Deberia llamar al metodo updateRulesAdmin() de rulesAdminService si existe un _id despues de ejecutarse saveRulesAdmin()', () => {
    let mockdataSend: any;
    let mockids: string[];

    component.rulesAdmin = {_id: "5e626269397a102560d4cbf5", name: "Administrador de Reglas Test",
    rules: [{_id: "5e8370d88490f72ae9c099c0", operator: null, rddId: {_id: "5e53132a0226fc2ee43d5b5c", 
    name: "Regla de descuento fecha", values: ["2020-02-26T05:00:00.000Z", "2020-05-08T04:59:59.059Z"],
    tipo: {_id: "5e277aeb92329d1760c4c3bc", code: "TYPE-RDD", value: "Fecha"}, tenant: "207033693952",
    created_by: "5e25c6b783bff84b68d253cd", create_date: "2020-02-24T00:04:58.130Z",
    __v: 1}}], tenant: "207033693952", created_by: "5e25c6b783bff84b68d253cd", 
    create_date: "2020-03-06T14:47:05.113Z", __v: 174};
    
    let spy = spyOn(rulesAdminService, "updateRulesAdmin").and.callThrough();

    component.saveRulesAdmin(mockdataSend, mockids);

    expect(spy).toHaveBeenCalledWith(component.rulesAdmin, component.rulesAdmin._id);
  });

  it('Deberia llamar al metodo createRulesAdmin() de rulesAdminService si NO existe un _id despues de ejecutarse saveRulesAdmin()', () => {
    let mockdataSend: any;
    let mockids: string[];
    component.rulesAdmin = {_id: false, name: "Administrador de Reglas Test",
    rules: [{_id: "5e8370d88490f72ae9c099c0", operator: null, rddId: {_id: "5e53132a0226fc2ee43d5b5c", 
    name: "Regla de descuento fecha", values: ["2020-02-26T05:00:00.000Z", "2020-05-08T04:59:59.059Z"],
    tipo: {_id: "5e277aeb92329d1760c4c3bc", code: "TYPE-RDD", value: "Fecha"}, tenant: "207033693952",
    created_by: "5e25c6b783bff84b68d253cd", create_date: "2020-02-24T00:04:58.130Z",
    __v: 1}}], tenant: "207033693952", created_by: "5e25c6b783bff84b68d253cd", 
    create_date: "2020-03-06T14:47:05.113Z", __v: 174};

    let spy = spyOn(rulesAdminService, "createRulesAdmin").and.callThrough();

    component.saveRulesAdmin(mockdataSend, mockids);

    expect(spy).toHaveBeenCalledWith(component.rulesAdmin);
  });

  xit('xDeberia existir el metodo selectDiscountType()', () => {
    expect(component.selectDiscountType).toBeTruthy();
  });

  it('Deberia llamarse al metodo getLdvDetail() de ldvService despues de ejecutarse getDiscountTypes()', () => {
    let spy = spyOn(ldvService, "getLdvDetail").and.callThrough();
    
    component.getDiscountTypes();

    expect(spy).toHaveBeenCalledWith("DISCOUNT_TYPE");
  });

  it('Deberia llamarse al metodo validIsSupplier() de serviceSupplier despues de ejecutarse validSupplier()', () => {
    let spy = spyOn(serviceSupplier, "validIsSupplier").and.callThrough();

    component.validSupplier();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo sendMessage() de middleService si hubiera algun error despues de ejecutarse validIsSupplier() de serviceSupplier en validSupplier()', () => {
    spyOn(serviceSupplier, "validIsSupplier").and.returnValue(throwError({error: 'error'}));
    let spy = spyOn(middleService,"sendMessage").and.callThrough();

    component.validSupplier();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "search_sku" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("search_sku");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "search_pack" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("search_pack");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "name" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("name");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "supplier_delivery" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("supplier_delivery");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "supplier" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("supplier");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "group" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("group");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "active_discount" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("active_discount");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "stock" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("stock");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "price" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("price");
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro "special_price" despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.productForm,"get").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalledWith("special_price");
  });

  it('Deberia llamarse al metodo push() añadiendo un objeto a la propiedad listDetailProduct despues de ejecutarse addDetail()', () => {
    let objeto = [{ title: "", description: "" }];

    component.addDetail();

    expect(component.listDetailProduct).toEqual(objeto);
  });

  it('Deberia existir el metodo acceptModal()', () => {
    let spy = spyOn(component, "acceptModal").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia llamar al metodo deleteRulesAdmin() de rulesDispatcherService si event.accept es verdadero y event.entity es igual a "rulesAdmin" despues de ejecutarse acceptModal()', () => {
    let mockevent = {accept: true, entity: "rulesAdmin"};

    let spy = spyOn(rulesDispatcherService, "deleteRulesAdmin").and.callThrough();

    component.acceptModal(mockevent);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamar al metodo deletItem() si event.accept es verdadero y event.entity NO es igual a "rulesAdmin" despues de ejecutarse acceptModal()', () => {
    let mockevent = {accept: true, entity: "norulesAdmin"};

    let spy = spyOn(component, "deletItem").and.callThrough();

    component.acceptModal(mockevent);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo get() de productForm con el parametro list_method despues de ejecutarse addMethod()', () => {
    component.listMethod = ["method 1", "method 2"];

    let spy = spyOn(component.productForm, "get").and.callThrough();
    
    component.addMethod();

    expect(spy).toHaveBeenCalledWith("list_method");
  });

  it('Deberia llamarse al metodo searchMethodDetail() despues de ejecutarse addMethod()', () => {
    component.listMethod = ["method 1", "method 2"];

    let spy = spyOn(component, "searchMethodDetail").and.callThrough();

    component.addMethod();

    expect(spy).toHaveBeenCalledWith("selectMethodDetail", component.productForm.get("list_method").value);
  });

  it('Deberia llamarse al metodo closeSelectMehod() despues de ejecutarse addMethod()', () => {
    component.listMethod = ["method 1", "method 2"];
    
    let spy = spyOn(component, "closeSelectMehod").and.callThrough();

    component.addMethod();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo removeMethod()', () => {
    let spy = spyOn(component, "removeMethod").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia llamarse 2 veces el metodo get() de productForm con el parametro "list_method" despues de ejecutarse removeMethod()', () => {
    let mockid: any;
    let value = ["Method 1", "Method 2", "Method 3"];

    component.selectMethodDetail = ["Detail 1", "Detail 2", "Detail 3"];
    component.listMethod = ["Method 1", "Method 2", "Method 3"];
    component.productForm.get("list_method").setValue(value);
    

    let spy = spyOn(component.productForm, "get").and.callThrough();

    component.removeMethod(mockid);

    expect(spy).toHaveBeenCalledWith("list_method");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('Deberia existir el metodo searchMethodDetail()', () => {
    let spy = spyOn(component, "searchMethodDetail").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ser un arreglo vacio this[variable] despues de ejecutarse searchMethodDetail()', () => {
    let mockvariable: any;
    let mockarrayData = ["Data 1", "Data 2", "Data 3"];

    component.listMethod = ["Method 1", "Method 2", "Method 3"];

    component.searchMethodDetail(mockvariable, mockarrayData);

    expect(component[mockvariable]).toEqual([]);
  });

  it('Deberia llamar al metodo answerRequest() con el parametro "approve" despues de ejecutarse acceptRequest()', () => {
    let spy = spyOn(component, "answerRequest").and.callThrough();

    component.acceptRequest();

    expect(spy).toHaveBeenCalledWith("approve");
  });

  it('Deberia llamar al metodo answerRequest() con los parametros ""deny", messageDeny" si denyMessage es true, despues de ejecutarse denyRequest()', () => {
    let mockmessageDeny: any;

    component.denyMessage = "true";

    let spy = spyOn(component, "answerRequest").and.callThrough();  

    component.denyRequest(mockmessageDeny);

    expect(spy).toHaveBeenCalledWith("deny", mockmessageDeny);
  });

  it('Deberia la propiedad showDenyMessage ser "falso" si denyMessage es true, despues de ejecutarse denyRequest()', () => {
    let mockmessageDeny: any;
    component.denyMessage = "true";

    component.denyRequest(mockmessageDeny);

    expect(component.showDenyMessage).toBeFalsy();
  });

  it('Deberia la propiedad showDenyMessage ser "false" despues de ejecutarse closeMessageDeny()', () => {
    component.closeMessageDeny();

    expect(component.showDenyMessage).toBeFalsy();
  });

  it('Deberia la propiedad denyMessage ser "null" despues de ejecutarse openMessageDeny()', () => {
    component.openMessageDeny();

    expect(component.denyMessage).toBeNull();
  });

  it('Deberia la propiedad shoDenyMessage ser "true" despues de ejecutarse openMessageDeny()', () => {
    component.openMessageDeny();

    expect(component.showDenyMessage).toBeTruthy();
  });

  it('Deberia llamarse al metodo searchMethodDetail() si listMethod es true, despues de ejecutarse methodSelect()', () => {
    let value = ["Method 1", "Method 2", "Method 3"];
    
    component.listMethod = ["Method 1", "Method 2", "Method 3"];
    component.productForm.get("list_method").setValue(value);

    let spy = spyOn(component, "searchMethodDetail").and.callThrough();

    component.methodSelect();

    expect(spy).toHaveBeenCalledWith("selectMethodDetail", component.productForm.get("list_method").value);
  });

  it('Deberia llamarse al metodo searchMethodDetail() si existe listMethod y listMethodChange despues de ejecutarse MethodSelect()', () => {
    component.listMethodChange = ["Mock 1", "Mock 2", "Mock 3"];
    component.listMethod = ["Method 1", "Method 2", "Method 3"];

    let spy = spyOn(component, "searchMethodDetail").and.callThrough();

    component.methodSelect();

    expect(spy).toHaveBeenCalledWith("listChangetMethodDetail", component.listMethodChange);
  });

  it('Deberia llamarse al metodo sendLoading() de middleService despues de ejecutarse getMethodSupplier()', () => {
    let mockval: any;

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.getMethodSupplier(mockval);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo searchBySupplier() de serviceMethod despues de ejecutarse getMethodSupplier()', () => {
    let mockval: any;

    let spy = spyOn(serviceMethod, "searchBySupplier").and.callThrough();

    component.getMethodSupplier(mockval);

    expect(spy).toHaveBeenCalledWith(mockval);
  });
  
  it('Deberia existir el metodo updateSelectMethodSelect()', () => {
    let spy = spyOn(component, "updateSelectMethodSelect").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia el parametro enviado listMehotd ser "true" si found es mayor o igual que 0, despues de ejecutar updateSelectMethodSelect()', () => {
    let mocklistMethod = [{_id: "metodo 1", name: "Visa", select: false}, {_id: "metodo 2", name: "visa", select: false}];

    component.productForm.get("list_method").setValue(["metodo 1"]);

    component.updateSelectMethodSelect(mocklistMethod);

    expect(mocklistMethod[0].select).toBeTruthy();
  });

  it('Deberia retornar el objeto enviado como parametro, despues de ejecutar updateSelectMethodSelect()', () => {
    let mocklistMethod = [{_id: "metodo 1", name: "Visa", select: false}, {_id: "metodo 2", name: "visa", select: false}];

    component.productForm.get("list_method").setValue(["metodo 3"]);

    let result = component.updateSelectMethodSelect(mocklistMethod);

    expect(result).toBe(mocklistMethod);
  });

  it('Deberia llamarse al metodo sendLoading() de middleService despues de ejecutarse answerRequest()', () => {
    let mockanswer, mockmessageDeny: any;

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.answerRequest(mockanswer, mockmessageDeny);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo answerRequest() de serviceProduct despues de ejecutarse answerRequest', () => {
    let answer, messageDeny: any;

    component.idProduct = "123";
    answer = "respuesta";
    messageDeny= "mensaje denegado"; 

    let spy = spyOn(serviceProduct, "answerRequest").and.callThrough();

    component.answerRequest(answer, messageDeny);

    expect(spy).toHaveBeenCalledWith(component.idProduct, { answer, messageDeny });
  });
  it('Deberia llamarse al metodo sho() de dialogConfirm despues de ejecutarse confirmDeleteItem()', () => {
    let mockidItem: any;
 
    let spy = spyOn(component.dialogConfirm, "show").and.callThrough();

    component.confirmDeleteItem(mockidItem);

    expect(spy).toHaveBeenCalledWith("Eliminar Producto", "¿Esta seguro de eliminar?");
  });

  it('Deberia existir el metodo deleteDetail()', () => {
    let spy = spyOn(component, "deleteDetail").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia reducirse en 1 el tamaño de listDetailProduct despues de ejecutarse deleteDetail()', () => {
    let mockposition = 1;

    component.listDetailProduct = ["detail 1", "detail 2"];
    let lenlistdetailProduct = component.listDetailProduct.length;

    component.deleteDetail(mockposition);

    expect(component.listDetailProduct.length).toEqual(lenlistdetailProduct - 1);
  });

  it('Deberia ejecutarse el metodo sendLoading() de middleService despues de ejecutarse deletItem()', () => {
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.deletItem();

    expect(spy).toHaveBeenCalledWith(true);
  });
  
  it('Deberia ejecutarse el metodo delete() de serviceProduct despues de ejecutarse deletItem()', () => {
    component.idProduct = "123";

    let spy = spyOn(serviceProduct, "delete").and.callThrough();

    component.deletItem();

    expect(spy).toHaveBeenCalledWith(component.idProduct);
  });

  it('Deberia ejecutarse el metodo sendLoading() de middleService despues de ejecutarse getDataProduct()', () => {
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.getDataProduct();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia ejecutarse el metodo getById() de serviceProduct despues de ejecutarse getDataProduct()', () => {
    component.idProduct = "123";

    let spy = spyOn(serviceProduct, "getById").and.callThrough();

    component.getDataProduct();

    expect(spy).toHaveBeenCalledWith(component.idProduct);
  });

  it('Deberia existir el metodo async arrayPackProduct()', () => {
    let spy = spyOn(component, "arrayPackProduct").and.callThrough();

    expect(spy).toBeTruthy();
  });

  xit('xDeberia existir el metodo async fillInfoProduct()', () => {
    let spy = spyOn(component, "fillInfoProduct").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia existir el metodo displayFilters($event)', () => {
    let spy = spyOn(component, "displayFilters").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ser selectCategory igual a [...this.selectCategory, $event._id], si index es igual a -1, despues de ejecutar displayFilters()', () => {
    let mockevent = { _id: 1, filters: ["filtro 1", "filtro 2"]};
    
    component.selectCategory = ["categoria 1", "categoria 2"];

    let result = [...component.selectCategory, mockevent._id];

    component.displayFilters(mockevent);
    
    expect(component.selectCategory).toEqual(result);
  });

  it('Deberia reducirse el tamaño en la cantidad de filtros que tenga el parametro $event de la propiedad this.listCategoriesFilter, si index es diferente de -1, despues de ejecutar displayFilters()', () => {
    let mockevent = { _id: "categoria 1", filters: [{_id: "id1"}, {_id: "id2"}]};
    
    component.selectCategory = ["categoria 1", "categoria 2"];
    component.listCategoriesFilter = [{_id: "id1"}, {_id: "id2"}];

    let lenlistCategoriesFilter = component.listCategoriesFilter.length;
    let leneventfilters = mockevent.filters.length;

    component.displayFilters(mockevent);
    
    expect(component.listCategoriesFilter.length).toBe(lenlistCategoriesFilter - leneventfilters);
  });

  it('Deberia reducirse en 1 el tamaño de la propiedad this.selectCategory, si index es diferente de -1, despues de ejecutar displayFilters()', () => {
    let mockevent = { _id: "categoria 1", filters: [{_id: "id1"}, {_id: "id2"}]};
    
    component.selectCategory = ["categoria 1", "categoria 2"];
    component.listCategoriesFilter = [{_id: "id1"}, {_id: "id2"}];

    let lenselectCategory = component.selectCategory.length;

    component.displayFilters(mockevent);
    
    expect(component.selectCategory.length).toBe(lenselectCategory - 1);
  });

  it('Deberia llamarse al metodo getCategoriesFiltersByCategoryArray() de categoryService, despues de ejecutarse displayFilters()', () => {
    let mockevent = { _id: 1, filters: ["filtro 1", "filtro 2"]};
    
    component.selectCategory = ["categoria 1", "categoria 2"];

    let spy = spyOn(categoryService, "getCategoriesFiltersByCategoryArray").and.callThrough();

    component.displayFilters(mockevent);
    
    expect(spy).toHaveBeenCalledWith(component.selectCategory);
  });

  it('Deberia existir el metodo sendImageCompare()', () => {
    let spy = spyOn(component, "sendImageCompare").and.callThrough();

    expect(spy).toBeTruthy()
  });

  it('Deberia modificar this[componentName].config con los parametros enviados, despues de ejecutar sendImageCompare', () => {
    let mockarrayActually = [1,2,3];
    let mockarrayChange = [1, 2];
    let mockcomponentName = "productos";
    let result =  {config: {
      arrayActually: [1,2,3], arrayChange: [1,2]
    }}

    component[mockcomponentName] = {config: {arrayActually: [], arrayChange: []}};

    component.sendImageCompare(mockarrayActually, mockarrayChange, mockcomponentName);

    expect(component[mockcomponentName].config).toEqual(result.config)
  });

  it('Deberia llamarse al metodo getMethodSupplier() despues de ejecutarse selectMehod()', () => {
    let values = ["mock 1", "mock 2", "mock 3"];

    component.productForm.get("supplier_delivery").setValue(values);

    let spy = spyOn(component, "getMethodSupplier").and.callThrough();

    component.selectMehod();

    expect(spy).toHaveBeenCalledWith(component.productForm.get("supplier_delivery").value)
  });

  it('Deberia la propiedad openSelectMehod "true" despues de ejecutarse selectMehod()', () => {
    let values = ["mock 1", "mock 2", "mock 3"];

    component.productForm.get("supplier_delivery").setValue(values);

    component.selectMehod();

    expect(component.openSelectMehod).toBeTruthy();
  });

  it('Deberia la propiedad openSelectMehod "false" despues de ejecutarse closeSelectMehod()', () => {
    component.closeSelectMehod();

    expect(component.openSelectMehod).toBeFalsy();
  });

  it('Deberia existir el metodo setImageCompare()', () => {
    let spy = spyOn(component, "setImageCompare").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia llamar al metodo getListCategoryGroup despues de ejecutarse getListGroup()', () => {
    let spy = spyOn(categoryService, "getListCategoryGroup").and.callThrough();

    component.getListGroup();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia la propiedad embeddedMessage el valor message de event despues de ejecutarse configureMessage()', () => {
    let mockevent = {
      message: "mensaje", value: true
    };

    component.configureMessage(mockevent);

    expect(component.embeddedMessage).toEqual(mockevent.message);
  });

  it('Deberia la propiedad rulesAdminSaved el valor value de event despues de ejecutarse configureMessage()', () => {
    let mockevent = {
      message: "mensaje", value: true
    };

    component.configureMessage(mockevent);

    expect(component.rulesAdminSaved).toBe(mockevent.value);
  });

  it('Deberia llamarse al metodo continueProductSave() despues de ejecutarse getReason()', () => {
    let mockevent: any;

    let spy = spyOn(component, "continueProductSave").and.callThrough();

    component.getReason(mockevent);

    expect(spy).toHaveBeenCalledWith(mockevent);
  });

  xit('xDeberia existir el metodo async createProduct()', () => {
    let spy = spyOn(component, "createProduct").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia la propiedad submitted ser "true" despues de ejecutarse continueProductSave()', () => {
    let mockreason: any;

    component.continueProductSave(mockreason);

    expect(component.submitted).toBeTruthy();
  });

  it('Deberia llamarse sendLoading() de middleService si productForm.invalid es false despues de ejecutarse continueProductSave()', () => {
    let mockreason: any;

    component.productForm.setValue({
      active: false, featured: false, type: "Producto", is_pack: false, currency: "Soles", supplier: "Audi", 
      supplier_delivery: "Audi", brand: "Audi", group: "null", name: "name123", model_product: "modelo", list_method: [], 
      detail_list: null, videos_link: "", url_nm_travel: "", taxBuy: "Si", taxSent: "Si", price: "100", special_price: "90", 
      special_offer: "", show_special_offer: null, initial_date_offer: "", end_date_offer: "", stock: 0, SKU: "", 
      show_in_stock_out: false, last_unit: false, search_sku: "", search_pack: "", friendly_url: "name123", title: "titulo ceo",
      meta_description: "meta ceo", filter_values: null, active_discount: false, type_discount: null, discount_amount: null });

    component.productForm.setErrors(null);

    fixture.detectChanges();

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.continueProductSave(mockreason);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamar al metodo sendMessage() de middleService si product.invalid es true, despues de ejecutarse continueProductSave()', () => {
    let mockreason: any;

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    component.continueProductSave(mockreason);

    expect(spy).toHaveBeenCalledWith("Producto", "Revise los campos obligatorios", "error");
  });

  it('Deberia el valor de dataSend["rules_admin"] igual a rulesAdminId si rulesAdminId es "true" despues de ejecutarse saveProduct()', () => {
    let mockdataSend: any;
    let mockrulesAdminId: string;

    mockdataSend = { rules_admin: "", active_discount: true };
    mockrulesAdminId = "123";

    component.saveProduct(mockdataSend, mockrulesAdminId);

    expect(mockdataSend["rules_admin"]).toEqual(mockrulesAdminId);
    expect(mockdataSend["active_discount"]).toBeTruthy();
  });

  it('Deberia el valor de dataSend["rules_admin"] igual a rulesAdminId si rulesAdminId es "false" despues de ejecutarse saveProduct()', () => {
    let mockdataSend: any;
    let mockrulesAdminId: string;

    mockdataSend = { rules_admin: "", active_discount: true };
    mockrulesAdminId = "";

    component.saveProduct(mockdataSend, mockrulesAdminId);

    expect(mockdataSend["rules_admin"]).toBeNull();
    expect(mockdataSend["active_discount"]).toBeFalsy();
  });

  it('Deberia llamarse al metodo update() de serviceProduct si existe idProduct despues de ejecutarse saveProduct()', () => {
    let mockdataSend: any;
    let mockrulesAdminId: string;

    mockdataSend = { rules_admin: "", active_discount: true };
    mockrulesAdminId = "";
    component.idProduct = "idProduct";

    let spy = spyOn(serviceProduct, "update").and.callThrough();

    component.saveProduct(mockdataSend, mockrulesAdminId);

    expect(spy).toHaveBeenCalledWith(component.idProduct, mockdataSend);
  });

  it('Deberia llamarse ala metodo saveProduct() de serviceProduct si no existe idProduct despues de ejecutarse saveProduct()', () => {
    let mockdataSend: any;
    let mockrulesAdminId: string;

    mockdataSend = { rules_admin: "", active_discount: true };
    mockrulesAdminId = "";
    component.idProduct = "idProduct";

    let spy = spyOn(serviceProduct, "update").and.callThrough();

    component.saveProduct(mockdataSend, mockrulesAdminId);

    expect(spy).toHaveBeenCalledWith(component.idProduct, mockdataSend);
  });

  it('Deberia llamarse al metodo recursiveCheckedCheck() si this.listCategory es true, despues de ejecutarse checkedCategory()', () => {
    component.listCategory = ["categoria 1", "categoria 2", "categoria 3"];
    component.selectCategory = ["categoria 1"];

    let spy = spyOn(component, "recursiveCheckedCheck").and.callThrough();

    component.checkedCategory();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo dataPictureSave($event)', () => {
    let spy = spyOn(component, "dataPictureSave").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ingresar en el primer if si selectMuti es true y hacer push de las imagenes, despues de ejecutar dataPictureSave()', () => {
    let mockevent = [{length: 1}]
    
    component.selectMuti = true;
    component.selectPicture = 1;
    component[component.selectPicture] = [{length: 1}];

    let lenselectPicture = component[component.selectPicture].length;

    component.dataPictureSave(mockevent);

    expect(component[component.selectPicture].length).toBe(lenselectPicture + mockevent.length);
  });

  
  it('Deberia ingresar en el primer if si selectMuti es false y hacer push de la imagen, despues de ejecutar dataPictureSave()', () => {
    let mockevent = [{length: 1}]
    
    component.selectMuti = false;
    component.selectPicture = 1;
    component[component.selectPicture] = [{length: 1}];

    let lenselectPicture = component[component.selectPicture].length;

    component.dataPictureSave(mockevent);

    expect(component[component.selectPicture].length).toBe(lenselectPicture + mockevent.length);
  });

  it('Deberia llamar al metodo splice() y reducir en 1 el tamaño de this[field] despues de ejecutarse deleteImage()', () => {
    let mockposition = 1;
    let mockfield = 1;

    component[mockfield] = ["Image 1", "image 2"];
    let len = component[mockfield].length;
  
    component.deleteImage(mockposition, mockfield);

    expect(component[mockfield].length).toEqual(len - 1);
  });

  it('Deberia la propiedad imagePositionMobile ser igual a this[field].length si position es mayor que this[field].length, despues de ejecutarse deleteImage()', () => {
    let mockposition = 1;
    let mockfield = 2;

    component[mockfield] = ["Image 1", "image 2"];

    component.deleteImage(mockposition, mockfield);

    expect(component.imagePositionMobile).toEqual(component[mockfield].length);
  });
  
  it('Deberia position ser igual a this[field].length si position es mayor que this[field].length, despues de ejecutarse deleteImage()', () => {
    let mockposition = 1;
    let mockfield = 2;

    component[mockfield] = ["Image 1", "image 2"];

    component.deleteImage(mockposition, mockfield);

    expect(mockposition).toBe(component[mockfield].length);
  });
  
  it('Deberia la propiedad imageShowSilder ser igual a this[field][this[field].length - this.imagePositionMobile], despues de ejecutarse deleteImage()', () => {
    let mockposition = 1;
    let mockfield = 2;

    component[mockfield] = ["Image 1", "image 2"];

    component.deleteImage(mockposition, mockfield);

    const result = component[mockfield][component[mockfield].length - component.imagePositionMobile];
    
    expect(component.imageShowSlider).toBe(result);
  });

  it('Deberia la propiedad imagePositionMobile ser igual a 1 si imagePositionMobile es mayor o igual que lisAddPicture.length, despues de ejecutarse nextImage()', () => {
    component.imagePositionMobile = 2;
    component.lisAddPicture.length = 1;

    component.nextImage();

    expect(component.imagePositionMobile).toEqual(1);
  });

  it('Deberia la propiedad imagePositionMobile incrementarse en 1 si imagePositionMobile NO es mayor o igual que lisAddPicture.length, despues de ejecutarse nextImage()', () => {
    component.imagePositionMobile = 1;
    component.lisAddPicture.length = 2;

    let resultvalueImagePositionMobile = component.imagePositionMobile + 1;
    
    component.nextImage();

    expect(component.imagePositionMobile).toBe(resultvalueImagePositionMobile);
  });

  it('Deberia la propiedad imageShowSlider ser igual a this.lisAddPicture[this.lisAddPicture.length - this.imagePositionMobile], despues de ejecutarse nextImage()', () => {
    component.imagePositionMobile = 1;
    component.lisAddPicture.length = 1;

    component.nextImage();

    const result = component.lisAddPicture[ component.lisAddPicture.length - component.imagePositionMobile ];

    expect(component.imageShowSlider).toBe(result);
  });

  it('Deberia la propiedad imagePositionMobile ser igual a this.lisAddPicture.length si imagePositionMobile es menor o igual a 1, despues de ejecutarse previousImage()', () => {
    component.imagePositionMobile = 1;
    component.lisAddPicture.length = 1;

    component.previousImage();

    const result = component.lisAddPicture.length;

    expect(component.imagePositionMobile).toBe(result);
  });

  it('Deberia la propiedad imagePositionMobile deincrementar en 1 si imagePositionMobile NO es menor o igual a 1, despues de ejecutarse previousImage()', () => {
    component.imagePositionMobile = 1;
    component.lisAddPicture.length = 0;

    let resultvalueimagePositionMobile = component.imagePositionMobile - 1;

    component.previousImage();

    expect(component.imagePositionMobile).toBe(resultvalueimagePositionMobile);
  });

  it('Deberia la propiedad imageShowSlider ser igual a this.lisAddPicture[this.lisAddPicture.length - this.imagePositionMobile], despues de ejecutarse previousImage()', () => {
    component.imagePositionMobile = 1;
    component.lisAddPicture.length = 1;

    component.previousImage();

    const result = component.lisAddPicture[ component.lisAddPicture.length - component.imagePositionMobile ]

    expect(component.imageShowSlider).toBe(result);
  });

  it('Deberia la propiedad checked del parametro node ser "true" si node.children es "false" e _id es igual a categorieSearch, despues de ejecutarse recursiveCheckedCheck()', () => {
    let mocknode = {children: [], _id: "salud", checked: false}
    let mockcategorieSearch = "salud";
    let mockstatusSearch: any;

    component.recursiveCheckedCheck(mocknode, mockcategorieSearch, mockstatusSearch);

    expect(mocknode.checked).toBeTruthy();
  });

  it('Deberia la propiedad checked del parametro node ser "true" si node.children es "true" e _id es igual a categorieSearch, despues de ejecutarse recursiveCheckedCheck()', () => {
    let mocknode = {children: ["belleza"], _id: "salud", checked: false}
    let mockcategorieSearch = "salud";
    let mockstatusSearch: any;

    component.recursiveCheckedCheck(mocknode, mockcategorieSearch, mockstatusSearch);

    expect(mocknode.checked).toBeTruthy();
  });

  it('Deberia llamarse al metodo recursiveCheckedCheck() si node.children es "true", despues de ejecutarse recursiveCheckedCheck() ', () => {
    let mocknode = {children: ["belleza"], _id: "salud", checked: false}
    let mockcategorieSearch = "salud";
    let mockstatusSearch: any;

    let spy = spyOn(component, "recursiveCheckedCheck").and.callThrough();

    component.recursiveCheckedCheck(mocknode, mockcategorieSearch, mockstatusSearch);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo unsubcribe() de rulesAdminChangedSubcription, despues de ejecutarse returnProducts()', () => {
    let spy = spyOn(component.rulesAdminChangedSubscription, "unsubscribe").and.callThrough();

    component.returnProducts();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo unsubcribe() de routerSubscription, despues de ejecutarse returnProducts()', () => {
    let spy = spyOn(component.routerSubscription, "unsubscribe").and.callThrough();

    component.returnProducts();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo deleteRulesAdmin() de rulesDispatcherService, despues de ejecutarse returnProducts()', () => {
    let spy = spyOn(rulesDispatcherService, "deleteRulesAdmin").and.callThrough();

    component.returnProducts();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo navigate() de router y dirigirse a [localStorage.getItem("returnListRequest")], despues de ejecutarse returnProducts()', () => {
    let spy = spyOn(router, "navigate").and.returnValue(true);

    localStorage.setItem("returnListRequest", "/");
    
    component.returnProducts();

    expect(spy).toHaveBeenCalledWith([localStorage.getItem("returnListRequest")]);
  });

  it('Deberia llamarse al metodo navigate() de router y dirigirse a ["/system/product"], despues de ejecutarse returnProducts()', fakeAsync( () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    localStorage.setItem("returnListRequest", "");

    component.returnProducts();

    expect(spy).toHaveBeenCalledWith(["/system/product"]);
  }));

  it('Deberia llamarse al metodo push() de selectCategory, si listObj.children es "false" y listObj.checked es "true", despues de ejecutarse searchCategoryChecked()', () => {
    let mocklistObj = { children: [], checked: true, _id: "123"};

    component.selectCategory = ["1"];

    let spy = spyOn(component.selectCategory, "push").and.callThrough();

    component.searchCategoryChecked(mocklistObj);

    expect(spy).toHaveBeenCalledWith(mocklistObj._id);
  });

  it('Deberia la propiedad selectCategory aumentar en 1 si listObj.children es false y listObj.checked es true, despues de ejecutarse searchCategoryChecked()', () => {
    let mocklistObj = { children: [], checked: true, _id: "123"};
    
    component.selectCategory = ["1"];
    let len = component.selectCategory.length;

    component.searchCategoryChecked(mocklistObj);

    expect(component.selectCategory.length).toBe(len + 1);
  });

  
  it('Deberia llamarse al metodo push() de selectCategory, si listObj.children es "true" y listObj.checked es "true", despues de ejecutarse searchCategoryChecked()', () => {
    let mocklistObj = { children: ["categoria 1"], checked: true, _id: "123"};

    component.selectCategory = ["1"];

    let spy = spyOn(component.selectCategory, "push").and.callThrough();

    component.searchCategoryChecked(mocklistObj);

    expect(spy).toHaveBeenCalledWith(mocklistObj._id);
  });

  it('Deberia llamarse al metodo searchCategoryChecked() si listObj.children es "true, despues de ejecutarse searchCategoryChecked()', () => {
    let mocklistObj = { children: ["categoria 1"], checked: true, _id: "123"};

    component.selectCategory = ["1"];

    let spy = spyOn(component, "searchCategoryChecked").and.callThrough();

    component.searchCategoryChecked(mocklistObj);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo searchSKU() de serviceProduct, despues de ejecutarse searchSKU()', () => {
    let mocksku, mockfield: any;

    let spy = spyOn(serviceProduct, "searchSKU").and.callThrough();

    component.searchSKU(mocksku, mockfield);

    expect(spy).toHaveBeenCalledWith(mocksku);
  });

  xit('xDeberia existir el metodo showWindowMultimedia()', () => {
    let spy = spyOn(component, "showWindowMultimedia").and.callThrough();

    expect(spy).toBeTruthy();
  });

  xit('xDeberia la propiedad selectMuti ser "false", despues de ejecutarse showWindowMultimedia()', () => {
    let mockfield = 1;
    let mockmulti = false;
    
    this.multimediaGallery = { config: {maxImageSelect: 0, typeInfo: ""} };
    component.showWindowMultimedia(mockfield, mockmulti);

    expect(component.selectMuti).toBeFalsy();
  });

  xit('xDeberia la propiedad selectMuti tener el valor de "multi", despues de ejecutarse showWindowMultimedia()', () => {
    let mockfield = 1;
    let mockmulti = false;

    this.multimediaGallery = { config: {maxImageSelect: 0, typeInfo: ""} };

    component.showWindowMultimedia(mockfield, mockmulti);

    expect(component.selectMuti).toEqual(mockmulti);
  });

  xit('xDeberia la propiedad maxImageSelect de multimediaGallery.config ser 1, despues de ejecutarse showWindowMultimedia()', () => {
    let mockfield = 1;
    let mockmulti = false;

    this.multimediaGallery = { config: {maxImageSelect: 0, typeInfo: ""} };

    component.showWindowMultimedia(mockfield, mockmulti);

    expect(component.multimediaGallery.config.maxImageSelect).toEqual(1);
  });

  xit('xDeberia la propiedad typeInfo de multimediaGallery.config ser igual a "multi", despues de ejecutarse showWindowMultimedia()', () => {
  });

  xit('xDeberia la propiedad maxImageSelect de multimediaGallery.config ser igual a null, despues de ejecutarse showWindowMultimedia()', () => {
  });

  xit('xDeberia la propiedad selectPicture ser igual a field, despues de ejecutarse showWindowMultimedia()', () => {
  });

  xit('xDeberia llamarse al metodo getAllMultimedia() de multimediaGallery, despues de ejecutarse showWindowMultimedia()', () => {
  });

  xit('xDeberia llamarse al metodo openWindow() de multimediaGallery, despues de ejecutarse showWindowMultimedia()', () => {
  });

  it('Deberia existir el metodo addSKU()', () => {
    let spy = spyOn(component, "addSKU").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ser "true" this["duplicate" + entity] si searchExist.length es mayor a 0, despues de ejecutarse addSKU()', () => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{SKU: "1"}, {SKU: "2"}, {SKU: "3"}];

    component.addSKU(mockvalueSKU, mockfield, mockentity);

    expect(component["duplicate" + mockentity]).toBeTruthy();
  });

  it('Deberia ser "false" this["duplicate" + entity] si searchExist.length es mayor a 0, despues de ejecutarse addSKU() y esperar 2 segundos', fakeAsync(() => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{SKU: "1"}, {SKU: "2"}, {SKU: "3"}];

    component.addSKU(mockvalueSKU, mockfield, mockentity);

    tick(3000);

    expect(component["duplicate" + mockentity]).toBeFalsy();
  }));

  it('Deberia aumentar el tamaño de this[field] en 1 si searchExist.length NO es mayor a 0, despues de ejecutarse addSKU()', () => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [ {SKU: "2"}, {SKU: "3"}];
    let lenmockfield = component[mockfield].length
  
    component.addSKU(mockvalueSKU, mockfield, mockentity);

    expect(component[mockfield].length).toBe(lenmockfield + 1);
  });

  it('Deberia llamarse al metodo get() y asignarse el valor de "" de productForm, despues de ejecutarse addSKU() y esperar 0 segundos', fakeAsync(() => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{SKU: "2"}, {SKU: "3"}];
    
    let spy = spyOn(component.productForm, "get").and.callThrough();

    component.addSKU(mockvalueSKU, mockfield, mockentity);

    tick(1000);

    expect(spy).toHaveBeenCalledWith("search_sku");
  }));

  it('Deberia asignarse el valor de "" de productForm, despues de ejecutarse addSKU() y esperar 0 segundos', fakeAsync(() => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{SKU: "2"}, {SKU: "3"}];

    component.addSKU(mockvalueSKU, mockfield, mockentity);

    tick(1000);

    expect(component.productForm.get("search_sku").value).toBe("");
  }));

  it('Deberia existir el metodo addPack()', () => {
    let spy = spyOn(component, "addSKU").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ser "true" this["duplicate" + entity] si searchExist.length es mayor a 0, despues de ejecutarse addPack()', () => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{product:{SKU: "1"}}, {product:{SKU: "2"}}, {product:{SKU: "3"}}];

    component.addPack(mockvalueSKU, mockfield, mockentity);

    expect(component["duplicate" + mockentity]).toBeTruthy();
  });

  it('Deberia ser "false" this["duplicate" + entity] si searchExist.length es mayor a 0, despues de ejecutarse addPack() y esperar 2 segundos', fakeAsync(() => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{product:{SKU: "4"}}, {product:{SKU: "2"}}, {product:{SKU: "3"}}];

    component.addPack(mockvalueSKU, mockfield, mockentity);

    tick(2000);

    expect(component["duplicate" + mockentity]).toBeFalsy();
  }));

  it('Deberia aumentar el tamaño de this[field] si searchExist.length es igual a 0, despues de ejecutar addPack()', () => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{product:{SKU: "4"}}, {product:{SKU: "2"}}, {product:{SKU: "3"}}];
    let lenmockfield = component[mockfield].length;

    component.addPack(mockvalueSKU, mockfield, mockentity);

    expect(component[mockfield].length).toBe(lenmockfield + 1);
  });

  it('Deberia ser "" el valor de this.f.search_pack, despues de ejecutar addPack() despues de 0 segundos', fakeAsync(() => {
    let mockvalueSKU = {SKU: "1", name: "nombre", _id: "1a1"};
    let mockfield = 1;
    let mockentity = "entidad";

    component[mockfield] = [{product:{SKU: "4"}}, {product:{SKU: "2"}}, {product:{SKU: "3"}}];

    component.addPack(mockvalueSKU, mockfield, mockentity);

    tick(1000);

    expect(component.f.search_pack.value).toBe("");
  }));

  it('Deberia la propiedad showMoreButton cambiar de true a false y viceversa, despues de ejecutarse changeStatusMore()', () => {
    component.showMoreButton = true;

    let value = component.showMoreButton;

    component.changeStatusMore();

    expect(component.showMoreButton).toBe(!value)
  });

  it('Deberia reducirse en 1 el tamaño de this[field], despues de ejecutarse deleteSkuList()', () => {
    let mockindex = 1;
    let mockfield = 1;

    component[mockfield] = ["sku 1", "sku 2"];

    let len = component[mockfield].length;

    component.deleteSkuList(mockindex, mockfield);

    expect(component[mockfield].length).toBe(len - 1);
  });

  it('Deberia llamarse al metodo getAllFamily() de serviceFamily, despues de ejectuarse getBasicInfo()', () => {
    let spy = spyOn(serviceFamily, "getAllFamily").and.callThrough();

    component.getBasicInfo();

    expect(spy).toHaveBeenCalled();
  });
  
  it('Deberia llamarse al metodo getLdvDetail() con el parametro "TYPE-PRODUCT" de serviceLdv, despues de ejectuarse getBasicInfo()', () => {
    let spy = spyOn(serviceLdv, "getLdvDetail").and.callThrough();

    component.getBasicInfo();

    expect(spy).toHaveBeenCalledWith("TYPE-PRODUCT");
  });

  it('Deberia llamarse al metodo getLdvDetail() con el parametro "SONR-CURRENCY" de serviceLdv, despues de ejectuarse getBasicInfo()', () => {
    let spy = spyOn(serviceLdv, "getLdvDetail").and.callThrough();

    component.getBasicInfo();

    expect(spy).toHaveBeenCalledWith("SONR-CURRENCY");
  });

  it('Deberia llamarse al metodo getAllSupplier() de serviceSupplier, despues de ejectuarse getBasicInfo()', () => {
    let spy = spyOn(serviceSupplier, "getAllSupplier").and.callThrough();

    component.getBasicInfo();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo getBrand() de serviceSupplier, despues de ejectuarse getListBrand()', () => {
    let mockidSupplier = "audi";

    let spy = spyOn(serviceSupplier, "getBrand").and.callThrough();

    component.getListBrand(mockidSupplier);

    expect(spy).toHaveBeenCalledWith(mockidSupplier);
  });

  it('Deberia llamarse al metodo sendLoading() de middleService, despues de ejecutarse getListCategory()', () => {
    let mockgroup = "group";

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.getListCategory(mockgroup);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo getAllCategory() de serviceCategory, despues de ejecutarse getListCategory()', () => {
    let mockgroup = "group";

    let spy = spyOn(serviceCategory, "getAllCategory").and.callThrough();

    component.getListCategory(mockgroup);

    expect(spy).toHaveBeenCalledWith(mockgroup);
  });

  it('Deberia llamarse al metodo deleteRulesAdmin() de rulesDispatcherService, despues de ejecutarse ngOnDestroy()', () => {
    let spy = spyOn(rulesDispatcherService, "deleteRulesAdmin").and.callThrough();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo unsubscribe() de rulesAdminChangedSubscription, despues de ejecutarse ngOnDestroy()', () => {
    let spy = spyOn(component.rulesAdminChangedSubscription, "unsubscribe").and.callThrough();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo unsubscribe() de routerSubscription, despues de ejecutarse ngOnDestroy()', () => {
    let spy = spyOn(component.routerSubscription, "unsubscribe").and.callThrough();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });
});
