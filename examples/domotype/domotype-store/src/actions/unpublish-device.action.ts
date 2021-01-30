import { Device } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type UnpublishDeviceAction = ActionBase & {
  type: AT.UnpublishDevice;
  device: Device;
};

