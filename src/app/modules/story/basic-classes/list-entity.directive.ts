import {Directive} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import { DisplayedColumnsKeysEnum } from '../enums/displayed-columns-keys.enum';
import {StoryStoreService} from '../services/story-store.service';

@Directive()
export abstract class ListEntityDirective<T> {

  public displayedColumns: string[] = [DisplayedColumnsKeysEnum.Id, DisplayedColumnsKeysEnum.Title];
  public columnsKeysEnum: typeof DisplayedColumnsKeysEnum = DisplayedColumnsKeysEnum;
  public abstract dataSource: Observable<T[]>;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected storyStoreService: StoryStoreService,
  ) { }
}
