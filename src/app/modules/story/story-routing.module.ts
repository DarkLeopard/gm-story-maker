import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {ChapterComponent} from './components/chapter/chapter.component';
import {StoriesListComponent} from './components/stories-list/stories-list.component';
import {StoryComponent} from './components/story/story.component';

const routes: Routes = [
  {
    path: 'list',
    component: StoriesListComponent,
  },
  {
    path: 'story/:id',
    component: StoryComponent,
  },
  {
    path: 'chapter/:id',
    component: ChapterComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryRoutingModule {}
