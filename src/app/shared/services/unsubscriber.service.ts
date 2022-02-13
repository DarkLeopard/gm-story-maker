import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class Unsubscriber implements OnDestroy {
  private readonly destroySubject: Subject<void> = new Subject<void>();

  readonly destroy$: Observable<void> = this.destroySubject.asObservable();

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
