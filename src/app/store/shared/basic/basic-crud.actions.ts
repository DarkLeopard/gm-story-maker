import {IBasicModel} from '../../../shared/models/basic/basic-model.interface';

export namespace BasicCrudActions {
  const PLACEHOLDER: string = 'ACTION TYPE NOT SET.';

  export class Create<T extends IBasicModel> {
    static readonly type: string = `${PLACEHOLDER}`;

    constructor(
      public entity: Omit<T, 'id'>,
    ) {}
  }

  export class Update<T extends IBasicModel> {
    static readonly type: string = `${PLACEHOLDER}`;

    constructor(
      public entity: Pick<T, 'id'> & Partial<Omit<T, 'id'>>,
    ) {}
  }

  export class Delete<T extends IBasicModel> {
    static readonly type: string = `${PLACEHOLDER}`;

    constructor(
      public entityId: T['id'],
    ) {}
  }

  export class Load<T extends IBasicModel> {
    static readonly type: string = `${PLACEHOLDER}`;

    constructor(
      public entities: T[],
    ) {}
  }
}
