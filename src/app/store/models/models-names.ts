import {ChaptersStateModel} from './chapters/chapters.state';
import {LinksStateModel} from './links/links.state';

export const ENTITIES_STATES_MODULE_NAME: string = 'entitiesStates';

export interface IModelsStorage {
  [ModelsNamesEnum.Chapters]: ChaptersStateModel;
  [ModelsNamesEnum.Links]: LinksStateModel;
}

export enum ModelsNamesEnum {
  Chapters = 'chapters',
  Links = 'links',
}
