import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import {
  routerNavigatedAction,
  RouterNavigatedAction,
} from '@ngrx/router-store';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  routerNavigatedAction$ = this.actions$.pipe(
    ofType<RouterNavigatedAction>(routerNavigatedAction),
    tap((action: RouterNavigatedAction) => {})
  );

  constructor(private actions$: Actions) {}
}
