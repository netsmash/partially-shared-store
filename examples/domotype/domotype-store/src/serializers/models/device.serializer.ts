import { DeepReadonly } from 'partially-shared-store';
import { toIdentificable } from '../../identificable';
import {
  BlindState,
  BulbState,
  copyDevice,
  Device,
  DeviceInfo,
  DeviceState,
  DeviceType,
  ThermostatState,
} from '../../models';
import { State } from '../../state';
import {
  deserializeIdentificable,
  SerializedIdentificable,
  serializeIdentificable,
} from '../identificable';
import {
  deserializeKnownUser,
  serializeKnownUser,
  SerializedKnownUser,
} from './user.serializer';

// Known Device
export type SerializedKnownDevice = SerializedIdentificable;

export const serializeKnownDevice = (state: DeepReadonly<State>) => (
  user: DeepReadonly<Device>,
): SerializedKnownDevice =>
  serializeIdentificable(state)(toIdentificable(user));

export const deserializeKnownDevice = (state: DeepReadonly<State>) => (
  serializedDevice: DeepReadonly<SerializedKnownDevice>,
): Device => {
  const identificable = deserializeIdentificable(state)(serializedDevice);
  return copyDevice(state.devices[identificable.id]);
};

// Device States
export type SerializedBulbState = [number, boolean];

export const serializeBulbState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<BulbState>,
): SerializedBulbState => [obj.intensity, obj.on];

export const deserializeBulbState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedBulbState>,
): BulbState => ({
  intensity: obj[0],
  on: obj[1],
});

export type SerializedThermostatState = number;

export const serializeThermostatState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ThermostatState>,
): SerializedThermostatState => obj.temperature;

export const deserializeThermostatState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedThermostatState>,
): ThermostatState => ({ temperature: obj });

export type SerializedBlindState = boolean;

export const serializeBlindState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<BlindState>,
): SerializedBlindState => obj.raised;

export const deserializeBlindState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedBlindState>,
): BlindState => ({ raised: obj });

export type SerializedDeviceState =
  | SerializedBulbState
  | SerializedThermostatState
  | SerializedBlindState;

export const serializeDeviceState = (state: DeepReadonly<State>) => (
  type: DeviceType,
) => (deviceState: DeepReadonly<DeviceState>): SerializedDeviceState => {
  switch (type) {
    case DeviceType.Bulb:
      return serializeBulbState(state)(deviceState as BulbState);
    case DeviceType.Thermostat:
      return serializeThermostatState(state)(deviceState as ThermostatState);
    case DeviceType.Blind:
      return serializeBlindState(state)(deviceState as BlindState);
  }
};

export const deserializeDeviceState = (state: DeepReadonly<State>) => (
  type: DeviceType,
) => (
  serializedDeviceState: DeepReadonly<SerializedDeviceState>,
): DeviceState => {
  switch (type) {
    case DeviceType.Bulb:
      return deserializeBulbState(state)(
        (serializedDeviceState as unknown) as SerializedBulbState,
      );
    case DeviceType.Thermostat:
      return deserializeThermostatState(state)(
        (serializedDeviceState as unknown) as SerializedThermostatState,
      );
    case DeviceType.Blind:
      return deserializeBlindState(state)(
        (serializedDeviceState as unknown) as SerializedBlindState,
      );
  }
};

// Device Info

export type SerializedDeviceInfo = [string | null, string | null];

export const serializeDeviceInfo = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<DeviceInfo>,
): SerializedDeviceInfo => [obj.name || null, obj.description || null];

export const deserializeDeviceInfo = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedDeviceInfo>,
): DeviceInfo => {
  const info: DeviceInfo = {};
  if (obj[0] !== null) {
    info.name = obj[0];
  }
  if (obj[1] !== null) {
    info.description = obj[1];
  }
  return info;
};

// Unknown Device
export type SerializedUnknownDevice = [
  SerializedIdentificable,
  string,
  string,
  DeviceType,
  SerializedDeviceState,
  SerializedKnownUser,
  boolean,
];

export const serializeUnknownDevice = (state: DeepReadonly<State>) => (
  device: DeepReadonly<Device>,
): SerializedUnknownDevice => [
  serializeIdentificable(state)(toIdentificable(device)),
  device.name,
  device.description,
  device.type,
  serializeDeviceState(state)(device.type)(device.state),
  serializeKnownUser(state)(device.owner),
  device.public,
];

export const deserializeUnknownDevice = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedUnknownDevice>,
): Device => ({
  ...deserializeIdentificable(state)(obj[0]),
  name: obj[1],
  description: obj[2],
  type: obj[3],
  state: deserializeDeviceState(state)(obj[3])(obj[4]),
  owner: deserializeKnownUser(state)(obj[5]),
  public: obj[6],
});
