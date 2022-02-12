import {
  Directive,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {StoryStoreService} from '../services/story-store.service';

@Directive()
export abstract class EditorEntityDirective<T> implements OnInit {

  public entityId: number = Number(this.activatedRoute.snapshot.paramMap.get('id')); // undefined check in router module
  protected entity: T | undefined;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected storyStoreService: StoryStoreService,
  ) { }

  public ngOnInit(): void {
    this.entity = this.getEntity(this.entityId);
    if (!this.entity) {
      this.router.navigate(['/stories/list']);
    }
  }

  protected abstract getEntity(id: number): T | undefined;
}
