import {Injectable} from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import {
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {deepCopy} from '../../../shared/functions/deep-copy';
import {undefined$} from '../../../shared/functions/void-observable';
import {IBasicModel} from '../../../shared/models/basic/basic-model.interface';
import {IChapter} from '../../../shared/models/chapter/chapter.interface';
import {ILink} from '../../../shared/models/links/links.interface';
import {BasicCrud} from '../../shared/basic/basic-crud';
import {BasicModelStateInterface} from '../../shared/basic/basic-model-state.interface';
import {LinksActions} from '../links/links.actions';
import {ModelsNamesEnum} from '../models-names';
import {ChaptersActions} from './chapters.actions';

export interface ChaptersStateModel extends BasicModelStateInterface<IChapter> {
}

const getDefaults: () => ChaptersStateModel = () => {
  return {
    entities: [],
  };
};

@State<ChaptersStateModel>({
  name: ModelsNamesEnum.Chapters,
  defaults: getDefaults(),
})
@Injectable()
export class ChaptersState extends BasicCrud {
  @Selector()
  public static chapters(state: ChaptersStateModel): IChapter[] {
    return state.entities;
  }

  static getChapter(chapterId: IChapter['id']): (state: ChaptersStateModel) => (IChapter | undefined) {
    return createSelector([ChaptersState], (state: ChaptersStateModel) => {
      return state.entities.find((chapter: IChapter) => chapter.id === chapterId);
    });
  }

  static getChaptersByLink(linkId: ILink['id']): (state: ChaptersStateModel) => IChapter[] {
    return createSelector([ChaptersState], (state: ChaptersStateModel) => {
      return state.entities.filter((chapter: IChapter) => {
        return chapter.relationsIds.some((relationId: number) => relationId === linkId);
      });
    });
  }

  static findChaptersByTitle(
    searchString: string,
    addFilterFn?: (chapter: IChapter) => boolean,
    max: number = 10,
  ): (state: ChaptersStateModel) => IChapter[] {
    return createSelector([ChaptersState], (state: ChaptersStateModel) => {
      return state.entities
        .filter((chapter: IChapter) => chapter.title.match(searchString))
        .filter(addFilterFn || (() => true))
        .slice(0, max - 1);
    });
  }

  constructor(
    private store: Store,
  ) {super();}

  @Action(ChaptersActions.Create)
  public createChapter(context: StateContext<ChaptersStateModel>, {entity}: ChaptersActions.Create): Observable<IChapter> {
    return super.create<IChapter>(entity, context);
  }

  @Action(ChaptersActions.Update)
  public updateChapter(context: StateContext<ChaptersStateModel>, {entity}: ChaptersActions.Update): Observable<void> {
    return super.uprade(entity, context, () => context.dispatch(new ChaptersActions.Create(entity)));
  }

  @Action(ChaptersActions.Delete)
  public deleteChapter(context: StateContext<ChaptersStateModel>, {entityId}: ChaptersActions.Delete): Observable<void> {
    const chapter: IChapter | undefined = this.store.selectSnapshot(ChaptersState.getChapter(entityId));
    if (!!chapter) {
      return super.delete(entityId, context)
        .pipe(
          tap(() => {
            chapter.relationsIds
              .forEach((relationId: number) => context.dispatch(new LinksActions.Delete(relationId)))
          })
        );
    } else {
      return throwError(new Error(`DEV_ERROR: Cant find entity to delete with id ${entityId}`));
    }
  }

  @Action(ChaptersActions.Load)
  public loadChapters(context: StateContext<ChaptersStateModel>, {entities}: ChaptersActions.Load): Observable<void> {
    return super.load(entities, context);
  }

  @Action(ChaptersActions.AddRelation)
  public addRelation(context: StateContext<ChaptersStateModel>, {link}: ChaptersActions.AddRelation): Observable<void> {
    const chapters: IChapter[] = deepCopy(context.getState().entities);
    const chapterTo: IChapter | undefined = chapters.find((entity: IBasicModel) => entity.id === link.to);
    const chapterFrom: IChapter | undefined = chapters.find((entity: IBasicModel) => entity.id === link.from);

    const cantFindChapterErrorTxt: string = 'DEV_ERROR: Cant find chapter with id';
    if (!chapterTo) return throwError(new Error(`${cantFindChapterErrorTxt} ${link.to}`));
    if (!chapterFrom) return throwError(new Error(`${cantFindChapterErrorTxt} ${link.from}`));

    const relationAlreadyExistsErrorText: (
      chapterId: IChapter['id'], linkId: ILink['id'],
    ) => string = (chapterId: IChapter['id'], linkId: ILink['id']) => {
      return `DEV_ERROR: Relation already exists: chapter with id ${chapterId} has relation to link with id ${linkId}`;
    };
    if (chapterTo && chapterTo.relationsIds.some((relationId: number) => relationId === link.id)) {
      return throwError(new Error(relationAlreadyExistsErrorText(chapterTo.id, link.id)));
    }
    if (chapterFrom && chapterFrom.relationsIds.some((relationId: number) => relationId === link.id)) {
      return throwError(new Error(relationAlreadyExistsErrorText(chapterFrom.id, link.id)));
    }

    chapterTo.relationsIds.push(link.id);
    chapterFrom.relationsIds.push(link.id);

    context.patchState({entities: chapters});
    return undefined$();
  }

  @Action(ChaptersActions.DeleteRelation)
  public deleteRelation(
    context: StateContext<ChaptersStateModel>,
    {link, canBeEmpty}: ChaptersActions.DeleteRelation,
  ): Observable<void> {
    const chapters: IChapter[] = deepCopy(context.getState().entities);

    const chapterFrom: IChapter | undefined = chapters.find((chapter: IChapter) => chapter.id === link.from);
    const chapterTo: IChapter | undefined = chapters.find((chapter: IChapter) => chapter.id === link.to);

    const cantFindChapterErrorTxt: string = 'DEV_ERROR: Cant find chapter with id';
    if (!chapterFrom && !canBeEmpty) return throwError(new Error(`${cantFindChapterErrorTxt} ${link.from}`));
    if (!chapterTo && !canBeEmpty) return throwError(new Error(`${cantFindChapterErrorTxt} ${link.to}`));

    const relationNotExistsErrorText: (
      chapterId: IChapter['id'], linkId: ILink['id'],
    ) => string = (chapterId: IChapter['id'], linkId: ILink['id']) => {
      return `DEV_ERROR: Relation not exists: chapter with id ${chapterId} has not relation to link with id ${linkId}`;
    };
    if (chapterFrom && !chapterFrom.relationsIds.some((relationId: number) => relationId === link.id)) {
      return throwError(new Error(relationNotExistsErrorText(chapterFrom.id, link.id)));
    }
    if (chapterTo && !chapterTo.relationsIds.some((relationId: number) => relationId === link.id)) {
      return throwError(new Error(relationNotExistsErrorText(chapterTo.id, link.id)));
    }

    if (chapterFrom) {
      chapterFrom.relationsIds = chapterFrom.relationsIds.filter((relationId: ILink['id']) => relationId !== link.id);
    }
    if (chapterTo) {
      chapterTo.relationsIds = chapterTo.relationsIds.filter((relationId: ILink['id']) => relationId !== link.id);
    }

    context.patchState({entities: chapters});
    return undefined$();
  }
}
