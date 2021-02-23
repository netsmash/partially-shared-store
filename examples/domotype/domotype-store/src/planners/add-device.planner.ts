import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { createIdentificable, toIdentificable } from '../identificable';
import { Device } from '../models';

export const addDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.AddDevice>,
): [Action<AT.AddDevice>] => {
  const device: Device = {
    ...createIdentificable(),
    type: request.deviceType,
    name: request.info.name || '',
    description: request.info.description || '',
    state: request.state,
    owner: request.author,
    public: false,
  };

  return [
    createAction(AT.AddDevice)({
      device,
      targets: new Set([toIdentificable(request.author)]),
    }),
  ];
};
