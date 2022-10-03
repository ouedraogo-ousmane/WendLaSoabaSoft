import { TestBed } from '@angular/core/testing';

import { SnotificationsService } from './snotifications.service';

describe('SnotificationsService', () => {
  let service: SnotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
