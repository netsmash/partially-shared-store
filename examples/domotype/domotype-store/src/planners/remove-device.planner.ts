import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { toIdentificable } from '../identificable';

export const removeDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.RemoveDevice>,
): [Action<AT.RemoveDevice>] => [
  createAction(AT.RemoveDevice)({
    device: request.device,
    ...(request.device.public
      ? {}
      : { targets: new Set([toIdentificable(request.device.owner)]) }),
  }),
];
