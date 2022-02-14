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
import {
  finalize,
  forkJoin,
  Observable,
  tap,
} from 'rxjs';
import {NgxsStoreModule} from '../../store/store.module';
import {WINDOW_PROVIDER} from '../shared/providers/window-provider';
import {BrowserStorageService} from '../shared/services/browser-storage.service';
import {ProjectTranslateModule} from './project-translate/project-translate.module';
import {ChapterStoreService} from './chapter/services/chapter-store.service';

function appInit(storyStoreService: ChapterStoreService): () => Observable<unknown> | Promise<unknown> {
  return () => forkJoin(storyStoreService.restoreFromDB())
    .pipe(
      tap(() => {
        console.log('app inited');
      }),
      finalize(() => {
        storyStoreService.appInitRestoreComlete();
      }),
    );
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProjectTranslateModule,
    NgxsStoreModule,
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
        BrowserStorageService,
        ChapterStoreService,
        {
          provide: APP_INITIALIZER,
          useFactory: appInit,
          deps: [ChapterStoreService],
          multi: true,
        },
      ],
    };
  }
}
