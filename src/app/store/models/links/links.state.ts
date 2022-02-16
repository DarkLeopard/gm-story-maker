import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import {
  Observable,
  switchMap,
  switchMapTo,
  throwError,
} from 'rxjs';
import {ILink} from 'src/app/shared/models/links/links.interface';
import {IChapter} from '../../../shared/models/chapter/chapter.interface';
import {BasicCrud} from '../../shared/basic/basic-crud';
import {BasicModelStateInterface} from '../../shared/basic/basic-model-state.interface';
import {ChaptersActions} from '../chapters/chapters.actions';
import {ModelsNamesEnum} from '../models-names';
import {LinksActions} from './links.actions';

export interface LinksStateModel extends BasicModelStateInterface<ILink> {
}

const getDefaults: () => LinksStateModel = () => {
  return {
    entities: [],
  };
};

@State<LinksStateModel>({
  name: ModelsNamesEnum.Links,
  defaults: getDefaults(),
})
@Injectable()
export class LinksState extends BasicCrud {
  @Selector()
  public static links(state: LinksStateModel): ILink[] {
    return state.entities;
  }

  static linksToByChapterId(chapterId: IChapter['id']): (state: LinksStateModel) => ILink[] {
    return createSelector([LinksState], (state: LinksStateModel) => {
      return state.entities.filter((link: ILink) => link.to === chapterId);
    });
  }

  static linksFromByChapterId(chapterId: IChapter['id']): (state: LinksStateModel) => ILink[] {
    return createSelector([LinksState], (state: LinksStateModel) => {
      return state.entities.filter((link: ILink) => link.from === chapterId);
    });
  }

  static getLinkByChapters(
    chapterIdFrom: IChapter['id'],
    chapterIdTo: IChapter['id'],
  ): (state: LinksStateModel) => ILink | undefined {
    return createSelector([LinksState], (state: LinksStateModel) => {
      return state.entities
        .find((link: ILink) => link.to === chapterIdTo && link.from === chapterIdFrom);
    });
  }

  @Action(LinksActions.Create)
  public createLink(context: StateContext<LinksStateModel>, {entity}: LinksActions.Create): Observable<void> {
    return super.create<ILink>(entity, context)
      .pipe(switchMap((link: ILink) => context.dispatch(new ChaptersActions.AddRelation(link))));
  }

  @Action(LinksActions.Update)
  public updateLink(context: StateContext<LinksStateModel>, {entity}: LinksActions.Update): Observable<void> {
    return super.uprade(entity, context, () => context.dispatch(new LinksActions.Create(entity)));
  }

  @Action(LinksActions.Delete)
  public deleteLink(context: StateContext<LinksStateModel>, {entityId}: LinksActions.Delete): Observable<void> {
    const link: ILink | undefined = [...context.getState().entities].find((value => value.id === entityId));
    if (!link) return throwError(new Error(`DEV_ERROR: No link with id ${entityId}`));

    return super.delete(entityId, context)
      .pipe(switchMapTo(context.dispatch(new ChaptersActions.DeleteRelation(link))));
  }

  @Action(LinksActions.Load)
  public loadLinks(context: StateContext<LinksStateModel>, {entities}: LinksActions.Load): Observable<void> {
    return super.load(entities, context);
  }
}
