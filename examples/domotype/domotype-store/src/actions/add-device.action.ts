import { Device } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type AddDeviceAction = ActionBase & {
  type: AT.AddDevice;
  device: Device;
};

