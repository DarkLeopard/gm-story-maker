import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CoreModule} from '../core.module';
import {JsonSaverModule} from '../json-saver/json-saver.module';
import {ProjectTranslateModule} from '../project-translate/project-translate.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

const MAT_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule.forRoot(),
    ProjectTranslateModule,
    JsonSaverModule,
    ...MAT_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
