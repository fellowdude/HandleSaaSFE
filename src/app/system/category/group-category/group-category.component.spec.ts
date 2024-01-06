import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { GroupCategoryComponent } from './group-category.component';
import { GridComponent } from '../../components/grid/grid.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { FieldValuePipe } from 'src/app/shared/pipe/field-value.pipe';
import { MatTooltipModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../components/header/header.service';
import { CrudGroupCategoryComponent } from './crud-group-category/crud-group-category.component';

describe('GroupCategoryComponent', () => {
  let component: GroupCategoryComponent;
  let fixture: ComponentFixture<GroupCategoryComponent>;
  let router: Router;
  let activatedRouter: ActivatedRoute;
  let headerService: HeaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCategoryComponent, GridComponent, DialogConfirmComponent, FieldValuePipe, CrudGroupCategoryComponent ],
      imports: [ FormsModule, ReactiveFormsModule, MatTooltipModule, HttpClientTestingModule, 
        RouterTestingModule.withRoutes([{
          path: "system/categories-groups/new", component: CrudGroupCategoryComponent
        }]) ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCategoryComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    router = TestBed.get(Router);
    activatedRouter = TestBed.get(ActivatedRoute);
    headerService = TestBed.get(HeaderService);
  });

  it('Deberia crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia la propiedad dataCategoryGroup ser igual a [], despues de crearse el componente', () => {
    expect(component.dataCategoryGroup).toEqual([]);
  });

  it('Deberia la propiedad pagNumber ser igual a 1, despues de crearse el componente', () => {
    expect(component.pagNumber).toBe(1);
  });

  it('Deberia la propiedad pagQuantity ser igual a 5, despues de crearse el componente', () => {
    expect(component.pagQuantity).toBe(5);
  });

  it('Deberia la propiedad searchCategoryGroup ser igual a "", despues de crearse el componente', () => {
    expect(component.searchCategoryGroup).toBe("");
  });

  it('Deberia la propiedad groupCategorySearchForm ser del tipo FormGroup, despues de crearse el componente', () => {
    expect(component.groupCategorySearchForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia llamarse al metodo sendTitle() de headerService, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Grupo de Categorías");
  });

  it('Deberia la propiedad gridList.columns contener las propiedades de field, title y type, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.columns).toEqual([
      {
        field: "name",
        title: "Nombre",
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
        title: "Ultima actualización",
        type: "date",
        align: "center"
      }
    ]);
  });

  it('Deberia la propiedad gridList.config.pagQuantity ser igual a 20, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.pagQuantity).toBe(20);
  });

  it('Deberia la propiedad gridList.config.getService ser igual a "/category-group/search", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.getService).toBe("/category-group/search");
  });

  it('Deberia la propiedad gridList.config.deleteService ser igual a "/category-group", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteService).toBe("/category-group");
  });

  it('Deberia la propiedad gridList.config.redirect ser igual a "system/categories-groups/detail/", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.redirect).toBe("system/categories-groups/detail/");
  });

  it('Deberia la propiedad gridList.config.entity ser igual a "Grupo de categoría", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.entity).toBe("Grupo de categoría");
  });

  it('Deberia la propiedad gridList.config.deleteMessage ser igual a "El grupo de categoría ha sido eliminado correctamente", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteMessage).toEqual("El grupo de categoría ha sido eliminado correctamente");
  });

  it('Deberia llamarse al metodo navigate() de router, despues de ejecutarse createGroup()', () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    component.createGroup();

    expect(spy).toHaveBeenCalledWith(["/system/categories-groups/new"]);
  });
});
