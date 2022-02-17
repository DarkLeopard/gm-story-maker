import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {TranslateModule} from '@ngx-translate/core';
import {NgxsModule} from '@ngxs/store';
import {JsonSaverComponent} from './components/json-saver/json-saver.component';
import {JsonSaverStorageService} from './services/json-saver-storage.service';
import {JsonSaverState} from './store/json-saver/json-saver.state';


const MAT_MODULES = [
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    JsonSaverComponent,
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([JsonSaverState]),
    TranslateModule,
    ...MAT_MODULES,
  ],
  exports: [
    JsonSaverComponent,
  ],
  providers: [
    JsonSaverStorageService,
  ],
})
export class JsonSaverModule {}
