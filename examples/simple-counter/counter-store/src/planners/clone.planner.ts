import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { Request, RequestTypes as RT } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { version } from '../version';

export const clonePlanner = (state: DeepReadonly<State>, request: Request<RT.Clone>): [Action<AT.Clone>] => [
  createAction(AT.Clone)({
    state,
    version,
    target: request.author,
  }),
];
