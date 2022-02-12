import { Component, OnInit } from '@angular/core';
import {EditorEntityDirective} from '../../basic-classes/editor-entity.directive';
import {IChapter} from '../../interfaces/chapter.interface';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent extends EditorEntityDirective<IChapter> implements OnInit {
  protected getEntity(id: number): IChapter | undefined {
    return this.storyStoreService.getChapter(id);
  }

}
