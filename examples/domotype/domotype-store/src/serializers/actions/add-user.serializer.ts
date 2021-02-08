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
  deserializeUnknownUser,
  serializeUnknownUser,
  SerializedUnknownUser,
} from '../models';

export type SerializedAddUserAction = [
  SerializedTypes.Action,
  AT.AddUser,
  SerializedIdentificable,
  SerializedUnknownUser,
];

export const serializeAddUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<Action<AT.AddUser>>,
): SerializedAddUserAction => [
  SerializedTypes.Action,
  AT.AddUser,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeUnknownUser(state)(obj.user),
];

export const deserializeAddUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedAddUserAction>,
): Action<AT.AddUser> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: AT.AddUser,
  user: deserializeUnknownUser(state)(obj[3]),
});
