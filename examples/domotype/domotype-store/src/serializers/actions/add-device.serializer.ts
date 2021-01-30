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
  deserializeUnknownDevice,
  SerializedUnknownDevice,
  serializeUnknownDevice,
} from '../models';

export type SerializedAddDeviceAction = [
  SerializedTypes.Action,
  AT.AddDevice,
  SerializedIdentificable,
  SerializedUnknownDevice,
];

export const serializeAddDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.AddDevice>>,
): SerializedAddDeviceAction => [
  SerializedTypes.Action,
  AT.AddDevice,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeUnknownDevice(state)(obj.device),
];

export const deserializeAddDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedAddDeviceAction>,
): Action<AT.AddDevice> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.AddDevice,
  device: deserializeUnknownDevice(state)(obj[3]),
});

