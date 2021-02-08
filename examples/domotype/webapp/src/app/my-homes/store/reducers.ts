import { createReducer, on } from '@ngrx/store';
import { parseHome } from '../../models/Home';
import * as HomesActions from './actions';
import { initialHomesState } from './state';

export const homesFeatureKey = 'homes';

export const homesReducer = createReducer(
  initialHomesState,

  on(HomesActions.requestHomes, (state) => ({
    ...state,
    loading: true,
  })),
  on(HomesActions.requestHomesSuccess, (state, { homes }) => ({
    ...state,
    homes: homes.reduce((homes, home) => {
      homes[home.id] = home;
      return homes;
    }, {}),
    loading: false,
  })),
  on(HomesActions.requestHomesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(HomesActions.requestNewHome, (state) => ({
    ...state,
    loading: true,
  })),
  on(HomesActions.requestNewHomeSuccess, (state, { home }) => ({
    ...state,
    homes: {
      ...state.homes,
      [home.id]: home,
    },
    loading: false,
  })),
  on(HomesActions.requestNewHomeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
