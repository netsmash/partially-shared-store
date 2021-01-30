import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const updateDeviceStateReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.UpdateDeviceState>,
): State => {
  const newState = copyState(state);
  const device = newState.devices[action.device.id];
  device.state = action.state;
  return newState;
};

