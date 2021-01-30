import { DeepReadonly, ValidationError } from 'partially-shared-store';
import { Id } from '../../identificable';
import { DeviceInfo } from '../../models';
import { State } from '../../state';

export const isDeviceInfoValid = (state: DeepReadonly<State>) => (
  info: DeviceInfo,
  deviceId?: Id,
): void => {
  if (info.name !== undefined) {
    if (info.name.length < 3) {
      throw new ValidationError('Device name is too short. At least 3 chars.');
    }

    const device = Object.values(state.devices).find(
      (device) => device.name === info.name,
    );
    if (device && device.id != deviceId) {
      throw new ValidationError('Invalid device name.');
    }
  }
};
