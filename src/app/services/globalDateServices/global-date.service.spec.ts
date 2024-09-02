import { TestBed } from '@angular/core/testing';

import { GlobalDateService } from './global-date.service';

describe('GlobalDateService', () => {
  let service: GlobalDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
