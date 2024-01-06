import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveCardsComponent } from './massive-cards.component';

describe('MassiveCardsComponent', () => {
  let component: MassiveCardsComponent;
  let fixture: ComponentFixture<MassiveCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassiveCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassiveCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
