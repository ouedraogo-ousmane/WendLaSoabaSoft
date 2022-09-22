import { TestBed } from '@angular/core/testing';

import { SdetailMissionService } from './sdetail-mission.service';

describe('SdetailMissionService', () => {
  let service: SdetailMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdetailMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
