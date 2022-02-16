import {Injectable} from '@angular/core';
import {State} from '@ngxs/store';
import {DATABASE_STATES_MODULE_NAME} from './database-names';
import {IndexDBState} from './states/indexdb/indexdb-storage.state';
import {LocalStorageState} from './states/local-storage/local-storage.state';

export const DatabaseStates = [IndexDBState, LocalStorageState];

@State({
  name: DATABASE_STATES_MODULE_NAME,
  children: DatabaseStates,
})
@Injectable()
export class DatabaseStateModule {}
