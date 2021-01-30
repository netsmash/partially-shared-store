import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const unpublishDeviceReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.UnpublishDevice>,
): State => {
  const newState = copyState(state);
  newState.devices[action.device.id].public = false;
  return newState;
};

