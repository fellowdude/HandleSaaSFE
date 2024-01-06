import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsLocationComponent } from './maps-location.component';

xdescribe('MapsLocationComponent', () => {
  let component: MapsLocationComponent;
  let fixture: ComponentFixture<MapsLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
