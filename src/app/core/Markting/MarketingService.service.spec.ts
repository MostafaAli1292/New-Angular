/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarketingServiceService } from './MarketingService.service';

describe('Service: MarketingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketingServiceService]
    });
  });

  it('should ...', inject([MarketingServiceService], (service: MarketingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
