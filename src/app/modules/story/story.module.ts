import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ChapterListComponent} from './components/chapter-list/chapter-list.component';
import {ChapterComponent} from './components/chapter/chapter.component';
import {StoryRoutingModule} from './story-routing.module';


@NgModule({
  declarations: [
    ChapterListComponent,
    ChapterComponent,
  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class StoryModule {}
