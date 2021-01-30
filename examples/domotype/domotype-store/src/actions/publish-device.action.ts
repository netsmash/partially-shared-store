import { Device } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type PublishDeviceAction = ActionBase & {
  type: AT.PublishDevice;
  device: Device;
};

