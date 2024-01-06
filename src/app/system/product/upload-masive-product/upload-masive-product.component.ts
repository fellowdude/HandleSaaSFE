import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { SupplierService } from 'src/app/shared/service/supplier.service';
import { ServiceService } from '../../components/file-upload/service.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Subscription } from 'rxjs';
const async = require('async')
@Component({
  selector: 'app-upload-masive-product',
  templateUrl: './upload-masive-product.component.html',
  styleUrls: ['./upload-masive-product.component.scss']
})
export class UploadMasiveProductComponent implements OnInit, OnDestroy {
  @Input() supplierInfo: any
  @Input() listExcelUpload: Array<any>;
  @Input() listImageUpload: Array<any>;
  @Output() closeUploading: EventEmitter<any> = new EventEmitter<any>();
  codeSupplier: any;
  processing: boolean;
  percentUpload: number;
  totalUpload: number;
  finishProcess: boolean;
  subscriptions: Array<Subscription>;
  methodSendSupplier: Array<any>;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  listUpload: Array<any>;
  constructor(
    private service: ServiceService,
    private _middleService: MiddleService,
    private _productService: ProductService,
    private _supplierService: SupplierService
  ) { }

  ngOnInit() {
    if (!this.supplierInfo) {
      this.supplierInfo = {}
    }
    this.subscriptions = [];
    this.percentUpload = 0;
    this.totalUpload = 0;
    this.cleanInfo();

    this.getInfoIni();
  }

  getInfoIni() {
    this._middleService.sendLoading(true);
    this.subscriptions.push(Observable.forkJoin([
      this.validHaveERP(),
      this.getMethodSendSupplier()
    ]
    ).subscribe(
      () => {
        this._middleService.sendLoading(false);
        this.processStart();
      }
    ));
  }

  validHaveERP() {
    const waitPromise = new Promise((resolve, reject) => {
      this._supplierService.verifyHaveERPSupplier(this.supplierInfo.supplierId).subscribe(
        (haveInfo: any) => {
          this.codeSupplier = '';
          if (!haveInfo.haveERP) {
            this.codeSupplier = haveInfo.code + '-';
          }
          resolve({});
        }
      )
    });
    return waitPromise;
  }
  getMethodSendSupplier() {
    const waitPromise = new Promise((resolve, reject) => {
      this._supplierService.getMethodSendSupplier(this.supplierInfo.supplierId).subscribe(
        (supplierInfo: any) => {
          this.methodSendSupplier = supplierInfo.method;
          resolve({});
        }
      )
    });
    return waitPromise;
  }



  async uploadImage(files) {
    const waitromise = await new Promise((resolve, reject) => {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      data.append('fileSeq', 'seq');

      this.service.uploadFileMasive(data, this.supplierInfo.supplierId).subscribe(
        (dataReq) => {
          resolve(dataReq);
        }
      );
    });
    return waitromise;
  }

  async searchImageCover(image_cover) {
    const waitPromise = await new Promise(async (resolve, reject) => {

      const indexListImage = this.listImageUpload.findIndex(item => item.name == image_cover);
      let image_cover_replace = null;
      if (this.listImageUpload[indexListImage].createId) {
        image_cover_replace = this.listImageUpload[indexListImage].createId;
      } else {
        const createImage: any = await this.uploadImage([this.listImageUpload[indexListImage]])
        if (createImage.length > 0) {
          this.listImageUpload[indexListImage].createId = createImage[0];
          resolve(createImage[0]);
        } else {
          resolve(null)
        }
      }
    });
    return waitPromise;
  }

