export interface IChapter {
  id: number;
  title: string;
  mainTxt: string;
  relationsIds: IChapter['id'][];
}
