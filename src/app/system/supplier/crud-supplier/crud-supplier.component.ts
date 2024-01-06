import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { SupplierService } from 'src/app/shared/service/supplier.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { SupplierMethodSendService } from 'src/app/shared/service/supplier-method-send.service';
import { MultimediaGalleryComponent } from '../../components/multimedia-gallery/multimedia-gallery.component';
import { BrandService } from 'src/app/shared/service/brand.service';
import { UserService } from 'src/app/shared/service/user.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
import { GridComponent } from '../../components/grid/grid.component';
import { HeaderService } from '../../components/header/header.service';
import { LoadingSync } from '../../../shared/service/loadingSync.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../shared/service/category.service';
import { DynamicTreeViewComponent } from '../../components/dynamic-tree-view/dynamic-tree-view.component';
import { UtilsCode } from '../../../utils/utilsCode';
import { Location } from '@angular/common';
import { CrudSupplierLocalComponent } from '../crud-supplier-local/crud-supplier-local.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-crud-supplier',
  templateUrl: './crud-supplier.component.html',
  styleUrls: ['./crud-supplier.component.scss'],
})
export class CrudSupplierComponent implements OnInit, OnDestroy {
  isSupplier: boolean
  selectPicture: any;
  userForm: FormGroup;
  headerFixed: boolean;
  idSupplier: string;
  supplierForm: FormGroup;
  showMoreButton: boolean;
  lisAddPicture: any;
  listMethodSend: any;
  idMethodDelete: any;
  submitted: boolean;
  idSupplierRol: string;
  imagePositionMobile: any;
  objChange: any;
  floatOption: boolean;
  imageShowSlider: string;
  url_attachment: string;
  showAddBrand: boolean;
  showAddSupplierDelivery: boolean;
  namePage: string;
  listBrand: Array<any>;
  listSupplierDelivery: Array<any>;
  selectBrandArray: Array<any>;
  selectSupplierArray: Array<any>;
  infoSelectBrand: Array<any>;
  infoSelectSupplierDelivery: Array<any>;
  showModalUser: boolean;
  idUser: string;
  submittedUser: boolean;
  loadingSyncSubscription: Subscription;
  showAddCategory: boolean;
  showAddGroupCategory: boolean;
  groupList: any;
  selectCategory: any;
  listCategory: Array<any>;
  listGroupCategory: Array<any>;
  selectGroupCategoryArray: Array<any>;
  infoSelectGroupCategory: Array<any>;
  listCategoriesFilter: Array<any>;
  childNode: any = {};
  fullCategorySelect = false;
  listLocals: any;
  currentVisibleCat: any;
  @ViewChild('categoryTree', { static: false })
  selectableCategory: DynamicTreeViewComponent;
  @ViewChild('deleteSupplier', { static: true })
  dialogConfirm: DialogConfirmComponent;
  @ViewChild('deleteMethod', { static: true })
  dialogMethodConfirm: DialogConfirmComponent;
  @ViewChild('multimediaList', { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  replacePosition: any;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private middleService: MiddleService,
    private serviceSupplier: SupplierService,
    private _serviceBrand: BrandService,
    private _serviceCategory: CategoryService,
    private _methodSendService: SupplierMethodSendService,
    private _userService: UserService,
    private _ldvService: LdvService,
    private headerService: HeaderService,
    private loadingSync: LoadingSync,
    private _supplierService: SupplierService,
    private location: Location,
    private dialog: MatDialog,
  ) {
    this.selectBrandArray = [];
    this.selectGroupCategoryArray = [];
    this.selectSupplierArray = [];
    this.selectCategory = [];
    this.idSupplierRol = null;
    this.idUser = null;
    this.submittedUser = false;
    this.listLocals = [];
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      role_id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      last_name_father: new FormControl(null, [Validators.required]),
      last_name_mother: new FormControl(null),
      number_document: new FormControl(null, [
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.min(1),
        Validators.pattern('[0-9]*')]),
      dni: new FormControl(null),
      phone: new FormControl(null, [Validators.required]),
      entity_type: new FormControl(null, [Validators.required]),
      entity_id: new FormControl(null, [Validators.required]),

    });