  async searchImageGallery(listGallery) {
    const waitPromise = await new Promise(async (resolve, reject) => {
      const existImage = []

      for (const gallery of listGallery) {

        const indexImageSearch = this.listImageUpload.findIndex(item => item.name == gallery.name);

        if (this.listImageUpload[indexImageSearch].createId) {

          existImage.push(this.listImageUpload[indexImageSearch].createId)
        } else {

          const createImage: any = await this.uploadImage([this.listImageUpload[indexImageSearch]]);
          if (createImage.length > 0) {
            this.listImageUpload[indexImageSearch].createId = createImage[0];
            existImage.push(createImage[0]);
          }
        }
      }

      resolve(existImage);

    });
    return waitPromise;
  }

  calcPercentUpload() {

    this.percentUpload = (this.totalUpload * 100) / this.listUpload.length;

  }

  closeProcess() {
    this.closeUploading.emit({});
  }
  async processStart() {
    this.processing = true;
    await this.distributionSave();
    this.finishProcess = true;
    this.processing = false;
  }

  async getListNormal() {
    return this.listUpload.filter(item => !item.type_product)
  }
  async getListFather() {
    const listFather: Array<any> = this.listUpload.filter(item => item.type_product == 'B' && item.size && item.color && item.product_father_field)
    for (const product of listFather) {
      product.is_product_variation_select = true
      product.type_variation = 'B'
      product.variation_father = []
      product.variation_father.push({ type: 'TEXT', variation_name: 'Tallas', value: product.size })
      product.variation_father.push({ type: 'COLOR', variation_name: 'Colores', value: product.color })
    }
    return listFather
  }
  async getListChildren() {
    const listChildren: Array<any> = this.listUpload.filter(item => item.type_product == 'V' && item.size && item.color && item.product_father_field)
    for (const product of listChildren) {
      const productFatherInfo: any = this.listUpload.filter(item => item.type_product == 'B' && item.product_father_field == product.product_father_field)
      if (productFatherInfo) {
        if (productFatherInfo.length > 0) {
          console.log('uuuuuuuuuuuuuuuuuuu')
          console.log(productFatherInfo)
          product.is_product_variation_select = true
          product.type_variation = 'V'
          product.father_base_variation = productFatherInfo[0].idCreated
          product.variations = []
          product.variations.push({ type: 'TEXT', variation_name: 'Tallas', value: product.size })
          product.variations.push({ type: 'COLOR', variation_name: 'Colores', value: product.color })
        }

      }

    }
    return listChildren
  }

  async distributionSave() {
    await this.uploadInfo(await this.getListNormal())
    await this.uploadInfo(await this.getListFather())
    await this.uploadInfo(await this.getListChildren())
  }
  async uploadInfo(listUpload) {
    const waitromise = await new Promise((resolve, reject) => {
      async.eachLimit(listUpload, 3, async (file, callback) => {
        file.state = 'uploading';
        file.image_cover = await this.searchImageCover(file.image_cover.name);
        file.images_link = await this.searchImageGallery(file.images_link);
        file.SKU = this.codeSupplier + file.SKU;
        file.father_variation_code = file.product_father_field
        file.list_method = this.methodSendSupplier;
        file.name = file.name.trimStart();
        this._productService.saveProduct(file).subscribe(
          (dataSave: { idProduct: string, inRequest: any }) => {
            console.log('createdddddddd')
            console.log(dataSave)
            file.finish = true;
            file.state = 'ok';
            file.idCreated = dataSave.idProduct
            this.totalUpload = this.totalUpload + 1;

            this.calcPercentUpload();
            callback();

          }, (error) => {
            this.totalUpload = this.totalUpload + 1;
            file.errorSave = true;
            file.state = 'error';

            this.calcPercentUpload();
            callback();
          }
        )
      }, (err) => {

        console.log(err)
        if (err) {

          console.log(err)
          console.log('A file failed to process');
          reject()

        } else {

          console.log('A terminado el proceso');
          resolve({});

        }
      });
    });
    return waitromise;
  }
  cleanInfo() {
    this.listUpload = [];
    for (const info of this.listExcelUpload) {
      if (!info.existError) {
        this.listUpload.push(info);
      }
    }

  }
  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

}
