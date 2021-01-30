import { Device } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type RemoveDeviceAction = ActionBase & {
  type: AT.RemoveDevice;
  device: Device;
};

