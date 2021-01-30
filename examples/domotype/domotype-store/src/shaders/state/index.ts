import { DeepReadonly } from 'partially-shared-store';
import { Identificable } from '../../identificable';
import { copyState, State } from '../../state';

export const shadeState = (state: DeepReadonly<State>) => (
  to: DeepReadonly<Identificable>,
): State => {
  const shadedState = copyState(state);
  for (const device of Object.values(state.devices)) {
    if (!device.public && device.owner.id != to.id) {
      delete shadedState.devices[device.id];
    }
  }
  return shadedState;
};
