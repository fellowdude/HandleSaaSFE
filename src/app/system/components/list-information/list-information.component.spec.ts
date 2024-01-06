import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInformationComponent } from './list-information.component';

xdescribe('ListInformationComponent', () => {
  let component: ListInformationComponent;
  let fixture: ComponentFixture<ListInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
