import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { DialogConfirmComponent } from 'src/app/system/components/dialog-confirm/dialog-confirm.component';
import { CategoryService } from '../../../../shared/service/category.service';

@Component({
  selector: 'app-list-group-category',
  templateUrl: './list-group-category.component.html',
  styleUrls: ['./list-group-category.component.scss']
})
export class ListGroupCategoryComponent implements OnInit {
  @Input() childrenCategoryGroup: any;
  @Input() valueShow: any;
  @Input() index: number;
  @Input() scrolled: Observable<void>;
  @Input() activeChangeBoolean: boolean;
  @Input() dragAndDropActive: boolean = true;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  itemPosition: number;
  idItemDelete: any

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private _middleService: MiddleService,
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.childrenCategoryGroup, event.previousIndex, event.currentIndex);

    let categoryGroupListToUpdate = this.childrenCategoryGroup.map((categoryGroup, index) => {
      return { id: categoryGroup._id, index: index };
    });

    this._middleService.sendLoading(true);
    this.categoryService.updateManyCategoryGroup(categoryGroupListToUpdate).subscribe(res => {
      this.childrenCategoryGroup.map((categoryGroup, index) => {
        categoryGroup.position = index;
      });
      this._middleService.sendLoading(false);
      this._middleService.sendMessage(
        "Categorías",
        "La posición de las categorías ha actualizada.",
        "ok"
      );
    });;
  }

  goDetail(node) {
    this.router.navigate(['/system/categories-groups/detail/' + node._id]);
  }

  confirmDeleteItem(item, position) {
    this.idItemDelete = item;
    this.itemPosition = position;
    const title = "Eliminar grupo de categoría";
    const messageModal = "¿Está seguro de eliminar?";
    this.dialogConfirm.show(title, messageModal);
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deleteItem();
    }
  }

  deleteItem() {
    this._middleService.sendLoading(true);
    this.categoryService.deleteGroup(this.idItemDelete)
      .subscribe(
        res => {
          this.childrenCategoryGroup.splice(this.itemPosition, 1);
          let categoryGroupListToUpdate = this.childrenCategoryGroup.map((categoryGroup, index) => {
            return { id: categoryGroup._id, index: index };
          });
          this.categoryService.updateManyCategoryGroup(categoryGroupListToUpdate).subscribe(res => {
            this.childrenCategoryGroup.map((categoryGroup, index) => {
              categoryGroup.position = index;
            });
          });
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Eliminar",
            "Se ha eliminado correctamente",
            "ok"
          );
        },
        error => {
          this._middleService.sendLoading(false);
          this._middleService.sendMessage(
            "Eliminar",
            error.error.message,
            "error"
          );
        }
      );
  }

}
