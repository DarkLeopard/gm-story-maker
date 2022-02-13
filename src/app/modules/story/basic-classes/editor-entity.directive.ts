import {
  Directive,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {ID_PARAM} from '../../../shared/constants/common-routing.constants';
import {StoryStoreService} from '../services/story-store.service';
import {StoryRoutingConstants} from '../story-routing.constants';

@Directive()
export abstract class EditorEntityDirective<T> implements OnInit {

  public entityId: number = Number(this.activatedRoute.snapshot.paramMap.get(ID_PARAM)); // undefined check in router module
  protected entity: T | undefined;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected storyStoreService: StoryStoreService,
  ) { }

  public ngOnInit(): void {
    this.entity = this.getEntity(this.entityId);
    if (!this.entity) {
      this.router.navigateByUrl(StoryRoutingConstants.getFullLink(StoryRoutingConstants.List));
    }
  }

  protected abstract getEntity(id: number): T | undefined;
}
