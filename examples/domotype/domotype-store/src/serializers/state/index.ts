import { DeepReadonly } from 'partially-shared-store';
import { Device, User } from '../../models';
import { State } from '../../state';
import {
  deserializeUnknownDevice,
  SerializedUnknownDevice,
  serializeUnknownDevice,
} from '../models/device.serializer';
import {
  deserializeUnknownUser,
  serializeUnknownUser,
  SerializeUnknownUser,
} from '../models/user.serializer';
import { SerializedTypes } from '../types';

export type SerializedState = [
  SerializedTypes.State,
  SerializedUnknownDevice[],
  SerializeUnknownUser[],
];

export const isSerializedState = (obj: any): obj is SerializedState =>
  Array.isArray(obj) && obj.length > 0 && obj[0] == SerializedTypes.State;

export const serializeState = (state: DeepReadonly<State>): SerializedState => [
  SerializedTypes.State,
  Object.values(state.devices).map(serializeUnknownDevice(state)),
  Object.values(state.users).map(serializeUnknownUser(state)),
];

export const deserializeState = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedState>,
): State => ({
  devices: obj[1].reduce<{ [index: string]: Device }>(
    (devices, serializedDevice) => {
      const device: Device = deserializeUnknownDevice(state)(serializedDevice);
      devices[device.id] = device;
      return devices;
    },
    {},
  ),
  users: obj[2].reduce<{ [index: string]: User }>((users, serializedUser) => {
    const user: User = deserializeUnknownUser(state)(serializedUser);
    users[user.id] = user;
    return users;
  }, {}),
});
