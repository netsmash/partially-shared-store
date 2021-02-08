import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './state';
import { environment } from '@env/environment';
import { homesReducer } from '@app/my-homes/store/reducers';
import { authReducer } from '@app/auth/store/reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  homes: homesReducer,
  auth: authReducer,
};

// console.log all actions
export function logger(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
