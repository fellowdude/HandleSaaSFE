import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCampaignComponent } from './crud-campaign.component';

xdescribe('CrudCampaignComponent', () => {
  let component: CrudCampaignComponent;
  let fixture: ComponentFixture<CrudCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
