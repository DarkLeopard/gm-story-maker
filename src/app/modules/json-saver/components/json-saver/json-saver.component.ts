import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {JsonLoaderService} from '../../services/json-loader.service';

@Component({
  selector: 'app-json-saver',
  templateUrl: './json-saver.component.html',
  styleUrls: ['./json-saver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonSaverComponent {

  constructor(
    private jsonLoaderService: JsonLoaderService,
  ) { }

  public load(event: Event): void {
    const file: File | null | undefined = ((event.target as any)?.files as FileList).item(0);

    if (file) {
      this.jsonLoaderService.load(file);
    } else {
      console.error('DEV_ERROR: No file');
    }
  }

  public save(): void {
    this.jsonLoaderService.save();
  }

}
