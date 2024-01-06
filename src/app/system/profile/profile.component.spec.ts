import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTooltipModule, MatInputModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/shared/service/user.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../components/header/header.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let middleService: MiddleService;
  let headerService: HeaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ ReactiveFormsModule, MatInputModule, FormsModule, MatTooltipModule, BrowserAnimationsModule, 
        HttpClientTestingModule ],
      providers: [ { provide: ComponentFixtureAutoDetect, useValue: true } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    userService = TestBed.get(UserService);
    middleService = TestBed.get(MiddleService);
    headerService = TestBed.get(HeaderService);
  });

  it('Deberia crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia existir la propiedad profileForm del tipo FormGroup', () => {
    expect(component.profileForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia existir la propiedad passwordForm del tipo FormGroup', () => {
    expect(component.passwordForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia existir la propiedad namePage del tipo String', () => {
    expect(component.namePage).toEqual(jasmine.any(String));
  });

  it('Deberia existir la propiedad submittedPassword del tipo Boolean', () => {
    expect(component.submittedPassword).toEqual(jasmine.any(Boolean));
  });

  it('Deberia la propiedad namePage ser igual a "Perfil"', () => {
    expect(component.namePage).toBe("Perfil");
  });

  it('Deberia la propiedad submittedPassword ser igual a "false"', () => {
    expect(component.submittedPassword).toBe(false);
  });

  it('Deberia llamarse al metodo sendTitle() de headerService, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Perfil");
  });

  it('Deberian existir todos los campos de profileForm y ser campos obligatorio, despues de ejecutarse ngOnInit()', () => {
    const dniInput = component.profileForm.controls.dni;
    const last_name_fatherInput = component.profileForm.controls.last_name_father;
    const last_name_motherInput = component.profileForm.controls.last_name_mother;
    const nameInput = component.profileForm.controls.name;
    const number_documentInput = component.profileForm.controls.number_document;
    const phoneInput = component.profileForm.controls.phone;
    const emailInput = component.profileForm.controls.email;
    
    component.ngOnInit();

    expect(dniInput.valid).toBeFalsy();
    expect(last_name_fatherInput.valid).toBeFalsy();
    expect(last_name_motherInput.valid).toBeFalsy();
    expect(nameInput.valid).toBeFalsy();
    expect(number_documentInput.valid).toBeFalsy();
    expect(phoneInput.valid).toBeFalsy();
    expect(emailInput.valid).toBeFalsy();

    dniInput.setValue(70020072);
    last_name_fatherInput.setValue('Will');
    last_name_motherInput.setValue('Smith');
    nameInput.setValue('Frederic');
    number_documentInput.setValue(null);
    phoneInput.setValue(994244345);
    emailInput.setValue('test@gmail.com');

    expect(dniInput.valid).toBeTruthy();
    expect(last_name_fatherInput.valid).toBeTruthy();
    expect(last_name_motherInput.valid).toBeTruthy();
    expect(nameInput.valid).toBeTruthy();
    expect(number_documentInput.valid).toBeFalsy();
    expect(phoneInput.valid).toBeTruthy();
    expect(emailInput.valid).toBeTruthy();
  });

  it('Deberian existir todos los campos de passwordForm y ser campos obligatorio, despues de ejecutarse ngOnInit()', () => {
    const old_passwordInput = component.passwordForm.controls.old_password;
    const passwordInput = component.passwordForm.controls.password;
    const valid_passwordInput = component.passwordForm.controls.valid_password;

    component.ngOnInit();

    expect(old_passwordInput.valid).toBeFalsy();
    expect(passwordInput.valid).toBeFalsy();
    expect(valid_passwordInput.valid).toBeFalsy();

    old_passwordInput.setValue('oldpassword1');
    passwordInput.setValue('password1');
    valid_passwordInput.setValue('validpassword1');

    expect(old_passwordInput.valid).toBeTruthy();
    expect(passwordInput.valid).toBeTruthy();
    expect(valid_passwordInput.valid).toBeTruthy();
  });

  it('Deberia existir el metodo get f', () => {
    let spy = spyOnProperty(component, "f", "get");

    expect(spy).toBeTruthy();
  });

  it('Deberia existir el metodo get g', () => {
    let spy = spyOnProperty(component, "g", "get");

    expect(spy).toBeTruthy();
  });

  it('Deberia llamarse la metodo getBasicInfo() de userService, despues de ejecutarse getInfo()', () => {
    let spy = spyOn(userService, "getBasicInfo").and.callThrough();

    component.getInfo();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia la propiedad submittedPassword ser true, despues de ejecutarse changePassword()', () => {
    component.changePassword();

    expect(component.submittedPassword).toBeTruthy();
  });

  it('Deberia llamarse al metodo sendMessage() de middleService, si this.passwordForm.invalid es true, despues de ejecutarse changePassword()', () => {
    spyOnProperty(component.passwordForm,"invalid",'get').and.returnValue(true);

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    component.changePassword();

    expect(spy).toHaveBeenCalledWith(component.namePage, "Por favor ingrese todos los campos solicitados", "error");
  });

  it('Deberia llamarse al metodo sendLoading() de middleService, si this.passwordForm.invalid es false y el valor de password sea igual al valor de valid_password, despues de ejecutarse changePassword()', () => {
    spyOnProperty(component.passwordForm,"invalid",'get').and.returnValue(false);

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.passwordForm.controls.password.setValue("password");
    component.passwordForm.controls.valid_password.setValue("password");

    component.changePassword();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo changePassword() de userService, si this.passwordForm.invalid es false y el valor de password sea igual al valor de valid_password, despues de ejecutarse changePassword()', () => {
    spyOnProperty(component.passwordForm,"invalid",'get').and.returnValue(false);

    let spy = spyOn(userService, "changePassword").and.callThrough();

    component.passwordForm.controls.password.setValue("password");
    component.passwordForm.controls.valid_password.setValue("password");

    component.changePassword();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo sendMessage() de middleService, si this.passwordForm.invalid es false y los valores de password y valid_password son diferentes, despues de ejecutarse changePassword()', () => {
    spyOnProperty(component.passwordForm,"invalid",'get').and.returnValue(false);

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    component.passwordForm.controls.password.setValue("password");
    component.passwordForm.controls.valid_password.setValue("notpassword");

    component.changePassword();

    expect(spy).toHaveBeenCalledWith(component.namePage, "La confirmación de la nueva contraseña no es válida",
    "error");
  });

  it('Deberia llamarse al metodo sendLoading() de middleService, si this.profileForm.invalid es false, despues de ejecutarse saveProfile()', () => {
    spyOnProperty(component.profileForm,"invalid",'get').and.returnValue(false);

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.saveProfile();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo updateProfileUser() de userService, si this.profileForm.invalid es false, despues de ejecutarse saveProfile()', () => {
    spyOnProperty(component.profileForm,"invalid",'get').and.returnValue(false);

    let spy = spyOn(userService, "updateProfileUser").and.callThrough();

    component.saveProfile();

    expect(spy).toHaveBeenCalledWith(component.profileForm.value);
  });

  it('Deberia llamarse al metodo sendMessage() de middleService, si this.profileForm.invalid es true, despues de ejecutarse saveProfile()', () => {
    spyOnProperty(component.profileForm,"invalid",'get').and.returnValue(true);

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    component.saveProfile();

    expect(spy).toHaveBeenCalledWith(component.namePage, "Complete todos los campos obligatorios",
    "error");
  });
});
