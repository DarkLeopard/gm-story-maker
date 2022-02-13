import {TestBed} from '@angular/core/testing';

import {ProjectTranslateService} from './project-translate.service';

describe('ProjectTranslateService', () => {
  let service: ProjectTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
