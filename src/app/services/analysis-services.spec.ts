import { TestBed } from '@angular/core/testing';

import { AnalysisServices } from './analysis-services';

describe('AnalysisServices', () => {
  let service: AnalysisServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
