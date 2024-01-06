import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ServiceService } from '../file-upload/service.service';
@Component({
  selector: 'app-uploader-verification',
  templateUrl: './uploader-verification.component.html',
  styleUrls: ['./uploader-verification.component.scss']
})
export class UploaderVerificationComponent implements OnInit {
  @Input() maxSize: any = 10;
  @Input() supplierInfo: any;
  @Input() maxDimension: any = { width: 500, height: 500 }
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @Output() selectImage = new EventEmitter<any>();
  @Output() listUploadImage = new EventEmitter<any>();
  uploadForm: FormGroup;
  uploader: FileUploader;
  config: any;
  listSelectImage: any;
  files = [];
  constructor(
    private fb: FormBuilder,
    private _middleService: MiddleService,
    private service: ServiceService,
  ) {
    this.uploader = new FileUploader({
      isHTML5: true,
    });
    this.uploadForm = this.fb.group({
      document: [null, null],
    });
  }

  ngOnInit() {
    this.config = {};
    if (!this.supplierInfo) {
      this.supplierInfo = {}
    }
    this.config.maxImageSelect = 1;
    this.config.typeInfo = 'simple';
    this.listSelectImage = [];
  }




  async getDimension(file) {
    const dimensionImage = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image;
        img.onload = () => {

          resolve({ width: img.width, height: img.height });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

    return dimensionImage;
  }

  async validDimension(dimension, width, height) {
    let validDimension = false
    if ((width - 5) <= dimension.width && (width + 5) >= dimension.width && (height - 5) <= dimension.height && (height + 5) >= dimension.height) {
      validDimension = true
    }
    return validDimension
  }

  async assignFile(file, data, errorMessage) {
    const asyncImage = new Promise(async (resolve, reject) => {
      const dimensionImage = await this.getDimension(file)
      const validDimension = await this.validDimension(dimensionImage, this.maxDimension.width, this.maxDimension.height)
      if (validDimension) {
        if (file.size > (this.maxSize * 500000)) {
          errorMessage = 'Las imagenes no deben pesar mas de ' + this.maxSize + 'kb';
          resolve({ error: true, errorMessage })
        } else {
          data.append('file', file);
          resolve({ error: false });
        }
      } else {
        errorMessage = 'Las imagenes deben tener una medidas aproximadas de ' + this.maxDimension.width + 'px de ancho y ' + this.maxDimension.height + 'px de alto.';
        resolve({ error: true, errorMessage })
      }
    });
    return asyncImage;
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';

  }

  async uploadSubmit() {
    this._middleService.sendLoading(true)

    const listVarifyImage = [];
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem: any = this.uploader.queue[i]._file;

      const infoDimension: any = await this.getDimension(fileItem);
      fileItem.dimension = {};
      fileItem.dimension.width = infoDimension.width;
      fileItem.dimension.height = infoDimension.height;

      await this.validExistLocal(fileItem);
      listVarifyImage.push(fileItem.name);
      this.files.push(fileItem);
    }
    await this.validImageBD(listVarifyImage);

    this.uploader.clearQueue();
  }

  async validExistLocal(image) {

    const existImage = this.files.find(item => item.name == image.name);

    if (existImage) {

      if (!image.error) {
        image.error = [];
      }
      image.error.push('El nombre de la imágen se encuentra duplicada.');
    }
  }
  async validImageBD(listVarifyImage) {

    this._middleService.sendLoading(true)

    this.service.validImageBD(listVarifyImage, this.supplierInfo.supplierId).subscribe(
      (listValid: any) => {
        for (const errorValid of listValid.info) {
          const itemError = this.files.find(item => item.name === errorValid.name);
          if (itemError) {
            if (!itemError.error) {
              itemError.error = [];
            }
            itemError.error.push(errorValid.error);
          }
        }

        this._middleService.sendLoading(false)
        this.outListImage();
      }
    )
  }
  async openUploadFiles() {
    const fileUpload = this.fileUpload.nativeElement;
    const listVarifyImage = [];
    fileUpload.onchange = async () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        const infoDimension: any = await this.getDimension(file);
        file.dimension = {};
        file.dimension.width = infoDimension.width;
        file.dimension.height = infoDimension.height;

        await this.validExistLocal(file);
        listVarifyImage.push(file.name);
        this.files.push(file);
      }
      this.validImageBD(listVarifyImage)
      this.uploadFiles();
    };
    fileUpload.click();
  }

  outListImage() {

    this.listUploadImage.emit(this.files);
  }

  uploadFileChange() {
    if (event.type == 'drop') {
      this.uploadSubmit();
    }
  }

}

