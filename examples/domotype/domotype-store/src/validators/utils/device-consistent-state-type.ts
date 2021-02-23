import { ValidationError } from 'partially-shared-store';
import { DeviceState, DeviceType } from '../../models';

export const isDeviceStateTypeConsistent = (deviceType: DeviceType) => (
  deviceState: DeviceState,
): void => {
  switch (deviceType) {
    case DeviceType.Bulb:
      if (!('on' in deviceState)) {
        throw new ValidationError(
          `Device state for bulb has not 'on' property.`,
        );
      } else if (typeof deviceState.on !== 'boolean') {
        throw new ValidationError(
          `Device state for bulb 'on' property is not a boolean.`,
        );
      }

      if (!('intensity' in deviceState)) {
        throw new ValidationError(
          `Device state for bulb has not 'intensity' property.`,
        );
      } else if (typeof deviceState.intensity !== 'number') {
        throw new ValidationError(
          `Device state for bulb 'intensity' property is not a number.`,
        );
      } else if (deviceState.intensity > 100 || deviceState.intensity < 0) {
        throw new ValidationError(
          `Device state for bulb 'intensity' property is not in range 0-100.`,
        );
      }
      break;
    case DeviceType.Blind:
      if (!('raised' in deviceState)) {
        throw new ValidationError(
          `Device state for blind has not 'raised' property.`,
        );
      } else if (typeof deviceState.raised !== 'boolean') {
        throw new ValidationError(
          `Device state for blind 'raised' property is not a boolean.`,
        );
      }
      break;
    case DeviceType.Thermostat:
      if (!('temperature' in deviceState)) {
        throw new ValidationError(
          `Device state for thermostat has not 'temperature' property.`,
        );
      } else if (typeof deviceState.temperature !== 'number') {
        throw new ValidationError(
          `Device state for thermostat 'temperature' property is not a number.`,
        );
      } else if (deviceState.temperature > 50 || deviceState.temperature < 5) {
        throw new ValidationError(
          `Device state for thermostat 'temperature' property is not in range 5-50.`,
        );
      }
      break;
    default:
      throw new ValidationError(`Device type is not recognized`);
  }
};
