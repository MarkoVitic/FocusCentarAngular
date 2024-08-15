import { TestBed } from '@angular/core/testing';

import { SubjetsService } from './subjets.service';

describe('SubjetsService', () => {
  let service: SubjetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
