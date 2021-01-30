import { DeepReadonly } from 'partially-shared-store';
import {
  Action,
  ActionTypes as AT,
} from '../../actions';
import { State } from '../../state';
import { Identificable } from '../../identificable';

export const shadeUpdateDeviceInfo = (state: DeepReadonly<State>) => (
  to: DeepReadonly<Identificable>
) => (
  obj: Action<AT.UpdateDeviceInfo>,
): Action<AT.UpdateDeviceInfo> => obj