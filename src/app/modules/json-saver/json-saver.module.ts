import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { JsonSaverComponent } from './json-saver/json-saver.component';



@NgModule({
  declarations: [
    JsonSaverComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    JsonSaverComponent,
  ],
})
export class JsonSaverModule { }
