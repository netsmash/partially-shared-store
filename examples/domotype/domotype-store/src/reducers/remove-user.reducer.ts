import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const removeUserReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.RemoveUser>,
): State => {
  const newState = copyState(state);
  delete newState.users[action.user.id];
  return newState;
};

