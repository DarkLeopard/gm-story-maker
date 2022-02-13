import {
  Component,
  OnInit,
} from '@angular/core';
import {ListEntityDirective} from '../../basic-classes/list-entity.directive';
import {IStory} from '../../interfaces/story.interface';
import {StoryRoutingConstants} from '../../story-routing.constants';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss'],
})
export class StoriesListComponent extends ListEntityDirective<IStory> implements OnInit {
  public dataSource = this.storyStoreService.storiesDB;

  public ngOnInit(): void {
  }

  public getStoryLink(id: number): string {
    return StoryRoutingConstants.getStoryLink(id);
  }
}

