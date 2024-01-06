import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/shared/service/user.service';
import { HeaderService } from '../components/header/header.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GridComponent } from '../components/grid/grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldValuePipe } from '../../shared/pipe/field-value.pipe';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from 'jasmine';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let headerService: HeaderService;
  let router : Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent, GridComponent, FieldValuePipe],
      imports: [ReactiveFormsModule, FormsModule, MatTooltipModule, HttpClientTestingModule, 
        RouterTestingModule.withRoutes([{path: "system/user/new", component: UserComponent}])],
      providers: [UserService, HeaderService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    headerService = TestBed.get(HeaderService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('Deberia crearse el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar a headerService.sendTitle() despues de ngOnInit()', () => {
    let spy = spyOn(headerService, 'sendTitle').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Usuarios");
  });

  it('Deberia ser el gridlist.columns igual a mockColumns',()=>{
    component.ngOnInit();

    let mockColumns = [
      {
        field: "additionals.name",
        title: "Nombre",
        type: "text"
      },
      {
        field: "additionals.last_name_father",
        title: "Apellido Paterno",
        type: "text"
      },
      {
        field: "additionals.last_name_mother",
        title: "Apellido Materno",
        type: "text"
      },
      {
        field: "email",
        title: "Correo",
        type: "text"
      }
    ];

    expect(component.gridList.columns).toEqual(mockColumns);
  });

  it('Deberia ser 20 la pagQuantity de la gridList', () => {
    component.ngOnInit();

    expect(component.gridList.config.pagQuantity).toBe(20);
  });

  it('Deberia ser /user/list-user-admin el getService de la gridList', () => {
    component.ngOnInit();

    expect(component.gridList.config.getService).toBe('/user/list-user-admin');
  });

  it('Deberia ser /user el deleteService de la gridList', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteService).toBe('/user');
  });

  it('Deberia ser system/user/detail/ el redirect de la gridList', () => {
    component.ngOnInit();

    expect(component.gridList.config.redirect).toBe('system/user/detail/');
  });

  it('Deberia ser Usuario la entity de la gridList', () => {
    component.ngOnInit();

    expect(component.gridList.config.entity).toBe('Usuario');
  });

  it('Deberia ser el mensaje: El usuario ha sido eliminado correctamente de la gridList.config.deleteMessage', () => {
    component.ngOnInit();

    expect(component.gridList.config.deleteMessage).toBe('El usuario ha sido eliminado correctamente');
  });

  it('Deberia redireccionar al usuario a la pantalla de nuevos usuarios', () => {
    let spy = spyOn(router, 'navigate').and.callThrough();
    
    component.createUser();
    
    expect(spy).toHaveBeenCalledWith(["/system/user/new"]);
  });
});
