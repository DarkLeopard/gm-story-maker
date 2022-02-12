import {
  Directive,
  OnInit,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Directive()
export class EditorEntityDirective implements OnInit {

  protected entityId: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  constructor(
    protected activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    console.log(this.entityId);
  }
}
