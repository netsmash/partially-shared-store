import { createAction, props } from '@ngrx/store';
import { Home, RequestedNewHome } from '../../models/Home';

export enum HomesActionTypes {
  RequestHomes = '[Homes] Request homes',
  RequestHomesSuccess = '[Homes] Request homes success',
  RequestHomesFailure = '[Homes] Request homes failure',
  RequestNewHome = '[Homes] Request new home',
  RequestNewHomeSuccess = '[Homes] Request new home success',
  RequestNewHomeFailure = '[Homes] Request new home failure',

  UpdateHome = '[Homes] Request update home',

  RequestAddUserToHome = '[Homes] Request add new user to home',
  RequestAddUserToHomeSuccess = '[Homes] Request add new user to home success',
  RequestAddUserToHomeFailure = '[Homes] Request add new user to home failure',
}

export const requestHomes = createAction(HomesActionTypes.RequestHomes);

export const requestHomesSuccess = createAction(
  HomesActionTypes.RequestHomesSuccess,
  props<{ homes: Home[] }>(),
);

export const requestHomesFailure = createAction(
  HomesActionTypes.RequestHomesFailure,
  props<{ error: any }>(),
);

export const requestNewHome = createAction(
  HomesActionTypes.RequestNewHome,
  props<{
    data: RequestedNewHome;
  }>(),
);

export const requestNewHomeSuccess = createAction(
  HomesActionTypes.RequestNewHomeSuccess,
  props<{ home: Home }>(),
);

export const requestNewHomeFailure = createAction(
  HomesActionTypes.RequestNewHomeFailure,
  props<{ error: any }>(),
);

export const updateHome = createAction(
  HomesActionTypes.UpdateHome,
  props<{ home: Home }>(),
);

export const requestAddUserToHome = createAction(
  HomesActionTypes.RequestAddUserToHome,
  props<{
    homeId: string;
    userId: string;
  }>(),
);

export const requestAddUserToHomeSuccess = createAction(
  HomesActionTypes.RequestAddUserToHomeSuccess,
  props<{ home: Home }>(),
);

export const requestAddUserToHomeFailure = createAction(
  HomesActionTypes.RequestAddUserToHomeFailure,
  props<{ error: any }>(),
);
