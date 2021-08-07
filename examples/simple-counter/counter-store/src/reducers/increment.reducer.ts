import { DeepReadonly } from 'partially-shared-store';
import { State, copyState } from '../state';
import { Action, ActionTypes as AT } from '../actions';

export const incrementReducer = (state: DeepReadonly<State>, action: Action<AT.Increment>): State => {
  const newState = copyState(state);
  newState.value += 1;
  return newState;
};
