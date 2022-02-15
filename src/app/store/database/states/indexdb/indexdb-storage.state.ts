import {
  Action,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import * as localforage from 'localforage';
import {
  catchError,
  forkJoin,
  Observable,
  Subscriber,
  switchMapTo,
  tap,
} from 'rxjs';
import {StorageKeys} from '../../../../shared/enums/storage-keys';
import {undefined$} from '../../../../shared/functions/void-observable';
import {IChapter} from '../../../../shared/models/chapter/chapter.interface';
import {ChaptersActions} from '../../../models/chapters/chapters.actions';
import {IndexDBActions} from './indexdb-storage.actions';

export interface IndexDBStateModel {
  restoreAtInitStatus: boolean;
  [StorageKeys.Chapters]: IChapter[];
}

const getDefaults: () => IndexDBStateModel = () => {
  return {
    restoreAtInitStatus: false,
    [StorageKeys.Chapters]: [],
  };
};

@State<IndexDBStateModel>({
  name: 'indexDB',
  defaults: getDefaults(),
})
export class IndexDBState {
  @Selector()
  public static getRestoreAtInitStatus(state: IndexDBStateModel): IndexDBStateModel['restoreAtInitStatus'] {
    return state.restoreAtInitStatus;
  }

  @Action(IndexDBActions.SetItem)
  public setItem(
    context: StateContext<IndexDBStateModel>,
    {key, value}: IndexDBActions.SetItem,
  ): Observable<void> {
    context.patchState({[key]: value});
    return this.setItemDB(key, value);
    return undefined$();
  }

  @Action(IndexDBActions.Restore)
  public restore(
    context: StateContext<IndexDBStateModel>,
  ): Observable<void> {
    return forkJoin(
      this.getItemDB<IChapter[]>(StorageKeys.Chapters)
        .pipe(
          tap((value: IChapter[] | null) => {
            const newValue: IChapter[] = value || [];
            context.patchState({[StorageKeys.Chapters]: newValue});
            context.dispatch(new ChaptersActions.Load(newValue));
            if (!value) {
              console.warn('No data in storage: ', StorageKeys.Chapters);
            }
          }),
        ),
    )
      .pipe(
        tap(() => {
          context.patchState({restoreAtInitStatus: true});
        }),
        catchError((error, caught) => {
          console.error('Error from storage DB', error);
          return caught;
        }),
        switchMapTo(undefined$()),
      );
  }

  public setItemDB<T>(key: StorageKeys, value: T): Observable<T> {
    return new Observable((subscriber: Subscriber<T>) => {
      localforage.setItem(key, value)
        .then((promiseResult: T) => {
          subscriber.next(promiseResult);
        })
        .catch((error: unknown) => {
          console.error('localforage error', error);
          subscriber.error(error);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  public getItemDB<T>(key: StorageKeys): Observable<T | null> {
    return new Observable((subscriber: Subscriber<T | null>) => {
      localforage.getItem<T>(key)
        .then((promiseResult: T | null) => {
          subscriber.next(promiseResult);
        })
        .catch((error: unknown) => {
          subscriber.error(error);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }
}
