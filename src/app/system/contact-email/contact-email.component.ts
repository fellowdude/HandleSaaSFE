import { Component, OnInit, ViewChild } from "@angular/core";
import { GridComponent } from "../components/grid/grid.component";
import { MiddleService } from "src/app/shared/service/middle.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContactEmailService } from "src/app/shared/service/contact-email.service";
import { DialogConfirmComponent } from "../components/dialog-confirm/dialog-confirm.component";
import { HeaderService } from "../components/header/header.service";

@Component({
  selector: "app-contact-email",
  templateUrl: "./contact-email.component.html",
  styleUrls: ["./contact-email.component.scss"]
})
export class ContactEmailComponent implements OnInit {
  contactEmailForm: FormGroup;
  idContactEmail: string;
  nameWindow: string;
  showPopupContact: boolean;
  submitted: boolean;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private _middleService: MiddleService,
    private _contactEmailService: ContactEmailService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.sendTitle("Agenda de Contactos de Email");
    this.nameWindow = "Contacto de email";
    this.contactEmailForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(80)
      ])
    });
    this.showPopupContact = false;
    this.gridList.actions = [
      {
        icon: "fas fa-trash-alt",
        action: "delete",
        fieldReturn: "_id",
        color: "#ff4081",
        tooltip:"Eliminar"
      }
    ];

    this.gridList.columns = [
      {
        field: "name",
        title: "Nombre",
        type: "text"
      },
      {
        field: "email",
        title: "Correo",
        type: "text"
      },
      {
        field: "create_date",
        title: "Fecha de creación",
        type: "date",
        align: "center"
      }
    ];

    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/contact-email/search";
    this.gridList.config.entity = "Contacto de email";
    this.gridList.config.entityFilter = 'contact_email';
    this.gridList.config.openModal = true;
  }
  get f() {
    return this.contactEmailForm.controls;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  actionAnswer(event) {
    this.idContactEmail = event.field;
    switch (event.action) {
      case "edit": {
        this._middleService.sendLoading(true);
        this._contactEmailService.getById(event.field).subscribe(
          infoData => {
            this._middleService.sendLoading(false);
            this.contactEmailForm.patchValue(infoData);
            this.showPopupContact = true;
          },
          error => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              this.nameWindow,
              error.error.message,
              "error"
            );
          }
        );
        break;
      }
      case "delete": {
        this.dialogConfirm.show(
          "Eliminar Contacto de Email",
          "¿Esta seguro de eliminar?"
        );
        break;
      }
    }
  }

  createContact() {
    this.idContactEmail = null;
    this.submitted = false;
    this.contactEmailForm.reset();
    this.showPopupContact = true;
  }

  deletItem() {
    this._middleService.sendLoading(true);
    this._contactEmailService.delete(this.idContactEmail).subscribe(
      data => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.nameWindow,
          "El contacto de email ha sido eliminado correctamente",
          "ok"
        );
        this.gridList.getInfo();
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.nameWindow,
          error.error.message,
          "error"
        );
      }
    );
  }

  saveContact() {
    this.submitted = true;
    if (!this.contactEmailForm.invalid) {
      this._middleService.sendLoading(true);
      if (this.idContactEmail) {
        this._contactEmailService
          .updateContact(this.idContactEmail, this.contactEmailForm.value)
          .subscribe(
            infoSave => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                this.nameWindow,
                "El contacto de email ha sido actualizado correctamente",
                "ok"
              );
              this.close();
              this.gridList.getInfo();
            },
            error => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                this.nameWindow,
                error.error.message,
                "error"
              );
            }
          );
      } else {
        this._contactEmailService
          .saveContact(this.contactEmailForm.value)
          .subscribe(
            infoSave => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                this.nameWindow,
                "EL contacto de email ha sido creado correctamente",
                "ok"
              );
              this.close();
              this.gridList.getInfo();
            },
            error => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                this.nameWindow,
                error.error.message,
                "error"
              );
            }
          );
      }
    } else {
      this._middleService.sendMessage(
        this.nameWindow,
        "Revise los campos obligatorios",
        "error"
      );
    }
  }

  close() {
    this.showPopupContact = false;
  }
}
