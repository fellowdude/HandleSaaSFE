import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { MiddleService } from "src/app/shared/service/middle.service";
import { UploadExcelService } from "./upload-excel.service";
import { saveAs } from "file-saver";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CategoryService } from "../../../shared/service/category.service";
import { SupplierService } from "../../../shared/service/supplier.service";
import * as XLSX from 'xlsx';
interface IFileUploadConfig {
  field?: any;
  value?: any;
  listSelect?: Array<any>;
}
interface IFileUpload {
  title: string;
  urlService?: string;
  urlDownload?: string;
  apiDownload?: string;
  fileDownloadName?: string;
  buttonLabelDownload?: string;
  select?: IFileUploadConfig;
  readingLocal?: boolean
}
@Component({
  selector: "app-upload-excel",
  templateUrl: "./upload-excel.component.html",
  styleUrls: ["./upload-excel.component.scss"],
})
export class UploadExcelComponent implements OnInit {
  @Input() config: IFileUpload;
  @Input() processType: string;
  @Output() resultInfo: EventEmitter<any> = new EventEmitter<any>();
  @Output() jsonLocalInfo: EventEmitter<any> = new EventEmitter<any>();
  submitted: boolean;
  errorFile: any;
  openUploadFile: boolean;
  isSupplier: boolean;
  uploader: FileUploader;
  supplierSelect: any;
  files = [];
  groupList = [];
  supplierList = [];
  listCategoryGroups: Array<any>;
  dateForm: FormGroup;
  uploadForm: FormGroup;
  today: Date;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  constructor(
    private _middleService: MiddleService,
    private _uploadService: UploadExcelService,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService,
    private fb: FormBuilder
  ) {
    this.uploader = new FileUploader({
      isHTML5: true,
    });
    this.today = new Date();
  }

  ngOnInit() {
    this.files = [];
    if (
      this.config.title == "Carga Masiva Productos" ||
      this.config.title == "Carga Masiva Productos con SKU"
    ) {
      this.uploadForm = new FormGroup({
        group: new FormControl(""),
        supplier: new FormControl(null),
      });
      this.validSupplier();
      this.setValidtors(["group"], "uploadForm");

      // this.getListGroup();
    } else if (this.config.title == "Exportar clientes") {
      this.dateForm = this.fb.group({
        initial_date_offer: [""],
        end_date_offer: [""],
      });

      this.setValidtors(["initial_date_offer", "end_date_offer"], "dateForm");
    }
    this.onChange();
  }

  onChange() {
    this.uploadForm &&
      this.uploadForm.get("supplier").valueChanges.subscribe((val) => {
        this.uploadForm.get("group").setValue(null);
        this.getListGroup(val.visible_category_groups);
      });
  }

