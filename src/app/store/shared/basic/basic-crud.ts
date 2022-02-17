import {StateContext} from '@ngxs/store';
import {
  Observable,
  of,
  throwError,
} from 'rxjs';
import {deepCopy} from '../../../shared/functions/deep-copy';
import {undefined$} from '../../../shared/functions/void-observable';
import {IBasicModel} from '../../../shared/models/basic/basic-model.interface';
import {BasicCrudActions} from './basic-crud.actions';
import {BasicModelStateInterface} from './basic-model-state.interface';

export class BasicCrud {
  protected create<T extends IBasicModel>(
    entityWhithoutId: BasicCrudActions.Create<T>['entity'],
    context: StateContext<BasicModelStateInterface<T>>,
  ): Observable<T> {
    const entities: T[] = deepCopy(context.getState().entities);
    const entitiesIds: number[] = entities.map((entity: T) => entity.id);
    const newId: number = this.findNewIdNumber(entitiesIds);

    const newEntity: T = {
      ...entityWhithoutId as T,
      id: newId,
    };

    entities.push(newEntity);
    context.patchState({entities: entities});
    return of(newEntity);
  }

  protected uprade<T extends IBasicModel>(
    newEntity: BasicCrudActions.Update<T>['entity'],
    context: StateContext<BasicModelStateInterface<T>>,
    createCallback?: () => Observable<void>,
  ): Observable<void> {
    const entities: T[] = deepCopy(context.getState().entities);
    const entity: IBasicModel | undefined = entities.find((entity: IBasicModel) => entity.id === newEntity.id);

    if (entity === undefined && createCallback) {
      if (!!createCallback) {
        console.warn(`Cant find entity for update:`, newEntity, 'Create new entity');
        return createCallback();
      } else {
        return undefined$();
      }
    } else {
      for (const key in entity) {
        if (key !== 'id' && newEntity[key] !== undefined) {
          entity[key] = newEntity[key];
        }
      }

      context.patchState({entities: entities});
      return undefined$();
    }
  }

  protected delete<T extends IBasicModel>(
    entityId: BasicCrudActions.Delete<T>['entityId'],
    context: StateContext<BasicModelStateInterface<T>>,
  ): Observable<void> {
    const entities: T[] = deepCopy(context.getState().entities);

    if (entities.find((chapter: T) => chapter.id === entityId)) {
      const newEntities: T[] = entities.filter((entity: T) => entity.id !== entityId);
      context.patchState({entities: newEntities});
      return undefined$();
    } else {
      return throwError(new Error(`Cant find chapter with id ${entityId}!`));
    }
  }

  protected load<T extends IBasicModel>(
    entities: BasicCrudActions.Load<T>['entities'],
    context: StateContext<BasicModelStateInterface<T>>,
  ): Observable<void> {
    context.setState({entities: entities});
    return undefined$();
  }

  private findNewIdNumber(currentIds: number[]): number {
    currentIds.sort((a: number, b: number) => a - b);
    return currentIds.length > 0 ? currentIds[currentIds.length - 1] + 1 : 1;
  }
}
