import { Device } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type UnpublishDeviceActionRequest = ActionRequestBase & {
  type: ART.UnpublishDevice;
  device: Device;
};