  validSupplier() {
    this._supplierService.validIsSupplier().subscribe(
      (val: any) => {
        this.isSupplier = val.isSupplier;
        if (val.isSupplier) {
          this.listCategoryGroups = val.supplier.visible_category_groups;
          this.getListGroup();
        } else {
          this.getListGroup();
        }
      },
      (error) => {
        this._middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
  }

  setValidtors(fieldsToValidate: string[], form: string) {
    fieldsToValidate.forEach((field) => {
      this[form].get(field).setValidators([Validators.required]);
      this[form].get(field).updateValueAndValidity();
    });
  }

  getListSupplier() {
    this._supplierService
      .getAllSupplier({ report_erp: false }, { _id: 1, name: 1, visible_category_groups: 1 })
      .subscribe((listSupplier: any) => {
        this.supplierList = listSupplier;
        if (this.supplierList.length > 0) {
          this.uploadForm.get("supplier").setValue(this.supplierList[0]);
          this.getListGroup(this.supplierList[0].visible_category_groups);
        }
        this.setValidtors(["group", "supplier"], "uploadForm");
      });
  }

  getListGroup(filter?: any) {
    this._categoryService.getListCategoryGroup().subscribe((listGroup: any) => {
      this.groupList = listGroup.filter((item) => {
        if (this.isSupplier) {
          if (
            item.typeGroupCategory.ref1 === "product" &&
            this.listCategoryGroups &&
            this.listCategoryGroups.findIndex(
              (itemGroup) => itemGroup._id == item._id
            ) !== -1
          ) {
            return item;
          }
        } else {
          if (item.typeGroupCategory.ref1 === "product") {
            return item;
          }
        }
      });

      filter &&
        (this.groupList = this.groupList.filter(
          (e) => filter.indexOf(e._id) !== -1
        ));

      if (this.groupList.length > 0) {
        this.uploadForm.get("group").setValue(this.groupList[0]._id);
      }
    });
  }


  readExcelLocal() {

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    for (const file of this.files) {
      reader.onload = (event) => {
        this._middleService.sendLoading(true)
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.jsonLocalInfo.emit(jsonData);
        this._middleService.sendLoading(false)

      }
      reader.readAsBinaryString(file);
      this.files = []
      this.close()
    }
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    if (this.config.readingLocal) {
      this.readExcelLocal()
    } else {
      this.saveFile();
    }
  }

  open(uploadForSupplier?: boolean) {
    if (uploadForSupplier) {
      this.getListSupplier();
    } else {
      this.supplierList = undefined;
    }
    this.openUploadFile = true;
    this.supplierSelect = null;
    const totalPartUrl = this.config.apiDownload.split("/");
    const urlStock = totalPartUrl[totalPartUrl.length - 2];

    if (urlStock == "download-stock-template") {
      const lengthTotal = this.config.apiDownload.length;
      const replaceApiDownload = this.config.apiDownload.substr(
        0,
        lengthTotal - 25
      );

      this.config.apiDownload = replaceApiDownload;
    }

    //this.config.urlService

    ///product/download-stock-template/601aba308f31263c40c41b5d
  }
  close() {
    this.openUploadFile = false;
  }

  downloadFileTemplate() {

    switch (this.config.title) {
      case "Carga Masiva Productos":
      case "Carga Masiva Productos con SKU": {

        if (!this.uploadForm.invalid) {
          const params =
            this.config.title == "Carga Masiva Productos con SKU"
              ? {
                categoryGroup: this.uploadForm.get("group").value,
                loadToDbOnly: true,
              }
              : this.supplierList
                ? {
                  categoryGroup: this.uploadForm.get("group").value,
                  supplierId: this.uploadForm.get("supplier").value._id,
                }
                : { categoryGroup: this.uploadForm.get("group").value };
          this.downloadTemplate(params);
        } else {
          this._middleService.sendMessage(
            "Descargar Plantillas",
            "Debe elegir un grupo de categoría para descargar la plantilla",
            "error"
          );
        }
        break;
      }
      case "Exportar clientes": {
        if (!this.dateForm.invalid) {
          this.downloadTemplate({ dates: JSON.stringify(this.dateForm.value) });
        } else {
          this._middleService.sendMessage(
            "Descargar Plantillas",
            "Debe ingresar las fechas requeridas",
            "error"
          );
        }
        break;
      }
      case "Carga Masiva de Stocks": {
        if (this.config.select) {
          if (this.config.select.listSelect.length > 0) {
            if (this.supplierSelect) {
              this.config.apiDownload =
                this.config.apiDownload + "/" + this.supplierSelect;
            } else {
              this._middleService.sendMessage(
                "Subida masiva de Stock",
                "Selecciona un seller",
                "error"
              );
              break;
            }
          }
        }
        this.downloadTemplate();
        break;
      }
      case "Descarga de Productos por Seller": {
        if (this.config.select) {
          if (this.config.select.listSelect.length > 0) {
            if (this.supplierSelect) {
              this.config.apiDownload = this.config.apiDownload + "/" + this.supplierSelect;
            } else {
              this._middleService.sendMessage(
                "Descarga de Productos por Seller",
                "Selecciona un seller",
                "error"
              );
              break;
            }
          }
        }
      }
      default:
        this.downloadTemplate();
        break;
    }
  }

  downloadTemplate(params?: any) {
    this._middleService.sendLoading(true);
    this._uploadService.apiDownload(this.config.apiDownload, params).subscribe(
      (response) => {
        if (this.config.title == "Exportar clientes") {
          this._middleService.sendMessage(
            "Exportar Clientes",
            'Se le notificará cuando su descarga de clientes haya finalizado',
            "ok"
          );
        } else {
          this.downloadFile(response, this.config.fileDownloadName);
        }
        this.openUploadFile = false;
        this._middleService.sendLoading(false);
      },
      (error) => {
        this.openUploadFile = false;
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Descargar Plantillas",
          error.error.message,
          "error"
        );
      }
    );
  }

  downloadFile(data: any, name: string) {
    saveAs(data, name);
  }

  openUploadFiles() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        const nameSearch = file.name;
        const extension = nameSearch.split(".")[1];
        if (extension == "xlsx" || extension == "xls") {
          this.files.push(file);
        } else {
          if (!this.errorFile) {
            this.errorFile = "";
          }
          this.errorFile =
            this.errorFile + file.name + " no es un archivo válido";

          setTimeout(() => {
            this.errorFile = null;
          }, 4000);
        }
      }
      if (!this.errorFile) {
        this.uploadFiles();
      }
    };
    fileUpload.click();
  }

  private saveFile() {
    const data = new FormData();
    let errorMessage = null;
    this.files.forEach((file) => {
      if (file.size > 10000000) {
        errorMessage = "Los archivos no deben pesar mas de 10MB";
      }
      data.append("file", file);
    });
    if (errorMessage) {
      this._middleService.sendMessage(
        "Subida de archivos",
        errorMessage,
        "error"
      );
    } else {
      data.append("fileSeq", "seq");
      this._middleService.sendLoading(true);
      let haveUrlSupplier = false;
      /* if (this.config.title == 'Carga Masiva de Stocks') {
        if (this.config.select) {
          if (this.config.select.listSelect.length > 0) {
            if (this.supplierSelect) {
              this.config.urlService = this.config.urlService + '/' + this.supplierSelect
              haveUrlSupplier = true
            } else {
              this._middleService.sendMessage('Subida masiva de Stock', 'Selecciona un proveedor', 'error')
            }
          }
        }
      } */
      const params =
        this.config.title == "Carga Masiva Productos"
        && this.supplierList &&
        ({
          supplierId: this.uploadForm.get("supplier").value._id,
        });
      this._uploadService.uploadFile(data, this.config.urlService, params).subscribe(
        (dataReq: any) => {
          /*  if(haveUrlSupplier){
            const lengthTotal = this.config.urlService.length
            const replaceurlService = this.config.urlService.substr(0, lengthTotal - 25)      
            this.config.urlService = replaceurlService
          } */
          this._middleService.sendLoading(false);
          this.close();
          dataReq.processType = this.processType;
          this.resultInfo.emit(dataReq);
          this.files = [];
        },
        (error) => {
          console.log(error);
          /*  if(haveUrlSupplier){
            const lengthTotal = this.config.urlService.length
            const replaceurlService = this.config.urlService.substr(0, lengthTotal - 25)      
            this.config.urlService = replaceurlService
          } */
          this._middleService.sendLoading(false);
          this.files = [];
          this._middleService.sendMessage(
            "Subida de archivos",
            error.error.message,
            "error",
            5000,
          );
        }
      );
    }
  }
}
