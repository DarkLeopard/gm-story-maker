import {IChapter} from '../../../../app/modules/chapter/interfaces/chapter.interface';

export namespace IndexDBActions {

  const ACTION_NAME: string = '[IndexDBState]';

  export class CreateChapters {
    static readonly type: string = `${ACTION_NAME} Create chapters.`;

    constructor(
      public chapter: IChapter,
    ) {}
  }

  export class UpdateChapter {
    static readonly type: string = `${ACTION_NAME} Update chapter.`;

    constructor(
      public chapter: IChapter,
    ) {}
  }

  export class DeleteChapter {
    static readonly type: string = `${ACTION_NAME} Delete chapter.`;

    constructor(
      public chapterId: IChapter['id'],
    ) {}
  }

  export class UpdateChapters {
    static readonly type: string = `${ACTION_NAME} Update chapters.`;

    constructor(
      public chapters: IChapter[],
    ) {}
  }
}
