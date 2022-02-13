import { Component, OnInit } from '@angular/core';
import {EditorEntityDirective} from '../../basic-classes/editor-entity.directive';
import {IStory} from '../../interfaces/story.interface';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends EditorEntityDirective<IStory> implements OnInit {
  protected getEntity(id: number): IStory | undefined {
    return this.storyStoreService.readStory(id);
  }
}
