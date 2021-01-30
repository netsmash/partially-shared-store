import { DeepReadonly } from 'partially-shared-store';
import { ValidationError } from 'partially-shared-store/errors';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { deviceExistsAndIsOwnedBy } from './utils/device-exists';

export const unpublishDeviceValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.UnpublishDevice>,
): void => {
  deviceExistsAndIsOwnedBy(state)(request.author.id)(request.device.id);
  if (!request.device.public) {
    throw new ValidationError(`Device is already private.`);
  }
};
