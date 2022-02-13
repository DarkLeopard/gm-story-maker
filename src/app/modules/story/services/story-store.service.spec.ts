import {TestBed} from '@angular/core/testing';

import {ChapterStoreService} from './chapter-store.service';

describe('StoryStoreService', () => {
  let service: ChapterStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
