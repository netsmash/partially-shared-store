import { DeepReadonly } from 'partially-shared-store';
import { copyIdentificable, toIdentificable } from '../identificable';
import { BaseModel } from './base.model';
import { User } from './user.model';

export enum DeviceType {
  Bulb,
  Thermostat,
  Blind,
}

export interface BulbState {
  intensity: number;
  on: boolean;
}

export interface ThermostatState {
  temperature: number;
}

export interface BlindState {
  raised: boolean;
}

export type DeviceState = BulbState | ThermostatState | BlindState;

export interface DeviceInfo {
  name?: string;
  description?: string;
}

export interface Device extends BaseModel {
  name: string;
  description: string;
  type: DeviceType;
  state: DeviceState;
  owner: User;
  public: boolean;
}

export const copyDevice = (device: DeepReadonly<Device>): Device => ({
  ...device,
  ...copyIdentificable(toIdentificable(device)),
});

export type DevicesDict = { [index: string]: Device };

export const copyDevicesDict = (devices: DevicesDict): DevicesDict => {
  const devicesCopy: DevicesDict = {};
  for (let key of Object.keys(devices)) {
    devicesCopy[key] = copyDevice(devices[key]);
  }
  return devicesCopy;
};
