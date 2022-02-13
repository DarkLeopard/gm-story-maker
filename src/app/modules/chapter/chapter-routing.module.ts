import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {ID_PARAM} from '../../shared/constants/common-routing.constants';
import {ChapterRoutingConstants} from './chapter-routing.constants';
import {ChapterListComponent} from './components/chapter-list/chapter-list.component';
import {ChapterComponent} from './components/chapter/chapter.component';

const routes: Routes = [
  {
    path: ChapterRoutingConstants.List,
    component: ChapterListComponent,
  },
  {
    path: `${ChapterRoutingConstants.Chapter}/:${ID_PARAM}`,
    component: ChapterComponent,
  },
  {
    path: '',
    redirectTo: ChapterRoutingConstants.List,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterRoutingModule {}
