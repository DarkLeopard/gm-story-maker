import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {JsonSaverStorageService} from './json-saver-storage.service';

@Injectable()
export class JsonLoaderService {
  constructor(
    private store: Store,
    private jsonSaverStorageService: JsonSaverStorageService,
  ) { }

  public save(): void {
    this.jsonSaverStorageService.save();
  }

  public load(file: File): void {
    this.jsonSaverStorageService.load(file);
  }
}
