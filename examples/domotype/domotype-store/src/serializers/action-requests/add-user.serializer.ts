import { DeepReadonly } from 'partially-shared-store';
import {
  ActionRequest,
  ActionRequestTypes as ART,
} from '../../action-requests';
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
  SerializeUnknownUser,
} from '../models';

export type SerializedAddUserActionRequest = [
  SerializedTypes.ActionRequest,
  ART.AddUser,
  SerializedIdentificable,
  SerializeUnknownUser,
];

export const serializeAddUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.AddUser>>,
): SerializedAddUserActionRequest => [
  SerializedTypes.ActionRequest,
  ART.AddUser,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeUnknownUser(state)(obj.user),
];

export const deserializeAddUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedAddUserActionRequest>,
): ActionRequest<ART.AddUser> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.AddUser,
  user: deserializeUnknownUser(state)(obj[3]),
});

