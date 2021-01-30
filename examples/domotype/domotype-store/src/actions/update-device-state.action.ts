import { Device, DeviceState } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type UpdateDeviceStateAction = ActionBase & {
  type: AT.UpdateDeviceState;
  device: Device;
  state: DeviceState;
};

