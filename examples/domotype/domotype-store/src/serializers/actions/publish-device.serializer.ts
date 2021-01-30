import { DeepReadonly } from 'partially-shared-store';
import { Action, ActionTypes as AT } from '../../actions';
import { State } from '../../state';
import { SerializedTypes } from '../types';
import {
  SerializedIdentificable,
  serializeIdentificable,
  deserializeIdentificable,
} from '../identificable';
import {
  deserializeKnownDevice,
  SerializedKnownDevice,
  serializeKnownDevice,
} from '../models';
import { toIdentificable } from '../../identificable';

export type SerializedPublishDeviceAction = [
  SerializedTypes.Action,
  AT.PublishDevice,
  SerializedIdentificable,
  SerializedKnownDevice,
];

export const serializePublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.PublishDevice>>,
): SerializedPublishDeviceAction => [
  SerializedTypes.Action,
  AT.PublishDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownDevice(state)(obj.device),
];

export const deserializePublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedPublishDeviceAction>,
): Action<AT.PublishDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.PublishDevice,
  device: deserializeKnownDevice(state)(obj[3]),
});

