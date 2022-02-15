import {
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
import {Store} from '@ngxs/store';
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
import {Unsubscriber} from '../../../../shared/services/unsubscriber.service';
import {ChaptersState} from '../../../../store/models/chapters/chapters.state';
import {ChapterRoutingConstants} from '../../chapter-routing.constants';
import {IChapter} from '../../../../shared/models/chapter/chapter.interface';
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
})
export class ChapterComponent implements OnInit {

  public chapterId: number = Number(this.activatedRoute.snapshot.paramMap.get(ID_PARAM)); // undefined check in router module
  public chapter: FormGroup = new FormGroup({
    [FormFields.Id]: new FormControl(undefined),
    [FormFields.Title]: new FormControl(undefined),
    [FormFields.RelationsIds]: new FormControl([]),
    [FormFields.MainTxt]: new FormControl(undefined),
  });
  public formFields: typeof FormFields = FormFields;
  public displayedColumns: string[] = [
    DisplayedColumnsKeysEnum.Id,
    DisplayedColumnsKeysEnum.Title,
    DisplayedColumnsKeysEnum.Actions,
  ];
  public columnsKeysEnum: typeof DisplayedColumnsKeysEnum = DisplayedColumnsKeysEnum;
  public selectRelation: FormControl = new FormControl(undefined);

  public releationSelectOptions: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([]);
  private relationsDataSourceBS: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([]);
  public relationsDataSource$: Observable<IChapter[]> = this.relationsDataSourceBS.asObservable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chapterStoreService: ChapterStoreService,
    private unsubscriber: Unsubscriber,
    private store: Store,
  ) { }

  public ngOnInit() {
    const loadedChapter: IChapter | undefined = this.store.selectSnapshot(ChaptersState.chapter(this.chapterId));
    if (!loadedChapter) {
      this.router.navigateByUrl(ChapterRoutingConstants.getFullLink(ChapterRoutingConstants.List));
    } else {
      const relationsIds: IChapter['relationsIds'] = loadedChapter.relationsIds;
      const relations: IChapter[] = this.readRelations(relationsIds);
      this.chapter.setValue({
        [FormFields.Id]: loadedChapter.id,
        [FormFields.Title]: loadedChapter.title,
        [FormFields.RelationsIds]: loadedChapter.relationsIds,
        [FormFields.MainTxt]: loadedChapter.mainTxt,
      });

      this.relationsDataSourceBS.next(relations);
      this.initRelationsObserver();
      this.fieldsAutosaver();
    }
  }

  public goToChapter(id: IChapter['id']): void {
    this.chapterId = id;
    this.router.navigate([ChapterRoutingConstants.getChapterLink(id)])
      .then(() => this.reloadComponent());
  }

  public createLink(id: IChapter['id']): void {
    this.chapterStoreService.addLinkToChapter(this.chapter.get(FormFields.Id)?.value, id);
    this.reloadComponent();
  }

  public deleteLink(id: IChapter['id']): void {
    this.chapterStoreService.deleteLinkFromChapter(this.chapterId, id);
    this.reloadComponent();
  }

  public save(): void {
    this.chapterStoreService.updateChapter(this.chapter.getRawValue()).subscribe();
  }

  public hasRelations(chapters: IChapter[] | null): boolean {
    return !!chapters && chapters.length > 0;
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
        switchMap((value: string) => {
          return this.chapterStoreService.chapters
            .pipe(
              map((chaptersDB: IChapter[]) => {
                return chaptersDB
                  .filter((chapterDB: IChapter) => {
                    if (
                      chapterDB.id === this.chapterId
                      || (this.chapter.get(FormFields.RelationsIds)?.value as number[])
                        ?.some((alreadyId: number) => alreadyId === chapterDB.id)
                    ) {
                      return false;
                    }
                    return chapterDB.title.match(value);
                  });
              }),
              tap((filtredChapters: IChapter[]) => {
                this.releationSelectOptions.next(filtredChapters.slice(0, 4));
              }),
            );
        }),
        takeUntil(this.unsubscriber.destroy$),
      )
      .subscribe();
  }

  private readRelations(relationsIds: IChapter['relationsIds']): IChapter[] {
    const result: IChapter[] = [];
    relationsIds?.forEach((chapterId: number) => {
      const readedChapter: IChapter | undefined = this.store.selectSnapshot(ChaptersState.chapter(chapterId));
      if (readedChapter) {
        result.push(readedChapter);
      }
    });
    return result;
  }
}
