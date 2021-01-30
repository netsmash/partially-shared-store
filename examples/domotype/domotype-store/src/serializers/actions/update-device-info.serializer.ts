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
  deserializeDeviceInfo,
  deserializeKnownDevice,
  SerializedDeviceInfo,
  serializeDeviceInfo,
  SerializedKnownDevice,
  serializeKnownDevice,
} from '../models';

export type SerializedUpdateDeviceInfoAction = [
  SerializedTypes.Action,
  AT.UpdateDeviceInfo,
  SerializedIdentificable,
  SerializedDeviceInfo,
  SerializedKnownDevice,
];

export const serializeUpdateDeviceInfo = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.UpdateDeviceInfo>>,
): SerializedUpdateDeviceInfoAction => [
  SerializedTypes.Action,
  AT.UpdateDeviceInfo,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeDeviceInfo(state)(obj.info),
  serializeKnownDevice(state)(obj.device),
];

export const deserializeUpdateDeviceInfo = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUpdateDeviceInfoAction>,
): Action<AT.UpdateDeviceInfo> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.UpdateDeviceInfo,
  info: deserializeDeviceInfo(state)(obj[3]),
  device: deserializeKnownDevice(state)(obj[4]),
});

