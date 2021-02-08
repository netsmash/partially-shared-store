import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Home } from '../../models/Home';
import {
  requestHomes,
  requestHomesFailure,
  requestHomesSuccess,
  requestNewHome,
  requestNewHomeFailure,
  requestNewHomeSuccess,
} from './actions';
import { HomeService } from '@app/shared/services/home.service';

@Injectable()
export class HomesEffects {
  requestHomes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestHomes),
        mergeMap((_) =>
          this.homeService.requestHomes().pipe(
            map((homes: Home[]) => requestHomesSuccess({ homes })),
            catchError((error) => of(requestHomesFailure({ error }))),
          ),
        ),
      ),
    { dispatch: true },
  );

  requestNewHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestNewHome),
        mergeMap((action) =>
          this.homeService.createHome(action.data).pipe(
            map((home: Home) => requestNewHomeSuccess({ home })),
            catchError((error) => of(requestNewHomeFailure({ error }))),
          ),
        ),
      ),
    { dispatch: true },
  );

  constructor(private actions$: Actions, private homeService: HomeService) {}
}
