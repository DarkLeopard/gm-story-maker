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

  private storiesDBBS: BehaviorSubject<IStory[]> = new BehaviorSubject<IStory[]>([]);
  public storiesDB: Observable<IStory[]> = this.storiesDBBS.asObservable();
  private chaptersDBBS: BehaviorSubject<IChapter[]> = new BehaviorSubject<IChapter[]>([]);
  public chaptersDB: Observable<IChapter[]> = this.chaptersDBBS.asObservable();

  constructor() { }

  public getStory(id: number): IStory | undefined {
    return this.storiesDBBS.value.find(((value: IStory) => value.id === id));
  }

  public getChapter(id: number): IChapter | undefined {
    return this.chaptersDBBS.value.find((value: IChapter) => value.id === id);
  }

  public loadJson(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onloadend = (e) => {
      const file = JSON.parse(e.target?.result as string)
      this.storiesDBBS.next(file.storiesDB);
      this.chaptersDBBS.next(file.chaptersDB);
    }
    reader.readAsText(file);
  }

  public saveInJson(): void {
    const jsonObject = {
      storiesDB: this.storiesDBBS.value,
      chaptersDB: this.chaptersDBBS.value,
    }
    const blob = new Blob([JSON.stringify(jsonObject)], {type : 'application/json'});
    saveAs(blob, 'gm-stories-db.json');
  }
}
