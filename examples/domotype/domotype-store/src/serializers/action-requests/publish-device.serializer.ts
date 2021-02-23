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

export type SerializedPublishDeviceActionRequest = [
  SerializedTypes.ActionRequest,
  ART.PublishDevice,
  SerializedIdentificable,
  SerializedIdentificable,
  SerializedKnownDevice,
];

export const serializePublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.PublishDevice>>,
): SerializedPublishDeviceActionRequest => [
  SerializedTypes.ActionRequest,
  ART.PublishDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownUser(state)(obj.author),
  serializeKnownDevice(state)(obj.device),
];

export const deserializePublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedPublishDeviceActionRequest>,
): ActionRequest<ART.PublishDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.PublishDevice,
  author: deserializeKnownUser(state)(obj[3]),
  device: deserializeKnownDevice(state)(obj[4]),
});
