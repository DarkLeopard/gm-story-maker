import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {JsonLoaderService} from '../chapter/services/json-loader.service';
import {CoreModule} from '../core.module';
import {ProjectTranslateModule} from '../project-translate/project-translate.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule.forRoot(),
    ProjectTranslateModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [
    JsonLoaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
