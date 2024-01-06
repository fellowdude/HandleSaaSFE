import { Component, HostListener, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { CampaignService } from "src/app/shared/service/campaign.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { UtilsCode } from "src/app/utils/utilsCode";
import { HeaderService } from "./../components/header/header.service";
import { ListCampaignComponent } from "./list-campaign/list-campaign.component";

@Component({
  selector: "app-campaign",
  templateUrl: "./campaign.component.html",
  styleUrls: ["./campaign.component.scss"]
})
export class CampaignComponent implements OnInit {
  // @ViewChild("gridList", { static: true }) gridList: GridComponent;
  // editMode: Boolean;
  // headerFixed: boolean;
  // constructor(private router: Router, private headerService: HeaderService) { }

  // @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
  //   this.scrollEvent($event);
  // }

  // ngOnInit() {
  //   this.editMode = false;
  //   this.headerFixed = false;
  //   this.headerService.sendTitle("Campañas");
  //   this.gridList.columns = [
  //     {
  //       field: "image_thumbnail",
  //       title: "Imagen",
  //       type: "image",
  //       align: "center",
  //       width: '70px'
  //     },
  //     {
  //       field: "name",
  //       title: "Campaña",
  //       align: "center",
  //       type: "text",
  //       fontWeight: "bolder"
  //     },
  //     {
  //       field: "active",
  //       title: "Visibilidad",
  //       type: "boolean",
  //       align: "center",
  //       replace: [
  //         {
  //           value: true,
  //           replace: "Visible",
  //           type: "label",
  //           background: "#e8f5e9",
  //           color: "#3dd47a",
  //         },
  //         {
  //           value: false,
  //           replace: "No Visible",
  //           type: "label",
  //           background: "#fce4ec",
  //           color: "#fd96b9",
  //         },
  //       ],
  //       changeBoolean: {
  //         url: '/campaign/change-active',
  //         urlType: 'dinamic',
  //         fieldDinamic: '_id'
  //       }
  //     },
  //   ];
  //   this.gridList.config.pagQuantity = 20;
  //   this.gridList.config.getService = "/campaign/search";
  //   this.gridList.config.deleteService = "/campaign";
  //   this.gridList.config.redirect = "system/campaign/detail";
  //   this.gridList.config.entity = "Campaña";
  //   this.gridList.config.entityFilter = 'campain';
  // }

  // createCampaign() {
  //   this.router.navigate(["/system/campaign/new"]);
  // }

  // changeBooleanField(field, value) {
  //   this.gridList.changeBooleanField(field, value)
  // }

  // changeEditMode() {
  //   this.editMode = !this.editMode;
  //   this.changeBooleanField('active', this.editMode)
  //   if (this.editMode) {
  //     this.headerService.sendTitle("Campaña (Modo Edición)");
  //   } else {
  //     this.headerService.sendTitle("Campaña");
  //     this.gridList.actions = [];
  //   }
  // }

  // scrollEvent = (event: any): void => {
  //   //const number = event.srcElement.scrollTop;
  //   const number = document.documentElement.scrollTop;
  //   if (number >= 33) {
  //     this.headerFixed = true;
  //   } else {
  //     this.headerFixed = false;
  //   }
  // };

  secuenceActive: boolean;
  paddingBase: any;
  data: any;
  treeInfo: any;
  dataInfo: any;
  groupIndex: number;
  headerFixed: boolean;
  seachInputIndex: number;
  editMode: Boolean;
  searchForm: any;
  searchArray: FormArray = new FormArray([]);
  subscription: Array<Subscription>;
  @ViewChildren("listTableCampaign") listTableCampaign: QueryList<ListCampaignComponent>;
  scrolled: Subject<void> = new Subject<void>();

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private _middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.treeInfo = 'tree';
    this.dataInfo = 'dataInfo';
    this.secuenceActive = false;
    this.paddingBase = 20;
    this.editMode = false;
    this.subscription = [];

    this.searchForm = new FormGroup({
      searchs: this.searchArray
    });
  }

  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  get f() {
    return this.searchForm.controls;
  }

  get searchs(): FormArray {
    return this.searchForm.get('searchs') as FormArray;
  }

  ngOnInit() {
    this.headerService.sendTitle('Campañas');
    this.getCampaign();
    this.headerFixed = false;
  }

  actionScroll(item) {
    item.scroll = item.scroll ? false : true;
  }

  scrollEvent = (event: any): void => {
    const number = document.documentElement.scrollTop;
    this.listTableCampaign.forEach((tableCampaign, index) => {
      if (this.data[index].scroll) {
        this.scrolled.next();
        tableCampaign.scrolledNumber = number;
      }
    })

    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  getCampaign() {
    this._middleService.sendLoading(true);
    this.campaignService.getTableCategory().subscribe(
      (data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.searchs.push(new FormControl());
        }
        this.data = data;

        for (const data of this.data) {

          if (localStorage.getItem('campaign-' + data._id)) {

            if (localStorage.getItem('campaign-' + data._id) != 'undefined') {
              data.search = localStorage.getItem('campaign-' + data._id)
            } else {
              data.search = ''
            }
          }
        }

        this.data[0].scroll = true;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].index = i;
        }
        this._middleService.sendLoading(false);
      }, () => {

      });
  }

  changeEditMode() {
    this.editMode = !this.editMode;
  }

  createCampaign() {
    this.router.navigate(['/system/campaign/new']);
  }

  onPaste(event: ClipboardEvent, index: any) {
    const clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    pastedText = UtilsCode.cleanString(pastedText);
    this.groupIndex = index;
    setTimeout(() => {
      this.searchForm.get("search").setValue(pastedText);
    }, 0);
  }

  setGroupIndex(index) {
    this.groupIndex = index;
  }

  validateInput(event: KeyboardEvent, index: any) {
    const pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9 -]*$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (inputChar == 'undefined') {
      inputChar = ''
    }
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    this.groupIndex = index;

    if (event.key == 'Enter') {
      this.searchData();
    }
  }

  searchData() {
    let val = this.searchs.controls[this.groupIndex].value;
    let campaign = this.listTableCampaign.find(cat => cat.index == this.groupIndex);

    this.seachInputIndex = this.groupIndex;
    if (val == 'undefined') {
      val = ''
    }

    localStorage.setItem('campaign-' + this.data[this.groupIndex]._id, val)
    if (val === '' || val === undefined) {
      this.campaignService.filterCategoryGroupWithCategory(val, this.data[this.groupIndex]._id).subscribe(val => {
        campaign.dragAndDropActive = true
        this.data[this.groupIndex].campaign = val[0].campaign;
        this.seachInputIndex = -1;
      }, error => {
        this.seachInputIndex = -1;
      });
    } else {
      this.campaignService.filterCategoryFromCategoryGroup(val, this.data[this.groupIndex]._id).subscribe(val => {
        campaign.dragAndDropActive = false
        this.data[this.groupIndex].campaign = val;
        this.seachInputIndex = -1;
      }, error => {
        this.seachInputIndex = -1;
      });
    }
  }
}
