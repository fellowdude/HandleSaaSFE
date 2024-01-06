import { Component, OnInit, Input, ViewChild, HostListener, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove } from "@angular/cdk/drag-drop";
import { CategoryService } from '../../../shared/service/category.service';
import { MiddleService } from '../../../shared/service/middle.service';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() childrenCategory: any;
  @Input() valueShow: any;
  @Input() index: number;
  @Input() scrolled: Observable<void>;
  @Input() activeChangeBoolean: boolean;
  @Input() dragAndDropActive: boolean = true;
  eventsSubscription: Array<Subscription>;
  numberOfElementsTraversed: number;
  selectedNode: any;
  public scrolledNumber: number;
  private lastScrolledPosition: number;
  private tdHeight: number;
  private mouseIsDown: boolean;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private _middleService: MiddleService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.eventsSubscription = new Array<Subscription>();
    if (this.childrenCategory) {
      this.childrenCategory.forEach((category, index) => {
        this.childrenCategory[index].index = index;
      })
      const categoriesWithChildren = this.childrenCategory.filter(category => category.children);
      this.toggleAccordionCategoriesWithChildren(categoriesWithChildren, false);
    }
    this.onChanges();
  }

  onChanges() {
    this.eventsSubscription.push(this.scrolled.subscribe(() => {
      if (this.mouseIsDown) {
        const parentCategories = this.childrenCategory.filter(category => category.children);
        parentCategories.forEach(parent => {
          if (this.selectedNode.index !== parent.index) {
            parent.scroll = false;
          }
        });
      }
    }));
  }

  ngAfterViewInit() {
    if (this.document.getElementsByClassName('category-name')[0]) {
      this.tdHeight = Math.round(this.document.getElementsByClassName('category-name')[0].getBoundingClientRect().height);
    }
    else {
      this.tdHeight = 21;
    }
  }

  toggleAccordionCategoriesWithChildren(parentCategories: [], state: boolean) {
    parentCategories.forEach((category: any) => {
      category.scroll = state;
      category.scrollInitialState = state;
      if (category.children) {
        this.toggleAccordionCategoriesWithChildren(category.children, state);
      }
    })
  }

  countRecursively(childrenCategoryList: [], counter) {
    childrenCategoryList.forEach((category: any) => {
      if (category.children && category.scrollInitialState == true) {
        category.scrollInitialState = false;
        counter += category.children.length;
        counter = this.countRecursively(category.children, counter);
      }
    })

    return counter;
  }

  recursivelySetInitialStateToFalse() {
    this.childrenCategory.forEach((category: any) => {
      if (category.children && category.scrollInitialState == true) {
        category.scrollInitialState = false;
      }
    });
  }

  countChildren(itemsTraversed: number, fromIndexDragged: number) {
    itemsTraversed + fromIndexDragged < 0 && (itemsTraversed = fromIndexDragged * -1);
    const childrenCategorrySubArray = this.childrenCategory.slice(itemsTraversed + fromIndexDragged, fromIndexDragged + 1);
    if (childrenCategorrySubArray[childrenCategorrySubArray.length - 1].children) {
      childrenCategorrySubArray.splice(childrenCategorrySubArray.length - 1, 1);
    }
    const RealItemsTraversedCountingChildren = childrenCategorrySubArray.filter(category => category.children);

    return this.countRecursively(RealItemsTraversedCountingChildren, 0);
  }

  countPrevChildren(fromIndexDragged: number) {
    const childrenCategorrySubArray = this.childrenCategory.slice(0, fromIndexDragged + 1);
    if (childrenCategorrySubArray[childrenCategorrySubArray.length - 1].children) {
      childrenCategorrySubArray.splice(childrenCategorrySubArray.length - 1, 1);
    }

    const RealItemsTraversedCountingChildren = childrenCategorrySubArray.filter(category => category.children);

    return this.countRecursively(RealItemsTraversedCountingChildren, 0);
  }

  onMouseDown(node: any) {
    this.lastScrolledPosition = this.scrolledNumber;
    this.mouseIsDown = true;
    this.selectedNode = node;
  }

  onMouseUp() {
    this.mouseIsDown = false;
  }

  dragStarted() {
    const parentCategories = this.childrenCategory.filter(category => category.children);
    parentCategories.forEach(parent => {
      if (this.selectedNode.index !== parent.index) {
        parent.scroll = false;
      }
    });
  }

  local_moveCard(event: any) {
    if (this.scrolledNumber !== undefined) {
      this.lastScrolledPosition == undefined && (this.lastScrolledPosition = 0);
      this.numberOfElementsTraversed = Math.round(((this.scrolledNumber - this.lastScrolledPosition) / this.tdHeight) +
        (event.distance.y / this.tdHeight));
    } else {
      this.numberOfElementsTraversed = Math.round(event.distance.y / this.tdHeight)
    }
  }

  actionScroll(item) {
    item.scroll = item.scroll ? false : true;
    item.scrollInitialState = item.scroll;
  }

  drop(event: CdkDragDrop<string[]>) {
    let destinationIndex;
    if (this.numberOfElementsTraversed >= 0) {
      const dismissCount = this.countPrevChildren(event.previousIndex);
      destinationIndex = this.numberOfElementsTraversed + event.previousIndex + 1 + dismissCount
    } else if (this.numberOfElementsTraversed < 0) {
      const dismissCount = this.countChildren(this.numberOfElementsTraversed, event.previousIndex);
      destinationIndex = this.numberOfElementsTraversed + event.previousIndex + dismissCount;
    }

    this.recursivelySetInitialStateToFalse();

    // if(!this.scrolled) {
    //   destinationIndex = event.currentIndex;
    // } else {
    //   destinationIndex = this.numberOfElementsTraversed + event.previousIndex;
    // }

    const copyPrevious = { ...this.childrenCategory[event.previousIndex] };
    // const copyCurrent = { ...this.childrenCategory[event.currentIndex] };

    const level = this.childrenCategory[event.previousIndex].nivel;

    this.childrenCategory.splice(event.previousIndex, 1);

    this.childrenCategory.splice(destinationIndex, 0, copyPrevious);

    let categorylistToUpdate = this.childrenCategory.map((category, index) => {
      return { id: category._id, index: index, level: category.nivel };
    })

    categorylistToUpdate = categorylistToUpdate.filter((category: any) => category.level == level);

    // const copyPrevious = { ...this.childrenCategory[event.previousIndex] };
    // const copyCurrent = { this.childrenCategory[destinationIndex] };
    // this.childrenCategory[event.previousIndex] = this.childrenCategory[destinationIndex];
    // this.childrenCategory[destinationIndex] = copyPrevious;

    // this.childrenCategory[event.previousIndex].position = copyPrevious.position;
    // this.childrenCategory[destinationIndex].position = copyCurrent.position;

    this._middleService.sendLoading(true);
    this.categoryService.updateManyCategories(categorylistToUpdate).subscribe(res => {
      this.childrenCategory.map((category, index) => {
        category.position = index;
      })
      this._middleService.sendLoading(false);
      this._middleService.sendMessage(
        "Categorías",
        "La posición de las categorías ha actualizada.",
        "ok"
      );
    });
  }

  updateVisibilty(event: any, node: any) {
    this._middleService.sendLoading(true);
    this.categoryService.updateCategory(node, node._id).subscribe(
      _ => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage("Categoría", 'Se ha realizado la actualización', 'ok');
      }, (error) => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage("Categoría", error.error.message, 'error');
      }
    )
  }

  changePosition() {

  }
  goDetail(node) {
    this.router.navigate(['/system/category/detail/' + node._id]);
  }

  ngOnDestroy() {
    this.eventsSubscription.forEach(event => {
      event.unsubscribe();
    })
  }
}
