import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { deviceExistsTo } from './utils/device-exists';
import { isDeviceInfoValid } from './utils';

export const updateDeviceInfoValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.UpdateDeviceInfo>,
): void => {
  deviceExistsTo(state)(request.author.id)(request.device.id);
  isDeviceInfoValid(state)(request.info, request.device.id);
};

