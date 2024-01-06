import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import "rxjs/add/observable/forkJoin";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { CrudClientComponent } from '../../customer/crud-client/crud-client.component';
import { UserService } from 'src/app/shared/service/user.service';
import { ListCustomerComponent } from '../../customer/list-customer/list-customer.component';
import { CrudAddressClientComponent } from '../../customer/crud-address-client/crud-address-client.component';
import { LocationService } from 'src/app/shared/service/location.service';
import { ModalSearchProductComponent } from '../../product/modal-search-product/modal-search-product.component';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';
import { IDetailProduct, IOrderSave } from './interface/order-create.interface';
import { OrderCallCenterService } from './order-call-center.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-order-call-center',
  templateUrl: './order-call-center.component.html',
  styleUrls: ['./order-call-center.component.scss']
})
export class OrderCallCenterComponent implements OnInit, OnDestroy {
  /*  @HostListener('document:keypress', ['$event'])
   handleKeyboardEvent(event: KeyboardEvent) {
     console.log(event.key)
     
   } */
  sendOrder: boolean;
  headerFixed: boolean;
  submittedSearchUser: boolean
  submittedSearchUserName: boolean
  submittedSearchUserCode: boolean
  invoiceSend: boolean
  searchUserForm: FormGroup
  Subscriptions: Array<Subscription>;
  listTypeDocumentSearch: Array<any>;
  listAddress: Array<any>
  listDepartmentInnvoce: Array<any>
  listProvinceInnvoce: Array<any>
  listDistrictInnvoce: Array<any>
  productList: Array<any>
  searchUserNameForm: FormGroup
  searchUserCodeForm: FormGroup
  searchUserInnvoceForm: FormGroup
  openModalNoExistUser: boolean;
  customerId: any
  clientInfoUser: any
  clientInfoAddress: any
  step: any
  totalSell: any
  totalCharge: any
  totalDiscount: any
  totalDelivery: any
  validMethodSend: boolean
  productNoAddress: Array<any>
  listBines: any
  entityBines: any
  showBinesCondition: boolean
  validExistProducts: boolean

  @ViewChild("crudClient", { static: true }) crudClient: CrudClientComponent
  @ViewChild("customerList", { static: true }) customerList: ListCustomerComponent
  @ViewChild("addressClient", { static: true }) addressClient: CrudAddressClientComponent
  @ViewChild("productSearch", { static: true }) productSearch: ModalSearchProductComponent
  @ViewChild('dialogFinishCreate', { static: true }) dialogConfirm: DialogConfirmComponent;
  @ViewChild('dialogExistProduct', { static: true }) dialogConfirmExist: DialogConfirmComponent;

  constructor(
    private _middlesService: MiddleService,
    private _shoppingCardService: ShoppingCartService,
    private _ldvService: LdvService,
    private _userService: UserService,
    private _locationService: LocationService,
    private _callcenterService: OrderCallCenterService,
    private _orderService: OrderService
  ) {
    this.searchUserForm = new FormGroup({
      type_document: new FormControl(null, [Validators.required,]),
      document: new FormControl(null, [Validators.required]),
    });

    this.searchUserNameForm = new FormGroup({
      name_client: new FormControl(null, [Validators.required,])
    });
    this.searchUserCodeForm = new FormGroup({
      code_client: new FormControl(null, [Validators.required,])
    });

    this.searchUserInnvoceForm = new FormGroup({
      invoice_ruc: new FormControl(null, [Validators.required,]),
      invoice_business_name: new FormControl(null, [Validators.required,]),
      invoice_address: new FormControl(null, [Validators.required,]),
      invoice_district: new FormControl(null, [Validators.required,]),
      invoice_province: new FormControl(null, [Validators.required,]),
      invoice_department: new FormControl(null, [Validators.required,]),
      invoice_district_name: new FormControl(null, [Validators.required,]),
      invoice_province_name: new FormControl(null, [Validators.required,]),
      invoice_department_name: new FormControl(null, [Validators.required,])
    });
  }

  ngOnInit() {

    this.Subscriptions = new Array<Subscription>();
    this.initialSet()
    this.onChanges()
  }

