import { DeepReadonly } from 'partially-shared-store';
import { Action, ActionTypes as AT } from '../../actions';
import { State } from '../../state';
import { SerializedTypes } from '../types';
import {
  SerializedIdentificable,
  serializeIdentificable,
  deserializeIdentificable,
} from '../identificable';
import { toIdentificable } from '../../identificable';
import {
  deserializeKnownUser,
  SerializedKnownUser,
  serializeKnownUser,
} from '../models';

export type SerializedRemoveUserAction = [
  SerializedTypes.Action,
  AT.RemoveUser,
  SerializedIdentificable,
  SerializedKnownUser,
];

export const serializeRemoveUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.RemoveUser>>,
): SerializedRemoveUserAction => [
  SerializedTypes.Action,
  AT.RemoveUser,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeKnownUser(state)(obj.user),
];

export const deserializeRemoveUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedRemoveUserAction>,
): Action<AT.RemoveUser> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.RemoveUser,
  user: deserializeKnownUser(state)(obj[3]),
});

