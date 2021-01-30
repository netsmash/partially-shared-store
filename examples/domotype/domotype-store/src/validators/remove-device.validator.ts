import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { deviceExistsAndIsOwnedBy } from './utils/device-exists';

export const removeDeviceValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.RemoveDevice>,
): void => {
  deviceExistsAndIsOwnedBy(state)(request.author.id)(request.device.id);
};

