import {
  Action,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import {Observable} from 'rxjs';
import {IChapter} from '../../../../app/modules/chapter/interfaces/chapter.interface';
import {IndexDBActions} from './index-db.actions';

export interface IndexDBStateModel {
  chapters: IChapter[];
}

const getDefaults: () => IndexDBStateModel = () => {
  return {
    chapters: [],
  };
};

@State<IndexDBStateModel>({
  name: 'indexDB',
  defaults: getDefaults(),
})
export class IndexDBState {
  @Selector()
  public static readChapters(state: IndexDBStateModel): IChapter[] {
    return IndexDBState.getInstanceState(state).chapters;
  }

  private static setInstanceState(state: IndexDBStateModel): IndexDBStateModel {
    return {...state};
  }

  private static getInstanceState(state: IndexDBStateModel): IndexDBStateModel {
    return {...state};
  }

  @Action(IndexDBActions.UpdateChapter)
  public updateChapters(context: StateContext<IndexDBStateModel>, {chapter}: IndexDBActions.UpdateChapter): Observable<void> {
    const chapters: IChapter[] = IndexDBState.getInstanceState()
  }

  @Action(IndexDBActions.UpdateChapters)
  public updateChapters(context: StateContext<IndexDBStateModel>, {chapters}: IndexDBActions.UpdateChapters): Observable<void> {
    IndexDBState.setInstanceState({chapters});
  }
}
