import {StateContext} from '@ngxs/store';
import {
  Observable,
  throwError,
} from 'rxjs';
import {undefined$} from '../../../shared/functions/void-observable';
import {IBasicModel} from '../../../shared/models/basic/basic-model.interface';
import {BasicModelStateInterface} from './basic-model-state.interface';

export class BasicCrud {
  protected create<T extends IBasicModel>(newEntity: Omit<T, 'id'>, context: StateContext<BasicModelStateInterface<T>>): Observable<void> {
    const entities: T[] = [...context.getState().entities];
    const entitiesIds: number[] = entities.map((entity: T) => entity.id);
    const newId: number = this.findNewIdNumber(entitiesIds);

    entities.push({
      ...newEntity as T,
      id: newId,
    });

    context.patchState({entities: entities});
    return undefined$();
  }

  protected uprade<T extends IBasicModel>(
    newEntity: T,
    context: StateContext<BasicModelStateInterface<T>>,
    createCallback?: () => Observable<void>,
  ): Observable<void> {
    const entities: T[] = [...context.getState().entities];
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
        if (key !== 'id') {
          entity[key] = newEntity[key];
        }
      }

      context.patchState({entities: entities});
      return undefined$();
    }
  }

  protected delete<T extends IBasicModel>(entityId: T['id'], context: StateContext<BasicModelStateInterface<T>>): Observable<void> {
    const entities: T[] = [...context.getState().entities];

    if (entities.find((chapter: T) => chapter.id === entityId)) {
      const newEntities: T[] = entities.filter((entity: T) => entity.id !== entityId);
      context.patchState({entities: newEntities});
      return undefined$();
    } else {
      return throwError(new Error(`Cant find chapter with id ${entityId}!`));
    }
  }

  private findNewIdNumber(currentIds: number[]): number {
    currentIds.sort((a: number, b: number) => a - b);
    return currentIds.length > 0 ? currentIds[currentIds.length - 1] + 1 : 1;
  }
}
