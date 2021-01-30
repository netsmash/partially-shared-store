import { Device, DeviceInfo } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type UpdateDeviceInfoAction = ActionBase & {
  type: AT.UpdateDeviceInfo;
  device: Device;
  info: DeviceInfo;
};

