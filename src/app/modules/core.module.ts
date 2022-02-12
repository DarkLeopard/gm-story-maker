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
  Observable,
  of,
} from 'rxjs';
import {WINDOW_PROVIDER} from '../shared/providers/window-provider';
import {ProjectTranslateModule} from './project-translate/project-translate.module';

function appInit(): () => Observable<unknown> | Promise<unknown> {
  return () => {
    return of();
  };
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
        {
          provide: APP_INITIALIZER,
          useFactory: appInit,
          deps: [],
          multi: true,
        },
      ],
    };
  }
}
