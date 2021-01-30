import { DeepReadonly, ValidationError } from 'partially-shared-store';
import { Id } from '../../identificable';
import { Device } from '../../models';
import { State } from '../../state';

const throwDeviceNotExistsError = (id: Id): void => {
  throw new ValidationError(`Device with id '${id}' does not exists`);
};

export const deviceExists = (state: DeepReadonly<State>) => (id: Id): void => {
  if (!(id in state.devices)) {
    throwDeviceNotExistsError(id);
  }
};

export const deviceExistsTo = (state: DeepReadonly<State>) => (to: Id) => (
  id: Id,
): void => {
  deviceExists(state)(id);
  const device = state.devices[id] as Device;
  if (!device.public && device.owner.id != to) {
    throwDeviceNotExistsError(id);
  }
};

export const deviceExistsAndIsOwnedBy = (state: DeepReadonly<State>) => (
  to: Id,
) => (id: Id): void => {
  deviceExistsTo(state)(to)(id);
  const device = state.devices[id] as Device;
  if (device.owner.id != to) {
    throw new ValidationError(`Not allowed to make that action.`);
  }
};
