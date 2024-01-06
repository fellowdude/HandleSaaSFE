import { async, ComponentFixture, TestBed, fakeAsync, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { CrudExperienceComponent } from './crud-experience.component';
import { ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SaveVideoPipe } from 'src/app/shared/pipe/save-video.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material';
import { HeaderService } from '../../components/header/header.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { ListInformationComponent } from "../../components/list-information/list-information.component";
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { ExperienceService } from 'src/app/shared/service/experience.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { GroupEmailService } from 'src/app/shared/service/group-email.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { EmailFormService } from 'src/app/shared/service/email-form.service';
import { MapsLocationComponent } from '../../components/maps-location/maps-location.component';
import { ExperienceComponent } from '../experience.component';
import { MapsAPILoader } from '@agm/core';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsCode } from "src/app/utils/utilsCode";
import { of } from 'rxjs';

describe('CrudExperienceComponent', () => {
  let component: CrudExperienceComponent;
  let fixture: ComponentFixture<CrudExperienceComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let headerService: HeaderService;
  let serviceLdv: LdvService;
  let experienceService: ExperienceService;
  let middleService: MiddleService;
  let groupEmailService: GroupEmailService;
  let serviceCategory: CategoryService;
  let emailFormService: EmailFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(), HttpClientTestingModule, MatSlideToggleModule, 
        RouterTestingModule.withRoutes([{path: "system/experience", component: ExperienceComponent}])],
      declarations: [ CrudExperienceComponent, SaveVideoPipe, ListInformationComponent, DialogConfirmComponent, MapsLocationComponent, ExperienceComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }, 
        { provide: MapsAPILoader, useValue: { load: jasmine.createSpy('open') }},
        LdvService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CrudExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    headerService = TestBed.get(HeaderService);
    serviceLdv = TestBed.get(LdvService);
    experienceService = TestBed.get(ExperienceService);
    middleService = TestBed.get(MiddleService);
    groupEmailService = TestBed.get(GroupEmailService);
    serviceCategory = TestBed.get(CategoryService);
    emailFormService = TestBed.get(EmailFormService);
  });

  it('Deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia iniciar como un arreglo vacio selectCategory', () => {
    expect(component.selectCategory).toEqual([]);
  });
  
  it('Deberia iniciar en uno imagePositionMobile', () => {
    expect(component.imagePositionMobile).toEqual(1);
  });

  it('Deberia iniciar como un arreglo vacio detailGroupEmail', () => {
    expect(component.detailGroupEmail).toEqual([]);
  });

  it('Deberia iniciar el url_attachment con lo del localStorage.getItem("url_attachment")', () => {
    let mockUrl_attachment = localStorage.getItem('url_attachment');

    expect(component.url_attachment).toEqual(mockUrl_attachment);
  });

  it('Deberia iniciar como un arreglo vacio lisAddGaleryVideos', () => {
    expect(component.lisAddGaleryVideos).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio lisAddPicture', () => {
    expect(component.lisAddPicture).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listAdvantage', () => {
    expect(component.listAdvantage).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio lisMainAddPicture', () => {
    expect(component.lisMainAddPicture).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio lisMainLogoAddPicture', () => {
    expect(component.lisMainLogoAddPicture).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio lisNewAdvantage', () => {
    expect(component.lisNewAdvantage).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio imageMain', () => {
    expect(component.imageMain).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listDetailAdvantage', () => {
    expect(component.listDetailAdvantage).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listActionEmailForm', () => {
    expect(component.listActionEmailForm).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listMainAccionEmailForm', () => {
    expect(component.listMainAccionEmailForm).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listAddress', () => {
    expect(component.listAddress).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio lisBannerAddPicture', () => {
    expect(component.lisBannerAddPicture).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listDetailProduct', () => {
    expect(component.listDetailProduct).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio lisBannerLogoAddPicture', () => {
    expect(component.lisBannerLogoAddPicture).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listFormContact', () => {
    expect(component.listFormContact).toEqual([]);
  });

  it('Deberia iniciar como un arreglo vacio listGroupEmail', () => {
    expect(component.listGroupEmail).toEqual([]);
  });

  it('Deberia iniciar como un objeto vacio advantageInfo', () => {
    expect(component.advantageInfo).toEqual({});
  });

  it('Deberia iniciar en false la propiedad showAddDetail', () => {
    expect(component.showAddDetail).toBeFalsy();
  });

  it('Deberia iniciar en false la propiedad submitted', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('Deberia recibir un string el metodo subscribe de activatedRoute', fakeAsync((done: DoneFn) => {
    let params = {idExperience: '1'};

    activatedRoute.params.subscribe(params => {
      params = params;
    });

    expect(params.idExperience).toEqual('1');
  })); 

  it('Deberia iniciar con el string Experiencia la propiedad nameWindow', () => {
    expect(component.nameWindow).toEqual('Experiencias');
  });

  it('Deberia iniciar como un FormGroup la propiedad videoForm', () => {
    expect(component.videoForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia ser false la propiedad submittedBenefit al ejecutar ngOnInit()',() => {
    component.ngOnInit();

    expect(component.submittedBenefit).toBeFalsy();
  });
  
  it('Deberia ser llamada la funcion sendTitle del headerService con el parametro "Experiencias"', () => {
    let spy = spyOn(headerService,'sendTitle').and.callThrough();
    
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Experiencias");
  });

  it('Deberia ser igual a mocklistTypeButton, la propiedad listTypeButton luego de ejecutarse ngOnInit()', () => {
    let mocklistTypeButton = [
      {
        value: "primary",
        name: "Primario"
      },
      {
        value: "secondary",
        name: "Secundario"
      }
    ];

    component.ngOnInit();

    expect(component.listTypeButton).toEqual(mocklistTypeButton);
  });

  it('Deberia ser llamada la funcion getListGroupEmail despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component, 'getListGroupEmail').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ser false el valor de la propiedad headerFixed después de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.headerFixed).toBeFalsy();
  });

  it('Deberia ser igual a mocktypePrice, la propiedad typePrice, luego de ejecutarse ngOnInit()', () => {
    let mocktypePrice = [
      {
        key: "fixed",
        value: "Fijo"
      },
      {
        key: "range",
        value: "Rango"
      }
    ];

    component.ngOnInit();

    expect(component.typePrice).toEqual(mocktypePrice);
  });

  it('Deberia contener "url" la propiedad videoForm despues de ejecutarse ngOnInit()', () => {
    expect(component.videoForm.contains('url')).toBeTruthy();
  });

  it('Deberia ser del tipo FormGroup la propiedad experienceForm despues de ejecutarse ngOnInit()', () => {
    expect(component.experienceForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia contener active el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('active')).toBeTruthy();
  });

  it('Deberia ser active un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('active');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia contener name el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('name')).toBeTruthy();
  });

  it('Deberia ser name un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('name');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia contener email_contact el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('email_contact')).toBeTruthy();
  });

  it('Deberia contener group_email el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('group_email')).toBeTruthy();
  });

  it('Deberia contener schedule el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('schedule')).toBeTruthy();
  });

  it('Deberia ser schedule un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('schedule');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia contener phone el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('phone')).toBeTruthy();
  });

  it('Deberia NO ser phone un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('phone');

    control.setValue('');

    expect(control.valid).not.toBeFalsy();
  });

  it('Deberia contener group el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('group')).toBeTruthy();
  });

  it('Deberia ser group un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('group');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia contener detail_list el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('detail_list')).toBeTruthy();
  });

  it('Deberia contener image_cover el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('image_cover')).toBeTruthy();
  });

  it('Deberia contener image_logo_cover el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('image_logo_cover')).toBeTruthy();
  });

  it('Deberia contener image_banner el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('image_banner')).toBeTruthy();
  });

  it('Deberia contener image_logo_banner el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('image_logo_banner')).toBeTruthy();
  });

  it('Deberia contener categories el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('categories')).toBeTruthy();
  });

  it('Deberia contener videos_link el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('videos_link')).toBeTruthy();
  });

  it('Deberia contener galery_videos el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('galery_videos')).toBeTruthy();
  });

  it('Deberia contener images_link el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('images_link')).toBeTruthy();
  });

  it('Deberia contener list_advantage el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('list_advantage')).toBeTruthy();
  });

  it('Deberia contener list_action_email_form el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('list_action_email_form')).toBeTruthy();
  });

  it('Deberia contener list_main_action_email_form el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('list_main_action_email_form')).toBeTruthy();
  });

  it('Deberia contener list_address el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('list_address')).toBeTruthy();
  });

  it('Deberia contener search_sku el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('search_sku')).toBeTruthy();
  });

  it('Deberia contener friendly_url el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('friendly_url')).toBeTruthy();
  });

  it('Deberia ser friendly_url un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('friendly_url');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia contener title el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('title')).toBeTruthy();
  });

  it('Deberia ser title un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('title');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia contener meta_description el experienceForm de ngOnInit()', () => {
    expect(component.experienceForm.contains('meta_description')).toBeTruthy();
  });

  it('Deberia ser meta_description un campo necesario del experienceForm de ngOnInit()', () => {
    let control = component.experienceForm.get('meta_description');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('Deberia ejecutarse onChanges despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component,'onChanges').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse getListGroup despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component,'getListGroup').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse getEmailForm despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(component,'getEmailForm').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutar getDataExperience si existe un idExperience en ngOnInit()', () => {
    component.idExperience = '1';

    let spy = spyOn(component,'getDataExperience').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia obtener una respuesta serviceLdv.getLdvDetail y recibirlo la propiedad listTypePrice en ngOnInit()', () => {
    let response: JSON;

    spyOn(serviceLdv, 'getLdvDetail').and.returnValue(of(response));

    component.ngOnInit();

    expect(component.listTypePrice).toEqual(response);
  });
  
  it('Deberia obtener una respuesta serviceLdv.getLdvDetail y recibirlo la propiedad listCurrency en ngOnIniti()', () => {
    let response: any = [];

    spyOn(serviceLdv, 'getLdvDetail').and.returnValue(of(response));

    component.ngOnInit();

    expect(component.listCurrency).toEqual(response);
  });

  it('Deberia deleteDetail recortar el arreglo segun la posicion que le manden y solamente un elemento', () => {
    let mockposition: 1;
    
    component.listDetailAdvantage.length = 2;
    
    component.deleteDetail(mockposition);
    
    expect(component.listDetailAdvantage.length).toEqual(1);
  });

  it('Deberia ser llamada la funcion selectDetailGroup(), cuando se hace uso de openListContact()', () => {
    let mockval: any;

    let spy = spyOn(component,'selectDetailGroup').and.callThrough();

    component.openListContact(mockval);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia openListContact(), llamar al metodo open() de la propiedad listInformation', () => {
    let mockval: any;

    let spy = spyOn(component.listInformation,'open').and.callThrough();

    component.openListContact(mockval);

    expect(spy).toHaveBeenCalledWith(component.detailGroupEmail);
  });

  it('Deberia existir el metodo selectDetailGroup()', () => {
    expect(component.selectDetailGroup).toBeTruthy();
  });

  it('Deberia la propiedad detailGroupEmail ser igual a this.listGroupEmail[indexGroup].list_contact si listGroupEmail es true e indexGroup es mayor o igual a 0, despues de ejecutar selectDetailGroup()', () => {
    let mockval = "153";

    component.listGroupEmail = [{_id: "153", list_contact: [1,2]}, {_id: "163", list_contact: [1,2]}];

    component.selectDetailGroup(mockval);

    let result = component.listGroupEmail[1].list_contact;

    expect(component.detailGroupEmail).toEqual(result);
  });

  it('Deberia la propiedad detailGroupEmail ser igual a [] si listGroupEmail es true e indexGroup es menor a 0, despues de ejecutar selectDetailGroup()', () => {
    let mockval = 1;

    component.listGroupEmail = [{_id: "153", list_contact: [1,2]}, {_id: "163", list_contact: [1,2]}];

    component.selectDetailGroup(mockval);

    let result = [];

    expect(component.detailGroupEmail).toEqual(result);
  });

  it('Deberia existir el metodo acceptModal($event)', () => {
    expect(component.acceptModal).toBeTruthy();
  });

  it('Deberia llamarse al metodo deletItem() si $event.accept es "true", despues de ejecutarse acceptModal()', () => {
    let mockevent = {accept: true};

    let spy = spyOn(component, "deletItem").and.callThrough();

    component.acceptModal(mockevent);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia confirmDeleteItem(), hacer uso del metodo show() de dialogConfirm', () => {
    let mockidItem: any;

    let spy = spyOn(component.dialogConfirm,'show');

    component.confirmDeleteItem(mockidItem);

    expect(spy).toHaveBeenCalledWith("Eliminar Experiencia", "¿Esta seguro de eliminar?");
  });

  it('Deberia estar definida el metodo addDetail()', () => {
    let mockfield: any;

    let spy = spyOn(component,'addDetail').and.returnValue(mockfield);

    expect(spy).toBeDefined();
  });

  it('Deberia llamarse al metodo delete() de experienceService al utilizar deletItem()', () => {
    let spy = spyOn(experienceService, 'delete').and.callThrough();

    component.deletItem();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia deleteItem() utilizar el metodo sendMesage() del middleService con los siguientes parametros', () => {
    let spymiddle = spyOn(middleService, 'sendMessage').and.callThrough();

    middleService.sendMessage("Experiencias", "La experiencia  ha sido eliminada", "ok");

    expect(spymiddle).toHaveBeenCalledWith("Experiencias", "La experiencia  ha sido eliminada", "ok");
  });

  it('Deberia ser true el parametro submittedBenefit cuando se usa el metodo saveAdvantage()', () => {
    let mockaction: any;

    component.saveAdvantage(mockaction);

    expect(component.submittedBenefit).toBeTruthy();
  });

  it('Deberia NO ingresar en el primer if() si algun parametro no es true o mayor a 0 del metodo saveAdvantage()', () => {
    let mockaction: any;

    component.advantageInfo.title = false;
    component.lisNewAdvantage.length = 0;
    component.imageMain.length = 0;
    component.listDetailAdvantage.length = 0;

    component.saveAdvantage(mockaction);

    expect(component.advantageInfo.title).not.toBeTruthy();
    expect(component.lisNewAdvantage.length).not.toBeGreaterThan(0);
    expect(component.imageMain.length).not.toBeGreaterThan(0);
    expect(component.listDetailAdvantage.length).not.toBeGreaterThan(0);
  });

  it('Deberia ser false la propiedad showAddDetail luego de utilizar la funcion saveAdvantage()', () => {
    let mockaction: any;

    component.saveAdvantage(mockaction);

    expect(component.showAddDetail).not.toBeTruthy();
  });

  it('Deberia existir el metodo addVideo()', () => {
    expect(component.addVideo).toBeTruthy();
  });

  it('Deberia ser false la propiedad videoForm.invalid para que se pueda ingresar un url en addVideo()', () => {
    component.addVideo();

    expect(component.videoForm.invalid).toBeFalsy();
  });

  it('Deberia acceder al metodo push() de la propiedad lisAddGaleryVideos si ingresa al if()', () => {
    let spy = spyOn(component.lisAddGaleryVideos, 'push').and.callThrough();
    
    component.addVideo();

    expect(spy).toHaveBeenCalledWith(component.videoForm.get("url").value);
  });

  it('Deberia addVideo() llamar al metodo reset() de la propiedad videoForm', () => {
    let spy = spyOn(component.videoForm,'reset').and.callThrough();

    component.addVideo();

    expect(spy).toBeTruthy();
  });

  it('Deberia ser false la propiedad showAddDetail despues de ejecutar el metodo closeAdvange()', ()=> {
    component.closeAdvange();

    expect(component.showAddDetail).toBeFalsy();
  });

  it('Deberia ser false la propiedad showAddDetail despues de ejecutar el metodo closeWindow()', () => {
    component.closeWindow();

    expect(component.showAddDetail).toBeFalsy();
  });

  it('Deberia existir el metodo checkedCategory()', () => {
    expect(component.checkedCategory).toBeTruthy();
  });

  it('Deberia llamarse al metodo recursiveCheckedCheck() si this.listCategory es true, despues de ejecutarse checkedCategory()', () => {
    component.listCategory = ["categoria 1", "categoria 2", "categoria 3"];
    component.selectCategory = ["categoria 1"];

    let spy = spyOn(component, "recursiveCheckedCheck").and.callThrough();

    component.checkedCategory();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo searchCategoryChecked()', () => {
    let spy = spyOn(component, 'searchCategoryChecked').and.callThrough();

    expect(spy).toBeTruthy();
  });

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

  it('Deberia existir el metodo dataPictureSave()', () => {
    let spy = spyOn(component, 'dataPictureSave').and.callThrough();

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


  it('Deberia existir el metodo delete()', () => {
    let spy = spyOn(component, 'delete').and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia existir el metodo deleteImage()', () => {
    let spy = spyOn(component, 'deleteImage').and.callThrough();

    expect(spy).toBeTruthy();
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

  it('Deberia getDataExperience() utilizar el metodo getById de experienceService', () => {
    let spy = spyOn(experienceService, 'getById').and.callThrough();

    component.getDataExperience();

    expect(spy).toHaveBeenCalledWith(component.idExperience);
  });

  it('Deberia getListGroupEmail() utilizar el metodo getList de groupEmailService despues de ejecutar getListGroupEmail()', () => {
    let spy = spyOn(groupEmailService, 'getList').and.callThrough();

    component.getListGroupEmail();

    expect(spy).toBeTruthy();
  });

  it('Deberia existir el metodo getListCategory()', () => {
    let mockgroup: any;

    let spy = spyOn(component, 'getListCategory').and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ejecutarse el metodo sendLoading() de middleService despues de ejecutarse getListCategory()', () => {
    let mockgroup: any;

    let spy = spyOn(middleService, 'sendLoading').and.callThrough();

    component.getListCategory(mockgroup);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia ejecutarse el metodo getAllCategory() de serviceCategory despues de ejecutarse getListCategory()', () => {
    let mockgroup: any;

    let spy = spyOn(serviceCategory, 'getAllCategory').and.callThrough();

    component.getListCategory(mockgroup);

    expect(spy).toHaveBeenCalledWith(mockgroup);
  });

  it('Deberia getListCategory() ejecutar el metodo sendLoading() de middleService', () => {
    let mockgroup: any;

    let spy = spyOn(middleService, 'sendLoading').and.callThrough();

    component.getListCategory(mockgroup);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia getListCategory() ejecutar el metodo getAllCategory() de serviceCategory', () => {
    let mockgroup: any;

    let spy = spyOn(serviceCategory, 'getAllCategory').and.callThrough();

    component.getListCategory(mockgroup);

    expect(spy).toHaveBeenCalledWith(mockgroup);
  });

  it('Deberia existir el metodo getListGroup()', () => {
    let spy = spyOn(component, 'getListGroup').and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia ejecutarse getListCategoryGroup de categoryService despues de ejecutarse getListGroup()', () => {
    let spy = spyOn(serviceCategory, 'getListCategoryGroup').and.callThrough();

    component.getListGroup();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia getEmailForm() ejecutar el metodo getListEmailForm() de emailFormService despues de ejecutarse getEmailForm()', () => {
    let spy = spyOn(emailFormService,'getListEmailForm').and.callThrough();

    component.getEmailForm();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo updateSlug(event)', () => {
    expect(component.updateSlug).toBeTruthy();
  });

  it('Deberia el valor de this.advantageInfo.slug ser UtilsCode.cleanString(event), despues de ejecutarse updateSlug(event)', () => {
    let mockevent = "evento";

    component.updateSlug(mockevent);

    let result = UtilsCode.cleanString(mockevent);

    expect(component.advantageInfo.slug).toBe(result);
  });

  it('Deberia ser false la propiedad submittedBenefit despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.submittedBenefit).toBeFalsy();
  });

  it('Deberia ser un objeto la propiedad advantageInfo despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.advantageInfo).toEqual(jasmine.any(Object));
  });

  it('Deberia la propiedad advantageInfo.listPrice ser igual a result despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{"id": "123", "moneda": "soles"}';

    component.newAdvantage();

    let result = JSON.parse(component.listTypePrice);

    expect(component.advantageInfo.listPrice).toEqual(result);
  });

  it('Deberia la propiedad advantageInfo.listDetailExperience ser igual a result despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{"id": "123", "moneda": "soles"}';
    component.listInitialDetail = [
      { name: "Título", value: "titulo" },
      { name: "Descripción", value: "description" },
      { name: "Creada por", value: "creada_por" },
      { name: "Condiciones", value: "condiciones" }
    ];

    component.newAdvantage();

    let result = JSON.parse(JSON.stringify(component.listInitialDetail));

    expect(component.listDetailExperience).toEqual(result);
  });

  it('Deberia ser un arreglo vacio la propiedad listNewAdvantage despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.lisNewAdvantage).toEqual([]);
  });

  it('Deberia ser un arreglo vacio la propiedad imageMain despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.imageMain).toEqual([]);
  });

  it('Deberia ser un arreglo vacio la propiedad listDetailAdvantage despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.listDetailAdvantage).toEqual([]);
  });

  it('Deberia ser true la propiedad showAddDetail despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.showAddDetail).toBeTruthy();
  });

  it('Deberia ser null la propiedad updateDetailBenefit despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.updateDetailBenefit).toBeNull();
  });

  it('Deberia ser true la propiedad createBenefit despues de ejecutarse newAdvantage()', () => {
    component.listTypePrice = '{}';

    component.newAdvantage();

    expect(component.createBenefit).toBeTruthy();
  });

  it('Deberia existir el metodo newActionForm()', () => {
    let spy = spyOn(component, 'newActionForm').and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia this[field] ser [ Object({  }) ], despues de ejecutarse newActionForm()', () => {
    let mockfield = 1;

    component[mockfield] = [];

    component.newActionForm(mockfield);

    expect(component[mockfield]).toEqual([{}]);
  });

  it('Deberia existir el metodo openAdvantage()', () => {
    let spy = spyOn(component, 'openAdvantage').and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia la propiedad oldBenefitData ser igual a result, despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    let result = Object.assign({}, mockinfoOpen);

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(component.oldBenefitData).toEqual(result);
  });

  it('Deberia la propiedad advantageInfo.title ser igual a result, despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    let result = mockinfoOpen.title;

    expect(component.advantageInfo.title).toEqual(result);
  });

  it('Deberia la propiedad advantageInfo.title ser igual a result, despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    let result = mockinfoOpen.active;

    expect(component.advantageInfo.active).toEqual(result);
  });

  it('Deberia la propiedad advantageInfo._id ser igual a result, despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    let result = mockinfoOpen._id;

    expect(component.advantageInfo._id).toEqual(result);
  });

  it('Deberia la propiedad advantageInfo.listPrice ser igual a result, despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    let result = mockinfoOpen.listPrice;

    expect(component.advantageInfo.listPrice).toEqual(result);
  });

  it('Deberia agregarse infoOpen.image_thumbnail a lisNewAdvantage si infoOpen.image_thumbnail es "true", despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(component.lisNewAdvantage).toEqual([mockinfoOpen.image_thumbnail]);
  });

  it('Deberia agregarse infoOpen.image_description a imageMain si infoOpen.image_description es "true", despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(component.imageMain).toEqual([mockinfoOpen.image_description]);
  });

  it('Deberia la propiedad showAddDetail ser "true", despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(component.showAddDetail).toBeTruthy();
  });

  it('Deberia la propiedad updateDetailBenefit tomar el valor de position, despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(component.updateDetailBenefit).toBe(mockposition);
  });

  it('Deberia la propiedad createBenefit ser "false", despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(component.createBenefit).toBeFalsy();
  });

  it('Deberia llamarse al metodo updateSlug(), si this.advantageInfo.slug es "false", despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    component.advantageInfo = {slug: false, title: "title"};

    let spy = spyOn(component, "updateSlug").and.callThrough();

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(spy).toHaveBeenCalledWith(component.advantageInfo.title);
  });

  it('Deberia llamarse al metodo cleanTypeDetail(), despues de ejecutarse openAdvantage()', () => {
    let mockinfoOpen = {description: "descripcion", title: "titulo", active: false, _id: "af1",
    listPrice: 10, image_thumbnail: "imagen", image_description: "imagen descripcion"};
    let mockposition = 1;

    let spy = spyOn(component, "cleanTypeDetail").and.callThrough();

    component.openAdvantage(mockinfoOpen, mockposition);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia ejecutarse el metodo open() de mapsLocation despues de ejecutarse openMap()', () => {
    let spy = spyOn(component.mapsLocation, 'open');

    component.openMap();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia exitir el metodo recursiveCheckedCheck', () => {
    expect(component.recursiveCheckedCheck).toBeTruthy();
  });

  it('Deberia redireccionar a /system/experience despues de ejecutarse returnExperience()', () => {
    let spy = spyOn(router,'navigate').and.callThrough();

    component.returnExperience();

    expect(spy).toHaveBeenCalledWith(["/system/experience"]);
  });

  it('Deberia ser true la propiedad submitted despues de ejecutarse saveExperience()', () => {
    component.saveExperience();

    expect(component.submitted).toBeTruthy();
  });

  it('Deberia existir el metodo saveExperience()', () => {
    expect(component.saveExperience).toBeTruthy();
  });

  it('Deberia la propiedad submitted ser "true", despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(true);
    
    component.saveExperience();
    
    expect(component.submitted).toBeTruthy();
  });

  it('Deberia llamarse al metodo searchCategoryChecked() si this.listCategory es true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(true);

    let spy = spyOn(component, "searchCategoryChecked").and.callThrough();
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledTimes(component.listCategory.length);
  });

  it('Deberia llamarse al metodo sendMessage() si this.experienceForm.invalid es true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(true);

    let spy = spyOn(middleService, "sendMessage").and.callThrough();
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledWith("Experiencias", "Revise los campos obligatorios", "error");
  });

  it('Deberia ser el valor de this.experienceForm.get("detail_list") igual a this.listDetailProduct si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("detail_list").value).toBe(component.listDetailProduct);
  });

  it('Deberia ser el valor de this.experienceForm.get("images_link") igual a this.lisAddPicture si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisAddPicture = "picture";

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("images_link").value).toBe(component.lisAddPicture);
  });

  it('Deberia ser el valor de this.experienceForm.get("list_address") igual a this.lisAddPicture si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listAddress = ["address"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("list_address").value).toBe(component.listAddress);
  });

  it('Deberia ser el valor de this.experienceForm.get("videos_link") igual a this.lisAddGaleryVideos si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisAddGaleryVideos = ["video"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("videos_link").value).toBe(component.lisAddGaleryVideos);
  });

  it('Deberia ser el valor de this.experienceForm.get("list_action_email_form") igual a this.listActionEmailForm si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("list_action_email_form").value).toBe(component.listActionEmailForm);
  });

  it('Deberia ser el valor de this.experienceForm.get("list_main_action_email_form") igual a this.listMainAccionEmailForm si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("list_main_action_email_form").value).toBe(component.listMainAccionEmailForm);
  });

  it('Deberia ser el valor de this.experienceForm.get("list_advantage") igual a this.listAdvantage si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listAdvantage = [{description: [{title: "titulo 2"}]}, {description: [{title: "titulo 1"}]}];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("list_advantage").value).toBe(component.listAdvantage);
  });

  it('Deberia ser el valor de this.experienceForm.get("categories") igual a this.selectCategory si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.selectCategory = ["categoria 1", "categoria 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("categories").value).toBe(component.selectCategory);
  });

  it('Deberia ser el valor de this.experienceForm.get("categories") igual a this.selectCategory si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.selectCategory = ["categoria 1", "categoria 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("categories").value).toBe(component.selectCategory);
  });

  it('Deberia ser el valor de this.experienceForm.get("image_cover") igual a this.lisMainAddPicture[0] si continueButton y continueAction son true y lisMainAddPicture.length es mayor que 0, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisMainAddPicture = ["main 1", "main 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("image_cover").value).toBe(component.lisMainAddPicture[0]);
  });

  it('Deberia ser el valor de this.experienceForm.get("galery_videos") igual a this.lisAddGaleryVideos si continueButton y continueAction son true y lisAddGaleryVideos.length es mayor que 0, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisAddGaleryVideos = ["video 1", "video 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("galery_videos").value).toBe(component.lisAddGaleryVideos);
  });

  it('Deberia ser el valor de this.experienceForm.get("image_logo_cover") igual a this.lisMainLogoAddPicture[0] si continueButton y continueAction son true y lisMainLogoAddPicture.length es mayor que 0, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisMainLogoAddPicture = ["pic 1", "pic 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("image_logo_cover").value).toBe(component.lisMainLogoAddPicture[0]);
  });

  it('Deberia ser el valor de this.experienceForm.get("image_banner") igual a this.lisBannerAddPicture[0] si continueButton y continueAction son true y lisBannerAddPicture.length es mayor que 0, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisBannerAddPicture = ["banpic 1", "banpic 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("image_banner").value).toBe(component.lisBannerAddPicture[0]);
  });

  it('Deberia ser el valor de this.experienceForm.get("image_logo_banner") igual a this.lisBannerLogoAddPicture[0] si continueButton y continueAction son true y lisBannerLogoAddPicture.length es mayor que 0, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.lisBannerLogoAddPicture = ["lisban 1", "lisban 2"];

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(component.experienceForm.get("image_logo_banner").value).toBe(component.lisBannerLogoAddPicture[0]);
  });

  it('Deberia llamarse al metodo sendLoading() de middleService si continueButton y continueAction son true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo update() de experienceService si continueButton y continueAction son true y this.idExperience es true, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "name", email_form: "email", type_button: "primario", email: "email"}];
    component.idExperience = "1sskd2";

    let spy = spyOn(experienceService, "update").and.callThrough();

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledWith(component.idExperience, component.experienceForm.value);
  });

  it('Deberia llamarse al metodo sendMessage() de middleService si continueButton es false, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: "null", email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: null, email_form: "email", type_button: "primario", email: "email"}];

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledWith("Experiencia","Revise los botones de acción de beneficios, todos los campos son obligatorios","error");
  });

  it('Deberia llamarse al metodo sendMessage() de middleService si continueAction es false, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: null, email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: "null", email_form: "email", type_button: "primario", email: "email"}];

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledWith("Experiencia","Revise los botones de de acción, todos los campos son obligatorios","error");
  });

  it('Deberia llamarse al metodo sendMessage() de middleService si continueButton y continueAction es false, despues de ejecutarse saveExperience()', () => {
    component.listCategory = ["categoria 1", "categoria 2"];
    component.listMainAccionEmailForm = [{button_name: null, email_form: "email", type_button: "primario", email: "email"}];
    component.listActionEmailForm = [{button_name: null, email_form: "email", type_button: "primario", email: "email"}];

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    spyOnProperty(component.experienceForm,"invalid",'get').and.returnValue(false);
    
    component.saveExperience();
    
    expect(spy).toHaveBeenCalledWith("Experiencia","Revise los botones de de acción, todos los campos son obligatorios","error");
  });

  it('xDeberia existir el metodo showWindowMultimedia()', () => {
    expect(component.showWindowMultimedia).toBeTruthy();
  });

  it('Deberia existir el metodo getInfoMap()', () => {
    expect(component.getInfoMap).toBeTruthy();
  });

  it('Deberia la propiedad listAddress hacer el uso del metodo push para agregar el objecto map, despues de ejecutarse getInfoMap()', () => {
    let mockinfoMaps = {lat: "0", lng: "0", address: "lima", phone: ""};

    component.getInfoMap(mockinfoMaps);

    expect(component.listAddress).toContain(mockinfoMaps);
  });
});
