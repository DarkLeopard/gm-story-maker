import {Injectable} from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import {saveAs} from 'file-saver';
import {Observable} from 'rxjs';
import {undefined$} from '../../../../shared/functions/void-observable';
import {EntitiesStateModule} from '../../../../store/models';
import {ChaptersActions} from '../../../../store/models/chapters/chapters.actions';
import {LinksActions} from '../../../../store/models/links/links.actions';
import {
  IModelsStorage,
  ModelsNamesEnum,
} from '../../../../store/models/models-names';
import {JsonSaverActions} from './json-saver.actions';

export interface JsonSaverStateModel extends IModelsStorage {
}

export const JSON_SAVER_STATE_NAME: string = 'jsonSaver';

@State<JsonSaverStateModel>({
  name: JSON_SAVER_STATE_NAME,
  defaults: {
    [ModelsNamesEnum.Chapters]: {entities: []},
    [ModelsNamesEnum.Links]: {entities: []},
  },
})
@Injectable()
export class JsonSaverState {

  private jsonFileName: string = 'gm-stories-db.json';

  constructor(
    private store: Store,
  ) {}

  @Selector()
  public static getState(state: JsonSaverStateModel) {
    return state;
  }

  @Action(JsonSaverActions.Save)
  public save(): Observable<void> {
    const modelsStates: IModelsStorage = this.store.selectSnapshot(EntitiesStateModule);
    const blob = new Blob([JSON.stringify(modelsStates)], {type: 'application/json'});
    saveAs(blob, this.jsonFileName);
    return undefined$();
  }

  @Action(JsonSaverActions.Load)
  public load(context: StateContext<JsonSaverStateModel>, {file}: JsonSaverActions.Load): Observable<void> {
    const reader: FileReader = new FileReader();
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      const newModel: IModelsStorage = JSON.parse(event.target?.result as string);
      context.dispatch(new ChaptersActions.Load(newModel[ModelsNamesEnum.Chapters].entities));
      context.dispatch(new LinksActions.Load(newModel[ModelsNamesEnum.Links].entities));
    };
    reader.readAsText(file);
    return undefined$();
  }

}
