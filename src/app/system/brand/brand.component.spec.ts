import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { BrandComponent } from './brand.component';
import { GridComponent } from '../components/grid/grid.component';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FieldValuePipe } from 'src/app/shared/pipe/field-value.pipe';
import { MatTooltipModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderService } from '../components/header/header.service';
import { Router } from '@angular/router';
import { CrudBrandComponent } from './crud-brand/crud-brand.component';
import { SaveVideoPipe } from 'src/app/shared/pipe/save-video.pipe';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let headerService: HeaderService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: "system/brand/new", component: CrudBrandComponent
        }])
      ],
      declarations: [ 
        BrandComponent,
        GridComponent,
        DialogConfirmComponent,
        FieldValuePipe,
        SaveVideoPipe,
        CrudBrandComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    headerService = TestBed.get(HeaderService);
    router = TestBed.get(Router);
  });

  it('Deberia crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia utilizarse el metodo removeitem() de localStorage, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(localStorage, "removeItem").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("returnListRequest");
  });

  it('Deberia utilizarse el metodo sendTitle() de headerService, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Marcas");
  });

  it('Deberia la propiedad columns de component.gridList tener los siguientes valores, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.columns).toEqual([
      {
        field: "name",
        title: "Experiencia",
        type: "text"
      },
      {
        field: "create_date",
        title: "Fecha de creación",
        type: "date",
        align: "center"
      },
      {
        field: "update_date",
        title: "Fecha de modificación",
        type: "date",
        align: "center"
      }
    ]);
  });

  it('Deberia la propiedad pagQuantity de component.gridList tener el valor de 20, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.pagQuantity).toBe(20);
  });

  it('Deberia la propiedad getService de component.gridList tener el valor de "/brand/search", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.getService).toBe("/brand/search");
  });

  it('Deberia la propiedad redirect de component.gridList tener el valor de "system/brand/detail/", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.redirect).toBe("system/brand/detail/");
  });

  it('Deberia la propiedad entity de component.gridList tener el valor de "marca", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.entity).toBe("Marca");
  });

  it('Deberia la propiedad returnField de component.gridList ser igual a ["isSupplier"], despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.returnField).toEqual(["isSupplier"]);
  });

  it('Deberia navegarse hacia "/system/brand/new", despues de ejecutarse createBrand()', () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    component.createBrand();

    expect(spy).toHaveBeenCalledWith(["/system/brand/new"])
  });

  it('Deberia la propiedad deleteService de gridList.config tener el valor de "/brand" si event.isSupplier es FALSE, despues de ejecutarse fieldReturn()', () => {
    let mockevent = {isSupplier: false};

    component.fieldReturn(mockevent);

    expect(component.gridList.config.deleteService).toBe("/brand");
  });

  it('Deberia la propiedad isSupplier tomar el valor de event.isSupplier, despues de ejecutarse fieldReturn()', () => {
    let mockevent = {isSupplier: false};

    component.fieldReturn(mockevent);

    expect(component.isSupplier).toBe(mockevent.isSupplier);
  });
});
