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
  SerializedUnknownUser,
} from '../models/user.serializer';
import { SerializedTypes } from '../types';

export type SerializedState = [
  SerializedTypes.State,
  string,
  string,
  SerializedUnknownDevice[],
  SerializedUnknownUser[],
];

export const isSerializedState = (obj: any): obj is SerializedState =>
  Array.isArray(obj) && obj.length > 0 && obj[0] == SerializedTypes.State;

export const serializeState = (state: DeepReadonly<State>): SerializedState => [
  SerializedTypes.State,
  state.id,
  state.name,
  Object.values(state.devices).map(serializeUnknownDevice(state)),
  Object.values(state.users).map(serializeUnknownUser(state)),
];

export const deserializeState = (obj: DeepReadonly<SerializedState>): State => {
  const partialState: State = {
    id: obj[1],
    name: obj[2],
    devices: {},
    users: {},
  };

  partialState.users = obj[4].reduce<{ [index: string]: User }>(
    (users, serializedUser) => {
      const user: User = deserializeUnknownUser(partialState)(serializedUser);
      users[user.id] = user;
      return users;
    },
    {},
  );

  partialState.devices = obj[3].reduce<{ [index: string]: Device }>(
    (devices, serializedDevice) => {
      const device: Device = deserializeUnknownDevice(partialState)(
        serializedDevice,
      );
      devices[device.id] = device;
      return devices;
    },
    {},
  );

  return partialState;
};
