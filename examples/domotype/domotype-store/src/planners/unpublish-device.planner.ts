import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { toIdentificable } from '../identificable';

export const unpublishDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.UnpublishDevice>,
): [Action<AT.UnpublishDevice>, Action<AT.RemoveDevice>] => [
  createAction(AT.UnpublishDevice)({
    device: request.device,
  }),
  createAction(AT.RemoveDevice)({
    device: request.device,
    targets: new Set(
      Object.values(state.users)
        .filter((user) => user.id !== request.author.id)
        .map(toIdentificable),
    ),
    serverIgnore: true,
  }),
];
