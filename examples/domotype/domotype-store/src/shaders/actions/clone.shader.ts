import { DeepReadonly } from 'partially-shared-store';
import { Action, ActionTypes as AT, createAction } from '../../actions';
import { State } from '../../state';
import { Identificable } from '../../identificable';
import { shadeState } from '../state';

export const shadeClone = (state: DeepReadonly<State>) => (
  to: DeepReadonly<Identificable>,
) => (obj: Action<AT.Clone>): Action<AT.Clone> =>
  createAction(AT.Clone)({
    version: obj.version,
    state: shadeState(obj.state)(to),
    target: obj.target,
  });
