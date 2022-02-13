import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {StoriesListComponent} from './components/stories-list/stories-list.component';
import {StoryComponent} from './components/story/story.component';
import {StoryRoutingModule} from './story-routing.module';


@NgModule({
  declarations: [
    StoriesListComponent,
    StoryComponent,
  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class StoryModule {}