  ngOnDestroy() {

    if (!this.sendOrder) {
      this._shoppingCardService.returnAll({ listProduct: this.productList, customerId: this.customerId }).subscribe(
        (deleteInfo) => {

        }
      )
    }
    this.Subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  initialSet() {
    this.validExistProducts = false
    this.showBinesCondition = false
    this.entityBines = null
    this.productNoAddress = []
    this.sendOrder = false
    this.productList = []
    this.step = 1
    this.totalSell = 0
    this.totalDiscount = 0
    this.totalDelivery = 0
    this.totalCharge = 0
    this.submittedSearchUser = false
    this.headerFixed = false;
    this.openModalNoExistUser = false
    this.submittedSearchUserName = false
    this.invoiceSend = false
    this.listAddress = []
    this.customerId = null
    this.clientInfoUser = null
    this.clientInfoAddress = null
    this.searchUserForm.reset()
    this.searchUserNameForm.reset()
    this.searchUserCodeForm.reset()
    this.submittedSearchUser = false
    this.submittedSearchUserName = false
    this.submittedSearchUserCode = false
    this.basicInfo()
  }

  get su() {
    return this.searchUserForm.controls;
  }
  get sun() {
    return this.searchUserNameForm.controls;
  }
  get suc() {
    return this.searchUserCodeForm.controls;
  }

  get sui() {
    return this.searchUserInnvoceForm.controls;
  }

  onChanges() {

    this.Subscriptions.push(this.searchUserInnvoceForm.get('invoice_department').valueChanges.subscribe(val => {
      if (val) {
        const departmentData = this.listDepartmentInnvoce.find(item => String(item._id) == String(val))
        console.log(departmentData)
        if (departmentData) {
          this.searchUserInnvoceForm.get('invoice_department_name').setValue(departmentData.name)
        }
        this.getListProvince(val)
      }
    }));
    this.Subscriptions.push(this.searchUserInnvoceForm.get('invoice_province').valueChanges.subscribe(val => {
      if (val) {
        const provinceData = this.listProvinceInnvoce.find(item => String(item._id) == String(val))
        if (provinceData) {
          this.searchUserInnvoceForm.get('invoice_province_name').setValue(provinceData.name)
        }
        this.getListDistrict(val)
      }
    }));

    this.Subscriptions.push(this.searchUserInnvoceForm.get('invoice_district').valueChanges.subscribe(val => {
      if (val) {
        const districtData = this.listDistrictInnvoce.find(item => String(item._id) == String(val))
        if (districtData) {
          this.searchUserInnvoceForm.get('invoice_district_name').setValue(districtData.name)
        }
      }
    }));



  }

  searchShoppingCardUser() {
    if (!this.validExistProducts) {
      this.validExistProducts = true
      this._shoppingCardService.findByUser(this.clientInfoUser._id).subscribe(
        (listProducts: any) => {
          console.log(listProducts)
          if (listProducts.infoShoppingCart.length > 0) {
            for (const product of listProducts.infoShoppingCart) {
              product.info_product.quantity_seller = product.quantity
              product.info_product.special_price = product.price
              product.info_product.discount = 0
              this.productList.push(product.info_product)
            }

            this.dialogConfirmExist.show(
              "Productos existentes",
              "El cliente ha agregado productos desde la web. Se han agregado los productos a la lista", null, null, true
            );
          }
        }
      )
    } else {
      this.calcTotalProduct()
    }

  }


  createOrder() {
    let errorMessage = null
    const body: any = {}
    const orderSave = {} as IOrderSave
    if (this.clientInfoAddress) {
      if (this.validMethodSend) {
        orderSave.address_id = this.clientInfoAddress._id
        orderSave.currency = '5c26a99d296877099420c7b4'
        orderSave.user_phone = this.clientInfoUser.phone
        orderSave.delivery_address = this.clientInfoAddress.address
        orderSave.delivery_department_id = this.clientInfoAddress.department._id
        orderSave.delivery_district_id = this.clientInfoAddress.district._id
        orderSave.delivery_name_customer = this.clientInfoUser.additionals.name + ' ' + this.clientInfoUser.additionals.last_name_father + ' ' + this.clientInfoUser.additionals.last_name_mother
        orderSave.delivery_phone_customer = this.clientInfoAddress.cellphone
        orderSave.delivery_province_id = this.clientInfoAddress.province._id
        orderSave.delivery_reference = this.clientInfoAddress.reference
        orderSave.delivery_type_address = this.clientInfoAddress.type_address._id
        orderSave.detail = []
        let addBines: boolean = false
        for (const product of this.productList) {
          const detailProduct = {} as IDetailProduct
          detailProduct.discount = (product.special_price - product.priceDiscount) * product.quantity_seller
          detailProduct.discount_price = product.priceDiscount * product.quantity_seller
          if (product.use_bines) {
            addBines = true
          }
          if (product.list_method) {
            if (product.list_method.length > 0) {
              detailProduct.method_send = product.list_method[0]
            } else {
              errorMessage = 'El producto ' + product.name + ' no cuenta con un método de envio'
            }
          } else {
            errorMessage = 'El producto ' + product.name + ' no cuenta con un método de envio'
          }


          detailProduct.price = product.special_price
          detailProduct.product_id = product._id
          detailProduct.quantity = product.quantity_seller
          orderSave.detail.push(detailProduct)
        }


        orderSave.invoice_send = this.invoiceSend
        if (this.invoiceSend) {
          orderSave.invoice_address = this.searchUserInnvoceForm.get('invoice_address').value
          orderSave.invoice_business_name = this.searchUserInnvoceForm.get('invoice_business_name').value
          orderSave.invoice_department = this.searchUserInnvoceForm.get('invoice_department').value
          orderSave.invoice_district = this.searchUserInnvoceForm.get('invoice_district').value
          orderSave.invoice_province = this.searchUserInnvoceForm.get('invoice_province').value
          orderSave.invoice_ruc = this.searchUserInnvoceForm.get('invoice_ruc').value
        } else {
          orderSave.invoice_address = null
          orderSave.invoice_business_name = null
          orderSave.invoice_department = null
          orderSave.invoice_district = null
          orderSave.invoice_province = null
          orderSave.invoice_ruc = null
        }


        orderSave.user_phone = this.clientInfoAddress.cellphone
        body.order = orderSave
        body.customerId = this.customerId
        if (addBines) {
          body.listBines = this.listBines
        }

        if (errorMessage) {
          this._middlesService.sendMessage('Productos', errorMessage, 'error')
        } else {
          //continuar con el grabado de información
          console.log(orderSave)
          this._middlesService.sendLoading(true)
          this._callcenterService.createOrder(body).subscribe(
            (dataInfo: any) => {
              console.log(dataInfo)
              this._shoppingCardService.deleteAll(this.customerId).subscribe(
                (save: any) => {
                  this.sendOrder = true
                  this.dialogConfirm.show(
                    "Se ha creado la orden",
                    "El número de la orden es el " + dataInfo.infoOrder.code,
                    'El tiempo de entrega es entre ' + dataInfo.infoOrder.rangeMin + ' a ' + dataInfo.infoOrder.rangeMax + ' días.'
                    , null, true
                  );
                  this._middlesService.sendLoading(false)
                }
              )

            }
          )
        }
      } else {
        let listProduct = ''
        for (const product of this.productNoAddress) {
          listProduct = listProduct + product.name + ', '
        }
        if(listProduct != '') {
          this._middlesService.sendMessage('Generación de orden', listProduct + 'no puede ser entregado en esta dirección', 'error')
        }
        else {
          this._middlesService.sendMessage('Generación de orden', 'No se ha seleccionado ningún producto', 'error')
        }
      }

    } else {
      this._middlesService.sendMessage('Generación de orden', 'Debe seleccionar una dirección', 'error')
    }


  }


  openBinesCondition() {
    this.showBinesCondition = true
  }

  closeBinesCondition() {
    this.showBinesCondition = false
  }

  acceptModal(event) {

    console.log(event)
    console.log('yepeeeee')
    this.initialSet()
  }
  acceptModalExist() {

    this.getCampainProduct()
  }



  basicInfo() {
    this._middlesService.sendLoading(true)
    this.Subscriptions.push(Observable.forkJoin([
      this.getListTypeDocument(),
      this.getListDepartment(),
    ]
    ).subscribe(
      () => {
        this._middlesService.sendLoading(false)
      }
    ));
  }

  getListDepartment() {
    const waitPromise = new Promise((resolve, reject) => {
      this._locationService.getDepartment().subscribe((response: any) => {
        this.listDepartmentInnvoce = response
        resolve({});
      });
    });
    return waitPromise;
  }

  getListProvince(idDepartment) {
    this._middlesService.sendLoading(true)
    const waitPromise = new Promise((resolve, reject) => {
      this._locationService.getProvince(idDepartment).subscribe((response: any) => {
        this.listProvinceInnvoce = response
        this._middlesService.sendLoading(false)
        resolve({});
      });
    });
    return waitPromise;
  }

  getListDistrict(idProvince) {
    this._middlesService.sendLoading(true)
    const waitPromise = new Promise((resolve, reject) => {
      this._locationService.getDistrict(idProvince).subscribe((response: any) => {
        this.listDistrictInnvoce = response
        this._middlesService.sendLoading(false)
        resolve({});
      });
    });
    return waitPromise;
  }

  getListTypeDocument() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('TYPE-DOCUMENT-CUSTOMER').subscribe((response: any) => {
        this.listTypeDocumentSearch = response
        resolve({});
      });
    });
    return waitPromise;
  }

  createNewClient(sendPrevierInfo?) {
    let infoPreview: any
    if (sendPrevierInfo) {
      infoPreview = {}
      infoPreview.number_document = this.searchUserForm.get('document').value
      infoPreview.type_document = this.searchUserForm.get('type_document').value
      infoPreview.code_client = this.searchUserCodeForm.get('code_client').value
    }
    this.crudClient.open(infoPreview)
  }

  addProducts() {

    if (this.clientInfoAddress) {
      this.productSearch.open()
    } else {
      this._middlesService.sendMessage('Generación de orden', 'Debe seleccionar una dirección', 'error')
    }
  }

  createNewAddress() {
    this.addressClient.open(this.customerId)
  }
  closeNoExistUser() {
    this.openModalNoExistUser = false
  }

  answerAddClient(event) {
    if (event) {
      if (event.created) {
        if (event.created.userId) {
          this.searchInfoUser(event.created.userId)
        }
      }
    }
  }
  addressAddClient(event) {
    if (event) {
      if (event.created) {
        this.getAddressCustomer(this.customerId)
      }
    }
  }

  listProductSelect(event) {
    console.log(event)
    let existProductOutStock = false
    if (event.listProduct) {


      if (this.productList.length == 0) {
        for (const product of event.listProduct) {
          product.quantity_seller = 1
          product.discount = 0
          if (product.stock > 0) {
            this.productList.push(product)
          } else {
            existProductOutStock = true
          }
        }

      } else {
        for (const product of event.listProduct) {
          const existProduct = this.productList.find(item => String(item._id) == String(product._id))
          if (existProduct) {
            existProduct.quantity_seller = existProduct.quantity_seller + 1
          } else {
            if (product.stock > 0) {
              product.quantity_seller = 1
              product.discount = 0
              this.productList.push(product)
            } else {
              existProductOutStock = true
            }
          }
        }
      }
      if (existProductOutStock) {
        this._middlesService.sendMessage('Productos', 'Los productos sin stock no serán agregados', 'error')
      }

      this.getCampainProduct()
    }
  }

  async deleteProduct(position) {

    await this.deleteQuantityShoppingCard(this.productList[position]._id, this.productList[position].quantity_seller)
    this.productList.splice(position, 1)
    this.getCampainProduct()
  }



  async updateQuantityShoppingCard(productId, quantity) {
    const waitPromise = new Promise((resolve, reject) => {
      this._shoppingCardService.updateOne(productId, { id_user: this.clientInfoUser._id, quantity }).subscribe(
        (updateInfo) => {
          this._middlesService.sendMessage('Orden', 'Se actualizo la cantidad de productos', 'ok')
          resolve(true)
        }, (error) => {
          this._middlesService.sendMessage('Orden', error.error.message, 'error')
          resolve(false)
        }
      )
    });
    return waitPromise;
  }

  async deleteQuantityShoppingCard(productId, quantity) {
    const waitPromise = new Promise((resolve, reject) => {
      this._middlesService.sendLoading(true)
      this._shoppingCardService.deleteItem(productId, quantity, this.clientInfoUser._id).subscribe(
        (updateInfo) => {
          this._middlesService.sendMessage('Orden', 'Se eliminó el producto de la lista', 'ok')
          this._middlesService.sendLoading(false)
          resolve(true)
        }, (error) => {
          this._middlesService.sendLoading(false)
          resolve(false)
        }
      )
    });
    return waitPromise;
  }

  async minusQuantity(position) {
    if (this.productList[position].quantity_seller > 0) {
      this.productList[position].quantity_seller = this.productList[position].quantity_seller - 1
      if (this.productList[position].quantity_seller == 0) {
        await this.deleteQuantityShoppingCard(this.productList[position]._id, 1)
        this.productList.splice(position, 1)
      } else {
        await this.updateQuantityShoppingCard(this.productList[position]._id, this.productList[position].quantity_seller)
      }
      this.calcTotalProduct()
    }
  }
  async addQuantity(position) {
    this.productList[position].quantity_seller = this.productList[position].quantity_seller + 1
    const validSave = await this.updateQuantityShoppingCard(this.productList[position]._id, this.productList[position].quantity_seller)
    if (!validSave) {
      this.productList[position].quantity_seller = this.productList[position].quantity_seller - 1
    }
    this.calcTotalProduct()
  }

  calcTotalProduct() {
    this.calcDelivery()
    this.totalCharge = 0
    this.totalSell = 0
    this.totalDiscount = 0

    for (const product of this.productList) {
      product.discount = 0
      if (product.priceDiscount) {
        product.discount = (product.special_price - product.priceDiscount) * product.quantity_seller
        this.totalDiscount = this.totalDiscount + product.discount
      }
      product.call_center_total = (product.quantity_seller * product.special_price) - product.discount
      this.totalSell = this.totalSell + (product.quantity_seller * product.special_price)
    }

  }
  calcDelivery() {

    this._middlesService.sendLoading(true)
    this._orderService.calcTotalOrder({ products: this.productList, address: this.clientInfoAddress }).subscribe(
      (dataInfo: any) => {
        console.log(dataInfo)
        this.totalDelivery = dataInfo.listProduct.amount_delivery
        this.totalCharge = this.totalSell + this.totalDelivery - this.totalDiscount

        this._middlesService.sendLoading(false)
      }
    )
  }

  getCampainProduct() {
    this._middlesService.sendLoading(true)
    const infoSend: any = {}
    infoSend.products = []
    for (const product of this.productList) {
      infoSend.products.push({ _id: product._id })
    }

    infoSend.ubigeo = this.clientInfoAddress.ubigeo
    infoSend.address = this.clientInfoAddress._id
    this._shoppingCardService.listCallCenter(infoSend).subscribe(
      (infoGet: any) => {
        console.log(infoGet)
        this.productNoAddress = []
        this.validMethodSend = true
        this.listBines = null
        this.entityBines = null
        for (const product of infoGet) {

          const productSearch = this.productList.find(item => item._id == product.product_id)
          if (!product.validMethodSend) {
            if (this.validMethodSend) {
              this.validMethodSend = false
            }
            this.productNoAddress.push(productSearch)
          }
          productSearch.validMethodSend = product.validMethodSend
          if (product.has_discount) {
            let lessPrice = null
            let lessPriceBines = null
            let listLessPriceBines = null

            for (const discount of product.discounts_options) {
              if (!discount.bines) {
                if (!lessPrice || lessPrice > discount.discount_price) {
                  lessPrice = discount.discount_price
                }
              } else {
                if (!this.listBines) {
                  this.listBines = discount.bines
                }
                if (!lessPriceBines || lessPriceBines > discount.discount_price) {
                  lessPriceBines = discount.discount_price
                  listLessPriceBines = discount
                  this.entityBines = discount
                }
              }
            }

            if (lessPrice && !lessPriceBines) {
              productSearch.priceDiscount = lessPrice
            }
            if (!lessPrice && lessPriceBines) {
              productSearch.conditionDiscount = lessPriceBines
              productSearch.optionBines = listLessPriceBines
            }
            if (lessPrice && lessPriceBines) {
              if (lessPriceBines < lessPrice) {
                productSearch.conditionDiscount = lessPriceBines
                productSearch.optionBines = listLessPriceBines
              } else {
                productSearch.priceDiscount = lessPrice
              }
            }
          }
        }
        this._middlesService.sendLoading(false)
        this.calcTotalProduct()
      }
    )
  }

  setStep(step) {
    this.step = step
  }

  changePriceProduct(product) {

    if (product.active_offert) {
      product.priceDiscount = product.conditionDiscount
      product.use_bines = true
    } else {
      product.priceDiscount = 0
      product.use_bines = false
    }
    this.calcTotalProduct()
  }

  setIniVariable() {
    this.listAddress = []
    this.clientInfoUser = null
    this.clientInfoAddress = null
    this.customerId = null
    this.invoiceSend = false
    this.setStep(1)
  }
  setforms() {
    this.searchUserForm.reset()
    this.searchUserCodeForm.reset()
    this.searchUserNameForm.reset()
    this.searchUserInnvoceForm.reset()
    this.submittedSearchUser = false
    this.submittedSearchUserCode = false
    this.submittedSearchUserName = false
  }

  setAddressSelect(infoAddress) {
    this.clientInfoAddress = infoAddress
    this.searchShoppingCardUser()
    this.setStep(3)
  }

  searchClientCode() {
    this.setIniVariable()
    this.searchUserForm.reset()
    this.searchUserNameForm.reset()
    this._middlesService.sendLoading(true)
    this.submittedSearchUser = false
    this.submittedSearchUserName = false
    this.submittedSearchUserCode = true
    if (!this.searchUserCodeForm.invalid) {
      this._userService.getByCode(this.searchUserCodeForm.get('code_client').value).subscribe(
        (infoUser: any) => {
          this._middlesService.sendLoading(false)
          if (infoUser) {
            this.clientInfoUser = infoUser
            //this.searchShoppingCardUser()
            this.setStep(2)
            this.getAddressCustomer(infoUser._id)
          } else {
            this.openModalNoExistUser = true
          }
        }
      )
    } else {
      this._middlesService.sendLoading(false)
      this._middlesService.sendMessage('Cliente', 'Debe ingresar el código de socio del cliente', 'error')
    }
  }

  searchClientName() {
    this.setIniVariable()
    this.searchUserForm.reset()
    this.searchUserCodeForm.reset()
    this.submittedSearchUser = false
    this.submittedSearchUserCode = false
    this.submittedSearchUserName = true
    if (!this.searchUserNameForm.invalid) {

      let infoLocalFilter = {}
      if (sessionStorage.getItem('filterlocal')) {
        infoLocalFilter = JSON.parse(sessionStorage.getItem('filterlocal'))
      }
      infoLocalFilter['customer-search-call'] = this.searchUserNameForm.get('name_client').value;
      sessionStorage.setItem('filterlocal', JSON.stringify(infoLocalFilter))
      this.customerList.open()

    } else {

      this._middlesService.sendLoading(false)
      this._middlesService.sendMessage('Cliente', 'Debe ingresar nombre del cliente', 'error')
    }
  }

  searchClient() {
    this.setIniVariable()
    this.searchUserCodeForm.reset()
    this.searchUserNameForm.reset()
    this._middlesService.sendLoading(true)
    this.submittedSearchUserName = false
    this.submittedSearchUserCode = false
    this.submittedSearchUser = true
    if (!this.searchUserForm.invalid) {
      this._userService.getByDocument(this.searchUserForm.get('type_document').value, this.searchUserForm.get('document').value).subscribe(
        (infoUser: any) => {
          this._middlesService.sendLoading(false)
          if (infoUser) {
            this.clientInfoUser = infoUser
            //this.searchShoppingCardUser()
            this.setStep(2)
            this.getAddressCustomer(infoUser._id)
          } else {
            this.openModalNoExistUser = true
          }
        }
      )
    } else {

      this._middlesService.sendLoading(false)
      this._middlesService.sendMessage('Cliente', 'Debe ingresar el tipo de documento y el número de documento', 'error')
    }

  }

  getAddressCustomer(customerId) {
    this.customerId = customerId
    this._middlesService.sendLoading(true)
    this._userService.getAddressCustomer(customerId).subscribe(
      (infoAddress: Array<any>) => {
        this.listAddress = infoAddress
        this._middlesService.sendLoading(false)
      }
    )
  }

  userInfoSend(event) {
    if (event) {
      if (event.userId) {
        this.searchInfoUser(event.userId)
      }

    }

  }

  searchInfoUser(userId) {
    this._middlesService.sendLoading(true)
    this._userService.getDetailUser(userId).subscribe(
      (infoUser: any) => {
        this.getAddressCustomer(infoUser._id)
        this.clientInfoUser = infoUser
        //this.searchShoppingCardUser()
        this.setStep(2)
        this._middlesService.sendLoading(false)
      }
    )
  }
  cleanClient() {
    this.setIniVariable()
    this.setforms()
  }
  cleanAddress() {
    this.clientInfoAddress = null
  }




}
