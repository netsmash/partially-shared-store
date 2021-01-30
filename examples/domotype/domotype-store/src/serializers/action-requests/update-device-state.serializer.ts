import { DeepReadonly } from 'partially-shared-store';
import {
  ActionRequest,
  ActionRequestTypes as ART,
} from '../../action-requests';
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
import { Device } from '../../models';

export type SerializedUpdateDeviceStateActionRequest = [
  SerializedTypes.ActionRequest,
  ART.UpdateDeviceState,
  SerializedIdentificable,
  SerializedIdentificable,
  SerializedDeviceState,
  SerializedKnownDevice,
];

export const serializeUpdateDeviceState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.UpdateDeviceState>>,
): SerializedUpdateDeviceStateActionRequest => [
  SerializedTypes.ActionRequest,
  ART.UpdateDeviceState,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeIdentificable(state)(obj.author),
  serializeDeviceState(state)(obj.device.type)(obj.state),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeUpdateDeviceState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUpdateDeviceStateActionRequest>,
): ActionRequest<ART.UpdateDeviceState> => {
  const device: Device = deserializeKnownDevice(state)(obj[5]);
  return {
    ...deserializeIdentificable(state)(obj[2]),
    type: ART.UpdateDeviceState,
    author: deserializeIdentificable(state)(obj[3]),
    state: deserializeDeviceState(state)(device.type)(obj[4]),
    device,
  };
};

