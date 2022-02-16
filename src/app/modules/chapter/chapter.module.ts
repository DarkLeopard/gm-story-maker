import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {TranslateModule} from '@ngx-translate/core';
import {Store} from '@ngxs/store';
import {forkJoin} from 'rxjs';
import {IndexDBState} from '../../store/database/states/indexdb/indexdb-storage.state';
import {ChaptersActions} from '../../store/models/chapters/chapters.actions';
import {LinksActions} from '../../store/models/links/links.actions';
import {ChapterRoutingModule} from './chapter-routing.module';
import {ChapterListComponent} from './components/chapter-list/chapter-list.component';
import {ChapterComponent} from './components/chapter/chapter.component';
import {ChapterStoreService} from './services/chapter-store.service';

const MAT_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [
    ChapterListComponent,
    ChapterComponent,
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ...MAT_MODULES,
  ],
})
export class ChapterModule {
  constructor(
    private store: Store,
    private chapterStoreService: ChapterStoreService,
  ) {
    forkJoin(
      this.store.dispatch(new ChaptersActions.Load(this.store.selectSnapshot(IndexDBState.getChapters))),
      this.store.dispatch(new LinksActions.Load(this.store.selectSnapshot(IndexDBState.getLinks)))
    )
      .subscribe(() => {
        this.chapterStoreService.initStorageSaver();
      });
  }
}
