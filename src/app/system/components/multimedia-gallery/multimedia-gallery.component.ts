import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ɵConsole,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Input,
} from "@angular/core";
import { AttachmentService } from "src/app/shared/service/attachment.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { ServiceService } from "../file-upload/service.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { GridComponent } from '../grid/grid.component';
import { element } from 'protractor';
import { emit } from 'process';

@Component({
  selector: "app-multimedia-gallery",
  templateUrl: "./multimedia-gallery.component.html",
  styleUrls: ["./multimedia-gallery.component.scss"],
})
export class MultimediaGalleryComponent implements OnInit, AfterViewInit {
  listAttachment: any;
  showwindowMedia: boolean;
  listSelectImage: any;
  uploadFile: boolean;
  config: any;
  uploadForm: FormGroup;
  uploader: FileUploader;
  @ViewChild("gridList", { static: false }) gridList: GridComponent;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  @Input() suplierId: string;
  @Output() imageChoose: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _attachmentService: AttachmentService,
    private fb: FormBuilder,
    private service: ServiceService,
    private _middleService: MiddleService
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
    this.config.maxImageSelect = 1;
    this.config.typeInfo = "simple";
    this.config.noValidDimension = false;
    this.listSelectImage = [];
    this.getAllMultimedia(null, false);
    this.showwindowMedia = false;
    this.uploadFile = false;
    if (!this.config.maxDimension) {
      this.config.maxDimension = {
        width: 500,
        height: 500
      }
    }

  }

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.selectImage();
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeWindow();
  }

  ngAfterViewInit() {

  }
  addSelect(indexItem) {
    if (this.listAttachment[indexItem].select) {
      this.listAttachment[indexItem].select = false;
      const indexSelect = this.listSelectImage.findIndex(
        (imgSelect) => imgSelect == indexItem
      );
      this.listSelectImage.splice(indexSelect, 1);
    } else {
      if (this.config.maxImageSelect) {
        if (this.listSelectImage.length >= this.config.maxImageSelect) {
          this.listAttachment[this.listSelectImage[0]].select = false;
          this.listSelectImage.splice(0, 1);
        }
      }
      this.listAttachment[indexItem].select = true;
      this.listSelectImage.push(indexItem);
    }
  }

  changeStateFileUpload(value) {
    this.uploadFile = value;
    if (!value) {
      this.loadGrid();
    }
  }

  uploadFileChange() {
    if (event.type == "drop") {
      this.uploadSubmit();
    }
  }

  private uploadFiles() {
    
    this.fileUpload.nativeElement.value = "";
    this.saveFile();
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

    return dimensionImage
  }

  async validDimension(dimension, width, height) {
    let validDimension = false
    if ((width - 5) <= dimension.width && (width + 5) >= dimension.width && (height - 5) <= dimension.height && (height + 5) >= dimension.height) {
      validDimension = true
    }
    return validDimension
  }

  async assignFile(file, data, errorMessage) {
    let asyncImage = new Promise(async (resolve, reject) => {

      const dimensionImage = await this.getDimension(file)
      let validDimension = true;
      if (this.config.maxDimension) {
        if (this.config.maxDimension.width == 0 || this.config.maxDimension.height == 0) {
          this.config.noValidDimension = true
        }
      }
      if (!this.config.noValidDimension) {
        validDimension = await this.validDimension(dimensionImage, this.config.maxDimension.width, this.config.maxDimension.height)
      }
      if (validDimension) {
        if (file.size > (this.config.maxSize * 500000)) {
          errorMessage = "Las imagenes no deben pesar mas de " + this.config.maxSize + "kb";
          resolve({ error: true, errorMessage })
        } else {
          data.append("file", file);
          resolve({ error: false });
        }
      } else {
        errorMessage = "Las imagenes deben tener una medidas aproximadas de " + this.config.maxDimension.width + "px de ancho y " + this.config.maxDimension.height + "px de alto.";
        resolve({ error: true, errorMessage })
      }
    });
    return asyncImage
  }

  async saveFile() {
    const data = new FormData();
    let errorMessage = null;

    for (const file of this.files) {
      const valueSearch: any = await this.assignFile(file, data, errorMessage)
      if (valueSearch.error) {
        errorMessage = valueSearch.errorMessage
      }
    }

    
    if (errorMessage) {
      
      this._middleService.sendMessage(
        "Galería de Imágenes",
        errorMessage,
        "error"
      );
      this.files = []
    } else {
      
      data.append("fileSeq", "seq");
      this._middleService.sendLoading(true);
      this.service.uploadFile(data, this.suplierId).subscribe(
        (dataReq) => {
          this._middleService.sendLoading(false);
          this.getAllMultimedia(true);
          this.uploadFile = false;
          this.loadGrid()
          this.files = [];
        },
        (error) => {
          this._middleService.sendMessage('Imágenes', error.error.message, 'error')
          this._middleService.sendLoading(false);
          console.log(error);
          this.files = []
        }
      );
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

  getAllMultimedia(isUpload?, load?) {
    load && this._middleService.sendLoading(true);
    /* this._attachmentService.getAll().subscribe(
      (listAttachment) => {
        this.listAttachment = listAttachment;
        if (isUpload) {
          for (let i = 0; i < this.config.maxImageSelect; i++) {
            this.addSelect(i);
          }
        }
        load && this._middleService.sendLoading(false);
      },
      (error) => { }
    ); */
  }

  openWindow(limitSelect?: number) {
    this.uploadFile = false;
    this.listSelectImage = [];
    this.showwindowMedia = true;
    this.loadGrid(limitSelect);

  }
  loadGrid(limitSelect?: number) {
    setTimeout(() => {

      this.gridList.columns = [
        {
          field: "img",
          title: "Imagen",
          type: "image",
          align: "center",
          width: '70px'
        },
        {
          field: "originalname",
          type: 'text',
          title: "Nombre",
          align: 'left',
          fontWeight: "bolder"
        },
        {
          field: "create_date",
          title: "Fecha",
          type: "date",
          align: "center",
          width: '138px'
        }

      ];

      let urlSearch = '/attachment/all'
      if (this.suplierId) {
        urlSearch = urlSearch + '/' + this.suplierId;
      }
      this.gridList.config.select = true;
      this.gridList.config.selectGetObject = true;
      this.gridList.config.pagQuantity = 25;
      this.gridList.config.limitSelect = limitSelect;
      this.gridList.config.getService = urlSearch;
      this.gridList.config.selectSingle = this.config.typeInfo != "multi"
      this.gridList.config.bodyStyle = { height: 'calc(98vh - 370px)' };
      this.gridList.config.deleteMessage =
        "La publicación ha sido eliminado correctamente";
      this.gridList.config.deleteService = "/attachment";
      this.gridList.config.entity = 'Imágenes';
      this.gridList.getInfo();
    }, 0)
  }
  itemSelecReturn(event) {
    let foundIdx = this.listSelectImage.findIndex((element) => {
      return element._id == event._id

    })

    if (foundIdx != -1) {
      this.listSelectImage.splice(foundIdx, 1);
    } else {
      this.listSelectImage.push(event)
    }

  }

  itemDeleted(event) {
    const element = this.listSelectImage.find(e => e._id == event)
    const index = this.listSelectImage.indexOf(element)
    if(index > -1) {
      this.listSelectImage.splice(index, 1)
    }
  }

  closeWindow() {
    this.showwindowMedia = false;
    this.uploadFile = true;
  }

  selectImage() {

    /*  let infoReturn = null;
     if (this.listSelectImage.length > 0) {
       if (this.config.typeInfo == "simple") {
         infoReturn = this.listAttachment[
           this.listAttachment.length - this.listSelectImage[0] - 1
         ].img;
       } else {
         const arrayCreateImg: any = [];
         for (const imgPos of this.listSelectImage) {
           arrayCreateImg.push(
             this.listAttachment[this.listAttachment.length - imgPos - 1].img
           );
         }
         infoReturn = arrayCreateImg;
       }
       this.imageChoose.emit(infoReturn);
       this.closeWindow(); 
     }*/
    if (this.listSelectImage.length > 0) {
      console.log(this.listSelectImage)

      if (this.config.typeInfo != "multi") {

        if (this.config.returnInfoUsed) {
          this.imageChoose.emit({ listImage: this.listSelectImage[this.listSelectImage.length - 1].img, infoSet: this.config.returnInfoUsed })
        } else {
          this.imageChoose.emit(this.listSelectImage[this.listSelectImage.length - 1].img)
        }
      } else {
        let toSend = [];
        this.listSelectImage.forEach(element => {
          toSend.push(element.img);
        });

        if (this.config.returnInfoUsed) {
          this.imageChoose.emit({ listImage: toSend, infoSet: this.config.returnInfoUsed });
        } else {
          this.imageChoose.emit(toSend);
        }
      }
      this.closeWindow();
      this.listSelectImage = []
    }

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
