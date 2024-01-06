import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FilterCategoryService } from 'src/app/shared/service/filter-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../../components/header/header.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-crud-filter',
  templateUrl: './crud-filter.component.html',
  styleUrls: ['./crud-filter.component.scss']
})
export class CrudFilterComponent implements OnInit {
  filterForm: FormGroup;
  headerFixed: boolean;
  submitted: boolean;
  idProduct;
  namePage: string;
  @ViewChild('dialogDelete', { static: false })
  dialogConfirm: DialogConfirmComponent;
  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  constructor(
    private filterCategoryService: FilterCategoryService,
    private activatedRoute: ActivatedRoute,
    private _middleService: MiddleService,
    private router: Router,
    private _filterCategoryService: FilterCategoryService,
    private headerService: HeaderService
  ) {
    this.filterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      binded: new FormControl(false, [Validators.required]),
      bindedTo: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      unit: new FormControl('')
    });
    this.idProduct = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.headerService.sendTitle('Filtro de Categorías');
    this.headerFixed = false;
    this.namePage = 'Filtro de categorías';
    if (this.idProduct) {
      this.filterCategoryService
        .GetFilterById(this.idProduct)
        .subscribe(response => {
          this.filterForm.patchValue(response);
        });
    }
  }
  get f() {
    return this.filterForm.controls;
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deleteFilter();
    }
  }
  deleteFilter() {
    this._middleService.sendLoading(true);
    this._filterCategoryService.deleteFilter(this.idProduct).subscribe(
      deleteInfo => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.namePage,
          'El filtro de categoría ha sido eliminado correctamente',
          'ok'
        );
        this.router.navigate(['system/categories-filters']);
      },
      error => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
      }
    );
  }
  saveFilter() {
    if (this.filterForm.valid) {
      if (this.idProduct) {
        this.filterCategoryService
          .updateFilter(this.idProduct, this.filterForm.value)
          .subscribe(
            response => {
              this._middleService.sendMessage(
                this.namePage,
                'El filtro de categoría ha sido actualizado correctamente',
                'ok'
              );
              this.router.navigate(['system/categories-filters']);
            },
            error => {
              this._middleService.sendMessage(
                this.namePage,
                error.error.message,
                'error'
              );
            }
          );
      } else {
        this.filterCategoryService
          .createFilter(this.filterForm.value)
          .subscribe(
            response => {
              
              this._middleService.sendMessage(
                this.namePage,
                'El filtro de categoría ha sido creado correctamente',
                'ok'
              );
              this.router.navigate(['system/categories-filters']);
            },
            error => {
              this._middleService.sendMessage(
                this.namePage,
                error.error.message,
                'error'
              );
            }
          );
      }
    }
  }

  historyBack() {
    this.router.navigate(['system/categories-filters']);
  }
  confirmDeleteItem() {
    const title = 'Eliminar Filtro de Categoría';
    const messageModal = '¿Está seguro que desea eliminar?';
    this.dialogConfirm.show(title, messageModal, null, 'Filtro de Categoría');
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
}
