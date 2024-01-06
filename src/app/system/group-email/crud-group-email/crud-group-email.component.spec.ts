import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGroupEmailComponent } from './crud-group-email.component';

xdescribe('CrudGroupEmailComponent', () => {
  let component: CrudGroupEmailComponent;
  let fixture: ComponentFixture<CrudGroupEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudGroupEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGroupEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
