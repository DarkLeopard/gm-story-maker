import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {map} from 'rxjs';
import {ListEntityDirective} from '../../basic-classes/list-entity.directive';
import {IChapter} from '../../interfaces/chapter.interface';
import {StoryRoutingConstants} from '../../story-routing.constants';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent extends ListEntityDirective<IChapter> implements OnInit {

  @Input() public storyId: number | undefined;

  public dataSource = this.storyStoreService.chaptersDB.pipe(
    map((chapters: IChapter[]) => chapters
      .filter((chapter: IChapter) => (!!chapter.storiesIds ? chapter.storiesIds : [])
        .some((storyId: number) => this.storyId = storyId),
      ),
    ),
  );

  public ngOnInit(): void {
    if (!this.storyId) {
      console.error('StoryId not id');
      this.router.navigateByUrl(StoryRoutingConstants.getFullLink(StoryRoutingConstants.List));
    }
  }

  public getChapterLink(id: number): string {
    return StoryRoutingConstants.getChapterLink(id);
  }

  public createChapter(): void {
    this.storyStoreService.createChapter()
  }
}
