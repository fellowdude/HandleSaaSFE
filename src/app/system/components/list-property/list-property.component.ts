import { Component, OnInit, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { EnterpriseService } from 'src/app/shared/service/enterprise.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {
  @Input() config: any;
  @Input() listEnterpriseInfo: any;
  infoCompanyForm: FormGroup;
  constructor(
    private _enterpriseService: EnterpriseService,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    this.config = {};
    this.getListInfo();

  }

  getListInfo() {
    if (!this.listEnterpriseInfo.value) {
      this._enterpriseService.listInfoCompany().subscribe(
        (listInfo: any) => {
          this.listEnterpriseInfo.value = listInfo;
        }, () => {

        });
    }
  }

}
