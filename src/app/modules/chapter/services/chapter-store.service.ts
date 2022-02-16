import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  Select,
  Store,
} from '@ngxs/store';
import {
  filter,
  merge,
  Observable,
  skip,
  switchMapTo,
  tap,
} from 'rxjs';
import {StorageKeys} from '../../../shared/enums/storage-keys';
import {IChapter} from '../../../shared/models/chapter/chapter.interface';
import {ILink} from '../../../shared/models/links/links.interface';
import {IndexDBActions} from '../../../store/database/states/indexdb/indexdb-storage.actions';
import {IndexDBState} from '../../../store/database/states/indexdb/indexdb-storage.state';
import {ChaptersActions} from '../../../store/models/chapters/chapters.actions';
import {ChaptersState} from '../../../store/models/chapters/chapters.state';
import {LinksActions} from '../../../store/models/links/links.actions';
import {LinksState} from '../../../store/models/links/links.state';

@Injectable()
export class ChapterStoreService {

  @Select(ChaptersState.chapters)
  public chapters!: Observable<IChapter[]>;

  @Select(LinksState.links)
  public links!: Observable<ILink[]>;

  @Select(IndexDBState.isInited)
  public isIndexDBInited!: Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private store: Store,
  ) {
  }

  public getChapter(chapterId: IChapter['id']): IChapter | undefined {
    return this.store.selectSnapshot(ChaptersState.getChapter(chapterId));
  }

  public linksToByChapterId$(chapterId: IChapter['id']): Observable<ILink[]> {
    return this.store.select(LinksState.linksToByChapterId(chapterId));
  }

  public linksFromByChapterId$(chapterId: IChapter['id']): Observable<ILink[]> {
    return this.store.select(LinksState.linksFromByChapterId(chapterId));
  }

  public linksToByChapterId(chapterId: IChapter['id']): ILink[] {
    return this.store.selectSnapshot(LinksState.linksToByChapterId(chapterId));
  }

  public linksFromByChapterId(chapterId: IChapter['id']): ILink[] {
    return this.store.selectSnapshot(LinksState.linksFromByChapterId(chapterId));
  }

  public linksByChapterId(chapterId: IChapter['id']): ILink[] {
    return this.store.selectSnapshot(LinksState.linksByChapterId(chapterId));
  }

  public getChaptersByLinkId(link: ILink): IChapter[] {
    return this.store.selectSnapshot(ChaptersState.getChaptersByLink(link.id));
  }

  public getLinkByChapters(
    chapterIdFrom: IChapter['id'],
    chapterIdTo: IChapter['id'],
  ): ILink | undefined {
    return this.store.selectSnapshot(LinksState.getLinkByChapters(chapterIdFrom, chapterIdTo));
  }

  public findChaptersByTitle(
    titleString: string,
    addFilterFn?: (chapter: IChapter) => boolean,
    max?: number,
  ): Observable<IChapter[]> {
    return this.store.select(ChaptersState.findChaptersByTitle(titleString, addFilterFn, max));
  }

  public createChapter(
    chapter: Omit<IChapter, 'id'> = {
      title: this.translateService.instant('CHAPTER_PAGE.CHAPTER'),
      mainTxt: '',
      relationsIds: [],
    },
  ): Observable<void> {
    return this.store.dispatch(new ChaptersActions.Create(chapter));
  }

  public deleteChapter(id: IChapter['id']): Observable<void> {
    return this.store.dispatch(new ChaptersActions.Delete(id));
  }

  public updateChapter(chapter: IChapter): Observable<void> {
    return this.store.dispatch(new ChaptersActions.Update(chapter));
  }

  public deleteLink(linkId: ILink['id']): Observable<void> {
    return this.store.dispatch(new LinksActions.Delete(linkId));
  }

  public addLink(chapterFromId: IChapter['id'], chapterToId: IChapter['id']): Observable<void> {
    return this.store.dispatch(new LinksActions.Create({to: chapterToId, from: chapterFromId}));
  }

  public initStorageSaver(): void {
    const entities: Observable<any>[] = [
      this.chapters.pipe(
        skip(1),
        tap((chapters) => this.store.dispatch(new IndexDBActions.SetItem(StorageKeys.Chapters, chapters))),
      ),
      this.links.pipe(
        skip(1),
        tap((links: ILink[]) => this.store.dispatch(new IndexDBActions.SetItem(StorageKeys.Links, links))),
      ),
    ];

    this.isIndexDBInited
      .pipe(
        filter((v: boolean) => v),
        switchMapTo(merge(...entities)),
      )
      .subscribe();
  }

}
