import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { CrudGroupCategoryComponent } from './crud-group-category.component';
import { GridComponent } from 'src/app/system/components/grid/grid.component';
import { FieldValuePipe } from 'src/app/shared/pipe/field-value.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTooltipModule, MatSelectModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/system/components/header/header.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { DialogConfirmComponent } from 'src/app/system/components/dialog-confirm/dialog-confirm.component';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { GroupCategoryComponent } from '../group-category.component';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CrudGroupCategoryComponent', () => {
  let component: CrudGroupCategoryComponent;
  let fixture: ComponentFixture<CrudGroupCategoryComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let headerService: HeaderService;
  let categoryService: CategoryService;
  let middleService: MiddleService;
  let ldvService: LdvService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CrudGroupCategoryComponent, GridComponent, FieldValuePipe, DialogConfirmComponent, GroupCategoryComponent ],
      imports: [ BrowserAnimationsModule, ReactiveFormsModule, FormsModule, MatTooltipModule, HttpClientTestingModule, MatSelectModule, MatCheckboxModule, MatInputModule,
        RouterTestingModule.withRoutes([{
          path: "system/categories-groups", component: GroupCategoryComponent
        }]) ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGroupCategoryComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    headerService = TestBed.get(HeaderService);
    categoryService = TestBed.get(CategoryService);
    middleService = TestBed.get(MiddleService);
    ldvService = TestBed.get(LdvService);
  });

  it('Deberia crearse el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamarse al metodo sendTitle() de headerService, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();
    
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith('Grupo de Categorías');
  });

  it('Deberia la propiedad headerFixed tomar el valor de false, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.headerFixed).toBeFalsy();
  });

  it('Deberia la propiedad submitted tomar el valor de false, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.submitted).toBeFalsy();
  });

  it('Deberia la propiedad categoryGroupForm ser del tipo FormGroup, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.categoryGroupForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia llamarse al metodo getGroupDetail() si this.idGroupCategory es true, despues de ejecutarse ngOnInit()', () => {
    component.idGroupCategory = "id123";
    
    let spy = spyOn(component, "getGroupDetail").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo onChanges(), despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, "onChanges").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('', () => {
    let spy = spyOn(component, "getListGroupCategory").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo f() del tipo get', () => {
    let spypro = spyOnProperty(component, "f", "get").and.callThrough();

    expect(spypro).toBeTruthy();
  });

  it('Deberia NO llamarse al metodo deletItem() si $event.accept es true, despues de ejecutarse acceptModal()', () => {
    let mockevent = {accept: false};
    
    component.listTypeGroupCategory = ["producto", "supermercado"];

    let spy = spyOn(component, "deletItem").and.callThrough();

    component.acceptModal(mockevent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo deletItem() si $event.accept es true, despues de ejecutarse acceptModal()', () => {
    let mockevent = {accept: true};
    
    component.listTypeGroupCategory = ["producto", "supermercado"];

    let spy = spyOn(component, "deletItem").and.callThrough();

    component.acceptModal(mockevent);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo show() de dialogConfirm, despues de ejecutarse confirmDeleteItem()', () => {
    let idItem: any;
    
    let spy = spyOn(component.dialogConfirm, "show").and.callThrough();

    component.confirmDeleteItem(idItem);

    expect(spy).toHaveBeenCalledWith('Eliminar Grupo de Categoría', '¿Esta seguro de eliminar?');
  });

  it('Deberia llamarse al metodo sendLoading de middleService, despues de ejecutarse deleteItem()', () => {
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.deletItem();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo deleteGroup() de categoryService, despues de ejecutarse deletItem()', () => {
    component.idGroupCategory = "id123";
    
    let spy = spyOn(categoryService, "deleteGroup").and.callThrough();

    component.deletItem();

    expect(spy).toHaveBeenCalledWith(component.idGroupCategory);
  });

  it('Deberia llamarse al metodo sendLoading de middleService, despues de ejecutarse deleteItem()', () => {
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.getGroupDetail();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo getGroupById() de categoryService, despues de ejecutarse getGroupDetail()', () => {
    component.idGroupCategory = "id123";

    let spy = spyOn(categoryService, "getGroupById").and.callThrough();

    component.getGroupDetail();

    expect(spy).toHaveBeenCalledWith(component.idGroupCategory);
  });

  it('', () => {
    let spy = spyOn(ldvService, "getLdvDetail").and.callThrough();

    component.getListGroupCategory();

    expect(spy).toHaveBeenCalledWith('TYPE-GROUP-CATEGORY');
  });

  it('Deberia llamarse al metodo subscribe() de categoryGroupForm.get("name").valueChanges, despues de ejecutarse onChanges()', () => {
    let spy = spyOn(component.categoryGroupForm.get('name').valueChanges, "subscribe").and.callThrough();

    component.onChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia la propiedad submitted tomar el valor de true, despues de ejecutarse saveGroup()', () => {
    component.saveGroup();

    expect(component.submitted).toBeTruthy();
  });

  it('Deberia llamarse al metodo sendLoading() de middleService si this.categoryGroupForm.invalid es false, despues de ejecutarse saveGroup()', () => { 
    let spy = spyOn(middleService, "sendLoading").and.callThrough();
    
    component.categoryGroupForm.controls.name.setValue('Grupo de Categoria productos');
    component.categoryGroupForm.controls.typeGroupCategory.setValue('Producto');
    component.categoryGroupForm.controls.friendly_url.setValue('grupo_de_categoria_productos');
    component.categoryGroupForm.controls.position.setValue(1);

    component.saveGroup();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo updateGroup() de categoryService si this.categoryGroupForm.invalid es false y idGroupCategory es true, despues de ejecutarse saveGroup()', () => {
    component.idGroupCategory = "grupo 1";
    
    let spy = spyOn(categoryService, "updateGroup").and.callThrough();
    
    component.categoryGroupForm.controls.name.setValue('Grupo de Categoria productos');
    component.categoryGroupForm.controls.typeGroupCategory.setValue('Producto');
    component.categoryGroupForm.controls.friendly_url.setValue('grupo_de_categoria_productos');
    component.categoryGroupForm.controls.position.setValue(1);

    component.saveGroup();

    expect(spy).toHaveBeenCalledWith(component.categoryGroupForm.value, component.idGroupCategory);
  });

  it('Deberia llamarse al metodo createGroup() de categoryService si this.categoryGroupForm.invalid es false y idGroupCategory es false, despues de ejecutarse saveGroup()', () => {
    component.idGroupCategory = "";
    
    let spy = spyOn(categoryService, "createGroup").and.callThrough();
    
    component.categoryGroupForm.controls.name.setValue('Grupo de Categoria productos');
    component.categoryGroupForm.controls.typeGroupCategory.setValue('Producto');
    component.categoryGroupForm.controls.friendly_url.setValue('grupo_de_categoria_productos');
    component.categoryGroupForm.controls.position.setValue(1);

    component.saveGroup();

    expect(spy).toHaveBeenCalledWith(component.categoryGroupForm.value);
  });

  it('Deberia la propiedad headerFixed tomar el valor de true si event.srcElement.scrollTop es mayor o igual que 33, despues de ejecutarse scrollEvent()', () => {
    let mockevent = {srcElement: {scrollTop: 33}};

    component.scrollEvent(mockevent);

    expect(component.headerFixed).toBeTruthy();
  });

  it('Deberia la propiedad headerFixed tomar el valor de false si event.srcElement.scrollTop es menor que 33, despues de ejecutarse scrollEvent()', () => {
    let mockevent = {srcElement: {scrollTop: 32}};

    component.scrollEvent(mockevent);

    expect(component.headerFixed).toBeFalsy();
  });

  it('Deberia llamarse al metodo navigate() de router dirigir hacia ["/system/categories-groups"], despues de ejecutarse returnGroup()', () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    component.returnGroup();

    expect(spy).toHaveBeenCalledWith(['/system/categories-groups']);
  });
});
