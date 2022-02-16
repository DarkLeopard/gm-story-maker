import {ILink} from '../../../shared/models/links/links.interface';
import {BasicCrudActions} from '../../shared/basic/basic-crud.actions';

export namespace LinksActions {

  const ACTION_NAME: string = '[Links]';

  export class Create extends BasicCrudActions.Create<ILink> {
    static override readonly type: string = `${ACTION_NAME} Create link.`;
  }

  export class Update extends BasicCrudActions.Update<ILink> {
    static override readonly type: string = `${ACTION_NAME} Update link.`;
  }

  export class Delete extends BasicCrudActions.Delete<ILink> {
    static override readonly type: string = `${ACTION_NAME} Delete link.`;
  }

  export class Load extends BasicCrudActions.Load<ILink> {
    static override readonly type: string = `${ACTION_NAME} Load links.`;
  }
}
