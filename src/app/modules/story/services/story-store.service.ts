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
import {IChapter} from '../interfaces/chapter.interface';
import {ISavedData} from '../interfaces/json-save-data.interface';
import {IStory} from '../interfaces/story.interface';

type EntityTypes = IChapter | IStory;

@Injectable()
export class StoryStoreService {

  private storiesDBBS: BehaviorSubject<IStory[]> = new BehaviorSubject<IStory[]>([]);
  public storiesDB: Observable<IStory[]> = this.storiesDBBS.asObservable();
  private chaptersDBBS: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([]);
  public chaptersDB: Observable<IChapter[]> = this.chaptersDBBS.asObservable();

  private restored: Subject<void> = new Subject<void>();
  private jsonFileName: string = 'gm-stories-db.json';

  constructor(
    private browserStorageService: BrowserStorageService,
  ) {
    this.initStorageSaver();
  }

  public appInitRestoreComlete(): void {
    this.restored.next();
    this.restored.complete();
  }

  public getStory(id: number): IStory | undefined {
    return this.storiesDBBS.value.find(((value: IStory) => value.id === id));
  }

  public getChapter(id: number): IChapter | undefined {
    return this.chaptersDBBS.value.find((value: IChapter) => value.id === id);
  }

  public userLoadJson(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      const file: ISavedData = JSON.parse(event.target?.result as string);
      this.storiesDBBS.next(file.storiesDB);
      this.chaptersDBBS.next(file.chaptersDB);
    };
    reader.readAsText(file);
  }

  public userSaveJson(value?: ISavedData): void {
    if (!value) {
      value = {
        storiesDB: this.storiesDBBS.value,
        chaptersDB: this.chaptersDBBS.value,
      };
    }
    const blob = new Blob([JSON.stringify(value)], {type: 'application/json'});
    saveAs(blob, this.jsonFileName);
  }

  public saveInDB(): Observable<void> {
    return forkJoin(
      this.browserStorageService.setItemDB(StorageKeys.Stories, this.storiesDBBS.value),
      this.browserStorageService.setItemDB(StorageKeys.Chapters, this.chaptersDBBS.value),
    )
      .pipe(
        map(() => undefined),
      );
  }

  public restoreFromDB(): Observable<void>[] {
    // TODO:  types error on any of BehaviorSubject
    const entityMap: Map<StorageKeys, BehaviorSubject<any[]>> = new Map<StorageKeys, BehaviorSubject<any[]>>();
    entityMap.set(StorageKeys.Stories, this.storiesDBBS);
    entityMap.set(StorageKeys.Chapters, this.chaptersDBBS);

    const resultObservables: Observable<any>[] = [];
    for (const entityPair of entityMap) {
      const obs: Observable<void> = this.browserStorageService.getItemDB<EntityTypes[]>(entityPair[0])
        .pipe(
          tap((value: EntityTypes[] | null) => {
            entityPair[1].next(value || []);
            if (!value) {
              console.warn('No data in storage: ', entityPair[0]);
            }
          }),
          map(() => undefined),
          catchError((error, caught) => {
            console.error('Error from storage DB', error);
            return caught;
          }),
        );
      resultObservables.push(obs);
    }
    return resultObservables;
  }

  private initStorageSaver(): void {
    merge(
      this.storiesDB,
      this.chaptersDB,
    )
      .pipe(
        skipUntil(this.restored),
      )
      .subscribe((value) => {
        this.saveInDB()
          .subscribe();
      });
  }
}
