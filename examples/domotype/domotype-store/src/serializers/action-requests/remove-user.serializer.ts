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
  deserializeKnownUser,
  SerializedKnownUser,
  serializeKnownUser,
} from '../models';

export type SerializedRemoveUserActionRequest = [
  SerializedTypes.ActionRequest,
  ART.RemoveUser,
  SerializedIdentificable,
  SerializedIdentificable,
  SerializedKnownUser,
];

export const serializeRemoveUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.RemoveUser>>,
): SerializedRemoveUserActionRequest => [
  SerializedTypes.ActionRequest,
  ART.RemoveUser,
  serializeIdentificable(state)(toIdentificable(obj)),
  serializeIdentificable(state)(obj.author),
  serializeKnownUser(state)(obj.user),
];

export const deserializeRemoveUser = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedRemoveUserActionRequest>,
): ActionRequest<ART.RemoveUser> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.RemoveUser,
  author: deserializeIdentificable(state)(obj[3]),
  user: deserializeKnownUser(state)(obj[4]),
});

