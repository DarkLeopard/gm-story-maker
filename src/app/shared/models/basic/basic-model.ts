import {IBasicModel} from './basic-model.interface';

export class BasicModel implements IBasicModel {
  [key: string]: any;

  public id: number = 0;
}
