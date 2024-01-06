import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from "@angular/core/testing";
import { ProductComponent } from "./product.component";
import { MatTooltipModule, MatAutocompleteModule, MatSlideToggleModule, MatSelectModule, MatCheckboxModule, MatInputModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogConfirmComponent } from "../components/dialog-confirm/dialog-confirm.component";
import { GridComponent } from "../components/grid/grid.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FieldValuePipe } from "src/app/shared/pipe/field-value.pipe";
import { Router, ActivatedRoute } from "@angular/router";
import { HeaderService } from "../components/header/header.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateProductComponent } from './crud-product/create-product.component';
import { SearchInArrayPipe } from 'src/app/shared/pipe/search-in-array.pipe';
import { FroalaViewModule, FroalaEditorModule } from 'angular-froala-wysiwyg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("ProductComponent", () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let headerService: HeaderService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        GridComponent,
        DialogConfirmComponent,
        FieldValuePipe,
        CreateProductComponent,
        SearchInArrayPipe
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FroalaEditorModule, FroalaViewModule,
        MatAutocompleteModule, 
        MatSlideToggleModule, 
        MatSelectModule, MatCheckboxModule, 
        MatInputModule, FormsModule,
        MatTooltipModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: "system/product/new", component: CreateProductComponent}])
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    headerService = TestBed.get(HeaderService);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it("Deberia crearse el componente correctamente", () => {
    expect(component).toBeTruthy();
  });

  it("Deberia ejecutarse el metodo removeItem() de localStorage despues de ejecutarse ngOnInit()", () => {
    let spy = spyOn(localStorage, "removeItem").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("returnListRequest");
  });

  it("Deberia ejecutarse el metodo sendTitle() de headearService despues de ejecutarse ngOnInit()", () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Catálogo de Productos");
  });

  it("Deberia NO ser nula la propiedad columns de gridList despues de ejecutarse ngOnInit()", () => {
    component.ngOnInit();

    expect(component.gridList.columns).not.toBeNull();
  });

  it("Deberia ser 20 el valor de la propiedad pagQuantity de gridList.config despues de ejecutarse ngOnInit()", () => {
    component.ngOnInit();

    expect(component.gridList.config.pagQuantity).toEqual(20);
  });

  it('Deberia ser "/product/searchAll" el valor de la propiedad getService de gridList.config despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.getService).toBe("/product/searchAll");
  });

  it('Deberia ser "system/product/detail/" el valor de la propiedad redirect de gridList.config despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.redirect).toBe("system/product/detail/");
  });

  it('Deberia ser "Producto" el valor de la propiedad entity de gridList.config despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.entity).toBe("Producto");
  });

  it('Deberia ser "El producto ha sido eliminado correctamente" el valor de la propiedad deleteMessage de gridList.config despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteMessage).toBe(
      "El producto ha sido eliminado correctamente"
    );
  });

  it('Deberia ser ["isSupplier"] el valor de la propiedad returnField de gridList.config despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.returnField).toEqual(["isSupplier"]);
  });

  it("Deberia redirigir a /system/product/new despues de la funcion createProduct()", () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    component.createProduct();

    expect(spy).toHaveBeenCalledWith(["/system/product/new"]);
  });

  it("Deberia existir el metodo fieldReturn()", () => {
    let spy = spyOn(component, "fieldReturn").and.callThrough();

    expect(spy).toBeTruthy();
  });
});
