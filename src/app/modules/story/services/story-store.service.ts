import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {IChapter} from '../interfaces/chapter.interface';
import {IStory} from '../interfaces/story.interface';
import { saveAs } from 'file-saver';

@Injectable()
export class StoryStoreService {

  private storiesDBBS: BehaviorSubject<IStory[]> = new BehaviorSubject<IStory[]>([{ id: 1, title: '123', chaptersIds: []}]);
  public storiesDB: Observable<IStory[]> = this.storiesDBBS.asObservable();
  private chaptersDBBS: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([{ id: 1, title: '123'}]);
  public chaptersDB: Observable<IChapter[]> = this.chaptersDBBS.asObservable();

  constructor() { }

  public getStory(id: number): IStory | undefined {
    return this.storiesDBBS.value.find(((value) => value.id === id));
  }

  public getChapter(id: number): IChapter | undefined {
    return this.chaptersDBBS.value.find((value) => value.id === id);
  }

  public saveInJson(): void {
    const jsonObject = {
      storiesDB: JSON.stringify(this.storiesDBBS.value),
      chaptersDB: JSON.stringify(this.chaptersDBBS.value),
    }
    const blob = new Blob([JSON.stringify(jsonObject)], {type : 'application/json'});
    saveAs(blob, 'gm-stories-db.json');
  }
}
