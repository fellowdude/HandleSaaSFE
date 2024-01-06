import { Component, OnInit } from '@angular/core';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { CampaignService } from 'src/app/shared/service/campaign.service';

@Component({
  selector: 'app-dialog-order-reason-detail',
  templateUrl: './dialog-order-reason-detail.component.html',
  styleUrls: ['./dialog-order-reason-detail.component.scss']
})
export class DialogOrderReasonDetailComponent implements OnInit {
  showModal: boolean;
  entityName: string;
  entity: any;
  product: any;
  dates: string[];
  url_attachment: string;

  constructor(
    private middleService: MiddleService, 
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private campaignService: CampaignService) { }

  ngOnInit() {
    this.url_attachment = localStorage.getItem("url_attachment");
  }

  show(entityName, entityId, product) {
    this.dates = [];
    this.showModal = true;
    this.entityName = entityName;
    this.product = product;
    this.fillEntity(entityId);
  }

  private fillEntity(entityId: string) {
    this.middleService.sendLoading(true);
    switch(this.entityName) {
      case "producto": {
        this.productService.getById(entityId).subscribe(res => {
          this.entity = res;
          this.addDates();
          this.middleService.sendLoading(false);
        })
        break;
      } 
      case "categoria": {
        this.categoryService.getOne(entityId).subscribe(res => {
          this.entity = res;
          this.addDates();
          this.middleService.sendLoading(false);
        })
        break;
      }
      case "campaña": {
        this.campaignService.getOne(entityId).subscribe(res => {
          this.entity = res;
          this.addDates();
          this.middleService.sendLoading(false);
        })
        break;
      }
    }
  }

  private addDates() {
    this.entity.rules_admin.rules.forEach(rule => {
      if(rule.rddId.tipo.value === "Fecha") {
        rule.rddId.values.forEach((date, index) => {
          rule.rddId.values[index] = new Date(date)
          .toISOString()
          .substring(0, 10)
        });
        
        this.dates.push(rule.rddId.values);
      }
    })
  }

  close() {
    this.showModal = false;
  }
}
