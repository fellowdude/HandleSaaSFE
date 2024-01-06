import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { UserService } from "src/app/shared/service/user.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HeaderService } from "../../components/header/header.service";
import { OrderService } from "src/app/shared/service/order.service";
import { GridComponent } from "../../components/grid/grid.component";
import { UtilsCode } from 'src/app/utils/utilsCode';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CrudAddressComponent } from "../crud-address/crud-address.component";

@Component({
  selector: "app-crud-customer",
  templateUrl: "./crud-customer.component.html",
  styleUrls: ["./crud-customer.component.scss"]
})
export class CrudCustomerComponent implements OnInit {
  customerForm: FormGroup;
  submitted: boolean;
  listAddress: any;
  idCustomer: any;
  headerFixed: boolean;
  listOrderCustomer: any;
  validUpdateUser: boolean
  validUpdateSpecificUser: boolean
  validUnlokUser: boolean
  validBlockUser: boolean
  @ViewChild("gridListOrder", { static: true }) gridListOrder: GridComponent;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _middleService: MiddleService,
    private _orderService: OrderService,
    private router: Router,
    private headerService: HeaderService,
    private dialog: MatDialog,
  ) {
    this.listAddress = [];
    this.activatedRoute.params.subscribe(params => {
      this.idCustomer = params.idCustomer;
    });
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }


  ngOnInit() {
    this.getInfoAllowed()
    if (localStorage.getItem("list-order")) {
      localStorage.removeItem("list-order");
    }
    localStorage.setItem(
      "dashboard-customer",
      "/system/customer/detail/" + this.idCustomer
    );
    this.gridListOrder.columns = [
      {
        field: "code",
        title: "Código",
        type: "text",
        align: "center"
      },

      {
        field: "create_date",
        title: "Fecha",
        type: "date",
        align: "center"
      },

      {
        field: 'order_name',
        title: 'Status',
        type: 'text',
        align: 'center',
        replace: [
          {
            value: "Pagado",
            replace: "Pagado",
            type: "label",
            background: "#e8f5e9",
            color: "#3dd47a"
          },
          {
            value: "Rechazado",
            replace: "Rechazado",
            type: "label",
            background: "#fce4ec",
            color: "#fd96b9"
          },
          {
            value: "No pagado",
            replace: "No pagado",
            type: "label",
            background: "#fff6df",
            color: "#f3a71b"
          },
          {
            value: "Empaque",
            replace: "Empaque",
            type: "label",
            background: "#FF9800",
            color: "#ffffff"
          },
          {
            value: "Distribución",
            replace: "Distribución",
            type: "label",
            background: "#673ab7",
            color: "#ffffff"
          },
          {
            value: "Entregado",
            replace: "Entregado",
            type: "label",
            background: "#044d77",
            color: "#ffffff"
          },
          {
            value: "Pre empaque",
            replace: "Pre empaque",
            type: "label",
            background: "#03a9f4",
            color: "#ffffff"
          },
          {
            value: "Pendiente",
            replace: "Pendiente",
            type: "label",
            background: "#FFEB3B",
            color: "#ae9c00"
          },
          {
            value: "En ruteo",
            replace: "En ruteo",
            type: "label",
            background: "#3f51b5",
            color: "#ffffff"
          },
          {
            value: "Validación",
            replace: "Validación",
            type: "label",
            background: "#607D8B",
            color: "#ffffff"
          },
          {
            value: "Ausente",
            replace: "Ausente",
            type: "label",
            background: "#9E9E9E",
            color: "#ffffff"
          }
        ]
      },
      {
        field: "amount_total",
        title: "Total",
        type: "currency",
        currency: "currency.ref1",
        align: "right"
      },
    ];
    this.headerService.sendTitle("Clientes");
    if (this.idCustomer) {
      this.getDataCustomer();
      this.getDataOrder();
    }
    this.headerFixed = false;
    this.customerForm = new FormGroup({
      birth_date: new FormControl(null),
      last_name_father: new FormControl(null),
      last_name_mother: new FormControl(null, [Validators.required]),
      name: new FormControl(null),
      number_card: new FormControl(null, [Validators.required]),
      number_document: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      suffix: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      email: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      type_document: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      create_date: new FormControl(null)
      // verified_email: new FormControl(null, [Validators.required])
    });
  }
  get f() {
    return this.customerForm.controls;
  }

  openAddressDialog(type: string, address?: any, user_id?: string) {
    const data = {
      address,
      type,
      user_id
    };

    let dialogRef = this.dialog.open(CrudAddressComponent, {
      data
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getDataCustomer();
      }
    })
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deleteCustomer()
    }
  }

  getAddresses(id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._userService.getAddressCustomer(id).subscribe(response => {
        console.log("new address", response)
        this.listAddress = response;
        resolve({});
      },
      (error) => {
        reject({});
      });
    });
    return waitPromise;
  }

  deleteAddress(address: any) {
    console.log(address);
    this._userService.deleteAddressCustomer(address, address._id).subscribe(response => {
      this._middleService.sendMessage(
        "Usuario",
        "Dirección eliminada",
        "ok"
      );
      this.getDataCustomer();
    },
    (error) => {
      this._middleService.sendMessage(
        "Usuario",
        error.error.message,
        "error"
      )}
    );
  }

  deleteCustomerConfirm() {
    const title = "Cliente";
    const messageModal = "Se eliminara al usuario. ¿Desea continuar?";
    this.dialogConfirm.show(title, messageModal, null, "deleteCustomer");
  }

  getInfoAllowed() {
    this.validUpdateSpecificUser = UtilsCode.urlValidAccess('Lista de Clientes', 'PUT', 'Actualizar a un cliente')
    this.validUnlokUser = UtilsCode.urlValidAccess('Lista de Clientes', 'PUT', 'Desbloquear a un cliente')
    this.validBlockUser = UtilsCode.urlValidAccess('Lista de Clientes', 'PUT', 'Bloquear a un cliente')
  }

  updateUserInfo() {

    if (!this.customerForm.invalid) {
      const infoSend: any = {}
      infoSend.name = this.customerForm.get('name').value;
      infoSend.last_name_father = this.customerForm.get('last_name_father').value;
      infoSend.last_name_mother = this.customerForm.get('last_name_mother').value;
      infoSend.email = this.customerForm.get('email').value;
      infoSend.phone = this.customerForm.get('phone').value;
      infoSend.state = this.customerForm.get('state').value === "Habilitado" ? "H" : "B";
      infoSend.number_document = this.customerForm.get('number_document').value;
      infoSend.number_card = this.customerForm.get('number_card').value;

      this._middleService.sendLoading(true);
      this._userService.updateCustomer(infoSend, this.idCustomer).subscribe(
        (infoSave) => {
          this._middleService.sendMessage('Clientes', 'Se actualizó correctamente al usuario', 'ok')
          this._middleService.sendLoading(false);
          this.router.navigate(["/system/customer"]);
          this.getDataCustomer()
        }, (error) => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage('Clientes', error.error.message, 'error')
        }
      );
    } else {
      this._middleService.sendMessage('Clientes', 'Revisa los campos obligatorios', 'error')
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

  getDataOrder() {
    this.gridListOrder.config.pagQuantity = 20;
    this.gridListOrder.config.getService =
      "/order/search-customer/" + this.idCustomer;
    this.gridListOrder.config.redirect = "system/order/detail/";
  }
  actionCustomer(event) {
    this._middleService.sendLoading(true);
    switch (event) {
      case "block": {
        this._userService.blockUser(this.idCustomer).subscribe(infoBlock => {
          this.getDataCustomer();
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Cliente",
            "El cliente ha sido bloqueado.",
            "ok"
          );
        }),
          error => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              "Cliente",
              error.error.message,
              "error"
            );
          };
        break;
      }
      case "unlock": {
        this._userService.unlockUser(this.idCustomer).subscribe(infounlock => {
          this._middleService.sendLoading(false);
          this.getDataCustomer();
          this._middleService.sendMessage(
            "Cliente",
            "El cliente ha sido habilitado.",
            "ok"
          );
        }),
          error => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              "Cliente",
              error.error.message,
              "error"
            );
          };
        break;
      }
    }
  }

  deleteCustomer() {
    this._middleService.sendLoading(true)
    this._userService.deleteCustomer(this.idCustomer).subscribe(
      (deleteUser) => {
        this._middleService.sendLoading(false)
        this._middleService.sendMessage('Usuario', 'El cliente fue eliminado.', 'ok')
        this.router.navigate(["/system/customer"]);
      }, (error) => {
        this._middleService.sendLoading(false)
        this._middleService.sendMessage('Usuario', error.error.message, 'error')
      }
    )
  }
  getDataCustomer() {
    this._middleService.sendLoading(true);
    this._userService.getDetailUser(this.idCustomer).subscribe(
      (infoCustomer: any) => {
        const keyListObj = Object.keys(infoCustomer);
        for (const fieldCustomer of keyListObj) {
          if (fieldCustomer == "additionals") {
            const keyList = Object.keys(infoCustomer.additionals);
            for (const field of keyList) {
              if (this.customerForm.get(field)) {
                this.customerForm
                  .get(field)
                  .setValue(infoCustomer.additionals[field]);
              }
            }
          } else {
            if (this.customerForm.get(fieldCustomer)) {
          
              if (fieldCustomer === 'create_date') {
                this.customerForm
                  .get(fieldCustomer)
                  .setValue(new Date(infoCustomer[fieldCustomer]));
              } else {
                this.customerForm
                  .get(fieldCustomer)
                  .setValue(infoCustomer[fieldCustomer]);
              }
            }
          }
        }
        const valueState =
          infoCustomer.state == "H" ? "Habilitado" : "Bloqueado";
        this.customerForm.get("state").setValue(valueState);
        this.listAddress = this.customerForm.get("address").value;
        this.getAddresses(this.idCustomer);
        if (infoCustomer.type_document) {
          this.customerForm
            .get("type_document")
            .setValue(infoCustomer.type_document.value);
        }
        this._middleService.sendLoading(false);
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          "Cliente",
          error.error.message,
          "error"
        );
      }
    );
  }

  returnCustomer() {
    if (localStorage.getItem("dashboard")) {
      this.router.navigate([localStorage.getItem("dashboard")]);
    } else {
      this.router.navigate(["/system/customer"]);
    }
  }

  validateInput(event: KeyboardEvent) {
    UtilsCode.validatePhoneInput(event);
  }
}
