import { DeepReadonly } from 'partially-shared-store';
import { Action, ActionTypes as AT } from '../../actions';
import { State } from '../../state';
import { SerializedTypes } from '../types';
import {
  SerializedIdentificable,
  serializeIdentificable,
  deserializeIdentificable,
} from '../identificable';
import { toIdentificable } from '../../identificable';
import {
  deserializeDeviceState,
  deserializeKnownDevice,
  SerializedDeviceState,
  serializeDeviceState,
  SerializedKnownDevice,
  serializeKnownDevice,
} from '../models';

export type SerializedUpdateDeviceStateAction = [
  SerializedTypes.Action,
  AT.UpdateDeviceState,
  SerializedIdentificable,
  SerializedDeviceState,
  SerializedKnownDevice,
];

export const serializeUpdateDeviceState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.UpdateDeviceState>>,
): SerializedUpdateDeviceStateAction => [
  SerializedTypes.Action,
  AT.UpdateDeviceState,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeDeviceState(state)(obj.device.type)(obj.state),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeUpdateDeviceState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUpdateDeviceStateAction>,
): Action<AT.UpdateDeviceState> => {
  const device = deserializeKnownDevice(state)(obj[4]);
  return {
    ...deserializeIdentificable(state)(obj[2]),
    type: AT.UpdateDeviceState,
    state: deserializeDeviceState(state)(device.type)(obj[3]),
    device,
  };
};

