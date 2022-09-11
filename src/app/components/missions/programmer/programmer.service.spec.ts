import { TestBed } from '@angular/core/testing';

import { ProgrammerService } from './programmer.service';

describe('ProgrammerService', () => {
  let service: ProgrammerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
