import {
  Component,
  OnInit,
} from '@angular/core';
import {ListEntityDirective} from '../../basic-classes/list-entity.directive';
import {IStory} from '../../interfaces/story.interface';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss'],
})
export class StoriesListComponent extends ListEntityDirective<IStory> implements OnInit {
  public dataSource = this.storyStoreService.storiesDB;

  public ngOnInit(): void {
  }
}
