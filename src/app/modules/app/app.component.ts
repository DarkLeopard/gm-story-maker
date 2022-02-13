import {Component} from '@angular/core';
import {ChapterStoreService} from '../story/services/chapter-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gm-story-maker';

  constructor(
    private storyStoreService: ChapterStoreService,
  ) {}

  public loadJson(event: Event): void {
    const file: File | null | undefined = ((event.target as any)?.files as FileList).item(0);

    if (file) {
      this.storyStoreService.userLoadJson(file);
    } else {
      console.error('No file');
    }
  }

  public save(): void {
    this.storyStoreService.userSaveJson();
  }
}
