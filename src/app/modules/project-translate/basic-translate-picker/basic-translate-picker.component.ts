import {
  Component,
  OnInit,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LanguagesEnum} from '../enums/languages.enum';
import {ProjectTranslateService} from '../services/project-translate.service';

@Component({
  selector: 'app-basic-translate-picker',
  templateUrl: './basic-translate-picker.component.html',
  styleUrls: ['./basic-translate-picker.component.scss'],
})
export class BasicTranslatePickerComponent implements OnInit {

  public languages: LanguagesEnum[] = this.projectTranslateService.getAllLangs();
  public languageFC: FormControl = new FormControl();

  constructor(
    private projectTranslateService: ProjectTranslateService,
  ) { }

  public ngOnInit(): void {
    this.projectTranslateService.currentLanguage
      .subscribe((lang: LanguagesEnum) => {
        this.languageFC.setValue(lang);
      });

    this.languageFC.valueChanges
      .subscribe((lang: LanguagesEnum) => {
        this.changeLang(lang);
      });
  }

  private changeLang(lang: LanguagesEnum): void {
    this.projectTranslateService.changeLang(lang);
  }

}
