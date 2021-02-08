import { DeepReadonly } from 'partially-shared-store';
import { createIdentificable, Id } from '../identificable';
import { Device, User } from '../models';

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
  devices: {
    ...state.devices,
  },
  users: {
    ...state.users,
  },
});

export const createInitialState = (): State => ({
  ...createIdentificable(),
  name: '',
  devices: {},
  users: {},
});
