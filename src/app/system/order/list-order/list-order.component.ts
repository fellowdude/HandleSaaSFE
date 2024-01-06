import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/shared/service/supplier.service';
import { UtilsCode } from '../../../utils/utilsCode';
import { GridComponent } from '../../components/grid/grid.component';
import { HeaderService } from '../../components/header/header.service';

interface IValidOrderOperations {
  validEditOrderState?: Boolean;
}

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  @ViewChild('gridListOrder', { static: true }) gridListOrder: GridComponent;
  editMode: Boolean;
  validOperations: IValidOrderOperations = {};
  isSupplier: boolean;
  headerFixed: boolean;
  idSupplier: string;
  constructor(
    private headerService: HeaderService,
    private _supplierService: SupplierService,
    ) { }
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  ngOnInit() {
    this.isSupplier = true;
    this.headerFixed = false;
    this.headerService.sendTitle('Pedidos');
    if (localStorage.getItem('dashboard-customer')) {
      localStorage.removeItem('dashboard-customer');
    }
    localStorage.setItem('list-order', '/system/order');
    this.getInfoAllowed();
    this.getDataSupplier()
    this.gridListOrder.columns = [
      {
        field: 'code',
        title: '# Pedido',
        type: 'text',
        align: 'left'
      },
      {
        field: 'user.additionals.name',
        title: 'Nombre',
        type: 'text',
        align: 'left'
      },
      {
        field: 'user.additionals.last_name_father',
        title: 'Apellido',
        type: 'text',
        align: 'left'
      },
      {
        field: 'user.additionals.number_document',
        title: 'Documento de Identidad',
        type: 'text',
        align: 'center'
      },
      /*  {
         field: "code_ERP",
         title: "Código ERP",
         type: "text",
         align: "center"
       }, */

      {
        field: 'create_date',
        title: 'Fecha',
        type: 'date',
        align: 'center'
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
        field: 'amount_total',
        title: 'Total',
        type: 'currency',
        currency: 'currency.ref1',
        align: 'right'
      },
    ];

    this.gridListOrder.config.pagQuantity = 25;
    this.gridListOrder.config.getService = '/order/customSearch';
    this.gridListOrder.config.redirect = 'system/order/detail/';
    this.gridListOrder.config.entityFilter = 'order_list';
  }

  getInfoAllowed() {
    this.validOperations.validEditOrderState = UtilsCode.urlValidAccess('Pedidos', 'PUT', 'Actualizar estado de un pedido');
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

  getDataSupplier() {
    this._supplierService.validIsSupplier().subscribe(
      (infoSupplier: any) => {
        this.isSupplier = infoSupplier.isSupplier;
        this.idSupplier = infoSupplier.idSupplier;
        if (this.isSupplier) {
          this.gridListOrder.columns.splice(5, 0, {
            field: 'attended2',
            title: 'Atendido',
            type: 'boolean',
            align: 'left',
            width: '145px',
            replace: [
              {
                value: true,
                replace: 'Atendido',
                type: 'label',
                background: '#e8f5e9',
                color: '#3dd47a',
              },
              {
                value: false,
                replace: 'No Atendido',
                type: 'label',
                background: '#fce4ec',
                color: '#fd96b9',
              },
            ],
            changeBoolean: {
              url: '/order/change-attended',
              urlType: 'dinamic',
              fieldDinamic: '_id'
            }
          });
          this.gridListOrder.config.customFilterButtons = [{
            value: 'Atendidos',
            filter: {
              field: 'attended',
              type: 'boolean',
              value: true,
              operator: '$and',
            },
            current: false,
          }, {
            value: 'No atendidos',
            filter: {
              field: 'attended',
              type: 'boolean',
              value: false,
              operator: '$and',
            },
            current: false,
          }, {
            value: 'Todos',
            filter: undefined,
            current: true,
          }];
          this.gridListOrder.config.idSupplier = this.idSupplier;
        } else {
          this.gridListOrder.columns.splice(6, 0,
            {
              field: 'current_step.value',
              title: 'Paso',
              type: 'text',
              align: 'left',
              width: '188px'
            });
        }
      }
    );
  }

  changeBooleanField(field, value) {
    this.gridListOrder.changeBooleanField(field, value);
  }

  changeEditMode() {
    this.editMode = !this.editMode;
    this.changeBooleanField('attended2', this.editMode);
    if (this.editMode) {
      this.headerService.sendTitle('Listado de pedidos (Modo Edición)');
    } else {
      this.headerService.sendTitle('Listado de pedidos');
      // this.gridListOrder.actions = [];
    }

  }
}
