import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  merge,
  Observable,
  skipUntil,
  Subject,
  tap,
} from 'rxjs';
import {StorageKeys} from '../../../shared/enums/storage-keys';
import {BrowserStorageService} from '../../../shared/services/browser-storage.service';
import {ISavedData} from '../interfaces/json-save-data.interface';
import {IStory} from '../interfaces/story.interface';

@Injectable()
export class StoryStoreService {

  private storiesDBBS: BehaviorSubject<IStory[]> = new BehaviorSubject<IStory[]>([]);
  public storiesDB: Observable<IStory[]> = this.storiesDBBS.asObservable();

  private restoreAtInitStatus: Subject<void> = new Subject<void>();
  private jsonFileName: string = 'gm-stories-db.json';

  constructor(
    private browserStorageService: BrowserStorageService,
  ) {
    this.initStorageSaver();
  }

  public appInitRestoreComlete(): void {
    this.restoreAtInitStatus.next();
    this.restoreAtInitStatus.complete();
  }

  public createStory(story: Omit<IStory, 'id'> = {title: 'No name story'}): void {
    const currentStories: IStory[] = this.storiesDBBS.value;
    this.storiesDBBS.next([
      ...currentStories,
      {
        ...story,
        id: this.findNewIdNumber(currentStories.map((story: IStory) => story.id)),
      },
    ]
      .sort((a: IStory, b: IStory) => a.id - b.id));
  }

  public deleteStory(id: IStory['id']): void {
    this.storiesDBBS.next([
      ...this.storiesDBBS.value
        .filter((story: IStory) => story.id !== id),
    ]);
  }

  public readStory(id: IStory['id']): IStory | undefined {
    return this.storiesDBBS.value.find(((value: IStory) => value.id === id));
  }

  public updateStory(story: IStory): void {
    return this.storiesDBBS.next([
      ...this.storiesDBBS.value
        .reduce((acc: IStory[], currentValue: IStory) => {
          if (story.id === currentValue.id) {
            acc.push(story);
          } else {
            acc.push(currentValue);
          }
          return acc;
        }, []),
    ]);
  }

  public userLoadJson(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      const file: ISavedData = JSON.parse(event.target?.result as string);
      this.storiesDBBS.next(file.storiesDB);
    };
    reader.readAsText(file);
  }

  public userSaveJson(value?: ISavedData): void {
    if (!value) {
      value = {
        storiesDB: this.storiesDBBS.value,
      };
    }
    const blob = new Blob([JSON.stringify(value)], {type: 'application/json'});
    saveAs(blob, this.jsonFileName);
  }

  public saveInDB(): Observable<void> {
    return forkJoin(
      this.browserStorageService.setItemDB(StorageKeys.Stories, this.storiesDBBS.value),
    )
      .pipe(
        map(() => undefined),
      );
  }

  public restoreFromDB(): Observable<void> {
    return this.browserStorageService.getItemDB<IStory[]>(StorageKeys.Stories)
      .pipe(
        tap((value: IStory[] | null) => {
          this.storiesDBBS.next(value || []);
          if (!value) {
            console.warn('No data in storage: ', StorageKeys.Stories);
          }
        }),
        map(() => undefined),
        catchError((error, caught) => {
          console.error('Error from storage DB', error);
          return caught;
        }),
      );
  }

  private findNewIdNumber(currentIds: number[]): number {
    currentIds.sort((a: number, b: number) => a - b);
    return currentIds.length > 0 ? currentIds[currentIds.length - 1] + 1 : 1;
  }

  private initStorageSaver(): void {
    merge(
      this.storiesDB,
    )
      .pipe(
        skipUntil(this.restoreAtInitStatus),
      )
      .subscribe(() => {
        this.saveInDB()
          .subscribe();
      });
  }
}
