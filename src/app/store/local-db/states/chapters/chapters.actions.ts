import {IChapter} from '../../../../shared/models/chapter/chapter.interface';

export namespace ChaptersActions {

  const ACTION_NAME: string = '[Chapters]';

  export class Create {
    static readonly type: string = `${ACTION_NAME} Create chapter.`;

    constructor(
      public chapter: Omit<IChapter, 'id'>,
    ) {}
  }

  export class Update {
    static readonly type: string = `${ACTION_NAME} Update chapter.`;

    constructor(
      public chapter: IChapter,
    ) {}
  }

  export class Delete {
    static readonly type: string = `${ACTION_NAME} Delete chapter.`;

    constructor(
      public chapterId: IChapter['id'],
    ) {}
  }

  export class Load {
    static readonly type: string = `${ACTION_NAME} Load chapters.`;

    constructor(
      public chapters: IChapter[],
    ) {}
  }
}
