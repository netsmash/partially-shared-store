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
  deserializeDeviceInfo,
  deserializeKnownDevice,
  SerializedDeviceInfo,
  serializeDeviceInfo,
  SerializedKnownDevice,
  serializeKnownDevice,
} from '../models';

export type SerializedUpdateDeviceInfoActionRequest = [
  SerializedTypes.ActionRequest,
  ART.UpdateDeviceInfo,
  SerializedIdentificable,
  SerializedIdentificable,
  SerializedDeviceInfo,
  SerializedKnownDevice,
];

export const serializeUpdateDeviceInfo = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.UpdateDeviceInfo>>,
): SerializedUpdateDeviceInfoActionRequest => [
  SerializedTypes.ActionRequest,
  ART.UpdateDeviceInfo,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeIdentificable(state)(obj.author),
  serializeDeviceInfo(state)(obj.info),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeUpdateDeviceInfo = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUpdateDeviceInfoActionRequest>,
): ActionRequest<ART.UpdateDeviceInfo> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.UpdateDeviceInfo,
  author: deserializeIdentificable(state)(obj[3]),
  info: deserializeDeviceInfo(state)(obj[4]),
  device: deserializeKnownDevice(state)(obj[5]),
});

