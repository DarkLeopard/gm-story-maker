import {
  Component,
  OnInit,
} from '@angular/core';
import {JsonLoaderService} from '../chapter/services/json-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private jsonLoaderService: JsonLoaderService,
  ) {}

  public ngOnInit(): void {
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
