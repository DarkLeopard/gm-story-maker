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

@Injectable()
export class ChapterStoreService {

  private chaptersDBBS: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([]);
  public chaptersDB: Observable<IChapter[]> = this.chaptersDBBS.asObservable();

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

  public createChapter(story: Omit<IChapter, 'id'> = {title: 'No name story', mainTxt: '', relationsIds: []}): void {
    const currentStories: IChapter[] = this.chaptersDBBS.value;
    this.chaptersDBBS.next([
      ...currentStories,
      {
        ...story,
        id: this.findNewIdNumber(currentStories.map((story: IChapter) => story.id)),
      },
    ]
      .sort((a: IChapter, b: IChapter) => a.id - b.id));
  }

  public deleteChapter(id: IChapter['id']): void {
    this.chaptersDBBS.next([
      ...this.chaptersDBBS.value
        .filter((story: IChapter) => story.id !== id),
    ]);
  }

  public readChapter(id: IChapter['id']): IChapter | undefined {
    return this.chaptersDBBS.value.find(((value: IChapter) => value.id === id));
  }

  public updateChapter(story: IChapter): void {
    return this.chaptersDBBS.next([
      ...this.chaptersDBBS.value
        .reduce((acc: IChapter[], currentValue: IChapter) => {
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
      this.chaptersDBBS.next(file.storiesDB);
    };
    reader.readAsText(file);
  }

  public deleteLinkFromChapter(chapterId1: IChapter['id'], chapterId2: IChapter['id']): void {
    const chapter1: IChapter | undefined = this.readChapter(chapterId1);
    const chapter2: IChapter | undefined = this.readChapter(chapterId2);

    if (chapter1 && chapter2) {
      const chapter1Relations = chapter1.relationsIds || [];
      const chapter2Relations = chapter2.relationsIds || [];

      chapter1.relationsIds = chapter1Relations.filter((chapterRelation1: number) => chapterRelation1 !== chapterId2);
      chapter2.relationsIds = chapter2Relations.filter((chapterRelation2: number) => chapterRelation2 !== chapterId1);

      this.updateChapter(chapter1);
      this.updateChapter(chapter2);
    } else {
      console.error('No chapter to delete link.', chapter1, chapter2);
    }
  }

  public addLinkToChapter(chapterId1: IChapter['id'], chapterId2: IChapter['id']): void {
    const chapter1: IChapter | undefined = this.readChapter(chapterId1);
    const chapter2: IChapter | undefined = this.readChapter(chapterId2);
    if (chapter1 && chapter2) {
      const chapter1Relations = chapter1.relationsIds || [];
      const chapter2Relations = chapter2.relationsIds || [];

      if (!chapter1Relations.some((chapterId: number) => chapterId === chapterId2)) {
        chapter1Relations.push(chapterId2);
        chapter1Relations.sort((a: number, b: number) => b - a);
        chapter1.relationsIds = chapter1Relations;
      } else {
        console.warn('DEV_ERROR: Chapter 1 link error.');
      }

      if (!chapter2Relations.some((chapterId: number) => chapterId === chapterId1)) {
        chapter2Relations.push(chapterId1);
        chapter2Relations.sort((a, b) => b - a);
        chapter2.relationsIds = chapter2Relations;
      } else {
        console.warn('DEV_ERROR: Chapter 2 link error.');
      }

      this.updateChapter(chapter1);
      this.updateChapter(chapter2);
    } else {
      console.error('No chapter to link.', chapter1, chapter2);
    }
  }

  public userSaveJson(value?: ISavedData): void {
    if (!value) {
      value = {
        storiesDB: this.chaptersDBBS.value,
      };
    }
    const blob = new Blob([JSON.stringify(value)], {type: 'application/json'});
    saveAs(blob, this.jsonFileName);
  }

  public saveInDB(): Observable<void> {
    return forkJoin(
      this.browserStorageService.setItemDB(StorageKeys.Chapters, this.chaptersDBBS.value),
    )
      .pipe(
        map(() => undefined),
      );
  }

  public restoreFromDB(): Observable<void> {
    return this.browserStorageService.getItemDB<IChapter[]>(StorageKeys.Chapters)
      .pipe(
        tap((value: IChapter[] | null) => {
          this.chaptersDBBS.next(value || []);
          if (!value) {
            console.warn('No data in storage: ', StorageKeys.Chapters);
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
      this.chaptersDB,
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
