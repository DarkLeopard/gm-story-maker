import { State } from '@ngxs/store';
import { IndexDBState } from './states/indexdb/indexdb-storage.state';
import { ChaptersState } from './states/chapters/chapters.state';
import {LinksState} from './states/links/links.state';
import {LocalStorageState} from './states/local-storage/local-storage.state';

export const LocalDBStates = [IndexDBState, LocalStorageState, ChaptersState, LinksState];

@State({
  name: 'localDBStates',
  children: LocalDBStates
})
export class LocalDBStateModule {}
