import { DeepReadonly } from 'partially-shared-store';
import { ValidationError } from 'partially-shared-store/errors';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';

export const removeUserValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.RemoveUser>,
): void => {
  if (!(request.user.id in state.users)) {
    throw new ValidationError(`User do not exists.`);
  }
};

