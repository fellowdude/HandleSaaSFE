import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RoleComponent } from './role.component';
import { GridComponent } from '../components/grid/grid.component';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FieldValuePipe } from 'src/app/shared/pipe/field-value.pipe';
import { MatTooltipModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderService } from '../components/header/header.service';
import { Router } from '@angular/router';
import { CrudRoleComponent } from './crud-role/crud-role.component';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  let headerService: HeaderService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleComponent, GridComponent, DialogConfirmComponent, FieldValuePipe,  CrudRoleComponent],
      imports: [ ReactiveFormsModule, FormsModule, MatTooltipModule, HttpClientTestingModule, RouterTestingModule.withRoutes(
        [ {path: "system/role/new", component: CrudRoleComponent }]) ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    headerService = TestBed.get(HeaderService);
    router = TestBed.get(Router);
  });

  it('Deberia crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });
  
  it('Deberia llamarse el metodo sendTitle() de headerService, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();
    
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Roles");
  });

  it('Deberia el valor de gridList.columns ser igual a los parametros dados, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.columns).toEqual([
      {
        field: "name",
        title: "Rol",
        type: "text"
      },
      {
        field: "description",
        title: "Descripción",
        type: "text"
      },
      {
        field: "create_date",
        title: "Fecha de Creación",
        type: "date",
        align: "center"
      }
    ]);
  });

  it('Deberia el valor de gridList.config.pagQuantity ser 20, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.pagQuantity).toBe(20);
  });

  it('Deberia el valor de gridList.config.getService ser "/role/search", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.getService).toBe("/role/search");
  });

  it('Deberia el valor de gridList.config.deleteService ser "/role", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteService).toBe("/role");
  });

  it('Deberia el valor de gridList.config.redirect ser "system/role/detail/", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.redirect).toBe("system/role/detail/");
  });

  it('Deberia el valor de gridList.config.entity ser "Rol", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.entity).toBe("Rol");
  });

  it('Deberia el valor de gridList.config.deleteMessage ser "El rol ha sido eliminado correctamente", despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteMessage).toBe("El rol ha sido eliminado correctamente");
  });

  it('Deberia llamarse al metodo navigate() de router y redirigir a "/system/role/new", despues de ejecutarse createRole()', () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    component.createRole();

    expect(spy).toHaveBeenCalledWith(["/system/role/new"]);
  });
});
