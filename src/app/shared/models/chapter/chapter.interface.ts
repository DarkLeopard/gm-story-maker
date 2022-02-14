import {IBasicModel} from '../basic/basic-model.interface';

export interface IChapter extends IBasicModel {
  title: string;
  mainTxt: string;
  relationsIds: IChapter['id'][];
}
