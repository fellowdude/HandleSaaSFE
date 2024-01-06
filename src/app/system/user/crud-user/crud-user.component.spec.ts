import { CrudUserComponent } from './crud-user.component';
import { DialogConfirmComponent } from "../../components/dialog-confirm/dialog-confirm.component";
import { RolService } from 'src/app/shared/service/rol.service';
import { UserService } from 'src/app/shared/service/user.service';
import { HeaderService } from '../../components/header/header.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { async, ComponentFixture, TestBed, fakeAsync, ComponentFixtureAutoDetect, tick } from '@angular/core/testing';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { Location, PathLocationStrategy, LocationStrategy } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserComponent } from '../user.component';

describe('CrudUserComponent', () => {
  let component: CrudUserComponent;
  let fixture: ComponentFixture<CrudUserComponent>;
  let roleService: RolService;
  let headerService: HeaderService;
  let middleService: MiddleService;
  let userService: UserService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUserComponent, DialogConfirmComponent, UserComponent ],
      imports: [ ReactiveFormsModule, BrowserAnimationsModule, MatSelectModule,
         HttpClientTestingModule, MatInputModule, RouterTestingModule.withRoutes([{
           path: "system/user", component: UserComponent
         }])],
      providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        { provide: ComponentFixtureAutoDetect, useValue: true }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    headerService = TestBed.get(HeaderService);
    middleService = TestBed.get(MiddleService);
    roleService = TestBed.get(RolService);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('Debería crearse el componente CrudUser correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberían existir todas las configuraciones de ngOnInit()',()=>{
    spyOn(headerService,"sendTitle");
    spyOn(component,'getRol');

    component.ngOnInit();

    expect(headerService.sendTitle).toHaveBeenCalledWith("Usuarios");
    expect(component.namePage).toBe("Usuario");
    expect(component.headerFixed).toBeFalsy();
    expect(component.getRol).toHaveBeenCalled();
    expect(component.userForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia existir el metodo getInfoUser()', () => {
    let spy = spyOn(component, "getInfoUser").and.callThrough();
    expect(spy).toBeTruthy();
  });

  it('Debería entrar a getInfoUser si existe un idUser', () =>{
    component.idUser = 
    { _id: "5e690ededafbb203b0259db5", state: "H", deleted: false, 
    address: [{ _id: "5e6fadbb8155fc0761c797cf", deleted: false, name: "casa",
    type_address: { _id: "5c92933addfb9427ec30af7c", code: "TYPE-ADDRESS",
    value: "Casa", active: true }, address: "casa", departament: { _id: "5c8a7837860e245e1c9757d1",
    name: "Amazonas"}, province: { _id: "5c8a819e860e246278d0602a", name: "Bagua", 
    id_department: "5c8a7837860e245e1c9757d1"}, district: {_id: "5c8ab1fd860e246278d0610d",
    X: -78.4361, Y: -5.4156, area: "809.07", name: "Aramango", id_province: "5c8a819e860e246278d0602a",
    population: "10,940", ubigeo: "010202"}, reference: "asd", create_by: "5e690ededafbb203b0259db5",
    user_id: "5e690ededafbb203b0259db5",ubigeo: "010202", __v: 0}], is_customer_admin: 1,
    username: "mauricio.rodriguez.ochoa1@gmail.com", email: "mauricio.rodriguez.ochoa1@gmail.com",
    role_id: "5e6bf2eb9e9a6e2ad41a9324", additionals: { name: "Mauricio", last_name_father: "Rodriguez",
    last_name_mother: "Ochoa", number_document: "2345678", dni: "2345678", phone: "2345-030", 
    birth_date: "2020-03-27T00:00:00.000Z", suffix: "Sr."}, tenant: "207033693952", __v: 7,
    wishlist: [], isSupplier: false
    }
    
    let spy = spyOn(component,'getInfoUser').and.callThrough();
    
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo scrollEvent ()', () => {
    let spy = spyOn(component, "scrollEvent").and.callThrough();

    expect(spy).toBeTruthy();
  })

  it('Debería obtener una respuesta getRol()',() =>{
    const response: any = [];

    spyOn(roleService,'getListRole').and.returnValue(of(response));

    component.getRol();

    expect(component.listRole).toEqual(response);
    expect(roleService.getListRole).toHaveBeenCalled();
  });

  it('Debería llamar al método sendLoading del middleService después de getInfoUser()', () => {
    spyOn(middleService,'sendLoading').and.callThrough();

    component.getInfoUser();

    expect(middleService.sendLoading).toHaveBeenCalled();
  });

  it('debería llamar al método getDetailUser después de usar la función getInfoUser()',()=>{
    spyOn(userService,'getDetailUser').and.callThrough();

    component.getInfoUser();

    expect(userService.getDetailUser).toHaveBeenCalled();
  });

  it('Debería redireccionar hacia /system/user la funcion returnUser()', () => {
    let spy = spyOn(router, 'navigate').and.callThrough();

    component.returnUser();

    expect(spy).toHaveBeenCalledWith(['/system/user']);
  });

  it('Debería llamar a dialogConfirm.sho después de utilizar confirmDeleteItem', () => {
    spyOn(component.dialogConfirm,'show');

    component.confirmDeleteItem(null);

    expect(component.dialogConfirm.show).toHaveBeenCalled();
  });

  it('Debería llamar al método sendLoading del middleService despues de deleteUser()', ()=>{
    let spy = spyOn(middleService,'sendLoading').and.callThrough();

    component.deleteUser();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Debería ser true, la propiedad submitted en la función saveUser()', ()=>{
    component.saveUser();

    expect(component.submitted).toBeTruthy();
  });

  it('Deberia ingresar al primer if() en saveUser() si el userForm.invalid es false', ()=>{
    spyOnProperty(component.userForm,"invalid",'get').and.returnValue(false);

    spyOn(middleService,'sendLoading').and.callThrough();
    
    component.saveUser();

    expect(middleService.sendLoading).toHaveBeenCalledWith(true);
  });

  it('Deberia NO entrar en el segundo if() si no existe un idUser de la funcion saveUser()', () => {
    component.idUser = false;

    spyOnProperty(component.userForm,'invalid','get').and.returnValue(false);
    let spy = spyOn(userService,'updateUser').and.callThrough();

    component.saveUser();

    expect(spy).not.toHaveBeenCalled();
  });

  it('Deberia entrar en el segundo else() si no existe un idUser de la funcion saveUser()', () => {
    component.idUser = false;

    spyOnProperty(component.userForm,'invalid','get').and.returnValue(false);
    let spy = spyOn(userService, 'saveUser').and.callThrough();

    component.saveUser();

    expect(spy).toHaveBeenCalledWith(component.userForm.value);
  });

  it('Deberia ingresar al primer else() en saveUser() si el userForm.invalid es true',()=>{
    spyOnProperty(component.userForm,'invalid','get').and.returnValue(true);
    spyOn(middleService,'sendMessage').and.callThrough();

    component.saveUser();

    expect(middleService.sendMessage).toHaveBeenCalledWith('Usuario','Revise los campos obligatorios', 'error');
  });
});
