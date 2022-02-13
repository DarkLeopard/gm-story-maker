import {IChapter} from './chapter.interface';
import {IStory} from './story.interface';

export interface ISavedData {
  storiesDB: IStory[];
  chaptersDB: IChapter[];
}
