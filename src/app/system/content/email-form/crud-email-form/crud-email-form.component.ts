import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsCode } from 'src/app/utils/utilsCode';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { EmailFormService } from 'src/app/shared/service/email-form.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { DialogConfirmComponent } from 'src/app/system/components/dialog-confirm/dialog-confirm.component';
import { GroupEmailService } from 'src/app/shared/service/group-email.service';
import { ListInformationComponent } from 'src/app/system/components/list-information/list-information.component';
import { MultimediaGalleryComponent } from 'src/app/system/components/multimedia-gallery/multimedia-gallery.component';
import { TypeFieldService } from 'src/app/shared/service/type-field.service';
import { HeaderService } from 'src/app/system/components/header/header.service';
@Component({
  selector: 'app-crud-email-form',
  templateUrl: './crud-email-form.component.html',
  styleUrls: ['./crud-email-form.component.scss']
})
export class CrudEmailFormComponent implements OnInit {
  detailGroupEmail: any;
  emailForm: FormGroup;
  headerFixed: boolean;
  listRequestedField: any;
  htmlTemplate: any;
  idEmailForm: any;
  listOptionAddElement: any;
  listTypeField: any;
  listTypeService: any;
  listSubType: any;
  listGroupEmail: any;
  lisBannerAddPicture = [];
  selectMuti: any;
  selectPicture: any;
  nameWindow: string;
  showPopupContact: boolean;
  showModalNewSection: boolean;
  submitted: boolean;
  templateExample: any;
  templateForm: FormGroup;
  templateState: any;
  url_attachment: string;
  tinyEditorConfig;
  @ViewChild('dialogDelete', { static: true })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild('listInformation', { static: true })
  listInformation: ListInformationComponent;
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  replacePosition;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _middleService: MiddleService,
    private _emailFormService: EmailFormService,
    private _groupEmailService: GroupEmailService,
    private _ldvService: LdvService,
    private _typeFieldService: TypeFieldService,
    private headerService: HeaderService
  ) {
    this.lisBannerAddPicture = [];
    this.url_attachment = localStorage.getItem('url_attachment');
    this.activatedRoute.params.subscribe(params => {
      this.idEmailForm = params.idEmailForm;
    });
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  ngOnInit() {
    this.headerService.sendTitle('Formularios de Email');
    this.submitted = false;
    this.detailGroupEmail = [];
    this.nameWindow = 'Formulario de email';
    this.headerFixed = false;
    this.showPopupContact = false;
    this.listTypeField = {};
    this.listTypeService = [];
    this.templateState = {};
    this.templateExample = {};
    this.emailForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      button_text: new FormControl(null, [Validators.required]),
      image_banner: new FormControl(null),
      footer_message: new FormControl(null),
      email: new FormControl(null),
      group_email: new FormControl(null),
      subject: new FormControl(null, [Validators.required]),
      template: new FormControl(null, [Validators.required]),
      service_save: new FormControl(null),
      use_personalized_email: new FormControl(null)
    });

    this.getListGroupEmail();
    this.onChanges();
    this.getListTypeField();
    this.tinyEditorConfig = {
      /*  height: '200px', */
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print autoresize',
        'preview anchor searchreplace visualblocks code',
        'fullscreen insertdatetime media table paste',
        'help wordcount fullscreen'
      ],
      toolbar:
        'undo redo | formatselect | fontsizeselect | bold italic | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent forecolor backcolor | table tabledelete | fullscreen'
    };
    /* this.listOptionAddElement = [
      {
        value: "Contenido",
        field: "text-area",
        replaceable: true
      },
      {
        value: "Indicaciones",
        field: "instruction",
        replaceable: false
      },
      {
        value: "Lista",
        field: "list",
        replaceable: true
      },
      {
        value: "Rate",
        field: "rate",
        replaceable: true
      },
      {
        value: "Check Box",
        field: "checkbox",
        replaceable: true
      },
      {
        value: "Texto",
        field: "text",
        replaceable: true,
        subType: [
          {
            name: "Email",
            field: "email"
          },
          {
            name: "Fecha",
            field: "date"
          },
          {
            name: "Número",
            field: "number"
          },
          {
            name: "Texto",
            field: "text"
          }
        ]
      }
    ]; */

    this.listRequestedField = [];
    if (this.idEmailForm) {
      this.getEmailForm();
    }
    this.createForm();
    this.getServiceSaveBd();
  }
  get f() {
    return this.emailForm.controls;
  }
  get t() {
    return this.templateForm.controls;
  }

  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);
  }

  getListTypeField() {
    this._typeFieldService.getAll().subscribe(
      listOptionAddElement => {
        this.listOptionAddElement = listOptionAddElement;
      },
      error => {
        this._middleService.sendMessage(this.nameWindow, error, 'error');
      }
    );
  }

  addFieldList() {
    this.listTypeField.list.push(this.listTypeField.addValueList);
    this.closeAddList();
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show(
      'Eliminar Formulario de Email',
      '¿Esta seguro de eliminar?'
    );
  }

  dataPictureSave($event) {
    if (this.selectMuti) {
      for (const picture of $event) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = picture;
        } else {
          this[this.selectPicture].push(picture);
        }
      }
    } else {
      if ($event.length > 0) {
        if (this.replacePosition || this.replacePosition == 0) {
          this[this.selectPicture][this.replacePosition] = $event;
        } else {
          this[this.selectPicture].push($event);
        }
      }
    }
  }

  deleteImage(position, field) {
    this[field].splice(this[field].length - position, 1);
    if (position > this[field].length) {
      position = this[field].length;
    }
  }

  showWindowMultimedia(field, multi, replacePosition?) {
    this.replacePosition = replacePosition;
    this.selectMuti = false;
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    if (multi) {
      this.multimediaGallery.config.typeInfo = 'multi';
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }

  deletItem() {
    this._middleService.sendLoading(true);
    this._emailFormService.delete(this.idEmailForm).subscribe(
      data => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.nameWindow,
          'El formulario ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['/system/email-form']);
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.nameWindow,
          error.error.message,
          'error'
        );
      }
    );
  }

  closeAddList() {
    this.listTypeField.addList = false;
  }
  changeStateTemplate() {
    this.templateState.activeView = !this.templateState.activeView;
    if (!this.templateState.activeView) {
      this.htmlTemplate = null;
      this.templateForm.reset();
    }
  }
  closeModal() {
    this.showModalNewSection = false;
  }
  createForm() {
    this.templateForm = new FormGroup({});
    for (const field of this.listRequestedField) {
      this.templateForm.addControl(field.field, new FormControl(''));
    }
  }
  createNewSection() {
    let continueSave = false;
    if (
      this.listTypeField.type &&
      this.listTypeField.name &&
      this.listTypeField.replaceable
    ) {
      continueSave = true;
      if (
        this.listTypeField.type == 'checkbox' &&
        !this.listTypeField.group_name
      ) {
        continueSave = false;
      }
    }
    if (continueSave) {
      const newObj: any = {};
      newObj.type = this.listTypeField.type;
      newObj.name = this.listTypeField.name;
      newObj.value = this.listTypeField.value;
      newObj.list = this.listTypeField.list;
      newObj.replaceable = this.listTypeField.replaceable;
      newObj.sub_type = this.listTypeField.sub_type;
      newObj.group_name = this.listTypeField.group_name;
      newObj.size = this.listTypeField.size;
      if (this.listTypeField.replaceable) {
        if (this.listTypeField.type == 'checkbox') {
          newObj.replace =
            '*-' + UtilsCode.cleanString(this.listTypeField.group_name) + '-*';
        } else {
          newObj.replace =
            '*-' + UtilsCode.cleanString(this.listTypeField.name) + '-*';
        }
      }
      if (this.listTypeField.type == 'checkbox') {
        newObj.field = UtilsCode.cleanString(this.listTypeField.group_name);
      } else {
        newObj.field = UtilsCode.cleanString(this.listTypeField.name);
      }
      newObj.required = this.listTypeField.required;
      this.listRequestedField.push(newObj);
      this.createForm();
      this.closeModal();
    } else {
      this._middleService.sendMessage(
        'Formulario de email',
        'Todos los campos son obligatorios',
        'error'
      );
    }
  }

  changeTypeOption() {
    const indexProperty = this.listOptionAddElement.findIndex(
      field => field.field == this.listTypeField.type
    );
    if (indexProperty >= 0) {
      this.listSubType = this.listOptionAddElement[indexProperty].subType;
      this.listTypeField.replaceable = this.listOptionAddElement[
        indexProperty
      ].replaceable;
    }
  }

  deleteOption(index) {
    this.listRequestedField.splice(index, 1);
  }

  getEmailForm() {
    this._middleService.sendLoading(true);
    this._emailFormService.getById(this.idEmailForm).subscribe(
      (infoFormEmail: any) => {
        this._middleService.sendLoading(false);
        this.emailForm.patchValue(infoFormEmail);
        this.listRequestedField = infoFormEmail.request_field;
        if (infoFormEmail.image_banner) {
          this.lisBannerAddPicture.push(infoFormEmail.image_banner);
        }
        this.createForm();
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          'Formulario de email',
          error.error.message,
          'error'
        );
      }
    );
  }

  getServiceSaveBd() {
    this._ldvService.getLdvDetail('TYPE-SERVICE-FORM').subscribe(
      listService => {
        this.listTypeService = listService;
      },
      () => { }
    );
  }

  editOption(index) {
    this.listTypeField = Object.assign({}, this.listRequestedField[index]);
    if (!this.listTypeField.size) {
      this.listTypeField.size = 0;
    }
    this.listTypeField.indexUpdate = index;
    this.showModalNewSection = true;
    this.changeTypeOption();
  }

  getListGroupEmail() {
    this._groupEmailService.getList().subscribe(
      listGroup => {
        this.listGroupEmail = listGroup;
      },
      error => {
        this._middleService.sendMessage(
          this.nameWindow,
          error.error.message,
          'error'
        );
      }
    );
  }

  onChanges(): void {
    this.emailForm.get('group_email').valueChanges.subscribe(val => {
      this.selectDetailGroup(val);
    });
  }

  selectDetailGroup(val) {
    if (this.listGroupEmail) {
      const indexGroup = this.listGroupEmail.findIndex(item => item._id == val);
      if (indexGroup >= 0) {
        this.detailGroupEmail = this.listGroupEmail[indexGroup].list_contact;
      } else {
        this.detailGroupEmail = [];
      }
    }
  }

  openListContact() {
    this.listInformation.open(this.detailGroupEmail);
  }

  updateOption() {
    if (this.listTypeField.type == 'checkbox') {
      this.listTypeField.field = UtilsCode.cleanString(
        this.listTypeField.group_name
      );
      this.listTypeField.replace =
        '*-' + UtilsCode.cleanString(this.listTypeField.group_name) + '-*';
    } else {
      this.listTypeField.field = UtilsCode.cleanString(this.listTypeField.name);
      this.listTypeField.replace =
        '*-' + UtilsCode.cleanString(this.listTypeField.name) + '-*';
    }
    this.listRequestedField[this.listTypeField.indexUpdate] = Object.assign(
      {},
      this.listTypeField
    );

    delete this.listRequestedField[this.listTypeField.indexUpdate].indexUpdate;
    this.showModalNewSection = false;
  }
  newFieldList() {
    this.listTypeField.addList = true;
    this.listTypeField.addValueList = null;
    if (!this.listTypeField.list) {
      this.listTypeField.list = [];
    }
  }

  newField() {
    this.listTypeField = {};
    this.listTypeField.size = 0;
    this.showModalNewSection = true;
  }
  replaceEmail() {
    this.htmlTemplate = this.f.template.value;
    for (const field of this.listRequestedField) {
      this.htmlTemplate = this.htmlTemplate.replace(
        field.replace,
        this.t[field.field].value
      );
    }
  }
  returnEmail() {
    this.htmlTemplate = null;
  }
  sendEmail() {
    if (!this.emailForm.invalid) {
      const dataSend: any = {};
      dataSend.email_send = this.emailForm.get('email').value;
      dataSend.group_email = this.emailForm.get('group_email').value;
      dataSend.template = this.htmlTemplate;
      dataSend.subject = this.emailForm.get('subject').value;
      this._emailFormService.sendEmail(dataSend).subscribe(
        dataSave => {
          this._middleService.sendMessage(
            'Formulario de email',
            'El mensaje a sido enviado al correo especificado',
            'ok'
          );
        },
        error => {
          console.log(error);
          this._middleService.sendMessage(
            'Formulario de email',
            error.error.message,
            'error'
          );
        }
      );
    }
  }
  returnListEmail() {
    this.router.navigate(['/system/email-form']);
  }
  saveEmailForm() {
    this.submitted = true;
    if (!this.emailForm.invalid) {
      if (this.emailForm.get('use_personalized_email').value) {
        this.emailForm.get('group_email').setValue(null);
      }

      if (
        !this.emailForm.get('group_email').value &&
        !this.emailForm.get('use_personalized_email').value
      ) {
        this._middleService.sendMessage(
          'Formulario de email',
          'El grupo de email es obligatorio',
          'error'
        );
      } else {
        if (this.lisBannerAddPicture.length > 0) {
          this.emailForm
            .get('image_banner')
            .setValue(this.lisBannerAddPicture[0]);
        } else {
          this.emailForm.get('image_banner').setValue(null);
        }

        const dataSend = Object.assign({}, this.emailForm.value);
        dataSend.end_point = UtilsCode.cleanString(
          this.emailForm.get('name').value
        );
        dataSend.request_field = this.listRequestedField;
        this._middleService.sendLoading(true);
        if (this.idEmailForm) {
          this._emailFormService.update(this.idEmailForm, dataSend).subscribe(
            dataSave => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Formulario de email',
                'El formulario de email ha sido actualizado correctamente',
                'ok'
              );
            },
            error => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Formulario de email',
                error.error.message,
                'error'
              );
            }
          );
        } else {
          this._emailFormService.saveForm(dataSend).subscribe(
            (data: any) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Formulario de email',
                'El formulario ha sido creado correctamente',
                'ok'
              );
              this.router.navigate([
                '/system/email-form/detail/' + data.idCreate
              ]);
            },
            error => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                'Formulario de email',
                error.error.message,
                'error'
              );
            }
          );
        }
      }
    } else {
      this._middleService.sendMessage(
        'Formulario de email',
        'Revise los campos obligatorios',
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
