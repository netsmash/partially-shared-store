import { DeepReadonly } from 'partially-shared-store';
import {
  Action,
  ActionTypes as AT,
} from '../../actions';
import { State } from '../../state';
import { Identificable } from '../../identificable';

export const shadeUnpublishDevice = (state: DeepReadonly<State>) => (
  to: DeepReadonly<Identificable>
) => (
  obj: Action<AT.UnpublishDevice>,
): Action<AT.UnpublishDevice> => obj