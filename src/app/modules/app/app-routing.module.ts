import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {ChapterRoutingConstants} from '../chapter/chapter-routing.constants';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ChapterRoutingConstants.MAIN_ROUTE,
  },
  {
    path: ChapterRoutingConstants.MAIN_ROUTE,
    loadChildren: () => import('../chapter/chapter.module').then((m) => m.ChapterModule),
  },
  {
    path: '**',
    redirectTo: ChapterRoutingConstants.MAIN_ROUTE,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
