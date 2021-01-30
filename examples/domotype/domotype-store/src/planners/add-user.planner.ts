import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';

export const addUserPlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.AddUser>,
): [Action<AT.AddUser>] => [
  createAction(AT.AddUser)({
    user: request.user,
  }),
];

