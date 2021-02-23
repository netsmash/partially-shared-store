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
  deserializeDeviceState,
  deserializeKnownUser,
  SerializedDeviceInfo,
  SerializedDeviceState,
  serializeDeviceInfo,
  serializeDeviceState,
  serializeKnownUser,
} from '../models';
import { DeviceType } from '../../models';

export type SerializedAddDeviceActionRequest = [
  SerializedTypes.ActionRequest,
  ART.AddDevice,
  SerializedIdentificable,
  SerializedIdentificable,
  DeviceType,
  SerializedDeviceInfo,
  SerializedDeviceState,
];

export const serializeAddDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.AddDevice>>,
): SerializedAddDeviceActionRequest => [
  SerializedTypes.ActionRequest,
  ART.AddDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownUser(state)(obj.author),
  obj.deviceType,
  serializeDeviceInfo(state)(obj.info),
  serializeDeviceState(state)(obj.deviceType)(obj.state),
];

export const deserializeAddDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedAddDeviceActionRequest>,
): ActionRequest<ART.AddDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.AddDevice,
  author: deserializeKnownUser(state)(obj[3]),
  deviceType: obj[4],
  info: deserializeDeviceInfo(state)(obj[5]),
  state: deserializeDeviceState(state)(obj[4])(obj[6]),
});
