import { Injectable } from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {JsonSaverActions} from '../store/json-saver/json-saver.actions';

@Injectable()
export class JsonSaverStorageService {

  constructor(
    private store: Store,
  ) { }

  public save(): Observable<void> {
    return this.store.dispatch(new JsonSaverActions.Save());
  }

  public load(file: File): Observable<void> {
    return this.store.dispatch(new JsonSaverActions.Load(file));
  }
}
