import {ILink} from '../../../shared/models/links/links.interface';

export namespace LinksActions {

  const ACTION_NAME: string = '[Links]';

  export class Create {
    static readonly type: string = `${ACTION_NAME} Create link.`;

    constructor(
      public chapter: Omit<ILink, 'id'>,
    ) {}
  }

  export class Update {
    static readonly type: string = `${ACTION_NAME} Update link.`;

    constructor(
      public chapter: ILink,
    ) {}
  }

  export class Delete {
    static readonly type: string = `${ACTION_NAME} Delete link.`;

    constructor(
      public chapterId: ILink['id'],
    ) {}
  }

  export class Load {
    static readonly type: string = `${ACTION_NAME} Load links.`;

    constructor(
      public chapters: ILink[],
    ) {}
  }
}
