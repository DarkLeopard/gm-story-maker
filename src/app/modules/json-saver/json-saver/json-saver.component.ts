import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {JsonLoaderService} from '../../chapter/services/json-loader.service';

@Component({
  selector: 'app-json-saver',
  templateUrl: './json-saver.component.html',
  styleUrls: ['./json-saver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonSaverComponent implements OnInit {

  constructor(
    private jsonLoaderService: JsonLoaderService,
  ) { }

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
