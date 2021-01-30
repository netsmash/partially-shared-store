import { State, copyState } from '../state';
import { DeepReadonly } from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';

export const updateDeviceInfoReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.UpdateDeviceInfo>,
): State => {
  const newState = copyState(state);
  const device = newState.devices[action.device.id];
  if (action.info.name !== undefined) {
    device.name = action.info.name;
  } else if (action.info.description !== undefined) {
    device.description = action.info.description;
  }
  return newState;
};

