import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChapterComponent} from './components/chapter/chapter.component';
import {StoriesListComponent} from './components/stories-list/stories-list.component';
import {StoryComponent} from './components/story/story.component';
import {ChapterStoreService} from './services/chapter-store.service';
import {StoryStoreService} from './services/story-store.service';
import {StoryRoutingModule} from './story-routing.module';


@NgModule({
  declarations: [
    StoriesListComponent,
    StoryComponent,
    ChapterComponent,
  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
  ],
  providers: [
    StoryStoreService,
    ChapterStoreService,
  ],
})
export class StoryModule {}
