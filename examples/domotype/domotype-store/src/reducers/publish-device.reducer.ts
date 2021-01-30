import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const publishDeviceReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.PublishDevice>,
): State => {
  const newState = copyState(state);
  const device = action.device;
  newState.devices[device.id].public = true;
  return newState;
};

