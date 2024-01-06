import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ServiceService } from '../file-upload/service.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Input() maxSize: any = 1
  @Input() suplierId: string;
  @Input() maxDimension: any = { width: 500, height: 500 }
  @Input() noValidDimension: boolean = false;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  @Output() selectImage = new EventEmitter<any>();
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
    this.config.maxImageSelect = 500;
    this.config.typeInfo = "simple";
    this.listSelectImage = [];

  }

  uploadFileChange() {
    if (event.type == "drop") {
      this.uploadSubmit();
    }
  }



  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      this.files.push(fileItem);
    }
    this.saveFile();
    this.uploader.clearQueue();
  }



  async getDimension(file) {
    let dimensionImage = new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (e) => {
        let img = new Image;
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
      const dimensionImage = await this.getDimension(file);
      let validDimension = true;
    
      if (this.maxDimension) {
        if (this.maxDimension.width == 0 || this.maxDimension.height == 0) {
          this.noValidDimension = true
        }
      }
      if (!this.noValidDimension) {
        validDimension = await this.validDimension(dimensionImage, this.maxDimension.width, this.maxDimension.height)
      }
      if (validDimension) {
        if (file.size > (this.maxSize * 500000)) {
          errorMessage = "Las imagenes no deben pesar mas de " + this.maxSize + "kb";
          resolve({ error: true, errorMessage })
        } else {
          data.append('file', file);
          resolve({ error: false });
        }
      } else {
        errorMessage = "Las imagenes deben tener una medidas aproximadas de " + this.maxDimension.width + "px de ancho y " + this.maxDimension.height + "px de alto.";
        resolve({ error: true, errorMessage })
      }
    });
    return asyncImage;
  }


  async saveFile() {
    const data = new FormData();
    let errorMessage = null;

    for (const file of this.files) {
      const valueSearch: any = await this.assignFile(file, data, errorMessage)

      if (valueSearch.error) {
        errorMessage = valueSearch.errorMessage;
      }
    }

    if (errorMessage) {
      this._middleService.sendMessage(
        "Galería de Imágenes",
        errorMessage,
        "error"
      );
    } else {
      data.append("fileSeq", "seq");
      this._middleService.sendLoading(true);
      this.service.uploadFile(data, this.suplierId).subscribe(
        (dataReq) => {

          this.selectImage.emit({ image: dataReq })
          this._middleService.sendLoading(false);
          this.files = [];
        },
        (error) => {
          this._middleService.sendMessage('Imágenes', error.error.message, 'error')
          this._middleService.sendLoading(false);
          console.log(error);
        }
      );
    }
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    this.saveFile();
  }

  openUploadFiles() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push(file);
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

}
