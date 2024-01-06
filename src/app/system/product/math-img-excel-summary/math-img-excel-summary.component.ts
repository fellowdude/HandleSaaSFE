import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MiddleService } from 'src/app/shared/service/middle.service';

@Component({
  selector: 'app-math-img-excel-summary',
  templateUrl: './math-img-excel-summary.component.html',
  styleUrls: ['./math-img-excel-summary.component.scss']
})
export class MathImgExcelSummaryComponent implements OnInit {
  @Input() listExcel: any;
  @Input() listImage: any;
  @Input() maxError: any;
  @Output() closeModal = new EventEmitter<any>();
  totalError: number;
  totalOk: number;
  listError: Array<any>;
  validParameters: any;
  constructor(
    private _middlewareService: MiddleService,
  ) { }

  ngOnInit() {
    this.listError = [];
    this.validParameters = {
      main_image: {
        dimension: { width: 325, height: 255 },
        size: 1,
      },
      gallery: {
        dimension: { width: 780, height: 510 },
        size: 1,
      }
    }
    this.validExistData();

  }

  validExistData() {

    if (this.listExcel.length > 0 && this.listImage.length > 0) {
      this.compareMatch();
    } else {
      this._middlewareService.sendMessage('Subida de productos', 'Necesita elegir por lo menos una imágen y tener una linea válida en el excel', 'error')
    }
  }

  async validDimension(dimension, width, height) {

    let validDimension = false;
    if ((width - 5) <= dimension.width && (width + 5) >= dimension.width && (height - 5) <= dimension.height && (height + 5) >= dimension.height) {
      validDimension = true;
    }
    return validDimension;
  }

  async validSize(file, maxSize) {

    if (file.size > (maxSize * 500000)) {
      return { error: 'Las imagenes no deben pesar mas de ' + maxSize + 'kb' };
    } else {
      return {}
    }
  }

  async matchImage(image, validParameters) {
    const objReturn: any = {};
    objReturn.name = image;
    const imageSearch = this.listImage.find(item => item.name == image);
    if (imageSearch) {
      if (!imageSearch.error) {
        objReturn.error = []
      } else {
        objReturn.error = imageSearch.error;
      }
      const validDimensionResult = true;
      // const validDimensionResult = await this.validDimension(imageSearch.dimension, validParameters.dimension.width, validParameters.dimension.height)

      if (!validDimensionResult) {

        objReturn.error.push('las dimensiones de la imagen son incorrectas');
      }
      const validSize: any = await this.validSize(imageSearch, validParameters.size)

      if (validSize.error) {
        objReturn.error.push(validSize.error);
      }
    } else {
      if (!objReturn.error) {
        objReturn.error = []
      }
      objReturn.error.push('La imágen no ha sido adjuntada en el paso anterior')
    }
    return objReturn;

  }

  async compareMatch() {
    this.totalError = 0
    this.totalOk = 0
    for (const excelInfo of this.listExcel) {
      //  if (excelInfo.name, excelInfo.SKU, excelInfo.brand, excelInfo.categories, excelInfo.image_cover) {
      const imageCover = await this.matchImage(excelInfo.image_cover, this.validParameters.main_image);
      excelInfo.image_cover = imageCover;
      const listImagesArray = []
      let totalError = 0
      let errorGallery = false;
      for (const image of excelInfo.images_link) {
        const newImage = await this.matchImage(image, this.validParameters.gallery);
        if (newImage.error.length > 0) {
          totalError = totalError + 1;
          errorGallery = true;
        }
        listImagesArray.push(newImage)
      }
      if (imageCover.error.length > 0 || errorGallery || excelInfo.listError.length > 0) {
        excelInfo.existError = true;
      }
      excelInfo.images_link = listImagesArray;

      excelInfo.errorGallery = errorGallery;

      if (excelInfo.image_cover.error.length > 0 || totalError > 0 || excelInfo.listError.length > 0) {
        this.totalError = this.totalError + 1;
      } else {
        this.totalOk = this.totalOk + 1;
      }

    }

  }

  closeSummary() {
    this.closeModal.emit({ process: false })
  }
  goNext() {
    this.closeModal.emit({ process: true })
  }

  openError(listError) {
    this.listError = listError;
  }
  closeErrorList() {
    this.listError = []
  }

}
