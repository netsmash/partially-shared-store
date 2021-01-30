import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { ActionRequest, ActionRequestTypes as ART } from '../action-requests';
import { Action, ActionTypes as AT, createAction } from '../actions';
import { createIdentificable } from '../identificable';
import { Device } from '../models';

export const addDevicePlanner = (
  state: DeepReadonly<State>,
  request: ActionRequest<ART.AddDevice>,
): [Action<AT.AddDevice>] => {
  const device = {
    ...createIdentificable,
    type: request.deviceType,
    name: '' || request.info.name,
    description: '' || request.info.description,
    state: request.state,
  } as Device;

  return [
    createAction(AT.AddDevice)({
      device,
      target: request.author,
    }),
  ];
};
