import {
  Selector,
  State,
} from '@ngxs/store';

export interface IndexDBStateModel {

}

const getDefaults: () => IndexDBStateModel = () => {
  return {};
};

@State<IndexDBStateModel>({
  name: 'indexDB',
  defaults: getDefaults(),
})
export class IndexDBState {
  @Selector()
  public static getState(state: IndexDBStateModel): IndexDBStateModel {
    return IndexDBState.getInstanceState(state);
  }

  private static setInstanceState(state: IndexDBStateModel): IndexDBStateModel {
    return {...state};
  }

  private static getInstanceState(state: IndexDBStateModel): IndexDBStateModel {
    return {...state};
  }
}
