import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import {Observable} from 'rxjs';
import {LocalStorageKeys} from '../../../shared/enums/storage-keys';
import {undefined$} from '../../../shared/functions/void-observable';
import {IChapter} from '../../../shared/models/chapter/chapter.interface';
import {BasicCrud} from '../../shared/basic/basic-crud';
import {BasicModelStateInterface} from '../../shared/basic/basic-model-state.interface';
import {LocalStorageStateModel} from '../../database/states/local-storage/local-storage.state';
import {ChaptersActions} from './chapters.actions';

export interface ChaptersStateModel extends BasicModelStateInterface<IChapter> {
}

const getDefaults: () => ChaptersStateModel = () => {
  return {
    entities: [],
  };
};

@State<ChaptersStateModel>({
  name: 'chapters',
  defaults: getDefaults(),
})
export class ChaptersState extends BasicCrud {
  @Selector()
  public static readChapters(state: ChaptersStateModel): IChapter[] {
    return state.entities;
  }

  static chapter(id: IChapter['id']): (state: ChaptersStateModel) => (IChapter | undefined) {
    return createSelector([ChaptersState], (state: ChaptersStateModel) => {
      return state.entities.find(((value: IChapter) => value.id === id));
    });
  }

  @Action(ChaptersActions.Create)
  public createChapter(context: StateContext<ChaptersStateModel>, payload: ChaptersActions.Create): Observable<void> {
    return super.create<IChapter>(payload.chapter, context);
  }

  @Action(ChaptersActions.Update)
  public updateChapter(context: StateContext<ChaptersStateModel>, payload: ChaptersActions.Update): Observable<void> {
    return super.uprade(payload.chapter, context, () => context.dispatch(new ChaptersActions.Create(payload.chapter)));
  }

  @Action(ChaptersActions.Delete)
  public deleteChapter(context: StateContext<ChaptersStateModel>, payload: ChaptersActions.Delete): Observable<void> {
    return super.delete(payload.chapterId, context);
  }

  @Action(ChaptersActions.Load)
  public load(context: StateContext<ChaptersStateModel>, payload: ChaptersActions.Load): Observable<void> {
    context.setState({entities: payload.chapters});
    return undefined$();
  }
}
