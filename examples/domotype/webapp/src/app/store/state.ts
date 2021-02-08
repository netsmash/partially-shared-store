import { RouterReducerState } from '@ngrx/router-store';
import { HomesState, getInitialHomesState } from '@app/my-homes/store/state';
import { AuthState, getInitialAuthState } from '@app/auth/store/state';

export interface AppState {
  router?: RouterReducerState;

  homes: HomesState;
  auth: AuthState;
}

export const initialAppState: AppState = {
  homes: getInitialHomesState(),
  auth: getInitialAuthState(),
};

export function getInitialState(): AppState {
  return initialAppState;
}
