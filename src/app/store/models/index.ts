import {State} from '@ngxs/store';
import {ChaptersState} from './chapters/chapters.state';
import {LinksState} from './links/links.state';

export const EntitiesStates = [ChaptersState, LinksState];

@State({
  name: 'entitiesStates',
  children: EntitiesStates,
})
export class EntitiesStateModule {}
