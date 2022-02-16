import {Injectable} from '@angular/core';
import {State} from '@ngxs/store';
import {ChaptersState} from './chapters/chapters.state';
import {LinksState} from './links/links.state';
import {ENTITIES_STATES_MODULE_NAME} from './models-names';

export const EntitiesStates = [ChaptersState, LinksState];

@State({
  name: ENTITIES_STATES_MODULE_NAME,
  children: EntitiesStates,
})
@Injectable()
export class EntitiesStateModule {}
