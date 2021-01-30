import { DeepReadonly } from 'partially-shared-store';
import { Action, ActionTypes as AT } from '../../actions';
import { State } from '../../state';
import { SerializedTypes } from '../types';
import { SerializedState, serializeState, deserializeState } from '../state';
import {
  SerializedIdentificable,
  serializeIdentificable,
  deserializeIdentificable,
} from '../identificable';
import { toIdentificable } from '../../identificable';

export type SerializedCloneAction = [
  SerializedTypes.Action,
  AT.Clone,
  SerializedIdentificable,
  string,
  SerializedIdentificable,
  SerializedState,
];

export const serializeClone = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.Clone>>,
): SerializedCloneAction => [
  SerializedTypes.Action,
  AT.Clone,
  serializeIdentificable(state)(toIdentificable(obj)),
  obj.version,
  serializeIdentificable(state)(obj.target),
  serializeState(obj.state),
];

export const deserializeClone = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedCloneAction>,
): Action<AT.Clone> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.Clone,
  version: obj[3],
  target: deserializeIdentificable(state)(obj[4]),
  state: deserializeState(state)(obj[5]),
});
