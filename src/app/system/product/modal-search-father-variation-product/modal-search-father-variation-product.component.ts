import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-modal-search-father-variation-product',
  templateUrl: './modal-search-father-variation-product.component.html',
  styleUrls: ['./modal-search-father-variation-product.component.scss']
})
export class ModalSearchFatherVariationProductComponent implements OnInit {

  openModal: boolean
  listProducts: Array<any>
  selectedProducts: Array<any>
  productIdentificator: any
  arrayDelete: Array<any>
  finishAdd: boolean
  @Input() clientId: String
  @Output() listProductSelect: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('gridList', { static: false }) gridList: GridComponent;
  constructor(

  ) { }

  ngOnInit() {
    this.listProducts = []
    this.openModal = false
    this.selectedProducts = []
    this.productIdentificator = 0;
  }


  itemSelecReturn(event) {
    this.listProducts = event
  }

  accept() {
    this.listProductSelect.emit({ listProduct: this.listProducts })
    this.openModal = false
    this.finishAdd = true
  }

  close() {
    this.openModal = false
  }
  gridConfig() {
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/product/variation-father-list/all';
    this.gridList.config.entity = 'Producto';
    this.gridList.config.entityFilter = 'product';
    this.gridList.config.select = true
    this.gridList.config.selectGetArray = true
    this.gridList.config.selectSingle = true
    this.gridList.config.bodyStyle = { height: 'calc(98vh - 415px)' };
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Producto',
        type: 'text',
        align: 'left',
        fontWeight: 'bolder'
      },
      {
        field: 'brand_name',
        title: 'Marca',
        type: 'text',
        align: 'left',
        width: '200px'
      },
      {
        field: 'supplier.name',
        title: 'Seller',
        type: 'any',
        align: 'left',
        width: '200px'
      },
      {
        field: 'stock',
        title: 'Cantidad',
        type: 'number',
        align: 'right',
        color: '#1d72e8',
        width: '85px'
      },
      {
        field: 'is_product_variation_select',
        title: 'Tipo de Producto',
        type: 'boolean',
        align: 'right',
        replace: [
          {
            value: true,
            replace: "Producto base",
            type: "label",
            background: "#e8f5e9",
            color: "#3dd47a",
          }/* ,
          {
            value: false,
            replace: "Producto hijo",
            type: "label",
            background: "#fce4ec",
            color: "#fd96b9",
          }, */
        ]
      },
    ];
  }

  open() {
    this.listProducts = []
    this.openModal = true
    this.finishAdd = false
    setTimeout(() => {
      this.gridConfig()
      this.gridList.getInfo()
    }, 0);
  }
}
