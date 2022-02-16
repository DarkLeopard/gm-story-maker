import {IChapter} from '../../../shared/models/chapter/chapter.interface';
import {ILink} from '../../../shared/models/links/links.interface';
import {BasicCrudActions} from '../../shared/basic/basic-crud.actions';

export namespace ChaptersActions {

  const ACTION_NAME: string = '[Chapters]';

  export class Create extends BasicCrudActions.Create<IChapter> {
    static override readonly type: string = `${ACTION_NAME} Create chapter.`;
  }

  export class Update extends BasicCrudActions.Update<IChapter> {
    static override readonly type: string = `${ACTION_NAME} Update chapter.`;
  }

  export class Delete extends BasicCrudActions.Delete<IChapter> {
    static override readonly type: string = `${ACTION_NAME} Delete chapter.`;
  }

  export class Load extends BasicCrudActions.Load<IChapter> {
    static override readonly type: string = `${ACTION_NAME} Load chapters.`;
  }

  export class AddRelation {
    static readonly type: string = `${ACTION_NAME} Add link to chapter.`;

    constructor(
      public link: ILink,
    ) {}
  }

  export class DeleteRelation {
    static readonly type: string = `${ACTION_NAME} Delete link relation from chapter`;

    constructor(
      public link: Pick<ILink, 'id' | 'to' | 'from'>,
    ) {}
  }
}
