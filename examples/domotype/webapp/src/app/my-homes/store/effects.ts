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
  requestAddUserToHome,
  requestAddUserToHomeSuccess,
  requestAddUserToHomeFailure,
  updateHome,
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

  requestAddUserToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestAddUserToHome),
        mergeMap((action) =>
          this.homeService
            .requestAddUserToHome(action.homeId)(action.userId)
            .pipe(
              map((home: Home) => requestAddUserToHomeSuccess({ home })),
              catchError((error) => of(requestAddUserToHomeFailure({ error }))),
            ),
        ),
      ),
    { dispatch: true },
  );

  requestAddUserToHomeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestAddUserToHomeSuccess),
        mergeMap((action) => of(updateHome({ home: action.home }))),
      ),

    { dispatch: true },
  );

  constructor(private actions$: Actions, private homeService: HomeService) {}
}
