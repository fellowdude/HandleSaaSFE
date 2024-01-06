import { Component, OnInit, Input, ViewChild, HostListener, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove } from "@angular/cdk/drag-drop";
import { CategoryService } from '../../../shared/service/category.service';
import { MiddleService } from '../../../shared/service/middle.service';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { CampaignService } from 'src/app/shared/service/campaign.service';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() campaigns: any[];
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
    private campaignService: CampaignService,
    private _middleService: MiddleService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.eventsSubscription = new Array<Subscription>();
  }

  ngAfterViewInit() {
    if (this.document.getElementsByClassName('campaign-name')[0]) {
      this.tdHeight = Math.round(this.document.getElementsByClassName('campaign-name')[0].getBoundingClientRect().height);
    }
    else {
      this.tdHeight = 21;
    }
  }

  onMouseDown(node: any) {
    this.lastScrolledPosition = this.scrolledNumber;
    this.mouseIsDown = true;
    this.selectedNode = node;
  }

  onMouseUp() {
    this.mouseIsDown = false;
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
      destinationIndex = this.numberOfElementsTraversed + event.previousIndex + 1
    } else if (this.numberOfElementsTraversed < 0) {
      destinationIndex = this.numberOfElementsTraversed + event.previousIndex;
    }

    const copyPrevious = { ...this.campaigns[event.previousIndex] };

    this.campaigns.splice(event.previousIndex, 1);

    this.campaigns.splice(destinationIndex, 0, copyPrevious);

    let campaignListToUpdate = this.campaigns.map((campaign, index) => {
      return { id: campaign._id, index: index };
    });

    this._middleService.sendLoading(true);
    this.campaignService.updateManyCampaigns(campaignListToUpdate).subscribe(res => {
      this.campaigns.map((campaign, index) => {
        campaign.position = index;
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
    this.campaignService.updateCampaign(node, node._id).subscribe(
      _ => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage("Campaña", 'Se ha realizado la actualización', 'ok');
      }, (error) => {
        this._middleService.sendLoading(false);
        this._middleService.sendMessage("Campaña", error.error.message, 'error');
      }
    )
  }

  changePosition() {

  }
  goDetail(node) {
    this.router.navigate(['/system/campaign/detail/' + node._id]);
  }

  ngOnDestroy() {
    this.eventsSubscription.forEach(event => {
      event.unsubscribe();
    })
  }
}
