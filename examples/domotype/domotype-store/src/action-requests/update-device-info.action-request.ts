import { Device, DeviceInfo } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type UpdateDeviceInfoActionRequest = ActionRequestBase & {
  type: ART.UpdateDeviceInfo;
  device: Device;
  info: DeviceInfo;
};
