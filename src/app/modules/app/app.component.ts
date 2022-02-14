import {
  Component,
  OnInit,
} from '@angular/core';
import {ChapterStoreService} from '../chapter/services/chapter-store.service';
import {JsonLoaderService} from '../chapter/services/json-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private storyStoreService: ChapterStoreService,
    private jsonLoaderService: JsonLoaderService,
  ) {}

  public ngOnInit(): void {
    this.storyStoreService.initStorageSaver();
  }

  public loadJson(event: Event): void {
    const file: File | null | undefined = ((event.target as any)?.files as FileList).item(0);

    if (file) {
      this.jsonLoaderService.userLoadJson(file);
    } else {
      console.error('No file');
    }
  }

  public save(): void {
    this.jsonLoaderService.userSaveJson();
  }
}
