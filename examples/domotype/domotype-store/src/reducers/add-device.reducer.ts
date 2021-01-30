import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const addDeviceReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.AddDevice>,
): State => {
  const newState = copyState(state);
  const device = action.device;
  newState.devices[device.id] = device;
  return newState;
};

