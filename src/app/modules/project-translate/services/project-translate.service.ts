import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  Select,
  Store,
} from '@ngxs/store';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {LocalStorageKeys} from '../../../shared/enums/storage-keys';
import {LocalStorageActions} from '../../../store/database/states/local-storage/local-storage.actions';
import {LocalStorageState} from '../../../store/database/states/local-storage/local-storage.state';
import {LanguagesEnum} from '../enums/languages.enum';

@Injectable()
export class ProjectTranslateService {

  private langs: Map<string, LanguagesEnum> = new Map([
    ['russian', LanguagesEnum.russian],
    ['english', LanguagesEnum.english],
  ]);

  @Select(LocalStorageState.getLang)
  public language!: Observable<LanguagesEnum>

  constructor(
    private translateService: TranslateService,
    private store: Store,
  ) {
    this.initLangsList();

    this.language.subscribe((lang: LanguagesEnum) => {
      this.translateService.setDefaultLang(lang);
    });
  }

  public static get getStaticLang(): LanguagesEnum {
    return LocalStorageState.getItem(LocalStorageKeys.Language) as LanguagesEnum || LanguagesEnum.russian;
  }

  public getAllLangs(): LanguagesEnum[] {
    return this.translateService.getLangs() as LanguagesEnum[];
  }

  public changeLang(lang: LanguagesEnum): void {
    this.store.dispatch(new LocalStorageActions.SetItem(LocalStorageKeys.Language, lang));
  }

  private initLangsList(): void {
    const langs: LanguagesEnum[] = [];
    for (const lang of this.langs.values()) {
      langs.push(lang);
    }
    this.translateService.addLangs(langs);
  }
}
