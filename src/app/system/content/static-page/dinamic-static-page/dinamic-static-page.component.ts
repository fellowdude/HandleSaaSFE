import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { MultimediaGalleryComponent } from "src/app/system/components/multimedia-gallery/multimedia-gallery.component";
import { UtilsCode } from "src/app/utils/utilsCode";
import { DialogAddSectionComponent } from "src/app/system/components/dialog-add-section/dialog-add-section.component";
import { DialogConfirmComponent } from "src/app/system/components/dialog-confirm/dialog-confirm.component";
import { MiddleService } from "src/app/shared/service/middle.service";
import { EmailFormService } from "src/app/shared/service/email-form.service";
import { Router } from "@angular/router";
import { LdvService } from "src/app/shared/service/ldv.service";

@Component({
  selector: "app-dinamic-static-page",
  templateUrl: "./dinamic-static-page.component.html",
  styleUrls: ["./dinamic-static-page.component.scss"]
})
export class DinamicStaticPageComponent implements OnInit {
  @Input() config: any;
  @Input() objParent: any;
  @Input() positionParent: any;
  @Output() showContent = new EventEmitter<any>();
  listImageField: any;
  listImageDimension: any;
  accordionAdd: any;
  dataStatic: any;
  deleteObjSelect: any;
  deleteIndexSelect: any;
  listIndex: any;
  listOptionAddElement: any;
  listOptionAddElementArray: any;
  listTypeField: any;
  selectModalSectionOption: boolean;
  showModalNewSection: boolean;
  showModalArrayNewSection: boolean;
  contentArray: any;
  addNewItenmList: boolean;
  optionAddComponent: any;
  tinyEditorConfig
  @ViewChild("addNewSection", { static: true })
  addNewSection: DialogAddSectionComponent;
  @ViewChild(DialogConfirmComponent, { static: true })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private middleService: MiddleService,
    private _emailFormService: EmailFormService,
    private router: Router,
    private _ldvService: LdvService
  ) {
    this.config = {};
    this.tinyEditorConfig = {
      height: '200px',
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print',
        'preview anchor searchreplace visualblocks code',
        'fullscreen insertdatetime media table paste',
        'help wordcount autoresize fullscreen'
      ],
      toolbar:
        'undo redo | formatselect | fontsizeselect | bold italic | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent forecolor backcolor | table tabledelete | fullscreen'
    }
  }

  ngOnInit() {
    this.listImageField = {}
    this.getProductImageSize()
    this.getProductImageDimension()
    this.dataStatic = {};
    this.listTypeField = {};
    this.showModalNewSection = false;
    this.addNewItenmList = false;
    this.optionAddComponent = {};
    this.contentArray = {};
    this.listOptionAddElementArray = [
      {
        value: "Imagen",
        field: "image",
        addOption: false
      },
      {
        value: "Texto",
        field: "text",
        addOption: false
      }
    ];
    this.listOptionAddElement = [
      {
        value: "Array",
        field: "array",
        addOption: false
      },
      {
        value: "Acordeón",
        field: "accordion",
        addOption: false
      },
      {
        value: "Correo",
        field: "email",
        addOption: true
      },
      {
        value: "Imagen",
        field: "image",
        addOption: false
      },
      {
        value: "Lista",
        field: "list",
        addOption: false
      },
      {
        value: "Desplegable",
        field: "drop-down",
        addOption: true
      },
      {
        value: "Propiedades",
        field: "property",
        addOption: false
      },
      {
        value: "Texto",
        field: "text",
        addOption: false
      },
      {
        value: "Texto Enriquecido",
        field: "rich-text",
        addOption: false
      }
    ];
  }

  addItemList(position) {
    this.listIndex = position;
    this.addNewItenmList = true;
    this.dataStatic.newList = null;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deleteSection();
    }
  }

  selectImageMainWeb($event, content, position) {
    if ($event.image.length > 0) {
      content[position].value = $event.image[0]
      content[position].url_attachment = localStorage.getItem("url_attachment");
    }
  }

  changeStateAccordion(dataAccordion) {
    if (dataAccordion.accordion_show) {
      dataAccordion.accordion_show = false;
    } else {
      dataAccordion.accordion_show = true;
    }
  }

  confirmDeleteAccordion() {
    this.deleteObjSelect = this.objParent;
    this.deleteIndexSelect = this.positionParent;
    const messageModal = "¿Esta seguro de eliminar el acordión?";
    this.dialogConfirm.show(
      "Eliminar Marca",
      messageModal,
      "El cambio se guardará inmediatamente"
    );
  }

  changeFielNameList() {
    this.optionAddComponent.name = this.listTypeField.name_field;
  }

  confirmDeleteItem(content, index, field) {
    this.deleteObjSelect = content[field];
    this.deleteIndexSelect = index;
    const messageModal = "¿Esta seguro de eliminar el item?";
    this.dialogConfirm.show(
      "Eliminar",
      messageModal,
      "El cambio se guardará inmediatamente"
    );
  }

  deleteSection() {
    if (this.deleteObjSelect) {
      this.deleteObjSelect.splice(this.deleteIndexSelect, 1);
      this.middleService.sendUpdateDeleteItem();
    }
  }

  finsiItemList() {
    this.addNewItenmList = false;
  }

  optionTypeChange() {
    const indexSelect = this.listOptionAddElement.findIndex(
      item => item.field == this.listTypeField.type
    );
    this.listTypeField.addOption = this.listOptionAddElement[
      indexSelect
    ].addOption;
    this.selectModalSectionOption = true;

    switch (this.listTypeField.type) {
      case "email": {
        this._emailFormService.getListEmailForm().subscribe(
          listEmail => {
            this.optionAddComponent.options = listEmail;
            this.optionAddComponent.placeholder = "Formulario de Email";
          },
          error => { }
        );
        break;
      }
      case "drop-down": {
        this._ldvService.getAllLDV().subscribe(
          listOption => {
            this.optionAddComponent.options = listOption;
            this.optionAddComponent.placeholder = "Lista de Valores";
          },
          error => { }
        );
        break;
      }
    }
  }
  selectComponentOption() {
    const indexComponent = this.optionAddComponent.options.findIndex(
      item => item._id == this.listTypeField.componentOption
    );
    switch (this.listTypeField.type) {
      case "email": {
        this.optionAddComponent.name = this.optionAddComponent.options[
          indexComponent
        ].name;
        this.optionAddComponent.value = this.optionAddComponent.options[
          indexComponent
        ]._id;
        break;
      }
      case "drop-down": {
        this._ldvService
          .getLdvDetail(this.optionAddComponent.options[indexComponent].code)
          .subscribe(
            listLDV => {
              this.optionAddComponent.value = listLDV;
            },
            error => { }
          );

        break;
      }
    }
  }
  saveItemList(content) {
    if (!Array.isArray(content.value)) {
      content.value = [];
    }
    content.value.push({ value: this.dataStatic.newList });
    this.finsiItemList();
  }
  showModelSection() {
    this.listTypeField.value = null;
    this.listTypeField.type = null;
    this.showModalNewSection = true;
    this.selectModalSectionOption = false;
  }

  createNewSection() {
    if (
      (this.optionAddComponent.value && this.optionAddComponent.name) ||
      this.listTypeField.value
    ) {
      const objCreate: any = {};
      objCreate.type = this.listTypeField.type;

      if (this.optionAddComponent.value) {
        objCreate.title_rest = UtilsCode.cleanString(
          this.optionAddComponent.name
        );
        objCreate.title = this.optionAddComponent.name;
        objCreate.value = this.optionAddComponent.value;
      } else {
        objCreate.title_rest = UtilsCode.cleanString(this.listTypeField.value);
        objCreate.title = this.listTypeField.value;
        objCreate.value = "";
      }
      this.config.content.push(objCreate);
      this.closeModal();
    }
  }

  goComponent(idComponent) {
    this.router.navigate([]).then(result => {
      window.open("/system/email-form/detail/" + idComponent, "_blank");
    });
  }

  openAddSection(accordionAdd) {
    this.accordionAdd = accordionAdd;
    this.addNewSection.config.title = "Nuevo Acordión";
    this.addNewSection.config.placeholder = "Nombre del acordeón";
    this.addNewSection.openModal();
  }

  addArraySection(content, newSection) {
    this.showModalArrayNewSection = true;
    this.contentArray.array = content;
    this.contentArray.newSection = newSection;
  }

  closeModalArray() {
    this.showModalArrayNewSection = false;
  }

  createNewArray(type) {
    const obj: any = {};
    obj.type = type;
    obj.attribute = [];
    const objAttribute: any = {};
    objAttribute.field = "";
    objAttribute.value = "";
    obj.attribute.push(objAttribute);

    if (this.contentArray.newSection) {
      if (!this.contentArray.array.value) {
        this.contentArray.array.value = [];
      }
      const objArray: any = [];
      objArray.push(obj);
      this.contentArray.array.value.push(objArray);
    } else {
      this.contentArray.array.push(obj);
    }
    this.closeModalArray();
  }

  addArrayAttibute(attribute) {
    const objAttribute: any = {};
    objAttribute.field = "";
    objAttribute.value = "";
    attribute.push(objAttribute);
  }

  createNewAccordion(dataInfo) {
    if (!Array.isArray(this.accordionAdd.value)) {
      this.accordionAdd.value = [];
    }
    this.accordionAdd.value.push({
      accordion: true,
      name: dataInfo,
      accordion_show: true,
      content: []
    });
  }
  closeModal() {
    this.showModalNewSection = false;
  }

  confirmDeleteArray(content, position) {
    content.splice(position, 1);
  }
  editList(obj) {
    if (obj.update) {
      obj.update = false;
    } else {
      obj.update = true;
    }
  }

  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'static-page' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageField = listInfo[0].value
          }
          resolve({})
        }, (error) => {
          resolve({})
          this.middleService.sendMessage('Producto', error.error.message, 'error')
        }
      )
    });
    return waitPromise;
  }

  getProductImageDimension() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'static-page' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageDimension = listInfo[0].value
          }

          resolve({})
        }, (error) => {
          this.middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }
  showWindowMultimedia(content, position?, maxSize?, maxDimension?) {
    if (!position && position !== 0) {
      this.showContent.emit(content);
    } else {
      this.showContent.emit({
        content, position, maxSize, maxDimension
      });
    }
  }
}
