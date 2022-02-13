import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {ID_PARAM} from '../../../../shared/constants/common-routing.constants';
import {ChapterRoutingConstants} from '../../chapter-routing.constants';
import {IChapter} from '../../interfaces/story.interface';
import {ChapterStoreService} from '../../services/chapter-store.service';

enum FormFields {
  Id = 'id',
  Title = 'title',
}

@Component({
  selector: 'app-story',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {

  public chapterId: number = Number(this.activatedRoute.snapshot.paramMap.get(ID_PARAM)); // undefined check in router module
  public chapter: FormGroup = new FormGroup({
    [FormFields.Id]: new FormControl(undefined),
    [FormFields.Title]: new FormControl(undefined),
  });
  public formFields: typeof FormFields = FormFields;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chapterStoreService: ChapterStoreService,
  ) { }

  public ngOnInit() {
    const loadedChapter: IChapter | undefined = this.readChapter(this.chapterId);
    if (!loadedChapter) {
      this.router.navigateByUrl(ChapterRoutingConstants.getFullLink(ChapterRoutingConstants.List));
    } else {
      this.chapter.setValue({
        ...loadedChapter,
      });
    }
  }

  public save(): void {
    this.chapterStoreService.updateChapter(this.chapter.getRawValue());
  }

  private readChapter(id: number): IChapter | undefined {
    return this.chapterStoreService.readChapter(id);
  }
}
