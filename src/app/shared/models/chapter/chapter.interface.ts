import {IBasicModel} from '../basic/basic-model.interface';
import {ILink} from '../links/links.interface';

export interface IChapter extends IBasicModel {
  title: string;
  mainTxt: string;
  relationsIds: ILink['id'][];
}
