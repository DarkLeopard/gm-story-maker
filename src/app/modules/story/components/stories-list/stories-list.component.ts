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

  public load(event: Event): void {
    const file: File | null | undefined = ((event.target as any)?.files as FileList).item(0);

    if (file) {
      this.storyStoreService.loadJson(file);
    } else {
      console.error('No file');
    }
  }

  public save(): void {
    this.storyStoreService.saveInJson();
  }

}
