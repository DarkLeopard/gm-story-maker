import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {EnumHelperStaticService} from '../../../shared/services/static/enum-helper-static.service';
import {LanguagesEnum} from '../enums/languages.enum';

const LANG_LS_KEY: string = 'lang';

@Injectable()
export class ProjectTranslateService {

  private currentLanguageBS: BehaviorSubject<LanguagesEnum> = new BehaviorSubject<LanguagesEnum>(this.getSavedLang());
  public currentLanguage: Observable<LanguagesEnum> = this.currentLanguageBS.asObservable();

  constructor(
    private translateService: TranslateService,
  ) {
    this.setLangsList();

    this.currentLanguageBS.subscribe((lang: LanguagesEnum) => {
      this.translateService.setDefaultLang(lang);
      localStorage.setItem(LANG_LS_KEY, lang);
    });
  }

  public static get getStaticLang(): LanguagesEnum {
    return localStorage.getItem(LANG_LS_KEY) as LanguagesEnum;
  }

  public getAllLangs(): LanguagesEnum[] {
    return this.translateService.getLangs() as LanguagesEnum[];
  }

  public changeLang(lang: LanguagesEnum): void {
    if (this.currentLanguageBS.value !== lang) {
      this.currentLanguageBS.next(lang);
    }
  }

  private setLangsList(): void {
    const langs: LanguagesEnum[] = this.getLangsFromList();
    this.translateService.addLangs(langs);
  }

  private getSavedLang(): LanguagesEnum {
    const savedLang: LanguagesEnum = ProjectTranslateService.getStaticLang;
    if (savedLang) {
      return savedLang;
    } else {
      const newLang: LanguagesEnum = this.getLangsFromList()[0];
      this.changeLang(newLang);
      return newLang;
    }
  }

  private getLangsFromList(): LanguagesEnum[] {
    const langs: LanguagesEnum[] = EnumHelperStaticService.getAllEnumKeys<LanguagesEnum>(LanguagesEnum);
    return langs;
  }
}
