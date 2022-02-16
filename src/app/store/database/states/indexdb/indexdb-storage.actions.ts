import {StorageKeys} from '../../../../shared/enums/storage-keys';

export namespace IndexDBActions {
  const ACTION_NAME: string = '[IndexDB]';

  export class SetItem {
    static readonly type: string = `${ACTION_NAME} Set item to IndexDB.`;

    constructor(
      public key: StorageKeys,
      public value: any,
    ) {}
  }

  export class Restore {
    static readonly type: string = `${ACTION_NAME} Restore data from IndexDB.`
  }
}
