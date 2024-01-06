import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContentPageComponent } from './list-content-page.component';

describe('ListContentPageComponent', () => {
  let component: ListContentPageComponent;
  let fixture: ComponentFixture<ListContentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
