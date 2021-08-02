import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { Request, RequestTypes as RT } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';

export const decrementPlanner = (
  state: DeepReadonly<State>,
  request: Request<RT.Decrement>,
): [Action<AT.Decrement>] => [createAction(AT.Decrement)({})];
