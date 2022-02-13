import {IEntity} from './entity.interface';

export interface IStory extends IEntity {
  chaptersIds?: number[];
}
