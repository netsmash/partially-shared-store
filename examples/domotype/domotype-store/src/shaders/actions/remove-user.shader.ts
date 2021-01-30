import { DeepReadonly } from 'partially-shared-store';
import {
  Action,
  ActionTypes as AT,
} from '../../actions';
import { State } from '../../state';
import { Identificable } from '../../identificable';

export const shadeRemoveUser = (state: DeepReadonly<State>) => (
  to: DeepReadonly<Identificable>
) => (
  obj: Action<AT.RemoveUser>,
): Action<AT.RemoveUser> => obj