import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { GridComponent } from '../components/grid/grid.component';
import { HeaderService } from '../components/header/header.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { saveAs } from 'file-saver';
import { UploadExcelComponent } from '../components/upload-excel/upload-excel.component';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { LdvService } from '../../shared/service/ldv.service';
import { UtilsCode } from '../../utils/utilsCode';
import { SupplierService } from 'src/app/shared/service/supplier.service';

interface IValidProductOperations {
  validEditMode?: boolean;
  validMassiveLoadWithSKU?: boolean;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  is_variation_product_luxury: boolean
  viewFatherVariations: boolean = false;
  summaryExcel: boolean;
  listResultPacks: Array<any>;
  listResultProducts: Array<any>;
  showSummary: boolean;
  headerFixed: boolean;
  validEditMode: boolean;
  validMassiveLoadWithSKU: boolean;
  showSummaryMassiveLoadProducts: boolean;
  supplierInfoChargeExcel: any
  @ViewChild(DialogConfirmComponent, { static: true })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild('uploadExcel', { static: true })
  uploadExcel: UploadExcelComponent;
  @ViewChild('uploadExcelImage', { static: true })
  uploadExcelImage: UploadExcelComponent;
  @ViewChild('uploadExcelSKU', { static: true })
  uploadExcelSKU: UploadExcelComponent;
  @ViewChild('uploadExcelPacks', { static: true })
  uploadExcelPacks: UploadExcelComponent;

  @ViewChild('uploadExcelStock', { static: true })
  uploadExcelStock: UploadExcelComponent;

  @ViewChild('downloadProductsBySeller', { static: true })
  downloadProducts: UploadExcelComponent;

