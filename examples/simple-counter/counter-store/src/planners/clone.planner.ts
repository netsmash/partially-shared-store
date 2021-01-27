import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { version } from '../version';

export const clonePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.Clone>,
): [Action<AT.Clone>] => [
  createAction(AT.Clone)({
    state,
    version,
    target: request.author,
  }),
];
