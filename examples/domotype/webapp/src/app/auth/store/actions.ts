import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

export enum AuthActionTypes {
  RequestActualUser = '[User] Request actual user',
  RequestActualUserSuccess = '[User] Request actual user success',
  RequestActualUserFailure = '[User] Request actual user failure',
}

export const requestActualUser = createAction(
  AuthActionTypes.RequestActualUser,
);

export const requestActualUserSuccess = createAction(
  AuthActionTypes.RequestActualUserSuccess,
  props<{ user: User }>(),
);

export const requestActualUserFailure = createAction(
  AuthActionTypes.RequestActualUserFailure,
  props<{ error: any }>(),
);
