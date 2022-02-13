import {Component} from '@angular/core';
import {ChapterRoutingConstants} from '../../chapter-routing.constants';
import {IChapter} from '../../interfaces/chapter.interface';
import {ChapterStoreService} from '../../services/chapter-store.service';

enum DisplayedColumnsKeysEnum {
  Id = 'id',
  Title = 'title',
  Actions = 'actions',
}

@Component({
  selector: 'app-cahpters-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent {
  public dataSource = this.storyStoreService.chaptersDB;

  public displayedColumns: string[] = [
    DisplayedColumnsKeysEnum.Id,
    DisplayedColumnsKeysEnum.Title,
    DisplayedColumnsKeysEnum.Actions,
  ];
  public columnsKeysEnum: typeof DisplayedColumnsKeysEnum = DisplayedColumnsKeysEnum;

  constructor(
    private storyStoreService: ChapterStoreService,
  ) { }

  public getChapterLink(id: IChapter['id']): string {
    return ChapterRoutingConstants.getChapterLink(id);
  }

  public createChapter(): void {
    this.storyStoreService.createChapter();
  }

  public deleteChapter(id: IChapter['id']): void {
    this.storyStoreService.deleteChapter(id);
  }
}

