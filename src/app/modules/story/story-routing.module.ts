import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {ID_PARAM} from '../../shared/constants/common-routing.constants';
import {ChapterComponent} from './components/chapter/chapter.component';
import {StoriesListComponent} from './components/stories-list/stories-list.component';
import {StoryComponent} from './components/story/story.component';
import {StoryRoutingConstants} from './story-routing.constants';

const routes: Routes = [
  {
    path: StoryRoutingConstants.List,
    component: StoriesListComponent,
  },
  {
    path: `${StoryRoutingConstants.Story}/:${ID_PARAM}`,
    component: StoryComponent,
  },
  {
    path: `${StoryRoutingConstants.Chapter}/:${ID_PARAM}`,
    component: ChapterComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: StoryRoutingConstants.List,
  },
  {
    path: '**',
    redirectTo: StoryRoutingConstants.List,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryRoutingModule {}
