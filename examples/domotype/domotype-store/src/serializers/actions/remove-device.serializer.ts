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

export type SerializedRemoveDeviceAction = [
  SerializedTypes.Action,
  AT.RemoveDevice,
  SerializedIdentificable,
  SerializedKnownDevice,
];

export const serializeRemoveDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.RemoveDevice>>,
): SerializedRemoveDeviceAction => [
  SerializedTypes.Action,
  AT.RemoveDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeRemoveDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedRemoveDeviceAction>,
): Action<AT.RemoveDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.RemoveDevice,
  device: deserializeKnownDevice(state)(obj[3]),
});

