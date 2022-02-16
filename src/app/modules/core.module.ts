import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store} from '@ngxs/store';
import {
  forkJoin,
  Observable,
} from 'rxjs';
import {WINDOW_PROVIDER} from '../shared/providers/window-provider';
import {IndexDBActions} from '../store/database/states/indexdb/indexdb-storage.actions';
import {NgxsStoreModule} from '../store/store.module';
import {ChapterStoreService} from './chapter/services/chapter-store.service';
import {ProjectTranslateModule} from './project-translate/project-translate.module';

function appInit(storyStoreService: ChapterStoreService, store: Store): () => Observable<unknown> | Promise<unknown> {
  return () => forkJoin(store.dispatch(new IndexDBActions.Restore()));
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsStoreModule,
    ProjectTranslateModule
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        WINDOW_PROVIDER,
        ChapterStoreService,
        {
          provide: APP_INITIALIZER,
          useFactory: appInit,
          deps: [ChapterStoreService, Store],
          multi: true,
        },
      ],
    };
  }
}
