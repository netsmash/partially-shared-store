import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { User } from '../../models/User';
import { AuthConfigService } from '../authconfig.service';
import {
  requestActualUser,
  requestActualUserFailure,
  requestActualUserSuccess,
} from './actions';

@Injectable()
export class AuthEffects {
  requestUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestActualUser),
        mergeMap((_) =>
          this.authConfigService.requestActualUser().pipe(
            map((user: User) => requestActualUserSuccess({ user })),
            catchError((error) => of(requestActualUserFailure({ error }))),
          ),
        ),
      ),
    { dispatch: true },
  );
  constructor(
    private actions$: Actions,
    private authConfigService: AuthConfigService,
  ) {}
}
