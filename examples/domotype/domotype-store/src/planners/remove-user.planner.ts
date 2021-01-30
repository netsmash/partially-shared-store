import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';

export const removeUserPlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.RemoveUser>,
): [Action<AT.RemoveUser>] => [
  createAction(AT.RemoveUser)({
    user: request.user,
  }),
];

