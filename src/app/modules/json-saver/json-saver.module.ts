import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {TranslateModule} from '@ngx-translate/core';
import {NgxsModule} from '@ngxs/store';
import {JsonSaverComponent} from './components/json-saver/json-saver.component';
import {JsonLoaderService} from './services/json-loader.service';
import {JsonSaverStorageService} from './services/json-saver-storage.service';
import {JsonSaverState} from './store/json-saver/json-saver.state';


@NgModule({
  declarations: [
    JsonSaverComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgxsModule.forFeature([JsonSaverState]),
    TranslateModule,
  ],
  exports: [
    JsonSaverComponent,
  ],
  providers: [
    JsonLoaderService,
    JsonSaverStorageService,
  ],
})
export class JsonSaverModule {}
