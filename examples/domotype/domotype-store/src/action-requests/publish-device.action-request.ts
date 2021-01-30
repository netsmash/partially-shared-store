import { Device } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type PublishDeviceActionRequest = ActionRequestBase & {
  type: ART.PublishDevice;
  device: Device;
};

