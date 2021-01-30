import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';

export const removeDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.RemoveDevice>,
): [Action<AT.RemoveDevice>] => [
  createAction(AT.RemoveDevice)({
    device: request.device,
  }),
];

