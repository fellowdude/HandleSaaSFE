import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTodayComponent } from './sell-today.component';

describe('SellTodayComponent', () => {
  let component: SellTodayComponent;
  let fixture: ComponentFixture<SellTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
