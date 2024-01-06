import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { CrudBrandComponent } from './crud-brand.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatSlideToggleModule, MatTooltipModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SaveVideoPipe } from 'src/app/shared/pipe/save-video.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderService } from '../../components/header/header.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { BrandService } from 'src/app/shared/service/brand.service';
import { Router } from '@angular/router';
import { BrandComponent } from '../brand.component';

fdescribe('CrudBrandComponent', () => {
  let component: CrudBrandComponent;
  let fixture: ComponentFixture<CrudBrandComponent>;
  let headerService: HeaderService;
  let middleService: MiddleService;
  let brandService: BrandService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
        MatSlideToggleModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([ {path: "system/brand", component: BrandComponent }])
         ],
      declarations: [ 
        CrudBrandComponent,
        BrandComponent, 
        DialogConfirmComponent,
        SaveVideoPipe ],
      providers: [ {provide: ComponentFixtureAutoDetect, useValue: true} ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBrandComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    headerService = TestBed.get(HeaderService);
    middleService = TestBed.get(MiddleService);
    brandService = TestBed.get(BrandService);
    router = TestBed.get(Router);
  });

  it('Deberia crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia la propiedad isSupplier inicializar con un valor igual a true', () => {
    expect(component.isSupplier).toBeTruthy();
  });

  it('Deberia la propiedad submitted inicializar con un valor igual a false', () => {
    expect(component.submitted).toBeFalsy();
  });

  it('Deberia la propiedad showMoreButton inicializar con un valor igual a false', () => {
    expect(component.showMoreButton).toBeFalsy();
  });

  it('Deberia la propiedad idBrand inicializar con un valor igual a false', () => {
    expect(component.idBrand).toBeFalsy();
  });

  it('Deberia la propiedad lisAddPicture inicializar con un valor igual a []', () => {
    expect(component.lisAddPicture).toEqual([]);
  });

  it('Deberia la propiedad lisAddPictureMobile inicializar con un valor igual a []', () => {
    expect(component.lisAddPictureMobile).toEqual([]);
  });

  it('Deberia la propiedad lisAddLogoPicture inicializar con un valor igual a []', () => {
    expect(component.lisAddLogoPicture).toEqual([]);
  });

  it('Deberia la propiedad lisAddLogoPictureMobile inicializar con un valor igual a []', () => {
    expect(component.lisAddLogoPictureMobile).toEqual([]);
  });

  it('Deberia la propiedad lisAddGaleryPicture inicializar con un valor igual a []', () => {
    expect(component.lisAddGaleryPicture).toEqual([]);
  });

  it('Deberia la propiedad lisAddGaleryVideos inicializar con un valor igual a []', () => {
    expect(component.lisAddGaleryVideos).toEqual([]);
  });

  it('Deberia la propiedad lisAddBanner inicializar con un valor igual a []', () => {
    expect(component.lisAddBanner).toEqual([]);
  });

  it('Deberia la propiedad lisAddLogoBanner inicializar con un valor igual a []', () => {
    expect(component.lisAddLogoBanner).toEqual([]);
  });

  it('Deberia la propiedad infoCompare inicializar con un valor igual a {}', () => {
    expect(component.infoCompare).toEqual({});
  });

  it('Deberia la propiedad existChange inicializar con un valor igual a {}', () => {
    expect(component.existChange).toEqual({});
  });

  it('Deberia la propiedad url_attachment inicializar con un valor igual a localStorage.getItem("url_attachment")', () => {
    let mockresult = localStorage.getItem("url_attachment");

    expect(component.url_attachment).toBe(mockresult);
  });

  it('Deberia llamarse a sendTitle() de headerService, despues de ejecutarse ngOnInit()', () => {
    let spy = spyOn(headerService, "sendTitle").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith("Marcas");
  });

  it('Deberia la propiedad switchNewData tomar un valor igual a false, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.switchNewData).toBeFalsy();
  });

  it('Deberia la propiedad headerFixed tomar un valor igual a false, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.headerFixed).toBeFalsy();
  });

  it('Deberia la propiedad brandForm ser del tipo FormGroup, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.brandForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia la propiedad videoForm ser del tipo FormGroup, despues de ejecutarse ngOnInit()', () => {
    component.ngOnInit();

    expect(component.videoForm).toEqual(jasmine.any(FormGroup));
  });

  it('Deberia ejecutarse getDataBrand() si idBrand es true, despues de ejecutarse ngOnInit()', () => {
    component.idBrand = true;

    let spy = spyOn(component, "getDataBrand").and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir la funcion f()', () => {
    let spy = spyOnProperty(component,"f", "get").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia existir el metodo g()', () => {
    let spy = spyOnProperty(component,"g", "get").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia existir el metodo setImageCompare()', () => {
    let spy = spyOn(component, "setImageCompare").and.callThrough();

    expect(spy).toBeTruthy();
  });

  it('Deberia modificar this[componentName].config con los parametros enviados, despues de ejecutar sendImageCompare', () => {
    let mockarrayActually = [1,2,3];
    let mockarrayChange = [1,2];
    let mockcomponentName = "productos";
    let result =  {config: {
      arrayActually: [1,2,3], arrayChange: [1,2]
    }}

    component[mockcomponentName] = {config: {arrayActually: [], arrayChange: []}};

    component.sendImageCompare(mockarrayActually, mockarrayChange, mockcomponentName);

    expect(component[mockcomponentName].config).toEqual(result.config);
  });

  xit('Deberia la propiedad switchNewData cambiar a lo inverso, despues de ejecutarse seeChangeRequest()', () => {
    component.switchNewData = true;
    let mockstateswitchNewData = component.switchNewData;

    //component.seeChangeRequest();

    expect(component.switchNewData).not.toBe(mockstateswitchNewData);
  });

  xit('Deberia llamarse al metodo fillInfoBrand() si switchNewData es false, despues de ejecutarse seeChangeRequest()', () => {
    component.switchNewData = false;

    component.dataReplace = {isSupplier: true};

    let spy = spyOn(component, "fillInfoBrand").and.callThrough();

    //component.seeChangeRequest();

    expect(spy).toHaveBeenCalledWith(component.dataReplace);
  });

  xit('Deberia llamarse al metodo getDataBrand() si switchNewData es true, despues de ejecutarse seeChangeRequest()', () => {
    component.switchNewData = true;

    let spy = spyOn(component, "getDataBrand").and.callThrough();

    //component.seeChangeRequest();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia existir el metodo addVideo()', () => {
    expect(component.addVideo).toBeTruthy();
  });

  it('Deberia acceder al metodo push() de la propiedad lisAddGaleryVideos si ingresa al if()', () => {
    component.videoForm.controls.url.setValue("url");

    let spy = spyOn(component.lisAddGaleryVideos, 'push').and.callThrough();
    
    component.addVideo();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia addVideo() llamar al metodo reset() de la propiedad videoForm', () => {
    component.videoForm.controls.url.setValue("url");

    let spy = spyOn(component.videoForm,'reset').and.callThrough();

    component.addVideo();

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia llamarse al metodo deleteBrand() si $event.accept es true, despues de ejecutarse acceptModal()', () => {
    let mockevent = {accept: true};

    let spy = spyOn(component, "deleteBrand").and.callThrough();

    component.acceptModal(mockevent);

    expect(spy).toHaveBeenCalled()
  });

  it('Deberia llamarse el metodo answerRequest(), despues de ejecutarse acceptRequest()', () => {
    let spy = spyOn(component, "answerRequest").and.callThrough();

    component.acceptRequest();

    expect(spy).toHaveBeenCalledWith("approve");
  });

  it('Deberia llamarse al metodo answerRequest() si denyMessage es true, despues de ejecutarse denyRequest()', () => {
    let mockmessageDeny = "Denegado";
    component.denyMessage = 'denegado';
    
    let spy = spyOn(component, "answerRequest").and.callThrough();

    component.denyRequest(mockmessageDeny);

    expect(spy).toHaveBeenCalledWith("deny", mockmessageDeny);
  });

  it('Deberia la propiedad showDenyMessage tomar el valor de false si denyMessage es true, despues de ejecutarse denyRequest()', () => {
    let mockmessageDeny = "Denegado";
    component.denyMessage = 'denegado';

    component.denyRequest(mockmessageDeny);

    expect(component.showDenyMessage).toBeFalsy();
  });

  it('Deberia la propiedad showDenyMessage tomar el valor de false, despues de ejecutarse closeMessageDeny()', () => {
    component.closeMessageDeny();

    expect(component.showDenyMessage).toBeFalsy();
  });

  it('Deberia la propiedad denyMessage tomar el valor de null, despues de ejecutarse openMessageDeny()', () => {
    component.openMessageDeny();

    expect(component.denyMessage).toBeNull();
  });

  it('Deberia la propiedad showDenyMessage tomar el valor de true, despues de ejecutarse openMessageDeny()', () => {
    component.openMessageDeny();

    expect(component.showDenyMessage).toBeTruthy();
  });

  it('Deberia llamarse al metodo sendLoading() de middleService, despues de ejecutarse answerRequest()', () => {
    let mockanswer: any;
    let mockmessageDeny: any;

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.answerRequest(mockanswer, mockmessageDeny);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo answerRequest() de brandService, despues de ejecutarse answerRequest()', () => {
    let mockanswer: any;
    let mockmessageDeny: any;

    let spy = spyOn(brandService, "answerRequest").and.callThrough();

    component.answerRequest(mockanswer, mockmessageDeny);

    expect(spy).toHaveBeenCalled();
  });

  it('Deberia la propiedad showMoreButton invertirse su valor, despues de ejecutarse changeStatusMore()', () => {
    component.showMoreButton = true;
    let mockstateshowMoreButton = component.showMoreButton;

    component.changeStatusMore();

    expect(component.switchNewData).not.toBe(mockstateshowMoreButton);
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

  it('Deberia llamarse al metodo sendLoading() de middleService, despues de ejecutarse deleteBrand()', () => {
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.deleteBrand();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo delete() de brandService, despues de ejecutarse deleteBrand()', () => {
    component.idBrand = true;

    let spy = spyOn(brandService, "delete").and.callThrough();

    component.deleteBrand();

    expect(spy).toHaveBeenCalledWith(component.idBrand);
  });

  it('Deberia la propiedad isSupplier tomar el valor de dataBrand.isSupplier, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};
    component.isSupplier = false;

    component.fillInfoBrand(mockdataBrand);

    expect(component.isSupplier).toBeTruthy();
  });

  it('Deberia la propiedad lisAddPicture tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddPicture).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddPicture, image_link, compareListPicture , despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddPicture", "image_link", "compareListPicture");
  });

  it('Deberia la propiedad lisAddPictureMobile tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddPictureMobile).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddPictureMobile, image_link_mobile, compareListPicture, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddPictureMobile", "image_link_mobile", "compareListPicture");
  });

  it('Deberia la propiedad lisAddBanner tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddBanner).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddBanner, image_banner, compareBannerImage, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, image_banner: "image", request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change,
      "lisAddBanner", "image_banner", "compareBannerImage");
  });

  it('Deberia la propiedad lisAddLogoBanner tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddLogoBanner).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddLogoBanner, image_logo_banner, compareLogoImage, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddLogoBanner", "image_logo_banner", "compareLogoImage");
  });

  it('Deberia la propiedad lisAddLogoPicture tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddLogoPicture).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddLogoPicture, image_logo_link, compareLisAddLogoPicture, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddLogoPicture", "image_logo_link", "compareLisAddLogoPicture");
  });

  it('Deberia la propiedad lisAddLogoPictureMobile tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddLogoPictureMobile).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddLogoPictureMobile, image_logo_link_mobile, compareLisAddLogoPictureMobile, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddLogoPictureMobile", "image_logo_link_mobile", "compareLisAddLogoPictureMobile");
  });

  it('Deberia la propiedad lisAddGaleryPicture tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddGaleryPicture).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddGaleryPicture, galery_image, compareLisAddGaleryPicture, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddGaleryPicture", "galery_image", "compareLisAddGaleryPicture");
  });

  it('Deberia la propiedad lisAddGaleryVideos tomar el valor de [], despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true};

    component.fillInfoBrand(mockdataBrand);

    expect(component.lisAddGaleryVideos).toEqual([]);
  });

  it('Deberia llamarse al metodo setImageCompare con los parametros mockdataBrand.request_change, lisAddGaleryVideos, galery_videos, compareLisAddGaleryVideos, despues de ejecutarse fillInfoBrand()', () => {
    let mockdataBrand = {isSupplier: true, request_change: true};

    let spy = spyOn(component, "setImageCompare").and.callThrough();

    component.fillInfoBrand(mockdataBrand);

    expect(spy).toHaveBeenCalledWith(mockdataBrand.request_change, 
      "lisAddGaleryVideos", "galery_videos", "compareLisAddGaleryVideos");
  });

  it('Deberia llamarse al metodo sendLoading() de middleService, despues de ejecutarse getDataBrand()', () => {
    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.getDataBrand();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('Deberia llamarse al metodo getById() de brandService, despues de ejecutarse getDataBrand()', () => {
    component.idBrand = true;

    let spy = spyOn(brandService, "getById").and.callThrough();

    component.getDataBrand();

    expect(spy).toHaveBeenCalledWith(component.idBrand);
  });

  it('Deberia llamarse al metodo navigate() de router y dirigirse a [localStorage.getItem("returnListRequest")], despues de ejecutarse returnBrand()', () => {
    let spy = spyOn(router, "navigate").and.returnValue(true);

    localStorage.setItem("returnListRequest", "/");

    component.returnBrand();

    expect(spy).toHaveBeenCalledWith([localStorage.getItem("returnListRequest")]);
  });

  it('Deberia llamarse al metodo navigate() de router y dirigirse a ["/system/brand"], despues de ejecutarse returnBrand()', () => {
    let spy = spyOn(router, "navigate").and.callThrough();

    localStorage.setItem("returnListRequest", "");

    component.returnBrand();

    expect(spy).toHaveBeenCalledWith(["/system/brand"]);
  });

  it('Deberia llamarse al metodo show() de dialogConfirm, despues de ejecutarse OpenModalDeleteConfirm()', () => {
    component.brandForm.controls.name.setValue("marca");

    let mockmessageModal = "¿Esta seguro de eliminar la marca " + component.brandForm.value.name + " ?";
    
    let spy = spyOn(component.dialogConfirm, "show").and.callThrough();

    component.OpenModalDeleteConfirm();

    expect(spy).toHaveBeenCalledWith("Eliminar Marca", mockmessageModal);
  });

  it('Deberia la propiedad submitted tomar el valor de true, despues de ejecutarse saveBrand()', () => {
    let mocknavEdit: any;

    component.saveBrand(mocknavEdit);

    expect(component.submitted).toBeTruthy();
  });

  it('Deberia llamarse al metodo sendLoading() de middleService si brandForm.invalid es false, despues de ejecutarse saveBrand()', () => {
    let mocknavEdit: any;

    component.brandForm.controls.name.setValue('marca test');
    component.brandForm.controls.description.setValue('descripcion');

    let spy = spyOn(middleService, "sendLoading").and.callThrough();

    component.saveBrand(mocknavEdit);

    expect(spy).toHaveBeenCalledWith(true);
  });
  
  it('Deberia llamarse al metodo updateBrand() de brandService si brandForm.invalid es false y idBrand es true, despues de ejecutarse saveBrand()', () => {
    let mocknavEdit: any;
    let mockdatasend = { name: 'marca test', friendly_url: 'marca_test', description: 'descripcion', image: null, salient: null, image_link: '', image_logo_link: '', image_banner: '', image_logo_banner: '', galery_image: [  ], galery_videos: [  ] };
    
    component.idBrand = true;

    component.brandForm.controls.name.setValue('marca test');
    component.brandForm.controls.description.setValue('descripcion');

    let spy = spyOn(brandService, "updateBrand").and.callThrough();

    component.saveBrand(mocknavEdit);

    expect(spy).toHaveBeenCalledWith(component.idBrand, mockdatasend);
  });

  it('Deberia llamarse al metodo saveBrand() de brandService si brandForm.invalid es false y idBrand es false, despues de ejecutarse saveBrand()', () => {
    let mocknavEdit: any;
    let mockdatasend = { name: 'marca test', friendly_url: 'marca_test', description: 'descripcion', image: null, salient: null, image_link: '', image_logo_link: '', image_banner: '', image_logo_banner: '', galery_image: [  ], galery_videos: [  ] };
    
    component.idBrand = false;

    component.brandForm.controls.name.setValue('marca test');
    component.brandForm.controls.description.setValue('descripcion');

    let spy = spyOn(brandService, "saveBrand").and.callThrough();

    component.saveBrand(mocknavEdit);

    expect(spy).toHaveBeenCalledWith(mockdatasend);
  });

  it('Deberia llamarse al metodo sendMessage() de middleService si brandForm.invalid es true, despues de ejecutarse saveBrand()', () => {
    let mocknavEdit: any;
    let mockdatasend: any;
    
    component.idBrand = false;

    spyOnProperty(component.brandForm,"invalid",'get').and.returnValue(true);

    let spy = spyOn(middleService, "sendMessage").and.callThrough();

    component.saveBrand(mocknavEdit);

    expect(spy).toHaveBeenCalledWith("Marca", "Revise los campos obligatorios", "error");
  });

  it('xDeberia existir el metodo showWindowMultimedia()', () => {
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
});
