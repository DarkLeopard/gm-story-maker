import { Component, OnInit } from '@angular/core';
import {EditorEntityDirective} from '../../basic-classes/editor-entity.directive';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent extends EditorEntityDirective implements OnInit {

}
