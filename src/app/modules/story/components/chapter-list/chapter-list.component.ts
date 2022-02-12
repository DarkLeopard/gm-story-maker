import { Component, OnInit } from '@angular/core';
import {ListEntityDirective} from '../../basic-classes/list-entity.directive';
import {IChapter} from '../../interfaces/chapter.interface';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent extends ListEntityDirective<IChapter> implements OnInit {
  public dataSource = this.storyStoreService.chaptersDB;

  public ngOnInit(): void {
  }
}
