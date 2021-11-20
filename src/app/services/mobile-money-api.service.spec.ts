import { TestBed } from '@angular/core/testing';

import { MobileMoneyApiService } from './mobile-money-api.service';

describe('MobileMoneyApiService', () => {
  let service: MobileMoneyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileMoneyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
