import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../components/grid/grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupApprovalService } from 'src/app/shared/service/group-approval.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { FlowRequestService } from 'src/app/shared/service/flow-request.service';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-flow-request',
  templateUrl: './flow-request.component.html',
  styleUrls: ['./flow-request.component.scss']
})
export class FlowRequestComponent implements OnInit {
  showPopupFlowAproval: boolean;
  namePage: string;
  listGroupApproval: Array<any>;
  groupApprovalSelect: any;
  groupApprovalSelectInfo: any;
  headerFixed = false;
  flowId: boolean;
  @ViewChild('gridList', { static: true }) gridList: GridComponent;
  flowApprovalForm: FormGroup;
  idFlow: boolean;
  constructor(
    private _groupApprovalService: GroupApprovalService,
    private _middleService: MiddleService,
    private _flowRequestService: FlowRequestService,
    private headerService: HeaderService
  ) { }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  ngOnInit() {
    this.headerService.sendTitle('Flujo de Aprobación');
    this.idFlow = null;
    this.groupApprovalSelect = [];
    this.groupApprovalSelectInfo = [];
    this.listGroupApproval = [];
    this.namePage = 'Flujo de Aprobación';
    this.showPopupFlowAproval = false;
    this.flowApprovalForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      entity: new FormControl(null, [Validators.required]),
      action: new FormControl(null, [Validators.required]),
      group: new FormControl(null),
      approval_group: new FormControl(null, [Validators.required])
    });
    this.gridList.columns = [
      {
        field: 'name',
        title: 'Flujo',
        type: 'text'
      }
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = '/flow-approval/search';
    this.gridList.config.deleteService = '/flow-approval';
    this.gridList.config.entity = 'Flujo de Aprobación';
    this.gridList.config.entityFilter = 'flow_approve';
    this.gridList.config.redirectId = true;
    this.gridList.config.deleteMessage =
      'El flujo de aprobación ha sido eliminado correctamente';
    this.getInfo();
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
  get f() {
    return this.flowApprovalForm.controls;
  }

  addGroupFlow() {
    if (this.flowApprovalForm.get('group').value) {
      const dataSelect = this.listGroupApproval.find(
        item => item._id == this.flowApprovalForm.get('group').value
      );
      if (dataSelect.approval_user.length > 0) {
        if (dataSelect) {
          this.groupApprovalSelect.push(dataSelect._id);
          this.groupApprovalSelectInfo.push(dataSelect);
          this.updateArrayListGroup();
        }
      } else {
        this._middleService.sendMessage(
          this.namePage,
          'El grupo de aprobación no tiene usuarios asociados',
          'error'
        );
      }
    }
  }

  actionAnswer(action) {
    this.idFlow = action.field;
    this.getDataFlow();
  }

  getInfo() {
    this.getGroupApproval();
  }

  getGroupApproval() {
    this._groupApprovalService.getAll().subscribe(
      (listGroupApproval: any) => {
        this.listGroupApproval = listGroupApproval;
        for (const group of listGroupApproval) {
          const infoGroup = this.groupApprovalSelect.findIndex(
            item => item == group._id
          );
          if (infoGroup >= 0) {
            this.groupApprovalSelectInfo.push(group);
          }
        }
        this.updateArrayListGroup();
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

  getDataFlow() {
    this._middleService.sendLoading(true);
    this.groupApprovalSelectInfo = [];
    this._flowRequestService.GetFilterById(this.idFlow).subscribe(
      (infoFlow: any) => {
        this.flowApprovalForm.patchValue(infoFlow);
        this.groupApprovalSelect = infoFlow.approval_group;
        this.getGroupApproval();
        this.openFlow();
      },
      error => {
        this._middleService.sendMessage(
          this.namePage,
          error.error.message,
          'error'
        );
        this._middleService.sendLoading(false);
      }
    );
  }

  ediFlow() { }

  openNewFlow() {
    this.idFlow = null;
    this.flowApprovalForm.reset();
    this.groupApprovalSelectInfo = [];
    this.groupApprovalSelect = [];
    this.getGroupApproval();
    this.openFlow();
  }
  openFlow() {
    this.showPopupFlowAproval = true;
  }
  closeFlow() {
    this.showPopupFlowAproval = false;
  }
  removeGroup(index) {
    this.groupApprovalSelectInfo.splice(index, 1);
    this.groupApprovalSelect.splice(index, 1);
    this.getGroupApproval();
  }

  updateArrayListGroup() {
    for (const group of this.groupApprovalSelect) {
      const indexSelect = this.listGroupApproval.findIndex(
        item => item._id == group
      );
      if (indexSelect >= 0) {
        this.listGroupApproval.splice(indexSelect, 1);
      }
    }
    this.flowApprovalForm.get('group').setValue(null);
    this._middleService.sendLoading(false);
  }

  saveFlow() {
    this.flowApprovalForm
      .get('approval_group')
      .setValue(this.groupApprovalSelect);
    if (!this.flowApprovalForm.invalid) {
      this._middleService.sendLoading(true);

      if (this.idFlow) {
        this._flowRequestService
          .updateFlowequest(this.idFlow, this.flowApprovalForm.value)
          .subscribe(
            update => {
              this._middleService.sendLoading(false);
              this.gridList.getInfo();
              this._middleService.sendMessage(
                this.namePage,
                'El flujo de aprobación ha sido actualizado correctamente',
                'ok'
              );
              this.closeFlow();
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
        this._flowRequestService
          .createFlowequest(this.flowApprovalForm.value)
          .subscribe(
            create => {
              this.gridList.getInfo();
              this._middleService.sendMessage(
                this.namePage,
                'Flujo de aprobación creado correctamente',
                'ok'
              );
              this._middleService.sendLoading(false);
              this.closeFlow();
            },
            error => {
              this._middleService.sendMessage(
                this.namePage,
                error.error.message,
                'error'
              );
              this._middleService.sendLoading(false);
            }
          );
      }
    } else {
      this._middleService.sendMessage(
        this.namePage,
        'Revise los campos obligatorios',
        'error'
      );
    }
  }
}
