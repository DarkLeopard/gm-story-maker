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
import {WINDOW_PROVIDER} from '../shared/providers/window-provider';
import {BrowserStorageService} from '../shared/services/browser-storage.service';
import {ProjectTranslateModule} from './project-translate/project-translate.module';
import {StoryStoreService} from './story/services/story-store.service';

function appInit(storyStoreService: StoryStoreService): () => Observable<unknown> | Promise<unknown> {
  return () => forkJoin(storyStoreService.restoreFromDB())
    .pipe(
      tap(() => {
        console.log('app inited');
      }),
      finalize(() => {
        storyStoreService.appInitRestoreComlete();
      })
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
        StoryStoreService,
        {
          provide: APP_INITIALIZER,
          useFactory: appInit,
          deps: [StoryStoreService],
          multi: true,
        },
      ],
    };
  }
}
