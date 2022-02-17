import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {JsonSaverStorageService} from '../../services/json-saver-storage.service';

@Component({
  selector: 'app-json-saver',
  templateUrl: './json-saver.component.html',
  styleUrls: ['./json-saver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonSaverComponent {

  constructor(
    private jsonSaverStorageService: JsonSaverStorageService,
  ) { }

  public load(event: Event): void {
    const file: File | null | undefined = ((event.target as any)?.files as FileList).item(0);

    if (file) {
      this.jsonSaverStorageService.load(file);
    } else {
      console.error('DEV_ERROR: No file');
    }
  }

  public save(): void {
    this.jsonSaverStorageService.save();
  }

}
