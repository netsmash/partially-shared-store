import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { toIdentificable } from '../identificable';

export const publishDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.PublishDevice>,
): [Action<AT.PublishDevice>, Action<AT.AddDevice>] => [
  createAction(AT.PublishDevice)({
    device: request.device,
    target: toIdentificable(request.device.owner),
  }),
  createAction(AT.AddDevice)({
    device: request.device,
    exceptFor: toIdentificable(request.device.owner),
  }),
];