  @ViewChild('uploadExcelListPrice', { static: true })
  uploadExcelListPrice: UploadExcelComponent;
  showMatchModal: boolean;
  listUploadImage: Array<any>;
  showProcess: boolean;
  stepUploadImage: number;
  showSummaryMassiveImage: boolean;
  editMode: Boolean;
  viewArchive: boolean;
  customDropwDownStyle: any;
  dropdownOptions: any;
  showProductWithOutStock: boolean
  listInfoProductUpdate: Array<any>;
  summaryProductUpdate: any;
  supplierId: string | null;
  supplierInfo: any;
  validOperations: IValidProductOperations = {};
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  constructor(
    private router: Router,
    private headerService: HeaderService,
    private productService: ProductService,
    private middleService: MiddleService,
    private _ldvService: LdvService,
    private _supplierService: SupplierService
  ) {
    this.editMode = false;
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.is_variation_product_luxury = false
    this.showProductWithOutStock = false
    this.listUploadImage = []
    this.supplierInfoChargeExcel = {}
    this.ldvValidProductInfo()
    this.getInfoAllowed();
    this.validIsSupplier();
    this.stepUploadImage = 1;
    this.showSummaryMassiveImage = false;
    this.supplierId = null;
    this.listResultPacks = [];
    this.headerFixed = false;
    this.showSummary = false;
    localStorage.removeItem('returnListRequest');
    this.headerService.sendTitle('Catálogo de Productos');

    this.getAllProducts();
    this.gridList.config.pagQuantity = 20;

    this.gridList.config.redirect = 'system/product/detail/';
    this.gridList.config.getService = '/product/system/v2/searchAll';
    this.gridList.config.entity = 'Producto';
    this.gridList.config.entityFilter = 'product';
    this.gridList.config.deleteMessage =
      'El producto ha sido eliminado correctamente';
    this.gridList.config.returnField = ['isSupplier'];
    this.gridList.config.messageDelete = 'Todos los productos varición relacionados, tambien serán eliminados';
    this.gridList.config.messageCondition = { field: 'product_variation', property: 'length', value: 0, condition: 'mayor' };


    const date = new Date().toISOString().substring(0, 10);

    this.uploadExcel.config = {
      title: 'Carga Masiva Productos',
      urlService: '/product/massiveLoad',
      apiDownload: '/product/download-template',
      fileDownloadName: 'Carga masiva productos ' + date + '.xlsx',
    };

    this.uploadExcelImage.config = {
      title: 'Carga Masiva Productos',
      urlService: '/product/upload-masive-image',
      apiDownload: '/product/download-template',
      fileDownloadName: 'Carga masiva productos ' + date + '.xlsx',
    };

    this.uploadExcelStock.config = {
      title: 'Carga Masiva de Stocks',
      urlService: '/product/massiveLoad',
      apiDownload: '/product/download-stock-template',
      fileDownloadName: 'Carga masiva stocks ' + date + '.xlsx',
    };

    this.downloadProducts.config = {
      title: 'Descarga de Productos por Seller',
      apiDownload: '/product/download-products-seller',
      buttonLabelDownload: 'Descargar Productos',
      fileDownloadName: 'Productos por Seller ' + date + '.xlsx',
    }

    this.uploadExcelListPrice.config = {
      title: 'Carga Masiva Lista de precios',
      urlService: '/product/massiveLoad',
      apiDownload: '/product/download-list-price-template',
      fileDownloadName: 'Carga masiva lista de precios' + date + '.xlsx',
    };

    this.uploadExcelSKU.config = {
      title: 'Carga Masiva Productos con SKU',
      urlService: '/product/massiveLoad?loadToDbOnly=true',
      apiDownload: '/product/template',
      fileDownloadName: 'Carga masiva productos con SKU' + date + '.xlsx',
    };

    this.uploadExcelPacks.config = {
      title: 'Carga Masiva Packs',
      urlService: '/product/upload-pack',
      apiDownload: '/product/template-upload-packs',
      fileDownloadName: 'plantillaSubirPacks ' + date + '.xlsx',
    };

    this.customDropwDownStyle = {
      selected: 'select-selected',
      selectItems: 'select-items',
      selectStyle: 'custom-select'
    };

    this.dropdownOptions = {
      values: [
        { value: 'Archivados', executeFunction: () => this.seeArchive() },
        { value: 'Carga Productos con SKU', executeFunction: () => this.uploadProductsSKU() },
        { value: 'Carga productos seller', executeFunction: () => this.uploadProducts(true) },
        { value: 'Descargar productos', executeFunction: () => this.downloadProductsBySeller() },
      ]
    };

    if (this.supplierId) {
      this.dropdownOptions.values.splice(2, 1);
      this.dropdownOptions.values.splice(1, 1); // cambio realizado en duda por la variable this.validMassiveLoadWithSKU que estaba en el aire
    }

    if (!this.validMassiveLoadWithSKU) {

    }

    if (!this.validOperations.validMassiveLoadWithSKU) {
      this.dropdownOptions.values.splice(0, 1);
    }

  }

  getInfoAllowed() {
    this.validOperations.validEditMode = UtilsCode.urlValidAccess('Catálogo', 'POST', 'Subir productos masivos');
    this.validOperations.validMassiveLoadWithSKU = UtilsCode.urlValidAccess('Catálogo', 'POST', 'Subir productos masivos con SKU');
  }

  chancheStateSwitch() {
    this.showProductWithOutStock = !this.showProductWithOutStock
    this.switchListProduct()
  }


  exportWithoutProduct() {
    this.middleService.sendLoading(true)
    this.productService.getReportProductWithoutStock().subscribe(
      (response) => {
        this.middleService.sendLoading(false)
        this.downLoadFile(response, "application/ms-excel")
      }
    )
  }

  downLoadFile(data: any, type: string) {
    saveAs(data, 'Reporte de productos sin stock.xlsx');
  }

  exportReport() {

  }

  switchListProduct() {
    if (this.showProductWithOutStock) {
      this.gridList.config.getService = '/product/searchAll-width-out-stock';
    } else {
      this.gridList.config.getService = '/product/system/v2/searchAll';
    }
    this.gridList.getInfo()
  }

  uploadPacks() {
    this.uploadExcelPacks.open();
  }

