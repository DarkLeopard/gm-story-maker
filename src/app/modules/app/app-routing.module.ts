import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {StoryRoutingConstants} from '../story/story-routing.constants';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: StoryRoutingConstants.MAIN_ROUTE,
  },
  {
    path: StoryRoutingConstants.MAIN_ROUTE,
    loadChildren: () => import('../story/story.module').then((m) => m.StoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
