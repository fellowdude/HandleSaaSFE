import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ListCategoryComponent } from './list-category/list-category.component';
import { Router } from '@angular/router';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../components/header/header.service';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UtilsCode } from '../../utils/utilsCode';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  listParent: any;
  data: any;
  treeInfo: any;
  dataInfo: any;
  secuenceActive: boolean;
  paddingBase: any;
  groupIndex: number;
  headerFixed: boolean;
  seachInputIndex: number;
  editMode: Boolean;
  searchForm: any;
  searchArray: FormArray = new FormArray([]);
  subscription: Array<Subscription>;
  @ViewChildren("listTableCategory") listTableCategory: QueryList<ListCategoryComponent>;
  // @ViewChild(ListCategoryComponent, { static: false }) listTableCategory: ListCategoryComponent;
  scrolled: Subject<void> = new Subject<void>();
  constructor(
    private serviceCategory: CategoryService,
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
    this.headerService.sendTitle('Categorías');
    this.listParent = [];
    this.getCategory();
    this.headerFixed = false;
  }

  onChanges() {
    for (let i = 0; i < this.data.length; i++) {
      this.subscription.push(
        this.searchs.controls[i].valueChanges.subscribe(val => {
          const timer = setTimeout(() => {
            let category;
            if (this.searchs.controls[i].value == val) {
              category = this.listTableCategory.find(cat => cat.index == i);
              category.dragAndDropActive = false;
              this.seachInputIndex = i;
              if (val == 'undefined') {
                val = ''
              }
              localStorage.setItem('category-' + this.data[this.groupIndex]._id, val)
              this.serviceCategory.filterCategoryFromCategoryGroup(val, this.data[this.groupIndex]._id).subscribe(val => {
                this.data[this.groupIndex].category = val;
                this.seachInputIndex = -1;
              }, error => {
                this.seachInputIndex = -1;
              });
            }
            if (this.searchs.controls[i].value == "") {
              if (category) {
                category.dragAndDropActive = true;
              }
            }
            clearTimeout(timer);
          }, 500);
        })
      );
    }
  }

  actionScroll(item) {
    item.scroll = item.scroll ? false : true;
  }

  scrollEvent = (event: any): void => {
    const number = document.documentElement.scrollTop;
    this.listTableCategory.forEach((tableCategory, index) => {
      if (this.data[index].scroll) {
        this.scrolled.next();
        tableCategory.scrolledNumber = number;
      }
    })

    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  getCategory() {
    this._middleService.sendLoading(true);
    this.serviceCategory.getTableCategory().subscribe(
      (data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.searchs.push(new FormControl());
        }
        this.data = data;

        for (const data of this.data) {

          if (localStorage.getItem('category-' + data._id)) {
            
            if (localStorage.getItem('category-' + data._id) != 'undefined') {
              data.search = localStorage.getItem('category-' + data._id)
            } else {
              data.search = ''
            }
          }

        }
        // this.onChanges();
        this.data[0].scroll = true;
        for (let i = 0; i < this.data.length; i++) {
          this.listParent = [];
          this.data[i].index = i;
          this.searchLastChild(this.data[i], i);
        }
        this._middleService.sendLoading(false);
      }, () => {

      });
  }

  changeEditMode() {
    this.editMode = !this.editMode;
  }

  searchLastChild(node: any, value) {
    if (!node.children) {
      node.padding = (this.listParent.length * this.paddingBase).toString() + 'px';
      node.secuenceActive = this.secuenceActive;
      this.secuenceActive = !this.secuenceActive;
      // this.addParentProduct(this.listParent, node.totalProduct);
    } else {
      node.padding = (this.listParent.length * this.paddingBase).toString() + 'px';
      node.secuenceActive = this.secuenceActive;
      this.secuenceActive = !this.secuenceActive;
      this.listParent.push(value)
      for (let j = 0; j < node.children.length; j++) {
        this.searchLastChild(node.children[j], j);
      }
      this.listParent.splice(this.listParent.length - 1, 1);
    }
  }

  // addParentProduct(array, value) {
  //   let changeTotal = this.data;
  //   for (const dataValue of array) {
  //     changeTotal = changeTotal[dataValue];
  //     changeTotal.totalProduct = changeTotal.totalProduct + value;
  //     changeTotal = changeTotal.children;
  //   }
  // }

  createBrand() {
    this.router.navigate(['/system/category/new']);
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
    let category = this.listTableCategory.find(cat => cat.index == this.groupIndex);

    this.seachInputIndex = this.groupIndex;
    if (val == 'undefined') {
      val = ''
    }

    localStorage.setItem('category-' + this.data[this.groupIndex]._id, val)
    if (val === '' || val === undefined) {
      this.serviceCategory.filterCategoryGroupWithCategory(val, this.data[this.groupIndex]._id).subscribe(val => {
        category.dragAndDropActive = true
        this.data[this.groupIndex].category = val[0].category;
        this.seachInputIndex = -1;
      }, error => {
        this.seachInputIndex = -1;
      });
    } else {
      this.serviceCategory.filterCategoryFromCategoryGroup(val, this.data[this.groupIndex]._id).subscribe(val => {
        category.dragAndDropActive = false
        this.data[this.groupIndex].category = val;
        this.seachInputIndex = -1;
      }, error => {
        this.seachInputIndex = -1;
      });
    }

  }
}
