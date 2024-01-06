import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-modal-search-product',
  templateUrl: './modal-search-product.component.html',
  styleUrls: ['./modal-search-product.component.scss']
})
export class ModalSearchProductComponent implements OnInit {
  openModal: boolean
  listProducts: Array<any>
  selectedProducts: Array<any>
  productIdentificator: any
  productProcess: any
  arrayDelete: Array<any>
  @Input() clientId: String
  @Output() listProductSelect: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('gridList', { static: false }) gridList: GridComponent;
  constructor(
    private _shoppingCart: ShoppingCartService,
    private _middlewareService: MiddleService
  ) { }

  ngOnInit() {
    this.arrayDelete = []
    this.listProducts = []
    this.openModal = false
    this.selectedProducts = []
    this.productProcess = {
      total: 0,
      process: 0
    }
    this.productIdentificator = 0;
  }

  fieldReturn() {

  }
  actionAnswer() {

  }


  deleteItem(processProduct) {
    this._shoppingCart.deleteItem(processProduct._id, 1, this.clientId).subscribe(
      (infoDelete) => {
        processProduct.delete = true
      }
    )
  }

  existProductInProcess(): boolean {
    let ValidInProcess = false
    const existInProcess = this.listProducts.find(item => !item.finish)
    if (existInProcess) {
      ValidInProcess = true
    }
    return ValidInProcess
  }
  validProducts() {
    for (const product of this.listProducts) {
      const productInProcess = this.selectedProducts.find(item => String(item._id) == String(product._id))
      if (!productInProcess) {
        this.selectProduct({ id_product: product._id, quantity: 1, clientId: this.clientId }, product._id)
      }
    }

    for (const processProduct of this.selectedProducts) {
      const productInProcess = this.listProducts.find(item => String(item._id) == String(processProduct._id))
      if (!productInProcess) {
        if (!processProduct.delete) {
          if (processProduct.in_process) {
            this.arrayDelete.push({ id: processProduct.id, _id: processProduct._id })
          } else {
            this.deleteItem(processProduct)
          }
        }


      }
    }
  }

  itemSelecReturn(event) {
    console.log(event)
    this.listProducts = event
    this.validProducts()
  }

  accept() {
    if (!this.existProductInProcess()) {
      this.listProductSelect.emit({ listProduct: this.listProducts })
      this.openModal = false
    } else {
      this._middlewareService.sendMessage('Productos', 'Aun se estan procesando los productos.', 'error')
    }

  }

  close() {
    this.openModal = false
  }
  gridConfig() {
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/product/searchAll-seller';
    this.gridList.config.entity = 'Producto';
    this.gridList.config.entityFilter = 'product';
    this.gridList.config.select = true
    this.gridList.config.selectGetArray = true
    this.gridList.config.bodyStyle = { height: 'calc(98vh - 415px)' };
    this.gridList.columns = [
      {
        field: 'SKU',
        title: 'SKU',
        type: 'text',
        align: 'left',
        width: '70px'
      },
      {
        field: 'name',
        title: 'Producto',
        type: 'text',
        align: 'left',
        fontWeight: 'bolder'
      },

      {
        field: 'special_price',
        title: 'Precio',
        type: 'currency',
        currency: 'currency.ref1',
        align: 'right',
        fontWeight: 'bolder',
        width: '100px',
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
      }
    ];
  }

  open() {
    this.listProducts = []
    this.openModal = true
    setTimeout(() => {
      this.gridConfig()
      this.gridList.getInfo()
    }, 0);
  }


  fakeResponseSubscribe(pedidoDataBody, insideproduct) {

    this._shoppingCart.itemCreate(pedidoDataBody).subscribe(
      (returnInfo) => {
        this.selectedProducts[insideproduct].status = true;
        //miemiter.emit({ response, status: true })
        const existeDelete = this.arrayDelete.find(item => item.id == insideproduct)
        if (existeDelete) {
          this.deleteItem(this.selectedProducts[insideproduct])
        } else {
          const produtSelect = this.listProducts.find(item => item._id == this.selectedProducts[insideproduct]._id)
          if (produtSelect) {
            produtSelect.finish = true
            this.productProcess.process = this.productProcess.process + 1
          }

        }

        if (this.verifyAllFinished()) {


        };
      },
      (error) => {
        this.productProcess.total = this.productProcess.process
        this.listProducts.pop()
        //this.selectedProducts[insideproduct].status = false
        //this.selectedProducts.pop()
        //this.selectedProducts[insideproduct].status = false;
        this._middlewareService.sendMessage('Productos', error.error.message, 'error')
      }
    )

  }


  selectProduct(pedidoDataBody, productId) {

    let insideproduct = this.productIdentificator;

    this.selectedProducts.push(
      {
        id: this.productIdentificator,
        _id: productId,
        promise: this.fakeResponseSubscribe(pedidoDataBody, insideproduct),
        status: false,
        in_process: true
      });
    this.productIdentificator++;
    this.productProcess.total = this.productProcess.total + 1

  }

  verifyAllFinished() {
    let result = false;
    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (this.selectedProducts[i].status == true) {
        result = true;
      } else if (this.selectedProducts[i].status == false) {
        result = false;
        break;
      }
    }
    return result;
  }

}
