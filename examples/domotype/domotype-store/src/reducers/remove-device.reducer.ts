import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const removeDeviceReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.RemoveDevice>,
): State => {
  const newState = copyState(state);
  delete newState.devices[action.device.id];
  return newState;
};

