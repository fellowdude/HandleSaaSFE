import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MiddleService } from '../shared/service/middle.service';
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit, OnDestroy {
  activeSlide = false;
  menuSubscription: Subscription;
  constructor(private middleService: MiddleService) {
    this.menuSubscription = this.middleService.getMenuInfo().subscribe(dataMessage => {
      this.changeStateMenu();
    });
  }

  ngOnInit() {
    this.middleService.sendLoading(false);
  }

  changeStateMenu() {
    this.activeSlide = !this.activeSlide;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.menuSubscription.unsubscribe();
  }
}
