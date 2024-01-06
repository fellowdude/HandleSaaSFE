import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MiddleService } from '../service/middle.service';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit, OnDestroy {
  dataMessageInfo: any;
  showMessage = false;
  subscription: Subscription;
  
  constructor(private middleService: MiddleService) {
    this.subscription = this.middleService.getMessage().subscribe(dataMessage => {
      this.dataMessageInfo = dataMessage;
      this.show();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  show() {
    this.showMessage = true;
    const timerTime = this.dataMessageInfo.timer ? this.dataMessageInfo.timer : 3000;
    setTimeout(() => {
      this.showMessage = false;
    }, timerTime);
  }


}
