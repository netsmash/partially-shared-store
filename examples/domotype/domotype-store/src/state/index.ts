import { DeepReadonly } from 'partially-shared-store';
import { createIdentificable, Id } from '../identificable';
import { copyDevicesDict, copyUsersDict, Device, User } from '../models';

export interface State {
  id: Id;
  name: string;
  devices: {
    [index: string]: Device;
  };
  users: {
    [index: string]: User;
  };
}

export const copyState = (state: DeepReadonly<State>): State => ({
  id: state.id,
  name: state.name,
  devices: copyDevicesDict(state.devices),
  users: copyUsersDict(state.users),
});

export const createInitialState = (): State => ({
  ...createIdentificable(),
  name: '',
  devices: {},
  users: {},
});