  getAllProducts() {
    this.gridList.columns = [
      {
        field: 'image_cover',
        title: 'Imagen',
        type: 'image',
        align: 'center',
        width: '70px'
      },
      {
        field: 'SKU',
        title: 'SKU',
        type: 'text',
        align: 'left',
        width: '70px'
      },
      {
        field: 'name',
        title: 'Producto',
        type: 'text',
        align: 'left',
        fontWeight: 'bolder'
      },
      {
        field: 'model_product',
        title: 'Modelo',
        type: 'text',
        align: 'center',
        fontWeight: 'bolder'
      },
      {
        field: 'brand_name',
        title: 'Marca',
        type: 'text',
        align: 'left'
      },
      {
        field: 'supplier_name',
        title: 'Seller',
        type: 'text',
        align: 'left'
      },
      {
        field: 'active',
        title: 'Visibilidad',
        type: 'boolean',
        align: 'center',
        replace: [
          {
            value: true,
            replace: 'Visible',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a',
          },
          {
            value: false,
            replace: 'No Visible',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
        ],
        changeBoolean: {
          url: '/product/change-active',
          urlType: 'dinamic',
          fieldDinamic: '_id'
        }
      },
      /* {
        field: 'show_discount',
        title: 'Descuento forzado',
        type: 'boolean',
        align: 'center',
        replace: [
          {
            value: true,
            replace: 'Activado',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a',
          },
          {
            value: false,
            replace: 'Desactivado',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
          {
            value: undefined,
            replace: 'Desactivado',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
        ],
        changeBoolean: {
          url: '/product/change-show_discount',
          urlType: 'dinamic',
          fieldDinamic: '_id'
        }
      }, */
      {
        field: 'special_price',
        title: 'Precio',
        type: 'currency',
        currency: 'currency.ref1',
        align: 'right',
        width: '100px'
      },
      {
        field: 'stock',
        title: 'Cantidad',
        type: 'number',
        align: 'right',
        color: '#1d72e8',
        width: '85px'
      },
    ];
  }

  getArchiveProducts() {
    this.gridList.columns = [
      {
        field: 'image_cover',
        title: 'Imagen',
        type: 'image',
        align: 'center',
        width: '98px'
      },
      {
        field: 'SKU',
        title: 'SKU',
        type: 'text',
        align: 'left',
        width: '70px'
      },
      {
        field: 'name',
        title: 'Producto',
        type: 'text',
        align: 'left',
        fontWeight: 'bolder'
      },
      {
        field: 'brand.name',
        title: 'Marca',
        type: 'text',
        align: 'left'
      },
      {
        field: 'supplier.name',
        title: 'Seller',
        type: 'any',
        align: 'left'
      },
      {
        field: 'special_price',
        title: 'Precio',
        type: 'currency',
        currency: 'currency.ref1',
        align: 'right',
        width: '100px'
      },
      {
        field: 'stock',
        title: 'Cantidad',
        type: 'number',
        align: 'right',
        color: '#1d72e8',
        width: '85px'
      },


    ];
  }

  resultInfoPacks(listProcess) {
    listProcess = listProcess.info;
    if (listProcess.messageError) {
      this.middleService.sendMessage(
        'Subida de Paquetes',
        listProcess.messageError,
        'error'
      );
    } else {
      this.gridList.getInfo();
      this.listResultPacks = listProcess.listProcess;
      this.showSummary = true;
    }
  }
  seeArchive() {
    this.viewArchive = !this.viewArchive;
    this.dropdownOptions.values[0].value = !this.viewArchive ? 'Archivados' : 'Listado general';

    if (this.viewArchive) {
      this.getArchiveProducts();

      this.gridList.config.getService = '/product/searchAll/store';
    } else {
      this.editMode = !this.editMode;
      this.changeEditMode();

      this.gridList.config.getService = '/product/system/v2/searchAll';
    }
    this.gridList.getInfo();
  }
  listAllFatherVariations() {
    this.viewFatherVariations = !this.viewFatherVariations;
    if (this.viewFatherVariations) {
      this.getAllProducts();
      this.gridList.config.getService = '/product/variation-father-list/all';
    } else {
      this.editMode = !this.editMode;
      this.changeEditMode();
      this.gridList.config.getService = '/product/system/v2/searchAll';
    }
    this.gridList.getInfo();
  }

  closeSummary() {
    this.showSummary = false;
    this.showSummaryMassiveLoadProducts = false;
  }

  downloadFile(data: any, name: string) {
    saveAs(data, name);
  }

  createProduct() {
    this.router.navigate(['/system/product/new']);
  }
  fieldReturn(event) {
    if (!event.isSupplier) {
      this.gridList.config.deleteService = '/product';
    }
  }

  ldvValidProductInfo() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('PRODUCT-OPTION').subscribe(
        (infoLdv: Array<any>) => {
          for (const ldvOption of infoLdv) {
            switch (ldvOption.value.toString()) {
              case 'false': {

                break
              }
              case 'true': {
                if (ldvOption.ref1 == "variation_product_luxury") {
                  this.is_variation_product_luxury = true;
                }
                break
              }
            }
          }

        }, (error) => {
          this.middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }

  uploadProducts(uploadForSupplier?: boolean) {
    if (this.supplierId || uploadForSupplier) {
      this.uploadExcelImage.open(uploadForSupplier);
    } else {
      this.uploadExcel.open();
    }
  }

  uploadProductsSKU() {
    this.uploadExcelSKU.open();
  }

  uploadProductsImage() {
    this.uploadExcelImage.open();
  }

  downloadProductsBySeller() {
    this.downloadProducts.open();
  }

  compareValidInfo() {

    if (this.listUploadImage.length > 0) {
      this.showSummary = false;
      this.showSummaryMassiveImage = false;
      this.showMatchModal = true;
    } else {
      this.middleService.sendMessage(
        'Carga masiva de productos',
        'Debe subir las imágenes',
        'error'
      );
    }

  }

  closeModalMatch(event) {
    if (event.process) {
      this.showProcess = true;
    } else {
      this.listInfoProductUpdate = [];
      this.listUploadImage = [];
    }
    this.showMatchModal = false;
  }

  cancelUploadImage() {
    this.showSummaryMassiveImage = false;
    this.listUploadImage = [];
    this.listInfoProductUpdate = [];
  }

  closeUploading() {
    this.showProcess = false;
    this.listUploadImage = [];
    this.listInfoProductUpdate = [];
    this.gridList.getInfo();
  }

  answerContinue(event) {
    if (event.continue) {
      this.showSummaryMassiveImage = true;
    }
    this.summaryExcel = false;
  }

  deleteImageUpload(position) {
    this.listUploadImage.splice(position, 1);
  }
  setListUploadImage(event) {
    this.listUploadImage = event;
  }


  resultInfo(listProcess) {
    listProcess = listProcess.info;
    if (listProcess.messageError) {
      this.middleService.sendMessage(
        'Carga masiva de productos',
        listProcess.messageError,
        'error'
      );
    } else {
      this.gridList.getInfo();
      this.listResultProducts = listProcess.listProcess;
      this.showSummaryMassiveLoadProducts = true;
    }
  }

  validExistImage() {
    for (let [indexI, prodSet] of this.listInfoProductUpdate.entries()) {
      const totalErrorPreview = prodSet.listError.length;
      let existNewError = false;
      let errorMain = null
      let errorGallery = null
      for (let [indexJ, prodCompare] of this.listInfoProductUpdate.entries()) {
        if (indexI != indexJ) {

          const existmainInGallery = prodCompare.images_link.find(item => item == prodSet.image_cover);

          if ((prodSet.image_cover == prodCompare.image_cover && prodSet.image_cover) || existmainInGallery) {

            errorMain = 'El nombre de la imagen web se repite en otro producto'
          }

          for (const imageSet of prodSet.images_link) {
            const existimageSetInGallery = prodCompare.images_link.find(item => item == imageSet);
            if (prodCompare.image_cover == imageSet || existimageSetInGallery) {

              errorGallery = 'El nombre de la imagen de la galeria se repite en otro producto';
            }
          }
        }
      }
      if (errorMain) {
        existNewError = true;
        prodSet.listError.push({ error: errorMain })
      }

      if (errorGallery) {
        existNewError = true;
        prodSet.listError.push({ error: errorGallery })
      }

      if (totalErrorPreview == 0 && existNewError) {
        this.summaryProductUpdate.totalRowOk = this.summaryProductUpdate.totalRowOk - 1;
        this.summaryProductUpdate.totalRowError = this.summaryProductUpdate.totalRowError + 1;
      }
      if (prodSet.listError.length > this.summaryProductUpdate.maxError) {
        this.summaryProductUpdate.maxError = prodSet.listError.length;
      }
    }
  }

  resultInfoProduct(listProcess) {

    this.supplierInfoChargeExcel.supplierId = listProcess.supplierId
    this.supplierInfoChargeExcel.supplierName = listProcess.supplierName
    this.listInfoProductUpdate = listProcess.data;
    this.summaryProductUpdate = listProcess.summary;
    this.validExistImage();
    this.summaryExcel = true;

  }

  changeBooleanField(field, value) {
    this.gridList.changeBooleanField(field, value);
  }
  changeEditMode() {
    this.editMode = !this.editMode;
    this.getAllProducts();
    this.changeBooleanField('active', this.editMode);
    this.changeBooleanField('show_discount', this.editMode);
    if (this.editMode) {
      this.viewArchive = false;
      this.gridList.actions = [
        {
          icon: 'fas fa-folder-download',
          color: '#777',
          action: 'archive',
          fieldReturn: '_id',
          tooltip: 'Archivar Producto',
          conditionShow: {
            field: 'archive',
            value: false,
          },
        },

        {
          icon: 'fas fa-undo-alt',
          color: '#777',
          action: 'desarchive',
          fieldReturn: '_id',
          tooltip: 'Desarchivar Producto',
          conditionShow: {
            field: 'archive',
            value: true,
          },
        },
      ];
      this.headerService.sendTitle('Catálogo de Productos (Modo Edición)');
    } else {
      this.headerService.sendTitle('Catálogo de Productos');
      this.gridList.actions = [];
    }
  }


  uploadProductsStock() {
    this.uploadExcelStock.open();
  }

  uploadProductListPrice() {
    this.uploadExcelListPrice.open();
  }



  validIsSupplier() {
    this._supplierService.validIsSupplier().subscribe(
      (infoSupplier: any) => {
        console.log(infoSupplier);
        this.supplierId = infoSupplier.idSupplier;
        this.supplierInfo = infoSupplier.supplier;
        if (this.supplierId) {
          this.gridList.config.isSupplier = true;
          this.gridList.config.activeMethodSend = this.supplierInfo.method_send[0].active;
        } else {
          this._supplierService.getAllSupplier().subscribe(
            (listSupplier: Array<any>) => {
              this.uploadExcelStock.config.select = {}
              this.uploadExcelStock.config.select.listSelect = listSupplier
              this.uploadExcelStock.config.select.field = '_id'
              this.uploadExcelStock.config.select.value = 'name'

              //Descarga de productos por seller
              this.downloadProducts.config.select = {}
              this.downloadProducts.config.select.listSelect = listSupplier
              this.downloadProducts.config.select.field = '_id'
              this.downloadProducts.config.select.value = 'name'
            }
          )
        }
      }
    )
  }

  actionAnswer(event) {
    switch (event.action) {
      case 'hide': {
        this.productService
          .toggleActive(event.field, { active: false })
          .subscribe((result) => {
            this.gridList.getInfo();
          });
        break;
      }
      case 'active': {
        this.productService
          .toggleActive(event.field, { active: true })
          .subscribe((result) => {
            this.gridList.getInfo();
          });
        break;
      }
      case 'archive': {
        this.dialogConfirm.show(
          '¿Realmente desea archivar este producto?',
          'Seleccione aceptar sólo si esta seguro que desea archivar el producto, al archivarlo no sera visible en los listados',
          null,
          { field: event.field, archive: true, action: 'archive' }
        );

        break;
      }
      case 'desarchive': {
        this.dialogConfirm.show(
          '¿Realmente desea desarchivar este producto?',
          'Seleccione aceptar sólo si esta seguro que desea desarchivar el producto.',
          null,
          { field: event.field, archive: false, action: 'archive' }
        );

        break;
      }
    }
  }
  answerModal(event) {
    if (event.accept && event.entity && event.entity.action == 'archive') {
      this.productService
        .toggleArchive(event.entity.field, { archive: event.entity.archive })
        .subscribe((result) => {
          this.gridList.getInfo();
        });
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
