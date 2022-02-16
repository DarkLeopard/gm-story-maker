import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  map,
  merge,
  Observable,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {ID_PARAM} from '../../../../shared/constants/common-routing.constants';
import {IChapter} from '../../../../shared/models/chapter/chapter.interface';
import {ILink} from '../../../../shared/models/links/links.interface';
import {Unsubscriber} from '../../../../shared/services/unsubscriber.service';
import {ChapterRoutingConstants} from '../../chapter-routing.constants';
import {ChapterStoreService} from '../../services/chapter-store.service';

enum FormFields {
  Id = 'id',
  Title = 'title',
  Relations = 'relations',
  RelationsIds = 'relationsIds',
  MainTxt = 'mainTxt',
}

enum DisplayedColumnsKeysEnum {
  Id = 'id',
  Title = 'title',
  Actions = 'actions',
}

@Component({
  selector: 'app-story',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
  providers: [Unsubscriber],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit {

  public chapterId: number = Number(this.activatedRoute.snapshot.paramMap.get(ID_PARAM)); // undefined check in router module
  public chapter: FormGroup = this.createChapterFG();
  public formFields: typeof FormFields = FormFields;
  public displayedColumns: string[] = this.getDisptayedColumns();
  public columnsKeysEnum: typeof DisplayedColumnsKeysEnum = DisplayedColumnsKeysEnum;
  public selectRelation: FormControl = new FormControl(undefined);
  public chapterLinksTo$: Observable<ILink[]> = this.chapterStoreService.linksToByChapterId$(this.chapterId);
  public chapterLinksFrom$: Observable<ILink[]> = this.chapterStoreService.linksFromByChapterId$(this.chapterId);
  public relationsToDataSource$: Observable<IChapter[]> = this.chapterLinksTo$.pipe(map(this.getChaptersByLink.bind(this)));
  public relationsFromDataSource$: Observable<IChapter[]> = this.chapterLinksFrom$.pipe(map(this.getChaptersByLink.bind(this)));
  private releationSelectOptionsBS: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([]);
  public releationSelectOptions$: Observable<IChapter[]> = this.releationSelectOptionsBS.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chapterStoreService: ChapterStoreService,
    private unsubscriber: Unsubscriber,
  ) { }

  public ngOnInit() {
    const loadedChapter: IChapter | undefined = this.chapterStoreService.getChapter(this.chapterId);
    if (!loadedChapter) {
      this.router.navigateByUrl(ChapterRoutingConstants.getFullLink(ChapterRoutingConstants.List));
    } else {
      this.chapter.setValue({
        [FormFields.Id]: loadedChapter.id,
        [FormFields.Title]: loadedChapter.title,
        [FormFields.RelationsIds]: loadedChapter.relationsIds,
        [FormFields.MainTxt]: loadedChapter.mainTxt,
      });
      this.initRelationsObserver();
      this.fieldsAutosaver();
    }
  }

  public goToChapter(chapterId: IChapter['id']): void {
    this.chapterId = chapterId; // TODO check why for
    this.router.navigate([ChapterRoutingConstants.getChapterLink(chapterId)])
      .then(() => this.reloadComponent());
  }

  public createLink(id: IChapter['id']): void {
    this.chapterStoreService.addLink(this.chapterId, id)
      .subscribe(() => this.reloadComponent());

  }

  public deleteLinkFrom(chapterFrom: IChapter): void {
    const link: ILink | undefined = this.chapterStoreService.getLinkByChapters(this.chapterId, chapterFrom.id);
    if (link) {
      this.chapterStoreService.deleteLink(link.id)
        .subscribe(() => this.reloadComponent());
    } else {
      console.error(`DEV_ERROR: Cant find Link with parameters: to = ${chapterFrom}, from = ${this.chapterId}`);
    }
  }

  public deleteLinkTo(chapterTo: IChapter): void {
    const link: ILink | undefined = this.chapterStoreService.getLinkByChapters(chapterTo.id, this.chapterId);
    if (link) {
      this.chapterStoreService.deleteLink(link.id)
        .subscribe(() => this.reloadComponent());
    } else {
      console.error(`DEV_ERROR: Cant find Link with parameters: to = ${chapterTo.id}, from = ${this.chapterId}`);
    }
  }

  public save(): void {
    this.chapterStoreService.updateChapter(this.chapter.getRawValue()).subscribe();
  }

  public hasRelations(chapters: IChapter[] | null): boolean {
    return !!chapters && chapters.length > 0;
  }

  private getDisptayedColumns(): DisplayedColumnsKeysEnum[] {
    return [
      DisplayedColumnsKeysEnum.Id,
      DisplayedColumnsKeysEnum.Title,
      DisplayedColumnsKeysEnum.Actions,
    ];
  }

  private createChapterFG(): FormGroup {
    return new FormGroup({
      [FormFields.Id]: new FormControl(undefined),
      [FormFields.Title]: new FormControl(undefined),
      [FormFields.RelationsIds]: new FormControl([]),
      [FormFields.MainTxt]: new FormControl(undefined),
    });
  }

  private getChaptersByLink(links: ILink[]): IChapter[] {
    return links
      .reduce((acc: IChapter[], link: ILink) => [...acc, ...this.chapterStoreService.getChaptersByLinkId(link)], [])
      .filter((chapter) => chapter.id !== this.chapterId);
  }

  private fieldsAutosaver(): void {
    merge(
      this.chapter.get(FormFields.Title)?.valueChanges || of(),
      this.chapter.get(FormFields.MainTxt)?.valueChanges || of(),
    )
      .pipe(
        debounceTime(1000),
        takeUntil(this.unsubscriber.destroy$),
      )
      .subscribe(() => {
        this.save();
      });
  }

  private reloadComponent(): void {
    this.router.navigateByUrl(ChapterRoutingConstants.getFullLink(ChapterRoutingConstants.List), {skipLocationChange: true})
      .then(() => {
        this.router.navigateByUrl(ChapterRoutingConstants.getChapterLink(this.chapterId));
      });
  }

  private initRelationsObserver(): void {
    this.selectRelation.valueChanges
      .pipe(
        switchMap((titleString: string) => {
          return this.chapterStoreService.findChaptersByTitle(titleString, this.filterSearchedChaptersFrom.bind(this), 10);
        }),
        takeUntil(this.unsubscriber.destroy$),
      )
      .subscribe((chapters: IChapter[]) => {
        this.releationSelectOptionsBS.next(chapters);
      });
  }

  private filterSearchedChaptersFrom(chapter: IChapter): boolean {
    const isChapterEqualThisChapter: boolean = chapter.id === this.chapterId;
    const currentLinks: ILink[] = this.chapterStoreService.linksFromByChapterId(this.chapterId);
    const isLinksAlreadyAdded: boolean = currentLinks.some((link: ILink) => link.to === chapter.id);
    return !(isChapterEqualThisChapter || isLinksAlreadyAdded);
  }
}
