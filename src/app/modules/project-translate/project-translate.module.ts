import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BasicTranslatePickerComponent} from './basic-translate-picker/basic-translate-picker.component';
import {ProjectTranslateService} from './services/project-translate.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BasicTranslatePickerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: ProjectTranslateService.getStaticLang,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    BasicTranslatePickerComponent,
  ],
  providers: [
    ProjectTranslateService,
  ],
})
export class ProjectTranslateModule {}
