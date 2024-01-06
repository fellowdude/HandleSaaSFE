import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { CategoryService } from "src/app/shared/service/category.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { DialogConfirmComponent } from "../../components/dialog-confirm/dialog-confirm.component";
import { GridComponent } from "../../components/grid/grid.component";
import { HeaderService } from "../../components/header/header.service";
import { ListGroupCategoryComponent } from "./list-group-category/list-group-category.component";

@Component({
  selector: "app-group-category",
  templateUrl: "./group-category.component.html",
  styleUrls: ["./group-category.component.scss"]
})
export class GroupCategoryComponent implements OnInit {
  data: any;
  groupIndex: number;
  seachInputIndex: number;
  groupCategoryDelete: any;
  headerFixed: boolean;
  groupCategorySearchForm: FormGroup;
  dataCategoryGroup: any;
  searchCategoryGroup: string;
  pagNumber: any; // number page
  pagQuantity: any; // number items per pages
  totalPage: any;
  totalItems: any;
  @ViewChild(DialogConfirmComponent, { static: true })
  dialogConfirm: DialogConfirmComponent;
  //@ViewChild("gridList", { static: true }) gridList: GridComponent;
  @ViewChildren("listTableGroupCategory") listTableGroupCategory: QueryList<ListGroupCategoryComponent>;
  //scrolled: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private _categoryService: CategoryService,
    private _middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.dataCategoryGroup = [];
    this.pagNumber = 1;
    this.pagQuantity = 5;
    this.searchCategoryGroup = "";
    this.groupCategorySearchForm = new FormGroup({
      search: new FormControl(null)
    });
  }

  @HostListener("window:scroll", ["$event"]) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }

  /*ngOnInit() {
    this.headerService.sendTitle("Grupo de Categorías");
    this.headerFixed = false;
    this.gridList.columns = [
      {
        field: "name",
        title: "Nombre",
        type: "text"
      },
      {
        field: "create_date",
        title: "Fecha de creación",
        type: "date",
        align: "center"
      },
      {
        field: 'active',
        title: 'Visibilidad',
        type: 'boolean',
        align: 'center',
        replace: [
          {
            value: true,
            replace: 'Visible',
            type: 'label',
            background: '#e8f5e9',
            color: '#3dd47a',
          },
          {
            value: false,
            replace: 'No Visible',
            type: 'label',
            background: '#fce4ec',
            color: '#fd96b9',
          },
        ]
      },
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/category-group/search";
    this.gridList.config.deleteService = "/category-group";
    this.gridList.config.redirect = "system/categories-groups/detail/";
    this.gridList.config.entity = "Grupo de categoría";
    this.gridList.config.entityFilter = 'group_category';
    this.gridList.config.deleteMessage =
      "El grupo de categoría ha sido eliminado correctamente";
  }*/

  ngOnInit() {
    this.headerService.sendTitle("Grupo de Categorías");
    this.getGroupCategory();
    this.headerFixed = false;
  }

  getGroupCategory() {
    this._middleService.sendLoading(true);
    this._categoryService.getListCategoryAllGroup().subscribe(res => {
      this.data = res;
      this._middleService.sendLoading(false);
    })
  }
  
  createGroup() {
    this.router.navigate(["/system/categories-groups/new"]);
  }

  scrollEvent = (event: any): void => {
    //const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };
}
