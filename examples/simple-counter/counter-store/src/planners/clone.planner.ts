import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { Request, RequestTypes as RT } from "../requests";
import { Action, createAction, ActionTypes as AT } from "../actions";
import { version } from '../version'; 

export const clonePlanner = (
  state: DeepReadonly<State>,
  request: Request<RT.Clone>,
): [ Action<AT.Clone> ] => [
  createAction(AT.Clone)({
    state,
    version,
  }),
];
