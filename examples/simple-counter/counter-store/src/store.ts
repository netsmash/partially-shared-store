import { PartiallySharedStore } from 'partially-shared-store';
import { State, createInitialState } from './state';
import { Request } from './requests';
import { Action } from './actions';
import { addPlanners } from './planners';
import { addReducers } from './reducers';
import { addValidators } from './validators';

export class Store extends PartiallySharedStore<State, Request, Action> {}

export const createStore = function (initialState?: State): Store {
  initialState = initialState || createInitialState();
  const store = new Store(initialState);
  addPlanners(store);
  addReducers(store);
  addValidators(store);
  return store;
};
