import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter
} from '@angular/core';
import { DynamicTreeItemComponent } from './dynamic-tree-item/dynamic-tree-item.component';
import { SortArray } from '../../../utils/sortArray';

@Component({
  selector: 'app-dynamic-tree-view',
  templateUrl: './dynamic-tree-view.component.html',
  styleUrls: ['./dynamic-tree-view.component.scss']
})
export class DynamicTreeViewComponent implements OnInit {
  @Input() dataSource: Array<any>;
  @Input() disableParents: boolean;
  @Input() disableAll: boolean;
  @ViewChildren('rootNodes') listRootNodes: QueryList<DynamicTreeItemComponent>;
  @Output() categorySelected = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.dataSource = [];
  }

  showAuthorFromParent = function (author) { };

  fillDataSource(data: Array<any>) {
    return new Promise<void>((resolve, reject) => {
      for (const element of data) {
        this.assignParents(element);
      }
      this.dataSource = data;
      this.dataSource = SortArray.orderArrayAlphabetical(this.dataSource, 'name');
      resolve();
    });
  }

  private assignParents(node: any) {
    if (!node.children) {
      return;
    } else {
      node.expanded = true;
      for (const subnode of node.children) {
        subnode.parent = node;
        this.assignParents(subnode);
      }
    }
  }

  emitCategory($event) {
    this.categorySelected.emit($event);
  }
}
