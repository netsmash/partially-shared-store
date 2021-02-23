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

export type SerializedUnpublishDeviceActionRequest = [
  SerializedTypes.ActionRequest,
  ART.UnpublishDevice,
  SerializedIdentificable,
  SerializedIdentificable,
  SerializedKnownDevice,
];

export const serializeUnpublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.UnpublishDevice>>,
): SerializedUnpublishDeviceActionRequest => [
  SerializedTypes.ActionRequest,
  ART.UnpublishDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownUser(state)(obj.author),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeUnpublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUnpublishDeviceActionRequest>,
): ActionRequest<ART.UnpublishDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.UnpublishDevice,
  author: deserializeKnownUser(state)(obj[3]),
  device: deserializeKnownDevice(state)(obj[4]),
});
