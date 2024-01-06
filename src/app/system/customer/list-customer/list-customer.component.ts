import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  openModal: boolean
  @Output() userInfoSend: EventEmitter<any> = new EventEmitter<any>();
  headerFixed: boolean;
  infoUSerReturn: any
  @ViewChild('gridList', { static: false }) gridList: GridComponent;
  constructor() { }

  ngOnInit() {
    this.headerFixed = false;
    this.openModal = false
  }

  scrollEvent = (event: any): void => {

    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  itemSelecReturn(event) {
    console.log(event)
    if (event) {
      if (event.length > 0) {
        this.infoUSerReturn = event[0]
      }
    }
  }

  gridConfig() {
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/user/list-customer";
    this.gridList.config.entity = "Cliente";
    this.gridList.config.entityFilter = 'customer-search-call';
    this.gridList.config.select = true
    this.gridList.config.selectSingle = true
    this.gridList.config.bodyStyle = { height: 'calc(98vh - 415px)' };
    this.gridList.columns = [
      {
        field: "additionals.name",
        title: "Nombres",
        type: "text"
      },
      {
        field: "additionals.last_name_father",
        title: "Apellido Pat.",
        type: "text"
      },
      {
        field: "additionals.last_name_mother",
        title: "Apellido Mat.",
        type: "text"
      },
      {
        field: "additionals.number_card",
        title: "Num. Tarjeta",
        type: "text"
      },
      {
        field: "email",
        title: "Email",
        type: "text"
      },
      {
        field: "state",
        title: "Estado",
        type: "text",
        align: "center",
        replace: [
          {
            value: "H",
            replace: "Habilitado",
            type: "label",
            background: "#e8f5e9",
            color: "#3dd47a"
          },
          {
            value: "B",
            replace: "Bloqueado",
            type: "label",
            background: "#fce4ec",
            color: "#fd96b9"
          }
        ]
      }
    ];
  }


  open() {
    this.openModal = true
    setTimeout(() => {
      this.gridConfig()
      this.gridList.ngOnInit()
    }, 0);
  }

  close() {
    this.userInfoSend.emit({})
    this.openModal = false
  }
  accept() {
    this.userInfoSend.emit({ userId: this.infoUSerReturn })
    this.openModal = false
  }

}
