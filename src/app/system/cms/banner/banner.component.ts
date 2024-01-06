import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockService } from 'src/app/shared/service/block.service';
import { Router } from '@angular/router';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { GridComponent } from '../../components/grid/grid.component';
import { HeaderService } from '../../components/header/header.service';
import { UtilsCode } from 'src/app/utils/utilsCode';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  validPost: boolean;
  constructor(
    private _serviceBanner: BlockService,
    private router: Router,
    private middleService: MiddleService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.getInfoAllowed();
    this.headerService.sendTitle('Banner');
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Nombre',
        type: 'text'
      },
      {
        field: 'code',
        title: 'Código',
        type: 'text'
      },
      {
        field: 'create_date',
        title: 'Fecha de creación',
        type: 'date',
        align: 'center'
      },
      {
        field: 'update_date',
        title: 'Fecha de modificación',
        type: 'date',
        align: 'center'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/block/search';
    this.gridList.config.deleteService = '/block';
    this.gridList.config.redirect = 'system/banner/detail/';
    this.gridList.config.entity = 'Banner';
    this.gridList.config.entityFilter = 'banner';
    this.gridList.config.deleteMessage = 'El banner ha sido eliminado correctamente';
  }

  createBanner() {
    this.router.navigate(['/system/banner/new']);
  }

  getInfoAllowed() {
    this.validPost = UtilsCode.urlValidAccess('Banner', 'POST');
  }

}
