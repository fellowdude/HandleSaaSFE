import { DialogConfirmComponent } from "src/app/system/components/dialog-confirm/dialog-confirm.component";
import { RulesDispatcherService } from "./../../../shared/service/rules-dispatcher.service";
import { RulesAdminService } from "./../../../shared/service/rules-admin.service";
import { LdvService } from "./../../../shared/service/ldv.service";
import { DiscountRuleService } from "./../../../shared/service/discount-rule.service";
import { MiddleService } from "src/app/shared/service/middle.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { trigger, style, animate, transition } from "@angular/animations";
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Renderer2
} from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-crud-rules-admin",
  templateUrl: "./crud-rules-admin.component.html",
  styleUrls: ["./crud-rules-admin.component.scss"],
  animations: [
    trigger("asideWrapperAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("200ms", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("200ms", style({ opacity: 0 }))
      ])
    ]),
    trigger("asideAnimation", [
      transition(":enter", [
        style({ transform: "translateX(500px)", opacity: 0 }),
        animate("200ms", style({ transform: "translateX(0)", opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translateX(0)", opacity: 1 }),
        animate("200ms", style({ transform: "translateX(500px)", opacity: 0 }))
      ])
    ])
  ]
})
export class CrudRulesAdminComponent implements OnInit, OnDestroy {
  @Input() isEmbedded: boolean = false;
  @Input() isEmbeddedUpdate: boolean = false;
  @Input() readOnly: boolean
  @Output() embeddedSaved = new EventEmitter<any>();
  @Output() deletedRulesAdmin = new EventEmitter<any>();
  @Output() switchModal = new EventEmitter<any>();
  @ViewChild("dialogDelete", { static: false })
  dialogConfirm: DialogConfirmComponent;
  editRule: boolean;
  tootgleCreateRule: boolean;
  createRule: boolean;
  openAsideRules: boolean;
  adminRuleForm: FormGroup;
  idRulesAdmin: string;
  headerFixed: boolean;
  dataSourceRdd: any[] = [];
  dataSourceRddForFilter: any[] = [];
  dataSourceRddSubscription: Subscription;
  rulesAdminChangedSubscription: Subscription;
  rddNameFilterSubscription: Subscription;
  dataSourceOperators: any[] = [];
  discountRules: any[] = [];
  ldvDetails: any[] = [];
  submitted: boolean = false;
  showDrr: boolean = false;
  noRulesFound: boolean = false;
  searchFilter: any;
  rulesAdminAdded: boolean = false;
  searchLoading: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _middleService: MiddleService,
    private discountRuleService: DiscountRuleService,
    private ldvService: LdvService,
    private rulesAdminService: RulesAdminService,
    private rulesDispatcherService: RulesDispatcherService,
    private renderer2: Renderer2
  ) {
    this.editRule = false;
    this.tootgleCreateRule = false;
    this.searchFilter = null;
    this.openAsideRules = false;
    this.createRule = false;
    this.activateRoute.params.subscribe(params => {
      this.idRulesAdmin = params.idRulesAdmin;
    });
  }

  @HostListener("scroll", ["$event"]) private onScroll($event: Event): void {
    $event.srcElement.addEventListener("scroll", this.scrollEvent, true);
  }

  ngOnInit() {
    this.dataSourceRddSubscription = this.rulesDispatcherService.discountRulesChanged.subscribe(
      (discountRules: any[]) => {
        if (this.dataSourceRdd.length < discountRules.length) {
          this.dataSourceOperators.push(null);
        }
        this.dataSourceRdd = discountRules;
      }
    );
    this.headerFixed = false;
    this.adminRuleForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.max(50)]),
      rddNameFilter: new FormControl(null)
    });
    //embedded update
    this.rulesAdminChangedSubscription = this.rulesDispatcherService.rulesAdminChanged.subscribe(
      (rulesAdmin: any[]) => {
        if (Object.entries(rulesAdmin).length !== 0) {
          this.getInfoRulesAdmin(rulesAdmin);
        }
      }
    );
    if (this.idRulesAdmin) {
      this.getInfoRulesAdmin();
    }
    this.getLdvDetails();
    this.onChanges();
  }

  returnAdminRule() {
    this.router.navigate(["/system/rules-admin"]);
  }

  get f() {
    return this.adminRuleForm.controls;
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  addDiscountRule(obj, index) {
    this.rulesAdminAdded = true;

    //for updating an array with virtual scroll we need to create a copy of it
    const updatedDiscountRules = this.discountRules.slice();
    updatedDiscountRules.splice(index, 1);
    this.discountRules = updatedDiscountRules;

    this.dataSourceRddForFilter.push(obj);
    this.rulesDispatcherService.addDiscountRule(obj);

    this._middleService.sendMessage(
      "REGLA DE DESCUENTO",
      "La regla de descuento ha sido añadida correctamente",
      "ok"
    );
  }

  deleteDiscountRule(data) {
    const rddIndex = this.dataSourceRdd.findIndex(rdd => rdd._id === data._id);
    this.dataSourceOperators.splice(rddIndex, 1);
    this.dataSourceRddForFilter.splice(rddIndex, 1);
    this.rulesDispatcherService.deleteDiscountRule(rddIndex);
  }

  deleteAdminRule() {
    const title = "Eliminar Administrador de reglas de descuento";
    const messageModal = "¿Está seguro que desea eliminar?";
    this.dialogConfirm.show(title, messageModal);
  }

  acceptModal($event) {
    if ($event.accept) {
      this.deletedRulesAdmin.emit(true);
      this.rulesDispatcherService.deleteRulesAdmin();
    }
  }

  editDiscountRule(data) {
    this.createRule = true;
    this.openAsideRules = true;
    this.showDrr = true;
    this.editRule = true;
    this.rulesDispatcherService.sendRuleToUpdate(data);
    this.switchModal.emit(true);
  }

  createDiscountRule() {
    this.showDrr = !this.showDrr;
    this.rulesDispatcherService.sendRuleToUpdate({});
  }

  changeOperator(index: number, id: string) {
    this.dataSourceRdd[index].operatorId = id;
    this.dataSourceOperators[index] = id;
  }

  changeFilter() {
    this.adminRuleForm.controls["rddNameFilter"].setValue(this.searchFilter);
  }
  onChanges() {
    this.rddNameFilterSubscription = this.adminRuleForm.controls[
      "rddNameFilter"
    ].valueChanges.subscribe(val => {
      const ids = this.dataSourceRddForFilter.map(rdd => rdd._id);
      const timer = setTimeout(() => {
        if (val === this.adminRuleForm.controls["rddNameFilter"].value) {
          this.searchLoading = true;
          if (val !== "") {
            this.discountRuleService.getAll(val, ids).subscribe(
              (value: any) => {
                if (value.data.length === 0) {
                  this.noRulesFound = true;
                  this.discountRules = [];
                  this.searchLoading = false;
                } else {
                  this.noRulesFound = false;
                  this.discountRules = value.data.slice();
                  this.searchLoading = false;
                }
              },
              error => {
                console.log(error);
                this.searchLoading = false;
              }
            );
          } else {
            this.discountRules = [];
            this.searchLoading = false;
          }
        }
        clearTimeout(timer);
      }, 500);
    });
  }

  getInfoRulesAdmin(rulesAdmin?: any) {
    if (rulesAdmin) {
      this.fillTemplate(rulesAdmin);
    } else {
      this.rulesAdminService
        .getOne(this.idRulesAdmin)
        .subscribe((rulesAdminData: any) => {
          this.fillTemplate(rulesAdminData);
        });
    }
  }

  fillTemplate(rulesAdminData: any) {
    this.adminRuleForm.patchValue({
      name: rulesAdminData.name
    });
    this.populateRulesAndOperators(rulesAdminData.rules);
  }

  getLdvDetails() {
    this.ldvService
      .getLdvDetail("OPERATOR_ADMIN_RULE")
      .subscribe((val: any) => {
        this.ldvDetails = val;
      });
  }

  populateRulesAndOperators(data: []) {
    data.forEach((val: any, index) => {
      if (val.operator) {
        if (val.operator._id) {
          this.dataSourceOperators[index] = val.operator._id;
        } else {
          this.dataSourceOperators[index] = val.operator;
        }
      } else {
        this.dataSourceOperators[index] = val.operator;
      }
    });
    this.dataSourceRdd.forEach((rdd, index) => {
      //for pre-selecting operators1
      rdd.operatorId = this.dataSourceOperators[index];
    });
    this.dataSourceRddForFilter = this.dataSourceRdd.slice();
  }

  saveAdminRule() {
    for (let i = 0; i < this.dataSourceOperators.length; i++) {
      if (
        (this.dataSourceOperators[i] === "0" ||
          this.dataSourceOperators[i] === null) &&
        i !== 0
      ) {
        const message = () =>
          this._middleService.sendMessage(
            "Administrador de reglas de descuento",
            "Debe seleccionar un operator para las reglas",
            "error"
          );
        if (this.isEmbeddedUpdate || this.isEmbedded) {
          this.embeddedSaved.emit({ value: false, message });
        }
        return;
      }
    }

    if (this.dataSourceRdd.length === 0) {
      const message = () =>
        this._middleService.sendMessage(
          "Administrador de reglas de descuento",
          "Debe agregar al menos una regla de descuento",
          "error"
        );
      if (this.isEmbeddedUpdate || this.isEmbedded) {
        this.embeddedSaved.emit({ value: false, message });
      }
      return;
    }

    let foundDateRule = false;

    this.dataSourceRdd.forEach(rule => {
      if (rule.tipo.value === "Fecha") {
        foundDateRule = true;
      }
    });

    if (!foundDateRule && this.dataSourceRdd.length > 0) {
      const message = () =>
        this._middleService.sendMessage(
          "Administrador de reglas de descuento",
          "Debe agregar al menos una regla de descuento de tipo fecha para guardar esta campaña",
          "error"
        );
      if (this.isEmbeddedUpdate || this.isEmbedded) {
        this.embeddedSaved.emit({ value: false, message });
      }
      return;
    }

    if (this.adminRuleForm.invalid) {
      const message = () =>
        this._middleService.sendMessage(
          "Administrador de reglas de descuento",
          "Completar los campos requeridos",
          "error"
        );
      if (this.isEmbeddedUpdate || this.isEmbedded) {
        this.embeddedSaved.emit({ value: false, message });
      }
      return;
    }

    this.submitted = true;

    if (this.adminRuleForm.valid) {
      this._middleService.sendLoading(true);
      const { name } = this.adminRuleForm.value;

      let data = {
        name,
        rules: []
      };

      this.dataSourceRdd.forEach((rdd, index) => {
        if (rdd.__v === undefined) {
          delete rdd._id;
        }
        if (index === 0) {
          data.rules.push({ operator: null, rddId: rdd });
        } else {
          data.rules.push({
            operator: this.dataSourceOperators[index],
            rddId: rdd
          });
        }
      });

      if (this.isEmbeddedUpdate) {
        let updatedData = Object.assign(
          this.rulesDispatcherService.getRulesAdmin(),
          data
        );
        this.rulesAdminChangedSubscription.unsubscribe();
        this.rulesDispatcherService.setRulesAdminChanged(updatedData);
        this._middleService.sendLoading(false);
        this.embeddedSaved.emit({ value: true });
        return;
      } else if (this.idRulesAdmin) {
        this.rulesAdminService
          .updateRulesAdmin(data, this.idRulesAdmin)
          .subscribe((saveRulesAdmin: any) => {
            this._middleService.sendLoading(false);
            this._middleService.sendMessage(
              "Administrador de reglas de descuento",
              "La regla de descuento ha sido actualizada correctamente",
              "ok"
            );
            this.router.navigate([
              "/system/rules-admin/detail/" + this.idRulesAdmin
            ]);
          });
      } else {
        if (this.isEmbedded) {
          this.rulesAdminChangedSubscription.unsubscribe();
          this.rulesDispatcherService.setRulesAdminChanged(data);
          this._middleService.sendLoading(false);
          this.embeddedSaved.emit({ value: true });
        } else {
          this.rulesAdminService
            .createRulesAdmin(data)
            .subscribe((saveRulesAdmin: any) => {
              this._middleService.sendLoading(false);
              this._middleService.sendMessage(
                "Administrador de reglas de descuento",
                "El administrador de regla de descuento ha sido creado correctamente",
                "ok"
              );
              this.router.navigate([
                "/system/rules-admin/detail/" + saveRulesAdmin.createdId
              ]);
            });
        }
      }
    } else {
      this._middleService.sendMessage(
        "Administrador de reglas de descuento",
        "Revise los campos obligatorios",
        "error"
      );
    }
  }

  ngOnDestroy() {
    this.rddNameFilterSubscription.unsubscribe();
    this.dataSourceRddSubscription.unsubscribe();
    this.rulesAdminChangedSubscription.unsubscribe();
  }

  toogleAsideRules(value: boolean, add?: boolean) {
    !value && ((this.searchFilter = ""), this.changeFilter());
    if (add) {
      this.editRule = false;
    }
    this.createRule = false;
    this.showDrr = false;
    this.openAsideRules = value;
    this.switchModal.emit(value);
  }

  toogleCreateRule(value) {
    if (this.editRule) {
      this.createRule = false;
      this.showDrr = false;
      this.openAsideRules = value;
      this.switchModal.emit(value);
    } else {
      if (!this.tootgleCreateRule) {
        this.tootgleCreateRule = true;
        this.createRule = value;
        if (value) {
          this.createDiscountRule();
        } else {
          setTimeout(() => {
            this.showDrr = false;
          }, 1000);
        }
        setTimeout(() => {
          this.tootgleCreateRule = false;
        }, 1000);
      }
    }

    this.editRule = false;
  }
}
