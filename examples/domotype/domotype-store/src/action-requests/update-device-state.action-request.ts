import { Device, DeviceState } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type UpdateDeviceStateActionRequest = ActionRequestBase & {
  type: ART.UpdateDeviceState;
  device: Device;
  state: DeviceState;
};

