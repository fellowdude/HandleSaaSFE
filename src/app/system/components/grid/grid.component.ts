import { Subscription } from "rxjs";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterContentChecked,
  OnDestroy,
  ChangeDetectorRef
} from "@angular/core";
import { TableService } from "src/app/shared/service/table.service";
import { Router, UrlTree } from "@angular/router";
import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";
import { MiddleService } from "src/app/shared/service/middle.service";
import { FormGroup, FormControl } from "@angular/forms";
import { UtilsCode } from '../../../utils/utilsCode';
import { info } from 'console';
interface IColumnsGrid {
  field: string;
  title: string;
  type: string;
  currency?: string;
  align?: "center" | "right" | "left";
  replace?: Array<IReplaceColumnsGrid>;
  activeChangeBoolean?: boolean;
  filter?: Boolean | string;
  upFilter?: Boolean;
  downFilter?: Boolean;
  width?: string;
  fontWeight?: "bolder" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "bold" | "normal";
  color?: String,
  changeBoolean?: IChangeValueBoolean
}
interface IReplaceColumnsGrid {
  value: any;
  replace: string;
  type?: "label";
  background?: string;
  color?: string;
}
interface IActionGrid {
  icon: string;
  action: string;
  fieldReturn?: string;
  tooltip?: string;
  color?: string;
  conditionShow?: IConditionShowGridField;
}

interface IConditionShowGridField {
  field: string;
  value: any;
}
interface IConditionMessageDelete {
  field: string;
  property?: string;
  value: any
  condition: 'mayor' | 'menor' | 'igual'
}

interface IChangeValueBoolean {
  url: string;
  urlType: 'dinamic' | 'static';
  fieldDinamic?: string
}

