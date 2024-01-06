import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBannerComponent } from './crud-banner.component';

xdescribe('CrudBannerComponent', () => {
  let component: CrudBannerComponent;
  let fixture: ComponentFixture<CrudBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
