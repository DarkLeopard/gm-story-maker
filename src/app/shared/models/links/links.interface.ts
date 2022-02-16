import {IBasicModel} from '../basic/basic-model.interface';
import {IChapter} from '../chapter/chapter.interface';

export interface ILink extends IBasicModel {
  from: IChapter['id'];
  to: IChapter['id'];
}
