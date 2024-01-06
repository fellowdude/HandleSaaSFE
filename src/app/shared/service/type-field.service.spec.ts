import { TestBed } from '@angular/core/testing';

import { TypeFieldService } from './type-field.service';

xdescribe('TypeFieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeFieldService = TestBed.get(TypeFieldService);
    expect(service).toBeTruthy();
  });
});
