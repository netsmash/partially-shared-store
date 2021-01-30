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
  deserializeKnownDevice,
  SerializedKnownDevice,
  serializeKnownDevice,
} from '../models';

export type SerializedUnpublishDeviceAction = [
  SerializedTypes.Action,
  AT.UnpublishDevice,
  SerializedIdentificable,
  SerializedKnownDevice,
];

export const serializeUnpublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.UnpublishDevice>>,
): SerializedUnpublishDeviceAction => [
  SerializedTypes.Action,
  AT.UnpublishDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeUnpublishDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUnpublishDeviceAction>,
): Action<AT.UnpublishDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.UnpublishDevice,
  device: deserializeKnownDevice(state)(obj[3]),
});

