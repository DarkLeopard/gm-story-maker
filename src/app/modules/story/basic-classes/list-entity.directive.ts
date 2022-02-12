import {Directive} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import {StoryStoreService} from '../services/story-store.service';

@Directive()
export abstract class ListEntityDirective<T> {

  public displayedColumns: string[] = ['id', 'title'];
  public abstract dataSource: Observable<T[]>;

  protected entityId: number = Number(this.activatedRoute.snapshot.paramMap.get('id')); // undefined check in router module
  protected entity: T | undefined;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected storyStoreService: StoryStoreService,
  ) { }
}
