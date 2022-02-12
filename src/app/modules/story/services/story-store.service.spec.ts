import { TestBed } from '@angular/core/testing';

import { StoryStoreService } from './story-store.service';

describe('StoryStoreService', () => {
  let service: StoryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
