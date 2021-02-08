import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { requestHomes } from '@app/my-homes/store/actions';
import { startApp } from './actions';

@Injectable()
export class AppEffects {
  start$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startApp),
        map((_) => requestHomes()),
      ),
    { dispatch: true },
  );

  constructor(private actions$: Actions) {}
}
