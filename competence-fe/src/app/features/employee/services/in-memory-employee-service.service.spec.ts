import { TestBed } from '@angular/core/testing';

import { InMemoryEmployeeServiceService } from './in-memory-employee-service.service';

describe('InMemoryEmployeeServiceService', () => {
  let service: InMemoryEmployeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryEmployeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