    this.floatOption = false;
    this.submitted = false;
    this.showMoreButton = false;
    this.idSupplier = '';
    this.isSupplier = true;
    this.showModalUser = false;
    this.lisAddPicture = [];
    this.listMethodSend = [];
    this.infoSelectBrand = [];
    this.infoSelectGroupCategory = [];
    this.infoSelectSupplierDelivery = [];
    this.url_attachment = localStorage.getItem('url_attachment');
    this.activatedRoute.params.subscribe((params) => {
      this.idSupplier = params.id;
    });

  }

  ngOnInit() {
    this.loadingSync.setNumberOfFunctionsToSync(3);
    // this.validIsSupplier();
    localStorage.removeItem('methosSupplier');
    this.headerService.sendTitle('Sellers');
    this.isSupplier = true;
    this.namePage = 'Sellers';
    this.showAddBrand = false;
    this.showAddSupplierDelivery = false;
    this.listBrand = [];
    this.listCategory = [];
    this.listGroupCategory = [];
    this.listSupplierDelivery = [];
    this.listCategoriesFilter = [];
    this.headerFixed = false;
    this.supplierForm = new FormGroup({
      list_brand: new FormControl(null),
      visible_categories: new FormControl(null),
      visible_category_groups: new FormControl(null),
      group: new FormControl(null),
      list_supplier_Delivery: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      ruc: new FormControl(null, [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.min(1),
        Validators.pattern('[0-9]*')
      ]),
      description: new FormControl(null, [
        Validators.maxLength(500),
      ]),
      image: new FormControl(null),
      entry: new FormControl(null, /* [
        Validators.required,
        Validators.maxLength(50),
      ] */),
      report_erp: new FormControl(false, [Validators.required]),
      max_distribution: new FormControl(),
      email_sales: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      commission: new FormControl(null, [Validators.max(100)]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      phone_number: new FormControl(null, Validators.required),
      post_sell_representative: new FormControl(null, Validators.required),
      post_sell_representative_name: new FormControl(null, [Validators.required]),
      is_distribution_supplier: new FormControl(true),
    });
    // this.onChanges();
    this.getListGroup();
    if (this.idSupplier) {
      this.getDataSupplier();
    } else {
      this._supplierService.validIsSupplier().subscribe(
        (infoSupplier: any) => {
          this.isSupplier = infoSupplier.isSupplier;
          this.getBrandList(true);
          this.getGroupCategoryList(true);
          this.getSupplierDelivery(true);
        });
    }


    this.getIdSupplier();

    this.loadingSyncSubscription = this.loadingSync.loadingFinished.subscribe(
      count => {
        if (count === 0) {
          this.middleService.sendLoading(false);
          this.loadingSyncSubscription.unsubscribe();
        }
      }
    );
  }

  onPaste(event: ClipboardEvent, formControlName: string, formGroup: string) {
    const clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    pastedText = UtilsCode.cleanStringOnPaste(pastedText, /^[0-9 +-]*$/);
    setTimeout(() => {
      this[formGroup].get(formControlName).setValue(pastedText);
    }, 0);
  }

  onPasteDocument(event: ClipboardEvent, formControlName: string, formGroup: string) {
    const clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    pastedText = UtilsCode.cleanStringOnPaste(pastedText, /^[0-9]*$/);
    setTimeout(() => {
      this[formGroup].get(formControlName).setValue(pastedText);
    }, 0);
  }

  onTabChanged($event) {
    this.getListCategory(this.listGroupCategory[$event.index]._id);
  }

  onChanges() {
    this.supplierForm.get('group').valueChanges.subscribe((val) => {
      if (val) {
        this.getListCategory(val);
      }
    });
  }
  get f() {
    return this.supplierForm.controls;
  }
  get u() {
    return this.userForm.controls;
  }

  openLocalsDialog(type: string, local?: any, supplier_id?: string) {
    const data = {
      local,
      type,
      supplier_id
    };

    let dialogRef = this.dialog.open(CrudSupplierLocalComponent, {
      data
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.getDataSupplier();
      }
    })
  }

  getLocals(id: string) {
    const waitPromise = new Promise((resolve, reject) => {
      this._supplierService.getSupplierLocals(id).subscribe(response => {
        console.log("locals", response)
        this.listLocals = response;
        resolve({});
      },
      (error) => {
        reject({});
      });
    });
    return waitPromise;
  }

  deleteLocal(local: any) {
    this.middleService.sendLoading(true);
    this._supplierService.deleteSupplierLocal(local._id).subscribe(response => {
      this.middleService.sendMessage(
        "Seller",
        "Sede eliminada",
        "ok"
      );
      this.getDataSupplier();
      this.middleService.sendLoading(false);
    },
    (error) => {
      this.middleService.sendMessage(
        "Seller",
        error.error.message,
        "error"
      )}
    );
  }


  selectImageMainWeb($event, entity) {
    this.selectPicture = entity;
    this.dataPictureSave($event.image);
  }

  getIdSupplier() {
    this._ldvService.getLdvDetail('SONR-ROL-SUPPLIER').subscribe(
      (supplierRol: any) => {
        if (supplierRol.length > 0) {
          this.idSupplierRol = supplierRol[0].value;
        }
      },
      (error) => {
        this.middleService.sendMessage(this.namePage, error.error, 'error');
      }
    );
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

  acceptModal($event) {
    if ($event.accept) {
      this.deleteSupplier();
    }
  }

  acceptModalMethod($event) {
    if ($event.accept) {
      this.deleteMethod();
    }
  }

  changeStatusMore() {
    this.showMoreButton = !this.showMoreButton;
  }

  deleteSupplier() {
    this.middleService.sendLoading(true);
    this.serviceSupplier.delete(this.idSupplier).subscribe(
      (data) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Seller',
          'El Seller ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['/system/supplier']);
      },
      (error) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Eliminar Seller',
          error.error.message,
          'error'
        );
      }
    );
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show('Eliminar Seller', '¿Esta seguro de eliminar?');
  }

  dataPictureSave($event) {
    if (this.replacePosition || this.replacePosition == 0) {
      this.lisAddPicture[this.replacePosition] = $event;
    } else {
      this.lisAddPicture.push($event);
    }
  }
  deleteImage(position) {
    this.lisAddPicture.splice(this.lisAddPicture.length - position, 1);
  }

  deleteMethod() {
    this.middleService.sendLoading(true);
    this._methodSendService.delete(this.idMethodDelete).subscribe(
      (dataDelete) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Método de Envío',
          'El método de envío ha sido eliminado correctamente',
          'ok'
        );
        this.getDataSupplier();
      },
      (error) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Método de envío',
          error.error.message,
          'error'
        );
      }
    );
  }

  actionAnswer(event) {
    switch (event.action) {
      case 'block': {
        this.middleService.sendLoading(true);
        this._userService.blockUser(event.field).subscribe(infoBlock => {
          this.gridList.getInfo();
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Usuario',
            'El usuario ha sido bloqueado.',
            'ok'
          );
        },
          error => {
            this.middleService.sendMessage(
              'Usuario',
              error.error.message,
              'error'
            );
          });
        break;
      }
      case 'unlock': {
        this.middleService.sendLoading(true);
        this._userService.unlockUser(event.field).subscribe(infounlock => {
          this.gridList.getInfo();
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Usuario',
            'El usuario ha sido habilitado.',
            'ok'
          );
        },
          error => {
            this.middleService.sendMessage(
              'Usuario',
              error.error.message,
              'error'
            );
          });
        break;
      }
    }
  }

  getDataSupplier() {
    this._supplierService.validIsSupplier().subscribe(
      (infoSupplier: any) => {

        this.isSupplier = infoSupplier.isSupplier;
        if ((this.isSupplier && infoSupplier.idSupplier === this.idSupplier) || !this.isSupplier) {
          this.serviceSupplier.getById(this.idSupplier).subscribe(
            (dataSupplier: any) => {
              this.currentVisibleCat = dataSupplier.visible_categories;
              if (dataSupplier.list_brand) {
                this.selectBrandArray = [];
                this.selectGroupCategoryArray = [];
                this.selectSupplierArray = [];
                this.selectCategory = [];
                for (const brand of dataSupplier.list_brand) {
                  brand.select = true;
                  if (this.isSupplier) {
                    this.listBrand.push(brand);
                  } else {
                    this.selectBrandArray.push(brand);
                  }
                }
                if (!this.isSupplier) {
                  this.getBrandList(true);
                }
                if (dataSupplier.visible_categories) {
                  for (const category of dataSupplier.visible_categories) {
                    this.selectCategory.push(category._id);
                    this.selectGroupCategoryArray.push(category.group);
                  }
                }
                if (dataSupplier.list_supplier_Delivery) {
                  for (const supplier of dataSupplier.list_supplier_Delivery) {
                    this.selectSupplierArray.push(supplier._id);
                  }
                }
                this.getGroupCategoryList(true);
                this.getSupplierDelivery(true);
              }
              this.supplierForm.patchValue(dataSupplier);
              this.lisAddPicture = []
              if (dataSupplier.image_link) {
                this.lisAddPicture.push(dataSupplier.image_link);
              }
              if (this.lisAddPicture) {
                this.imageShowSlider = this.lisAddPicture[
                  this.lisAddPicture.length - this.imagePositionMobile
                ];
              }
              this.listMethodSend = dataSupplier.method_send;
              this.getLocals(this.idSupplier)
              this.middleService.sendLoading(false);
            },
            (err) => {
              this.middleService.sendMessage(
                "Seller",
                err,
                "error"
              );
              this.middleService.sendLoading(false);
              setTimeout(() => {
                this.location.back();
              }, 1500);
            }
          );
          this.initializeGridUserList();
        } else {
          this.middleService.sendMessage(
            "Seller",
            "El perfil solicitado no corresponde con el de su seller.",
            "error"
          );
          this.middleService.sendLoading(false);
          setTimeout(() => {
            //this.location.back();
          }, 1500);
        }
      }
    );
  }

  initializeGridUserList() {
    this.gridList.columns = [
      {
        field: 'additionals.name',
        title: 'Nombre',
        type: 'text',
        align: 'center'
      },
      {
        field: 'additionals.last_name_father',
        title: 'Apellido Paterno',
        type: 'text',
        align: 'center'
      },
      {
        field: 'additionals.last_name_mother',
        title: 'Apellido Materno',
        type: 'text',
        align: 'center'
      },
      {
        field: 'state',
        title: 'Estado',
        type: 'text',
        align: 'left',
        width: '100px',
        replace: [
          {
            value: 'H',
            replace: 'Habilitado',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a'
          },
          {
            value: 'B',
            replace: 'Bloqueado',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9'
          },
          {
            value: 'TB',
            replace: 'Bloqueo Temporal',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9'
          }
        ]
      }
    ];

    this.gridList.actions = [
      {
        icon: 'fas fa-lock',
        action: 'block',
        fieldReturn: '_id',
        color: '#fd96b9',
        tooltip: 'Bloquear Cliente',
        conditionShow: {
          field: 'state',
          value: 'H'
        }
      },
      {
        icon: 'fas fa-unlock-alt',
        action: 'unlock',
        color: '#3dd47a',
        fieldReturn: '_id',
        tooltip: 'Desbloquear Cliente',
        conditionShow: {
          field: 'state',
          value: 'B'
        }
      }
    ];

    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService =
      '/user/list-user-supplier/' + this.idSupplier;
    this.gridList.config.deleteService = '/user';
    this.gridList.config.redirect = 'system/user/detail/';
    this.gridList.config.entity = 'Seller';
    this.gridList.config.deleteMessage = 'El usuario ha sido eliminado correctamente';
    this.gridList.config.loadingSync = this.loadingSync;
    this.gridList.config.bodyStyle = { height: '300px' };
    this.gridList.getInfo();
  }

  openMethod(methodSend) {
    this.router.navigate([
      '/system/supplier/detail/add-method/' +
      this.idSupplier +
      '/' +
      methodSend._id,
    ]);
  }

  OpenModalDeleteConfirm(method?) {
    this.idMethodDelete = method._id;
    const messageModal =
      '¿Esta seguro de eliminar el método ' + method.name + ' ?';
    this.dialogMethodConfirm.show('Eliminar Método de Envío', messageModal);
  }

  newMethod() {
    if (this.idSupplier) {
      this.router.navigate([
        '/system/supplier/detail/add-method/' + this.idSupplier,
      ]);
    } else {
      this.middleService.sendMessage(
        'Seller',
        'Primero se debe  crear al seller',
        'error'
      );
    }
  }

  returnSupplier() {
    this.router.navigate(['/system/supplier']);
  }

  searchCategoryChecked(listObj) {
    if (!listObj.children) {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
      }
    } else {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
      }
      for (const categoryChildren of listObj.children) {
        this.searchCategoryChecked(categoryChildren);
      }
    }
  }

  async saveSupplier(navEdit?) {
    this.submitted = true;
    this.middleService.sendLoading(true);
    if (!this.supplierForm.invalid) {
      if (this.selectBrandArray.length !== 0) {
        this.selectGroupCategoryArray = [...new Set(this.selectGroupCategoryArray)];

        this.supplierForm.get('visible_category_groups').setValue(this.selectGroupCategoryArray);
        // this.selectCategory = [];
        // for (const category of this.listCategory) {
        //   this.searchCategoryChecked(category);
        // }
        if (this.selectCategory.length > 0) {
          this.supplierForm.get('visible_categories').setValue(this.selectCategory);
          const dataSend = Object.assign({}, this.supplierForm.value);
          dataSend.image_link = '';
          if (this.lisAddPicture.length > 0) {
            dataSend.image_link = this.lisAddPicture[0];
          }
          if (this.idSupplier) {
            this.serviceSupplier
              .updateSupplier(this.idSupplier, dataSend)
              .subscribe(
                (infoUpadte) => {
                  this.middleService.sendLoading(false);
                  this.middleService.sendMessage(
                    'Seller',
                    'El seller ha sido actualizado correctamente',
                    'ok'
                  );
                  this.router.navigate([
                    "/system/supplier",
                  ]);
                  this.submitted = false;
                },
                (error) => {
                  this.middleService.sendMessage(
                    'Proveeedor',
                    error.error.message,
                    'error'
                  );
                  this.submitted = false;
                  this.middleService.sendLoading(false);
                }
              );
          } else {
            dataSend.is_distribution_supplier = true;
            this.serviceSupplier.saveSupplier(dataSend).subscribe(
              (infoSave: any) => {
                this.middleService.sendLoading(false);
                this.middleService.sendMessage(
                  'Seller',
                  'El seller ha sido creado correctamente',
                  'ok'
                );
                this.router.navigate([
                  "/system/supplier",
                ]);
                this.submitted = false;
              },
              (error) => {
                this.middleService.sendMessage(
                  'Seller',
                  error.error.message,
                  'error'
                );
                this.submitted = false;
                this.middleService.sendLoading(false);
              }
            );
          }
        } else {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Seller',
            'Debe seleccionar al menos una categoría',
            'error'
          );
        }
      } else {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          'Seller',
          'Debe seleccionar al menos una marca',
          'error'
        );
      }
    } else {
      this.middleService.sendLoading(false);
      this.middleService.sendMessage(
        'Seller',
        'Revise los campos obligatorios',
        'error'
      );
    }
  }

  infoBrandSelect() {
    this.infoSelectBrand = [];
    for (const brand of this.listBrand) {
      for (const selectBrand of this.selectBrandArray) {
        if (brand._id == selectBrand._id) {
          this.infoSelectBrand.push(brand);
        }
      }
    }
  }

  infoGroupCategorySelect() {
    this.infoSelectGroupCategory = [];
    for (const groupCategory of this.listGroupCategory) {
      for (const selectGroupCategory of this.selectGroupCategoryArray) {
        if (groupCategory._id == selectGroupCategory) {
          this.infoSelectGroupCategory.push(groupCategory);
        }
      }
    }
  }

  infoSupplierSelect() {
    this.infoSelectSupplierDelivery = [];
    for (const supplier of this.listSupplierDelivery) {
      for (const selectBrand of this.selectSupplierArray) {
        if (supplier._id == selectBrand) {
          this.infoSelectSupplierDelivery.push(supplier);
        }
      }
    }
  }
  addBrand() {
    this.selectBrandArray = [];
    for (const brand of this.listBrand) {
      if (brand.select) {
        this.selectBrandArray.push(brand);
      }
    }
    this.infoBrandSelect();

    this.supplierForm.get('list_brand').setValue(this.selectBrandArray.map(br => br._id));
    this.closeBrandSelect();
  }

  addGroupCategory() {
    this.selectGroupCategoryArray = [];
    for (const groupCategory of this.listGroupCategory) {
      if (groupCategory.select) {
        this.selectGroupCategoryArray.push(groupCategory._id);
      }
    }
    this.infoGroupCategorySelect();

    this.supplierForm.get('visible_category_groups').setValue(this.selectGroupCategoryArray);
    this.closeGroupCategorySelect();
  }

  addSupplierDelivery() {
    this.selectSupplierArray = [];
    for (const supplier of this.listSupplierDelivery) {
      if (supplier.select) {
        this.selectSupplierArray.push(supplier._id);
      }
    }
    this.infoSupplierSelect();

    this.supplierForm.get('list_supplier_Delivery').setValue(this.selectSupplierArray);
    this.closeSupplierDeliverySelect();
  }

  removeBrand(id) {
    let indexBrand = this.selectBrandArray.findIndex((item) => item._id == id);
    if (indexBrand >= 0) {
      this.selectBrandArray.splice(indexBrand, 1);
    }

    indexBrand = this.infoSelectBrand.findIndex((item) => item._id == id);
    if (indexBrand >= 0) {
      this.infoSelectBrand.splice(indexBrand, 1);
    }

    indexBrand = this.listBrand.findIndex((item) => item._id == id);
    if (indexBrand) {
      this.listBrand[indexBrand].select = false;
    }
    this.supplierForm.get('list_brand').setValue(this.selectBrandArray.map(br => br._id));
  }

  removeGroupCategory(id) {
    let indexGroupCategory = this.selectGroupCategoryArray.findIndex((item) => item == id);
    if (indexGroupCategory >= 0) {
      this.selectGroupCategoryArray.splice(indexGroupCategory, 1);
    }

    indexGroupCategory = this.infoSelectGroupCategory.findIndex((item) => item._id == id);
    if (indexGroupCategory >= 0) {
      this.infoSelectGroupCategory.splice(indexGroupCategory, 1);
    }

    indexGroupCategory = this.listGroupCategory.findIndex((item) => item._id == id);
    if (indexGroupCategory) {
      this.listGroupCategory[indexGroupCategory].select = false;
    }
    this.supplierForm.get('visible_category_groups').setValue(this.selectGroupCategoryArray);
  }


  removeSupplierDelivery(id) {
    let indexSupplierDelivery = this.selectSupplierArray.findIndex((item) => item == id);
    if (indexSupplierDelivery >= 0) {
      this.selectSupplierArray.splice(indexSupplierDelivery, 1);
    }

    indexSupplierDelivery = this.infoSelectSupplierDelivery.findIndex((item) => item._id == id);
    if (indexSupplierDelivery >= 0) {
      this.infoSelectSupplierDelivery.splice(indexSupplierDelivery, 1);
    }

    indexSupplierDelivery = this.listSupplierDelivery.findIndex((item) => item._id == id);
    if (indexSupplierDelivery) {
      this.listSupplierDelivery[indexSupplierDelivery].select = false;
    }

    this.supplierForm.get('list_supplier_Delivery').setValue(this.selectSupplierArray);
  }

  recursivelyAddParents(node) {
    const index = this.selectCategory.findIndex(category => category == node.parent._id);
    if (index < 0) {
      this.selectCategory.push(node.parent._id);
    }
   // this.selectCategory.push(node.parent._id);
    node.parent.parent && this.recursivelyAddParents(node.parent);
  }

  recursivelyAddChildren(node) {
    if (node.children) {
      for (const children of node.children) {
        this.selectCategory.push(children._id);
        children.children && this.recursivelyAddChildren(children);
      }
    }



  }

  recursivelyRemoveParents(node) {
    const index = this.selectCategory.findIndex(category => category == node.parent._id);
    if (index > -1) {
      this.selectCategory.splice(index, 1);
    }
    node.parent.parent && this.recursivelyRemoveParents(node.parent);
  }

  recursivelyRemoveChildren(node) {

    if (node.children) {
      for (const children of node.children) {
        const index = this.selectCategory.findIndex(category => category == children._id);
        children.checked = false
        if (index > -1) {
          this.selectCategory.splice(index, 1);
        }
        this.recursivelyRemoveChildren(children);
      }
    }
  }

  displayFilters($event) {
    this.middleService.sendLoading(true);

    const index = this.selectCategory.findIndex(
      (category) => category == $event._id
    );

    // this.selectCategory = [];

    if (index == -1) {
      this.selectCategory = [...this.selectCategory, $event._id];
      if ($event.parent) {
        this.recursivelyAddParents($event);
      }
      this.selectGroupCategoryArray.push($event.group._id);
    } else {
      $event.filters &&
        $event.filters.forEach((filter) => {
          const filterIndex = this.listCategoriesFilter.findIndex((object) => {
            return filter._id == object._id;
          });
          filterIndex !== -1 &&
            this.listCategoriesFilter.splice(filterIndex, 1);
        });
      this.selectCategory.splice(index, 1);
      if ($event.parent) {
        this.recursivelyRemoveParents($event);
      }
      const foundIndex = this.selectGroupCategoryArray.findIndex(groupCat => groupCat === $event.group._id);
      if (foundIndex !== -1) {
        this.selectGroupCategoryArray.splice(foundIndex, 1);
      }
    }

    this.selectCategory.forEach(element => {
      let category = [...this.listCategory, ...this.currentVisibleCat].find(categoryInfo => element === categoryInfo._id)
      category.filters.forEach(filter => {
        const exists = this.listCategoriesFilter.find(
          (object) => filter.filter._id == object.filter._id
        );
        if (!exists && !filter.filter.binded) {
          this.listCategoriesFilter.push(filter);
        }
      });
    });
    this.middleService.sendLoading(false);
    
    /*this._serviceCategory
      .getCategoriesFiltersByCategoryArray(this.selectCategory)
      .subscribe((response: Array<any>) => {
        response.forEach((element) => {
          element.filters.forEach((filter) => {
            const exists = this.listCategoriesFilter.find(
              (object) => filter.filter._id == object.filter._id
            );
            if (!exists && !filter.filter.binded) {
              this.listCategoriesFilter.push(filter);
            }
          });
        });
        this.middleService.sendLoading(false);
      });*/
    this.checkedCategory($event);
  }


  displayFiltersAll($event) {
    this.middleService.sendLoading(true);

    const index = this.selectCategory.findIndex(
      (category) => category == $event._id
    );

    // this.selectCategory = [];

    if (index == -1) {
      this.selectCategory = [...this.selectCategory, $event._id];
      if ($event.children) {
        this.recursivelyAddChildren($event);
      }
      this.selectGroupCategoryArray.push($event.group._id);
    } else {
      $event.filters &&
        $event.filters.forEach((filter) => {
          const filterIndex = this.listCategoriesFilter.findIndex((object) => {
            return filter._id == object._id;
          });
          filterIndex !== -1 &&
            this.listCategoriesFilter.splice(filterIndex, 1);
        });
      this.selectCategory.splice(index, 1);
      if ($event.children) {
        this.recursivelyRemoveChildren($event);
      }
      const foundIndex = this.selectGroupCategoryArray.findIndex(groupCat => groupCat === $event.group._id);
      if (foundIndex !== -1) {
        this.selectGroupCategoryArray.splice(foundIndex, 1);
      }
    }
    this.selectCategory.forEach(element => {
      let category = [...this.listCategory, ...this.currentVisibleCat].find(categoryInfo => element === categoryInfo._id)
      category.filters.forEach(filter => {
        const exists = this.listCategoriesFilter.find(
          (object) => filter.filter._id == object.filter._id
        );
        if (!exists && !filter.filter.binded) {
          this.listCategoriesFilter.push(filter);
        }
      });
    });
    this.middleService.sendLoading(false);
    /*this._serviceCategory
      .getCategoriesFiltersByCategoryArray(this.selectCategory)
      .subscribe((response: Array<any>) => {
        response.forEach((element) => {
          element.filters.forEach((filter) => {
            const exists = this.listCategoriesFilter.find(
              (object) => filter.filter._id == object.filter._id
            );
            if (!exists && !filter.filter.binded) {
              this.listCategoriesFilter.push(filter);
            }
          });
        });
        this.middleService.sendLoading(false);
      });*/
    this.checkedCategory($event);
  }

  checkedCategory(nodeSelected?: any) {

    if (this.listCategory) {
      for (const category of this.selectCategory) {
        for (const node of this.listCategory) {
          this.recursiveCheckedCheck(node, category, 'children');
        }
      }
    }

    if (!nodeSelected) {
      this.childNode.parent && this.checkParentRecursively(this.childNode.parent, true);
    } else {
      nodeSelected.parent && this.checkParentRecursively(nodeSelected.parent, nodeSelected.checked);
    }
  }

  checkParentRecursively(node: any, checked: boolean) {
    node.checked = checked;
    node.parent && this.checkParentRecursively(node.parent, node.checked);
  }


  closeBrandSelect() {
    this.showAddBrand = false;
  }

  closeCategorySelect() {
    this.showAddCategory = false;
  }

  closeGroupCategorySelect() {
    this.showAddGroupCategory = false;
  }

  closeSupplierDeliverySelect() {
    this.showAddSupplierDelivery = false;
  }

  getSupplierDelivery(firstLoading?: boolean) {
    this.serviceSupplier.getAllSupplierDelivery().subscribe(
      (infoSupplier: Array<any>) => {

        for (const existSupplierDelivery of this.selectSupplierArray) {
          const found = infoSupplier.findIndex((item) => item._id == existSupplierDelivery);
          if (found >= 0) {
            infoSupplier[found].select = true;
          }
        }
        infoSupplier.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        this.listSupplierDelivery = infoSupplier;
        this.infoSupplierSelect();
        if (firstLoading) {
          this.loadingSync.finishFunctionLoading();
        } else {
          this.middleService.sendLoading(false);
        }
      }, (error) => {
        this.middleService.sendMessage('Seller Delivery', error.error.message, 'error');
      }
    );
  }

  updateBrandList($event: any, brandSelected: any) {
    const brandIndex = this.selectBrandArray.findIndex(brand => brand._id == brandSelected._id);
    if (brandIndex !== -1) {
      this.selectBrandArray.splice(brandIndex, 1);
    } else {
      this.selectBrandArray.push(brandSelected);
    }

    // this.infoBrandSelect();
    this.supplierForm.get('list_brand').setValue(this.selectBrandArray.map(br => br._id));
  }

  updateGroupCategoryList($event: any, groupCategorySelected: any) {
    const groupCategory = this.selectGroupCategoryArray.findIndex(brand => brand == groupCategorySelected._id);
    if (groupCategory !== -1) {
      this.selectGroupCategoryArray.splice(groupCategory, 1);
    } else {
      this.selectGroupCategoryArray.push(groupCategorySelected._id);
    }

    this.infoGroupCategorySelect();
    this.supplierForm.get('visible_category_groups').setValue(this.selectGroupCategoryArray);
  }

  updateSupplierList($event: any, supplierSelected: any) {
    const brandIndex = this.selectSupplierArray.findIndex(brand => brand == supplierSelected._id);
    if (brandIndex !== -1) {
      this.selectSupplierArray.splice(brandIndex, 1);
    } else {
      this.selectSupplierArray.push(supplierSelected._id);
    }

    this.infoSupplierSelect();
    this.supplierForm.get('list_supplier_Delivery').setValue(this.selectSupplierArray);
  }

  getBrandList(firstLoading?: boolean) {

    this._serviceBrand.getAllBrandBasic({ noSpplier: 'true', supplierId: this.idSupplier }).subscribe(
      (listBrand: Array<any>) => {

        for (const existBrand of this.selectBrandArray) {
          const found = listBrand.findIndex((item) => item._id == existBrand._id);
          if (found >= 0) {
            listBrand[found].select = true;
          }
        }
        listBrand.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        this.listBrand = listBrand;
        // this.infoBrandSelect();
        if (firstLoading) {
          this.loadingSync.finishFunctionLoading();
        } else {
          this.middleService.sendLoading(false);
        }
      },
      (error) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  activeAll() {
    for (const category of this.listCategory) {
      if (!category.checked) {
        this.displayFiltersAll(category)
      }
    }
    this.fullCategorySelect = true

  }
  cleanAll() {
    for (const category of this.listCategory) {
      category.checked = false
      this.displayFiltersAll(category)

    }
    this.fullCategorySelect = false
  }
  getListCategory(group) {

    this.middleService.sendLoading(true);
    this._serviceCategory.getAllCategory(group).subscribe(
      (listCategory: any) => {

        this.middleService.sendLoading(false);
        this.listCategory = listCategory;

        if (this.selectableCategory) {
          this.selectableCategory.fillDataSource(this.listCategory);
        }

        this.checkedCategory();
        this.fullCategorySelect = false
        let totalCategoryChecked = 0
        for (const category of this.listCategory) {
          if (category.checked) {
            totalCategoryChecked = totalCategoryChecked + 1
          }
        }
   
        if (totalCategoryChecked == this.listCategory.length) {
          this.fullCategorySelect = true
        }
      },
      () => { }
    );
  }

  recursiveCheckedCheck(node: any, categorieSearch, statusSearch) {
    if (!node.children) {
      if (node._id === categorieSearch) {
        node.parent && (this.childNode = node);
        node.checked = true;
      }
    } else {
      if (node._id === categorieSearch) {
        node.checked = true;
      }
      for (const children of node.children) {
        this.recursiveCheckedCheck(children, categorieSearch, statusSearch);
      }
    }
  }
  getListGroup() {
    this._serviceCategory.getListCategoryGroup().subscribe((listGroup: any) => {
      this.groupList = listGroup.filter(
        (item) => item.typeGroupCategory.ref1 == 'product'
      );
    });
  }

  getGroupCategoryList(firstLoading?: boolean) {
    this._serviceCategory.getListCategoryGroup().subscribe(
      (listGroupCategory: Array<any>) => {
        listGroupCategory = listGroupCategory.filter(gc => gc.typeGroupCategory.ref1 === 'product');
        for (const existGroupCategory of this.selectGroupCategoryArray) {
          const found = listGroupCategory.findIndex((item) => item._id == existGroupCategory);
          if (found >= 0) {
            listGroupCategory[found].select = true;
          }
        }
        listGroupCategory.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        this.listGroupCategory = listGroupCategory;
        this.groupList = listGroupCategory.filter(
          (item) => item.typeGroupCategory.ref1 == 'product'
        );
        this.infoGroupCategorySelect();
        if (firstLoading) {
          this.loadingSync.finishFunctionLoading();
        } else {
          this.middleService.sendLoading(false);
        }
      },
      (error) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }

  openModalUser() {
    this.showModalUser = true;
    this.userForm.reset();
  }

  closeUser() {
    this.showModalUser = false;
  }

  selectBrand() {
    this.showAddBrand = true;
    this.middleService.sendLoading(true);
    this.getBrandList();
  }

  selectSupplierDelivery() {
    this.showAddSupplierDelivery = true;
    this.middleService.sendLoading(true);
    this.getSupplierDelivery();
  }
  showWindowMultimedia(field, replacePosition?) {
    this.replacePosition = replacePosition;
    this.objChange = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }

  getUserInfo(idUser) {
    this.middleService.sendLoading(true);
    this._userService.getDetailUser(idUser).subscribe(
      (infoUser: any) => {
        this.middleService.sendLoading(false);
        this.userForm.patchValue(infoUser.additionalsr);
        this.userForm.get('email').patchValue(infoUser.email);
        this.userForm.get('role_id').patchValue(infoUser.role_id);
      },
      (error) => {
        this.middleService.sendMessage(this.namePage, error.error, 'error');
      }
    );
  }

  saveUser() {
    this.submittedUser = true;
    this.userForm.get('role_id').setValue(this.idSupplierRol);
    this.userForm.get('entity_type').setValue('supplier');
    this.userForm.get('entity_id').setValue(this.idSupplier);

    this.middleService.sendLoading(true);
    this.userForm
      .get('dni')
      .setValue(this.userForm.get('number_document').value);
    this.userForm.get('username').setValue(this.userForm.get('email').value);
    if (this.userForm.invalid) {
      this.middleService.sendMessage(
        this.namePage,
        'Revise los campos obligatorios',
        'error'
      );
      this.middleService.sendLoading(false);
    } else {
      if (this.idUser) {
        this._userService
          .updateUser(this.userForm.value, this.idUser)
          .subscribe(
            (saveUser: any) => {

              this.middleService.sendLoading(false);
              this.middleService.sendMessage(
                this.namePage,
                'El usuario ha sido actualizado correctamente',
                'ok'
              );
            },
            (error) => {
              this.middleService.sendLoading(false);
              this.middleService.sendMessage(
                this.namePage,
                error.error.message,
                'error'
              );
            }
          );
      } else {
        this._userService.saveUser(this.userForm.value).subscribe(
          (saveUser: any) => {
            // this.router.navigate(["/system/user/detail/" + saveUser.userId]);
            this.gridList.getInfo();
            this.closeUser();
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              this.namePage,
              'Usuario creado correctamente',
              'ok'
            );
          },
          (error) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              this.namePage,
              error.error.message,
              'error'
            );
          }
        );
      }
    }
  }

  validateInput(event: KeyboardEvent) {
    const pattern = /^[0-9.]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validatePhoneInput(event: KeyboardEvent) {
    UtilsCode.validatePhoneInput(event);
  }

  ngOnDestroy(): void {
    this.loadingSyncSubscription.unsubscribe();
  }
}
