import {
  Selector,
  State,
} from '@ngxs/store';

export interface LocalStorageStateModel {

}

const getDefaults: () => LocalStorageStateModel = () => {
  return {};
};

@State<LocalStorageStateModel>({
  name: 'localStorage',
  defaults: getDefaults(),
})
export class LocalStorageState {
  @Selector()
  public static getState(state: LocalStorageStateModel): LocalStorageStateModel {
    return LocalStorageState.getInstanceState(state);
  }

  private static setInstanceState(state: LocalStorageStateModel): LocalStorageStateModel {
    return {...state};
  }

  private static getInstanceState(state: LocalStorageStateModel): LocalStorageStateModel {
    return {...state};
  }
}
