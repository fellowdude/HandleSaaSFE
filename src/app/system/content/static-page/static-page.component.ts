import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy
} from '@angular/core';
import { StaticPageService } from 'src/app/shared/service/static-page.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { DialogAddSectionComponent } from '../../components/dialog-add-section/dialog-add-section.component';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../components/header/header.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { MultimediaGalleryComponent } from '../../components/multimedia-gallery/multimedia-gallery.component';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private _staticPageService: StaticPageService,
    private middleService: MiddleService,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.subscription = this.middleService
      .getUpdateDeleteItem()
      .subscribe(dataMessage => {
        this.savePageStatic();
      });
    this.activatedRoute.params.subscribe(params => {
      this.idPageStatic = params.idPage;
    });
  }
  idPageStatic: any;
  dataStatic: any;
  listDinamicPage: any;
  objChange: any;
  showModalNewSection: boolean;
  namePage: string;
  public: boolean;
  apiNamePage: string;
  headerFixed: boolean;
  subscription: Subscription;
  @ViewChild('addNewSection', { static: true })
  addNewSection: DialogAddSectionComponent;
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;

  @ViewChild('dialogDelete', { static: true })
  dialogConfirm: DialogConfirmComponent;

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.showModalNewSection = false;
    this.listDinamicPage = [];
    this.dataStatic = {};
    this.namePage = null;
    this.public = false;
    this.apiNamePage = null;
    this.headerFixed = false;
    this.getListDinamic();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  showWindowMultimedia(event) {

    const { content, position, maxSize, maxDimension } = event;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    this.multimediaGallery.config.noValidDimension = false;
    content[position].changeImage = true;
    this.multimediaGallery.listAttachment = [];
    this.objChange = content[position];
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }

  setSeleccionado(event) {
    if (event) {
      this.objChange.value = event;
      this.objChange.url_attachment = localStorage.getItem('url_attachment');
    }
  }

  addSection() {
    if (this.namePage) {
      this.addNewSection.config.title = 'Nueva Sección';
      this.addNewSection.config.placeholder = 'Nombre de la sección';
      this.addNewSection.openModal();
    } else {
      this.middleService.sendMessage(
        'Páginas estáticas',
        'Debe ingresar un nombre a la página',
        'error'
      );
    }
  }
  createNewSection(nameNewSection) {
    if (nameNewSection) {
      const nameApiSection = UtilsCode.cleanString(nameNewSection);
      this.listDinamicPage.push({
        name: nameNewSection,
        api_url_api: nameApiSection,
        content: []
      });
      this.closeModal();
    }
  }

  changeNameApi() {
    !this.idPageStatic && (this.apiNamePage = UtilsCode.cleanString(this.namePage));
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  confirmDeleteItem() {
    this.dialogConfirm.show(
      'Eliminar Página Estática',
      '¿Esta seguro de eliminar?'
    );
  }

  deletItem() {
    this.middleService.sendLoading(true);
    this._staticPageService.delete(this.idPageStatic).subscribe(
      deleteInfo => {
        this.middleService.sendLoading(false);
        this.router.navigate(['/system/static-page']);
        this.middleService.sendMessage(
          'Páginas Estáticas',
          'Se ha eliminado correctamente',
          'ok'
        );
      },
      error => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Páginas Estáticas',
          error.error.message,
          'error'
        );
      }
    );
  }

  savePageStatic() {
    const dataSave: any = {};
    dataSave.static_name = this.namePage;
    dataSave.public = this.public;
    dataSave.api_rest_name = this.apiNamePage;
    dataSave.content_page = this.listDinamicPage;
    this.middleService.sendLoading(true);
    if (this.idPageStatic) {
      this._staticPageService.update(this.idPageStatic, dataSave).subscribe(
        dataCreate => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Página Estática',
            'La página estática ha sido actualizada correctamente',
            'ok'
          );
          this.router.navigate(['/system/static-page']);
        },
        error => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Página Estática',
            error.error.message,
            'error'
          );
        }
      );
    } else {
      this._staticPageService.savePage(dataSave).subscribe(
        (dataCreate: any) => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Página Estática',
            'Página estática creada correctamente',
            'ok'
          );
          this.router.navigate(['/system/static-page']);
        },
        error => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Página Estática',
            error.error.message,
            'error'
          );
        }
      );
    }
  }
  closeModal() {
    this.showModalNewSection = false;
  }

  getListDinamic() {
    if (this.idPageStatic) {
      this.middleService.sendLoading(true);
      this._staticPageService.getIngoPage(this.idPageStatic).subscribe(
        (dataCreate: any) => {
          this.middleService.sendLoading(false);
          if (dataCreate.static_name) {
            this.namePage = dataCreate.static_name;
            this.public = dataCreate.public;
            this.apiNamePage = dataCreate.api_rest_name;
            this.listDinamicPage = dataCreate.content_page;
          }
        },
        error => {
          console.log(error);
          this.middleService.sendMessage(
            'Página Estática',
            error.error.message,
            'error'
          );
        }
      );
    }
  }
  returnListStatic() {
    this.router.navigate(['/system/static-page']);
  }
}
