import { TestBed } from '@angular/core/testing';

import { JsonSaverStorageService } from './json-saver-storage.service';

describe('JsonSaverService', () => {
  let service: JsonSaverStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonSaverStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
