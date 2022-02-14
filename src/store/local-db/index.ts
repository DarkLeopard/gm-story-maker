import { State } from '@ngxs/store';
import { LocalStorageState } from './states/local-storage/local-storage.state';
import { IndexDBState } from './states/index-db/index-db.state';

export const LocalDBStates = [LocalStorageState, IndexDBState];

@State({
  name: 'localDBStates',
  children: LocalDBStates
})
export class LocalDBStateModule {}
