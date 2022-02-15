import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  Select,
  Store,
} from '@ngxs/store';
import {
  filter,
  forkJoin,
  merge,
  Observable,
  switchMapTo,
} from 'rxjs';
import {StorageKeys} from '../../../shared/enums/storage-keys';
import {undefined$} from '../../../shared/functions/void-observable';
import {IChapter} from '../../../shared/models/chapter/chapter.interface';
import {IndexDBActions} from '../../../store/database/states/indexdb/indexdb-storage.actions';
import {IndexDBState} from '../../../store/database/states/indexdb/indexdb-storage.state';
import {ChaptersActions} from '../../../store/models/chapters/chapters.actions';
import {ChaptersState} from '../../../store/models/chapters/chapters.state';

@Injectable()
export class ChapterStoreService {

  @Select(ChaptersState.readChapters)
  public chapters!: Observable<IChapter[]>;

  @Select(IndexDBState.isInited)
  public isIndexDBInited!: Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private store: Store,
  ) {
  }

  public createChapter(story: Omit<IChapter, 'id'> = {title: '', mainTxt: '', relationsIds: []}): Observable<void> {
    return this.store.dispatch(new ChaptersActions.Create(story));
  }

  public deleteChapter(id: IChapter['id']): Observable<void> {
    return this.store.dispatch(new ChaptersActions.Delete(id));
  }

  public updateChapter(chapter: IChapter): Observable<void> {
    return this.store.dispatch(new ChaptersActions.Update(chapter));
  }

  public deleteLinkFromChapter(chapterId1: IChapter['id'], chapterId2: IChapter['id']): void {
    const chapter1: IChapter | undefined = this.store.selectSnapshot(ChaptersState.chapter(chapterId1));
    const chapter2: IChapter | undefined = this.store.selectSnapshot(ChaptersState.chapter(chapterId2));

    if (chapter1 && chapter2) {
      const chapter1Relations = chapter1.relationsIds || [];
      const chapter2Relations = chapter2.relationsIds || [];

      chapter1.relationsIds = chapter1Relations.filter((chapterRelation1: number) => chapterRelation1 !== chapterId2);
      chapter2.relationsIds = chapter2Relations.filter((chapterRelation2: number) => chapterRelation2 !== chapterId1);

      this.updateChapter(chapter1).subscribe();
      this.updateChapter(chapter2).subscribe();
    } else {
      console.error('No chapter to delete link.', chapter1, chapter2);
    }
  }

  public addLinkToChapter(chapterId1: IChapter['id'], chapterId2: IChapter['id']): void {
    const chapter1: IChapter | undefined = this.store.selectSnapshot(ChaptersState.chapter(chapterId1));
    const chapter2: IChapter | undefined = this.store.selectSnapshot(ChaptersState.chapter(chapterId2));
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

      this.updateChapter(chapter1).subscribe();
      this.updateChapter(chapter2).subscribe();
    } else {
      console.error('DEV_ERROR: No chapter to link.', chapter1, chapter2);
    }
  }

  public initStorageSaver(): void {
    const entities: Observable<any>[] = [
      this.chapters,
    ];
    this.isIndexDBInited
      .pipe(
        filter((v: boolean) => v),
        switchMapTo(merge(...entities)),
      )
      .subscribe(() => {
        this.saveInDB().subscribe();
      });
  }

  private saveInDB(): Observable<void> {
    const queries: Observable<void>[] = [
      this.store.dispatch(new IndexDBActions.SetItem(StorageKeys.Chapters, this.store.selectSnapshot(ChaptersState.readChapters))),
    ];
    return forkJoin(queries).pipe(switchMapTo(undefined$()));
  }
}
