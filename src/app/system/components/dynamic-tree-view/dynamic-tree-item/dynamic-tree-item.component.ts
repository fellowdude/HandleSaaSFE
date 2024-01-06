import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-dynamic-tree-item',
  templateUrl: './dynamic-tree-item.component.html',
  styleUrls: ['./dynamic-tree-item.component.scss']
})
export class DynamicTreeItemComponent implements OnInit {
  @Input() config: any;
  @Input() disableParents: boolean;
  @Input() disableAll: boolean;
  @ViewChildren('children') children: QueryList<DynamicTreeItemComponent>;
  @Output() selectedCategory = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.verifyParents(this.config);
  }

  toggleExpand() {
    if (this.config.expanded) {
      this.config.expanded = false;
    } else {
      this.config.expanded = true;
    }
  }
  listenChagesCheck(config: any) {
    this.selectedCategory.emit(config);

    if (config) {
      // this.recursiveCheckedCheck(config);
      this.verifyParents(config);
    }
  }

  recursiveCheckedCheck(config: any) {
    if (!config.children) {
      return;
    } else {
      for (const node of config.children) {
        node.checked = config.checked;
        this.recursiveCheckedCheck(node);
      }
    }
  }
  verifyParents(config: any) {
    /*   if (!config.parent) {
      return;
    } else {
      let count = 0;
      for (const subnodes of config.parent.children) {
        if (subnodes.checked) {
          count++;
        }
      }
      if (count === 0) {
        config.parent.partialSelected = false;
        config.parent.checked = config.checked;
      } else if (count < config.parent.children.length) {
        config.parent.checked = true;
        config.parent.partialSelected = true;
      } else if (count === config.parent.children.length) {
        config.parent.checked = config.checked;
        config.parent.partialSelected = false;
      }
      this.verifyParents(config.parent);
    } */
  }
}
