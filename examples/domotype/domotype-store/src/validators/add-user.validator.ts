import { DeepReadonly } from 'partially-shared-store';
import { ValidationError } from 'partially-shared-store/errors';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';

export const addUserValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.AddUser>,
): void => {
  if (request.user.id in state.users) {
    throw new ValidationError(`User with id '${request.user.id}'.`);
  }
};

