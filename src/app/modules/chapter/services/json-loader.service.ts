import { Injectable } from '@angular/core';
import {Store} from '@ngxs/store';
import {saveAs} from 'file-saver';
import {ChaptersActions} from '../../../store/local-db/states/chapters/chapters.actions';
import {ChaptersState} from '../../../store/local-db/states/chapters/chapters.state';
import {ISavedData} from '../interfaces/json-save-data.interface';

@Injectable()
export class JsonLoaderService {
  private jsonFileName: string = 'gm-stories-db.json';


  constructor(
    private store: Store,
  ) { }

  public userSaveJson(value?: ISavedData): void {
    if (!value) {
      value = {
        storiesDB: this.store.selectSnapshot(ChaptersState.readChapters),
      };
    }
    const blob = new Blob([JSON.stringify(value)], {type: 'application/json'});
    saveAs(blob, this.jsonFileName);
  }

  public userLoadJson(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      const file: ISavedData = JSON.parse(event.target?.result as string);
      this.store.dispatch(new ChaptersActions.Load(file.storiesDB));
    };
    reader.readAsText(file);
  }
}
