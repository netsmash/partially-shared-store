import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const addUserReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.AddUser>,
): State => {
  const newState = copyState(state);
  const user = action.user;
  newState.users[user.id] = user;
  return newState;
};

