import {LocalStorageKeys} from '../../../../shared/enums/storage-keys';

export namespace LocalStorageActions {
  const ACTION_NAME: string = '[LocalStorage]';

  export class SetItem {
    static readonly type: string = `${ACTION_NAME} Save to localStorage.`;

    constructor(
      public key: LocalStorageKeys,
      public value: any,
    ) {}
  }
}
