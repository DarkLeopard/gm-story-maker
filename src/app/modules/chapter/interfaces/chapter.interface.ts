export interface IChapter {
  id: number;
  title: string;
  relationsIds?: IChapter['id'][];
}
