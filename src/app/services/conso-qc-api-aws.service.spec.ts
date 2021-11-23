import { TestBed } from '@angular/core/testing';

import { ConsoQCApiAWSService } from './conso-qc-api-aws.service';

describe('ConsoQCApiAWSService', () => {
  let service: ConsoQCApiAWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoQCApiAWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
