import { DeepReadonly } from 'partially-shared-store';
import { ValidationError } from 'partially-shared-store/errors';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { deviceExistsAndIsOwnedBy } from './utils/device-exists';

export const publishDeviceValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.PublishDevice>,
): void => {
  deviceExistsAndIsOwnedBy(state)(request.author.id)(request.device.id);
  if (request.device.public) {
    throw new ValidationError(`Device is already public.`);
  }
};

