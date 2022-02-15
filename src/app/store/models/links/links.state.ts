import {
  Action,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ILink} from 'src/app/shared/models/links/links.interface';
import {undefined$} from '../../../shared/functions/void-observable';
import {BasicCrud} from '../../shared/basic/basic-crud';
import {BasicModelStateInterface} from '../../shared/basic/basic-model-state.interface';
import {LinksActions} from './links.actions';

export interface LinksStateModel extends BasicModelStateInterface<ILink> {

}

const getDefaults: () => LinksStateModel = () => {
  return {
    entities: [],
  };
};

@State<LinksStateModel>({
  name: 'links',
  defaults: getDefaults(),
})
export class LinksState extends BasicCrud {
  @Selector()
  public static readLinks(state: LinksStateModel): ILink[] {
    return state.entities;
  }

  @Action(LinksActions.Create)
  public createChapter(context: StateContext<LinksStateModel>, payload: LinksActions.Create): Observable<void> {
    return super.create<ILink>(payload.chapter, context);
  }

  @Action(LinksActions.Update)
  public updateChapter(context: StateContext<LinksStateModel>, payload: LinksActions.Update): Observable<void> {
    return super.uprade(payload.chapter, context, () => context.dispatch(new LinksActions.Create(payload.chapter)));
  }

  @Action(LinksActions.Delete)
  public deleteChapter(context: StateContext<LinksStateModel>, payload: LinksActions.Delete): Observable<void> {
    return super.delete(payload.chapterId, context);
  }

  @Action(LinksActions.Load)
  public load(context: StateContext<LinksStateModel>, payload: LinksActions.Load): Observable<void> {
    context.setState({entities: payload.chapters});
    return undefined$();
  }
}
