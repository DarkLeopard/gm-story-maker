import { Observable, of } from 'rxjs';

export const undefined$: () => Observable<undefined> = () => of(undefined);
