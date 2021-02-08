import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './actions';
import { initialAuthState } from './state';

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.requestActualUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.requestActualUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.requestActualUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
