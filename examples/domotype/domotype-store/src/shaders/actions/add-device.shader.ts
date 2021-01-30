import { DeepReadonly } from 'partially-shared-store';
import {
  Action,
  ActionTypes as AT,
} from '../../actions';
import { State } from '../../state';
import { Identificable } from '../../identificable';

export const shadeAddDevice = (state: DeepReadonly<State>) => (
  to: DeepReadonly<Identificable>
) => (
  obj: Action<AT.AddDevice>,
): Action<AT.AddDevice> => obj