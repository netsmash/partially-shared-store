import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { Device } from '../models';
import { toIdentificable } from '../identificable';

export const updateDeviceInfoPlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.UpdateDeviceInfo>,
): [Action<AT.UpdateDeviceInfo>] => {
  const device: Device = request.device;
  const payload: Omit<Action<AT.UpdateDeviceInfo>, 'id' | 'type'> = {
    device,
    info: request.info,
  };

  if (!device.public) {
    payload.targets = new Set([toIdentificable(device.owner)]);
  }

  return [createAction(AT.UpdateDeviceInfo)(payload)];
};
