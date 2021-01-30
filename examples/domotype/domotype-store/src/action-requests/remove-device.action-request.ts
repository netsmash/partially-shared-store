import { Device } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type RemoveDeviceActionRequest = ActionRequestBase & {
  type: ART.RemoveDevice;
  device: Device;
};

