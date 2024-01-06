import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';
import { GridComponent } from '../components/grid/grid.component';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { FieldValuePipe } from 'src/app/shared/pipe/field-value.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../components/header/header.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrudExperienceComponent } from './crud-experience/crud-experience.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SaveVideoPipe } from 'src/app/shared/pipe/save-video.pipe';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let headerService: HeaderService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceComponent, GridComponent, DialogConfirmComponent, FieldValuePipe, SaveVideoPipe, CrudExperienceComponent ],
      imports: [ReactiveFormsModule, FormsModule, MatTooltipModule, HttpClientTestingModule, FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot(), RouterTestingModule.withRoutes([{path: "system/experience/new", component: CrudExperienceComponent}])],
      providers: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    headerService = TestBed.get(HeaderService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('Deberia crearse correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar a serviceHeader.sendTitle despues de ngOnInit()', () => {
    spyOn(headerService,'sendTitle').and.callThrough();

    component.ngOnInit();

    expect(headerService.sendTitle).toHaveBeenCalledWith("Experiencias");
  });

  it('Deberia ser el gridlist.columns igual a mockColumns',()=>{
    const mockColumns = [{
      field: 'name',
      title: 'Experiencia',
      type: 'text'
    }];

    expect(component.gridList.columns).toEqual(mockColumns);
  });

  it('Deberia ser 20 la pagQuantity de la gridList',() => {
    expect(component.gridList.config.pagQuantity).toEqual(20);
  });

  it('Deberia ser /experience/search el getService de la gridList',()=>{
    expect(component.gridList.config.getService).toEqual('/experience/search');
  });

  it('Deberia ser /experience el deleteService de la gridList', () => {
    expect(component.gridList.config.deleteService).toEqual('/experience');
  });

  it('Deberia ser system/experience/detail/ el redirect de la gridList', () => {
    expect(component.gridList.config.redirect).toEqual('system/experience/detail/');
  });

  it('Deberia ser Experiencia la entity de la gridList',() => {
    expect(component.gridList.config.entity).toEqual('Experiencia');
  });

  it('Deberia redirigir a /system/experience/new despues de la funcion createExperience()', () => {
    let spy = spyOn(router,'navigate').and.callThrough();

    component.createExperience();

    expect(spy).toHaveBeenCalledWith(['/system/experience/new']);
  });
});
