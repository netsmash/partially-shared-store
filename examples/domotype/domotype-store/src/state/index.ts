import { DeepReadonly } from 'partially-shared-store';
import { Device, User } from '../models';

export interface State {
  devices: {
    [index: string]: Device;
  };
  users: {
    [index: string]: User;
  };
}

export const copyState = (state: DeepReadonly<State>): State => ({
  devices: {
    ...state.devices,
  },
  users: {
    ...state.users,
  },
});

export const createInitialState = (): State => ({
  devices: {},
  users: {},
});