interface IConfigGrid {
  entityFilter?: string;
  pagQuantity?: number;
  getService?: string;
  entity?: string;
  redirect?: string;
  deleteService?: string;
  deleteMessage?: string;
  returnField?: Array<string>;
  valueFilter?: any;
  listItemSelect?: any;
  redirectId?: boolean;
  select?: boolean;
  selectSingle?: boolean
  selectGetObject?: boolean;
  selectGetArray?: boolean;
  filterProductsByCampaign?: string;
  concatenate?: boolean;
  errorConfig?: boolean;
  messageDelete?: string
  messageCondition?: IConditionMessageDelete
  bodyStyle?: any
  loadingSync?: any;
  openModal?: boolean;
  isSupplier?: boolean;
  activeMethodSend?: boolean;
  limitSelect?: number;
  preventInitialSelect?: boolean;
  customFilterButtons?: Array<any>;
  idSupplier?: string;
}
@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent implements OnInit, AfterContentChecked, OnDestroy {
  @Input() columns: Array<IColumnsGrid>;
  @Input() config: IConfigGrid;
  @Input() actions: Array<IActionGrid>;
  @Input() expand_table = true;
  @Output() actionAnswer: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemSelecReturn: EventEmitter<any> = new EventEmitter<any>();
  @Output() fieldReturn: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemDeleted: EventEmitter<any> = new EventEmitter<any>();

  loadingActive: boolean
  arraySelectItem: any;
  arrayCompleteSelect: Array<any>
  dataSource: any;
  filterData: any;
  filterOrderSelect: any;
  filterPerField: boolean;
  searchLoading: boolean;
  filterSelect: any;
  lastPosition: any;
  itemDelete: any;
  pagNumber: any;
  searchExperience: any;
  selectPage: number;
  totalItems: any;
  totalPage: any;
  searchForm: FormGroup;
  selectFilterPosition: number;
  heightScroll = null;
  existScroll = false;
  url_attachment: string;
  searchValueChangesSubscription: Subscription;
  squeletorNumber = 8;
  counter = Array;
  @ViewChild("dialogDelete", { static: true })
  @ViewChild("scrollMe", { static: true })
  private myScrollContainer: ElementRef;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  constructor(
    private _tableService: TableService,
    private router: Router,
    private middleService: MiddleService
  ) {
    this.config = {};

    this.arraySelectItem = [];
    this.arrayCompleteSelect = []
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });
  }

  ngAfterContentChecked() {
    let element = this.myScrollContainer.nativeElement;
    if (this.heightScroll) {
      if (this.heightScroll < element.scrollHeight) {
        this.existScroll = true;
      }
    } else {
      this.heightScroll = element.scrollHeight;
    }
  }

  ngOnInit() {
    this.dataSource = [];
    this.filterData = {};
    this.filterSelect = [];
    this.filterOrderSelect = {};

    if (sessionStorage.getItem('pageLocal')) {
      const infoPage = JSON.parse(sessionStorage.getItem('pageLocal'))
      this.pagNumber = Number(infoPage[this.config.entityFilter])
    } else {
      this.pagNumber = 1;
    }



    this.setPageLocal()
    this.searchExperience = "";
    this.filterPerField = false;

    this.selectPage = 1;
    if (this.config.valueFilter) {
      this.filterData.valueFilter = this.config.valueFilter;
    }
    if (sessionStorage.getItem('filterlocal')) {

      const infolocal = JSON.parse(sessionStorage.getItem('filterlocal'))
      if (!infolocal[this.config.entityFilter]) {
        this.pagNumber = 1;
        this.setPageLocal()
      }
      this.searchForm.get('search').setValue(infolocal[this.config.entityFilter])
      if (!this.pagNumber) {
        this.pagNumber = 1;
        this.setPageLocal()
      }
      this.searchData()
    } else {
      this.pagNumber = 1;
      this.setPageLocal()
      this.getInfo(true);
    }
    // this.onChanges();
  }

  get f() {
    return this.searchForm.controls;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletItem();
    }
  }

  validSelect() {
    for (const data of this.dataSource) {
      data.select = false
      let existProperty = false
      if (this.arraySelectItem.length > 0) {
        existProperty = this.arraySelectItem[0].hasOwnProperty('_id');
      }
      if (existProperty) {
        const existSelect = this.arraySelectItem.find(item => item._id == data._id)
        if (existSelect) {
          data.select = true;
        }
      } else {
        const existSelect = this.arraySelectItem.find(item => item == data._id)
        if (existSelect) {
          data.select = true;
        }
      }

    }
  }

  changeSelectItem(itemInfo) {
    if (!itemInfo.select) {
      let indexItem = -1;

      indexItem = this.arraySelectItem.findIndex(
        item => item == itemInfo._id
      );
      console.log(indexItem);
      if (indexItem >= 0 && !this.config.errorConfig) {
        this.arraySelectItem.splice(indexItem, 1);
        this.arrayCompleteSelect.splice(indexItem, 1);
      }
    } else {
      if (this.config.selectSingle) {
        this.arraySelectItem = []
        this.arrayCompleteSelect = []
      }

      // if (this.config.limitSelect && this.config.limitSelect === this.arraySelectItem.length) {
      //   setTimeout(() => {
      //     const index = this.dataSource.findIndex(data => data._id == itemInfo._id);
      //     this.dataSource[index].select = false;
      //   }, 100);
      // }

      if (!this.config.errorConfig) {
        this.arraySelectItem.push(itemInfo._id);
        this.arrayCompleteSelect.push(itemInfo)
        this.validSelect();
        console.log('comodin 2');
      }
    }
    if (this.config.selectGetArray) {
      this.itemSelecReturn.emit(this.arrayCompleteSelect);
    } else {
      if (this.config.selectGetObject) {
        this.itemSelecReturn.emit(itemInfo);
      } else {
        this.itemSelecReturn.emit(this.arraySelectItem);
      }
    }

  }

  cleanPerField() {
    for (const field of this.columns) {
      field.filter = null;
      field.upFilter = false;
      field.downFilter = false;
    }
  }

  addFilter(filter, index) {
    if (filter) {
      this.filterData.additionals = filter;
    } else {
      delete this.filterData.additionals;
    }
    this.config.customFilterButtons.forEach(el => {
      if (el.current == true) {
        el.current = false;
      }
    });
    this.config.customFilterButtons[index].current = true;
    this.getInfo();
  }

  changeFilter(position) {
    if (this.lastPosition == position) {
      if (
        !this.columns[position].upFilter &&
        !this.columns[position].downFilter
      ) {
        this.columns[position].upFilter = true;
      } else {
        if (this.columns[position].upFilter) {
          this.columns[position].upFilter = false;
          this.columns[position].downFilter = true;
        } else if (this.columns[position].downFilter) {
          this.columns[position].downFilter = false;
        }
      }
    } else {
      //dataSource
      if (this.lastPosition >= 0) {
        this.columns[this.lastPosition].upFilter = false;
        this.columns[this.lastPosition].downFilter = false;
      }
      this.columns[position].upFilter = true;
    }
    this.lastPosition = position;
    this.filterOrderSelect = {};

    if (this.columns[position].upFilter) {
      this.filterOrderSelect.mode = "up";
      this.filterOrderSelect.field = this.columns[position].field;
    }
    if (this.columns[position].downFilter) {
      this.filterOrderSelect.mode = "down";
      this.filterOrderSelect.field = this.columns[position].field;
    }
    if (this.columns[position].upFilter || this.columns[position].downFilter) {
      this.selectFilterPosition = position;
    } else {
      this.selectFilterPosition = null;
    }

    this.filterData.filterOrder = this.filterOrderSelect;
    this.getInfo();
  }
  changePageManual(event) {
    if (event.key === "Enter") {
      if (this.pagNumber > this.totalPage || this.pagNumber < 1) {
        (this.pagNumber = 1), this.getInfo();
        this.setPageLocal()
      } else {
        this.getInfo();
        this.setPageLocal()
      }
    }
  }
  confirmDeleteItem(idItem, dataComplete?) {

    this.itemDelete = idItem;
    let subMessage = null
    if (this.config.messageCondition && this.config.messageDelete) {
      let valueCompare = null
      if (dataComplete[this.config.messageCondition.field]) {
        valueCompare = dataComplete[this.config.messageCondition.field]
        if (this.config.messageCondition.property) {
          valueCompare = valueCompare[this.config.messageCondition.property]
        }
      }

      let showMessage = false
      if (valueCompare) {
        switch (this.config.messageCondition.condition) {
          case 'igual': {
            if (valueCompare == this.config.messageCondition.value) {
              showMessage = true
            }
            break
          }
          case 'mayor': {

            if (valueCompare > this.config.messageCondition.value) {

              showMessage = true
            }
            break
          }
          case 'menor': {

            if (valueCompare < this.config.messageCondition.value) {
              showMessage = true
            }
            break
          }
        }
      }

      if (showMessage) {
        subMessage = this.config.messageDelete
      }
    } else {
      subMessage = this.config.messageDelete
    }
    const title = "Eliminar " + this.config.entity.toLowerCase();
    const messageModal = "¿Esta seguro de eliminar?";

    this.dialogConfirm.show(title, messageModal, subMessage);
  }

  deletItem() {
    if (!this.config.deleteService) {
      console.log(
        "error componente: Necesita ingresar el valor de la propiedad deleteService"
      );
    } else {
      this.middleService.sendLoading(true);
      this._tableService
        .delete(this.itemDelete, this.config.deleteService)
        .subscribe(
          data => {
            if (this.config.entity) {
              let message =
                "La " +
                  this.config.entity.toLowerCase() + this.config.entity == "Usuario" ?
                  " ha sido eliminado" : "  ha sido eliminada";

              if (this.config.deleteMessage) {
                message = this.config.deleteMessage;
              }
              this.middleService.sendMessage(this.config.entity, message, "ok");
            } else {
              this.middleService.sendMessage(
                "ELiminar",
                "Se ha eliminado correctamente",
                "ok"
              );
            }
            this.pagNumber = 1;
            this.setPageLocal()
            this.middleService.sendLoading(false);
            this.itemDeleted.emit(this.itemDelete)
            this.getInfo();
          },
          error => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Eliminar",
              error.error.message,
              "error"
            );
          }
        );
    }
  }

  filterOrderData() {
    const sendFilter: any = [];
    for (const column of this.columns) {
      if (column.filter) {
        if (column.filter != "") {
          sendFilter.push({
            field: column.field,
            value: column.filter,
            type: column.type
          });
        }
      }
    }
    this.filterSelect = sendFilter;
    this.filterPerField = true;
    this.sendFilter();
  }

  changeBooleanField(field, value) {
    const indexField = this.columns.findIndex(item => item.field == field)
    if (indexField >= 0) {
      if (this.columns[indexField].changeBoolean) {
        this.columns[indexField].activeChangeBoolean = value
      }
    }
  }

  updateDataField(_id, infoField, value, url, urlType, data) {
    this.middleService.sendLoading(true)
    let infoBody = {};
    if (this.config.idSupplier) {
      infoBody = {
        state: value,
        supplier: this.config.idSupplier,
      }
    } else {
      infoBody[infoField] = value;
    }
    switch (urlType) {
      case 'dinamic': {
        this._tableService.updateEntity(url, _id, infoBody).subscribe(
          (update) => {
            this.middleService.sendLoading(false)
            this.middleService.sendMessage(this.config.entity, 'Se ha realizado la actualización', 'ok')
          }, (error) => {
            data[infoField] = !data[infoField]
            this.middleService.sendLoading(false)
            this.middleService.sendMessage(this.config.entity, error.error.message, 'error')
          }
        )
        break
      }
      case 'static': {
        this._tableService.update(url, infoBody).subscribe(
          (update) => {
            this.middleService.sendLoading(false)
            this.middleService.sendMessage(this.config.entity, 'Se ha realizado la actualización', 'ok')
          }, (error) => {
            data[infoField] = false
            this.middleService.sendLoading(false)
            this.middleService.sendMessage(this.config.entity, error.error.message, 'error')
          }
        )
        break
      }
    }
  }

  firstPage() {
    if (this.pagNumber != 1) {
      this.pagNumber = 1;
      this.setPageLocal()
      this.getInfo();
    }
  }
  getInfo(initialize?: boolean) {
    if (this.config.getService) {
      this.loadingActive = true
      if (initialize) {
        this.middleService.sendLoading(true);
      } else {
        this.searchLoading = true
      }

      this._tableService
        .getFilter(
          this.filterData,
          this.pagNumber,
          this.config.pagQuantity,
          this.config.getService,
          this.config.filterProductsByCampaign
        )
        .subscribe(
          (data: any) => {
            this.url_attachment = data.url_attachment
            this.searchLoading = false;
            if (this.config.loadingSync) {
              this.config.loadingSync.finishFunctionLoading();
            } else {
              this.middleService.sendLoading(false);
            }
            this.dataSource = data.data;
            this.totalItems = data.totalItem;
            this.totalPage = data.quantityPage;
            this.loadingActive = false
            if (this.config.returnField) {
              const returnData = {};
              for (const field of this.config.returnField) {
                returnData[field] = data[field];
              }
              this.fieldReturn.emit(returnData);
            }
            this.updateSelectItem();
            if (this.config.select && !this.config.preventInitialSelect) {
              this.validSelect()
            }
          },
          error => {
            this.middleService.sendMessage(
              this.config.entity,
              error.error.message,
              "error"
            );
          }
        );
    }
  }
  lastPage() {
    if (this.pagNumber != this.totalPage) {
      this.pagNumber = this.totalPage;
      this.setPageLocal()
      this.getInfo();
    }
  }
  openItem(idItem) {
    if (this.config.isSupplier && this.config.activeMethodSend || !this.config.isSupplier) {
      if (this.config.redirect) {
        this.router.navigate([this.config.redirect + "/" + idItem]);
      }
      if (this.config.redirectId) {
        this.sendAction(idItem, "redirect");
      }
      if (this.config.openModal) {
        this.sendAction(idItem, "edit");
      }
    }
  }

  validateInput(event: KeyboardEvent) {
    const pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ@0-9 -\.]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    this.pagNumber = 1
    this.setPageLocal()
    /*  if (!pattern.test(inputChar)) {
       event.preventDefault();
     } */
    if (event.key == 'Enter') {
      this.searchData();
    }
  }

  onPaste(event: ClipboardEvent) {

    const clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text').trim();
    /*  pastedText = UtilsCode.cleanStringTable(pastedText).trim(); */
    setTimeout(() => {
      this.searchForm.get("search").setValue(pastedText);
    }, 0);
  }

  setLocalFilter(value) {
    if (this.config.entityFilter) {
      let infoLocalFilter = {}
      if (sessionStorage.getItem('filterlocal')) {
        infoLocalFilter = JSON.parse(sessionStorage.getItem('filterlocal'))
      }
      infoLocalFilter[this.config.entityFilter] = value;
      sessionStorage.setItem('filterlocal', JSON.stringify(infoLocalFilter))
    }

  }

  searchData() {
    if (this.searchForm.get("search").value) {
      this.setLocalFilter(this.searchForm.get("search").value)
      this.searchFilter();
    } else {
      this.setLocalFilter(null)
      if (!this.filterPerField) {
        this.filterData.filter = [];
        this.filterData.mode = "allField";
        if (this.config.valueFilter) {
          this.filterData.valueFilter = this.config.valueFilter;
        }

        this.getInfo();
      }
    }
  }

  // onChanges(): void {
  //   this.searchValueChangesSubscription = this.searchForm
  //     .get("search")
  //     .valueChanges.subscribe(val => {
  //       const timer = setTimeout(() => {
  //         if (this.searchForm.get("search").value == val) {
  //           if (val) {
  //             this.searchExperience = val;
  //             this.searchFilter();
  //           } else {
  //             if (!this.filterPerField) {
  //               this.filterData.filter = [];
  //               this.filterData.mode = "allField";
  //               if (this.config.valueFilter) {
  //                 this.filterData.valueFilter = this.config.valueFilter;
  //               }
  //               this.getInfo();
  //             }
  //           }
  //           clearTimeout(timer);
  //         }
  //       }, 500);
  //     });
  // }

  setPageLocal() {

    if (this.config.entityFilter) {
      let infoLocalFilter = {}
      if (sessionStorage.getItem('pageLocal')) {
        infoLocalFilter = JSON.parse(sessionStorage.getItem('pageLocal'))
      }
      infoLocalFilter[this.config.entityFilter] = this.pagNumber;
      sessionStorage.setItem('pageLocal', JSON.stringify(infoLocalFilter))
    }
  }
  previousPage() {
    if (this.pagNumber > 1) {
      this.pagNumber--;
      this.setPageLocal()
      this.getInfo();
    }
  }
  nextPage() {
    if (this.pagNumber < this.totalPage) {
      this.pagNumber++;
      this.setPageLocal()
      this.getInfo();
    }
  }

  sendFilter() {
    this.filterData.filter = this.filterSelect;
    this.filterData.mode = "perField";
    if (this.config.valueFilter) {
      this.filterData.valueFilter = this.config.valueFilter;
    }
    this.searchForm.get("search").setValue(null);
    this.getInfo();
  }
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  searchFilter() {

    if (sessionStorage.getItem('pageLocal')) {
      const infoPage = JSON.parse(sessionStorage.getItem('pageLocal'))
      if (infoPage[this.config.entityFilter]) {
        this.pagNumber = Number(infoPage[this.config.entityFilter])
      } else {
        this.pagNumber = 1;
      }
    } else {
      this.pagNumber = 1;
    }
    //this.pagNumber = 1;
    this.setPageLocal()
    this.cleanPerField();
    const searchObj: any = {};
    searchObj.filterFields = [];
    for (const field of this.columns) {
      if (field.type == "text") {
        const objSearch: any = {};
        objSearch.field = field.field;
        objSearch.type = field.type;
        objSearch.value = this.searchForm.get("search").value;
        searchObj.filterFields.push(objSearch);
        console.log(objSearch);
        console.log(searchObj.filterFields);
      }
    }
    this.filterData.filter = searchObj.filterFields;
    this.filterData.mode = "allField";
    console.log(this.filterData);
    if (this.config.valueFilter) {
      this.filterData.valueFilter = this.config.valueFilter;
    }

    this.filterPerField = false;
    this.getInfo();
  }

  sendAction(field, action) {
    const sendInfo: any = {};
    sendInfo.field = field;
    sendInfo.action = action;
    this.actionAnswer.emit(sendInfo);
  }

  updateSelectItem() {
    if (this.dataSource) {
      if (this.dataSource.length > 0) {
        if (this.config.listItemSelect) {
          this.arraySelectItem = this.config.listItemSelect;
          for (const itemInfo of this.dataSource) {
            let indexSelect = -1;
            if (this.config.selectGetObject) {
              indexSelect = this.config.listItemSelect.findIndex(
                item => item._id == itemInfo._id
              );
            } else {
              indexSelect = this.config.listItemSelect.findIndex(
                item => item == itemInfo._id
              );
            }

            if (indexSelect >= 0) {
              itemInfo.select = true;
            }
          }
        }
      }
    }

  }

  ngOnDestroy() {
    this.searchValueChangesSubscription &&
      this.searchValueChangesSubscription.unsubscribe();
  }
}

