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
  deserializeKnownDevice,
  deserializeKnownUser,
  SerializedKnownDevice,
  serializeKnownDevice,
  serializeKnownUser,
} from '../models';

export type SerializedRemoveDeviceActionRequest = [
  SerializedTypes.ActionRequest,
  ART.RemoveDevice,
  SerializedIdentificable,
  SerializedIdentificable,
  SerializedKnownDevice,
];

export const serializeRemoveDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.RemoveDevice>>,
): SerializedRemoveDeviceActionRequest => [
  SerializedTypes.ActionRequest,
  ART.RemoveDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownUser(state)(obj.author),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeRemoveDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedRemoveDeviceActionRequest>,
): ActionRequest<ART.RemoveDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.RemoveDevice,
  author: deserializeKnownUser(state)(obj[3]),
  device: deserializeKnownDevice(state)(obj[4]),
});
