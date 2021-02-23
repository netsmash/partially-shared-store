import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { Device } from '../models';
import { toIdentificable } from '../identificable';

export const updateDeviceStatePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.UpdateDeviceState>,
): [Action<AT.UpdateDeviceState>] => {
  const device: Device = request.device;
  const payload: Omit<Action<AT.UpdateDeviceState>, 'id' | 'type'> = {
    device,
    state: request.state,
  };

  if (!device.public) {
    payload.targets = new Set([toIdentificable(device.owner)]);
  }

  return [createAction(AT.UpdateDeviceState)(payload)];
};
