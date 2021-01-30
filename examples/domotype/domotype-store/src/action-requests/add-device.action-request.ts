import { Device, DeviceInfo, DeviceState, DeviceType } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type AddDeviceActionRequest = ActionRequestBase & {
  type: ART.AddDevice;
  info: DeviceInfo;
  deviceType: DeviceType;
  state: DeviceState;
};
