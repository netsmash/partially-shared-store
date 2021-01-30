import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { deviceExistsTo } from './utils/device-exists';
import { isDeviceStateTypeConsistent } from './utils';

export const updateDeviceStateValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.UpdateDeviceState>,
): void => {
  deviceExistsTo(state)(request.author.id)(request.device.id);
  isDeviceStateTypeConsistent(request.device.type)(request.state);
};

