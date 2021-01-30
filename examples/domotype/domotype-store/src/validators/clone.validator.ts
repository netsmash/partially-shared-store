import { DeepReadonly } from 'partially-shared-store';
import { ValidationError } from 'partially-shared-store/errors';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';

export const cloneValidator = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.Clone>,
): void => {};