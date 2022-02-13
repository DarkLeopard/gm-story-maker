import { Component } from '@angular/core';
import {StoryStoreService} from '../story/services/story-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gm-story-maker';

  constructor(
    protected storyStoreService: StoryStoreService,
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
