import { Component, OnInit } from '@angular/core';
import {EditorEntityDirective} from '../../basic-classes/editor-entity.directive';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends EditorEntityDirective implements OnInit {

}
