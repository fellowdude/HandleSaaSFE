import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEmailComponent } from './group-email.component';

xdescribe('GroupEmailComponent', () => {
  let component: GroupEmailComponent;
  let fixture: ComponentFixture<GroupEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
