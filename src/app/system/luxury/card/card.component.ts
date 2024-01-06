import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../../components/grid/grid.component';
import { UploadExcelComponent } from '../../components/upload-excel/upload-excel.component';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../../components/header/header.service';
import { CardService } from '../../../shared/service/card.service';
import { Router } from '@angular/router';
import { MassiveCardsComponent } from './massive-cards/massive-cards.component';
import { RolService } from 'src/app/shared/service/rol.service';
import { LdvService } from 'src/app/shared/service/ldv.service';

interface IDocumentTypeSave {
  _id: string,
  value: string
}
interface IDocumentSave {
  number: string,
  type: IDocumentTypeSave
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  addCardAccess: boolean
  listCardAccess: boolean
  listResultAddCard: Array<any>;
  showSummary: boolean;
  showAssociateCode: boolean;
  associateCode: string;
  headerFixed = false;
  document = {} as IDocumentSave
  modelInfo: any
  listTypeDocumentSearch = [] as Array<any>
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  @ViewChild('uploadExcel', { static: true }) uploadExcel: UploadExcelComponent;
  @ViewChild('cardUploading', { static: true }) cardUploading: MassiveCardsComponent;

  constructor(
    private router: Router,
    private _middleService: MiddleService,
    private _roleService: RolService,
    private headerService: HeaderService,
    private cardService: CardService,
    private ldvService: LdvService
  ) { }

  ngOnInit() {
    this.getListTypeDocument()
    this.validAccessPOST()
    this.validAccessGET()
    this.addCardAccess = false
    this.listCardAccess = false
    this.headerService.sendTitle('Códigos de Socio');
    this.showSummary = false;
    this.listResultAddCard = [];

    const date = new Date().toISOString().substring(0, 10);

    this.uploadExcel.config = {
      title: 'Subir códigos de socio',
      urlService: '/enterprise-middleware/upload-file/add-card',
      apiDownload: '/enterprise-middleware/download-template/download-card-template',
      fileDownloadName: 'Subir tarjetas nuevas ' + date + '.xlsx',
      readingLocal: true
    };

    this.gridList.columns = [
      {
        field: 'number',
        title: 'Número de código de socio',
        type: 'text',
        align: 'center'
      },
      {
        field: 'used',
        title: 'Estado',
        type: 'boolean',
        align: 'center',
        replace: [
          {
            value: false,
            replace: 'Libre',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a'
          },
          {
            value: true,
            replace: 'Utilizado',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9'
          }
        ]
      },
      {
        field: 'create_date',
        title: 'Fecha de creación',
        type: 'date',
        align: 'center'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/enterprise-middleware/list-card';
    this.gridList.config.entity = 'Tarjetas';
  }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  getListTypeDocument() {
    this.ldvService.getLdvDetail('TYPE-DOCUMENT-CUSTOMER').subscribe(
      (infoList: any) => {
        this.listTypeDocumentSearch = infoList
      }
    )
  }

  selectTypeDocument(typeID) {
    const searchType = this.listTypeDocumentSearch.find(item => String(item._id) == String(typeID))
    console.log(searchType)
    if(searchType){
      this.document.type = {
        _id : searchType._id,
        value : searchType.value
      }

    }
 
  }
  newCards() {
    this.uploadExcel.open();
  }
  resultInfo(listProcess) {
    if (listProcess.messageError) {
      this._middleService.sendMessage(
        'Subida de tarjetas',
        listProcess.messageError,
        'error'
      );
    } else {
      this.gridList.getInfo();
      this.listResultAddCard = listProcess.listProcess;
      this.showSummary = true;
    }
  }

  jsonLocalInfo(infoRead) {

    if (infoRead['CODIGOS DE SOCIOS']) {
      this._middleService.sendLoading(true)
      let listCards: Array<string> = []
      listCards = infoRead['CODIGOS DE SOCIOS']
      console.log(listCards)
      this._middleService.sendLoading(false)
      this.cardUploading.openprocess(listCards)
    } else {
      this._middleService.sendMessage('Tarjetas', 'Revise el excel', 'error')
    }
  }
  closeSummary() {
    this.showSummary = false;
  }

  closeAssociateCodeModal() {
    this.showAssociateCode = false;
  }

  openCreateModal() {
    this.associateCode = null;
    this.showAssociateCode = true;
  }


  validAccessPOST() {
    this._roleService.validAccessRoleWindow('/luxury/card', 'PADDCARD').subscribe(
      (validRole: boolean) => {
        this.addCardAccess = validRole
      }
    )
  }
  validAccessGET() {
    this._roleService.validAccessRoleWindow('/luxury/card', 'GLISTCARD').subscribe(
      (validRole: boolean) => {
        this.listCardAccess = validRole
      }
    )
  }

  createCode() {
    if (this.associateCode.length === 10) {
      const newCard = {
        number: this.associateCode,
        active: true,
        create_date: new Date(),
        used: false,
        document: this.document
      };

      this._middleService.sendLoading(true);
      this.cardService.createCard(newCard, '/enterprise-middleware/add-single-card').subscribe(cal => {
        this._middleService.sendMessage(
          'Creación de tarjeta',
          'La tarjeta ha sido creada correctamente.',
          'ok'
        );
        this.showAssociateCode = false;
        this._middleService.sendLoading(false);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() =>
            this.router.navigate([
              '/system/luxury/card'
            ])
          );
      }, error => {
        this._middleService.sendMessage(
          'Creación de tarjeta',
          error.error.message,
          'error'
        );
        this._middleService.sendLoading(false);
      });
    } else {
      this._middleService.sendMessage(
        'Creación de tarjeta',
        'Ingrese la cantidad correcta de dígitos',
        'error'
      );
    }
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
}
