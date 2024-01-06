import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicStaticPageComponent } from './dinamic-static-page.component';

xdescribe('DinamicStaticPageComponent', () => {
  let component: DinamicStaticPageComponent;
  let fixture: ComponentFixture<DinamicStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
