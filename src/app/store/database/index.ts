import {State} from '@ngxs/store';
import {IndexDBState} from './states/indexdb/indexdb-storage.state';
import {LocalStorageState} from './states/local-storage/local-storage.state';

export const DatabaseStates = [IndexDBState, LocalStorageState];

@State({
  name: 'databaseStates',
  children: DatabaseStates,
})
export class DatabaseStateModule {}
