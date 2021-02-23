import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { toIdentificable } from '../identificable';

export const publishDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.PublishDevice>,
): [Action<AT.AddDevice>, Action<AT.PublishDevice>] => [
  createAction(AT.AddDevice)({
    device: request.device,
    targets: new Set(
      Object.values(state.users)
        .filter((user) => user.id !== request.author.id)
        .map(toIdentificable),
    ),
    serverIgnore: true,
  }),
  createAction(AT.PublishDevice)({
    device: request.device,
  }),
];
