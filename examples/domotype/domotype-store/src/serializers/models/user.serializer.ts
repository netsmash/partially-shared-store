import { DeepReadonly } from 'partially-shared-store';
import { toIdentificable } from '../../identificable';
import { copyUser, User } from '../../models';
import { State } from '../../state';
import {
  deserializeIdentificable,
  SerializedIdentificable,
  serializeIdentificable,
} from '../identificable';

export type SerializedKnownUser = SerializedIdentificable;

export const serializeKnownUser = (state: DeepReadonly<State>) => (
  user: DeepReadonly<User>,
): SerializedKnownUser => serializeIdentificable(state)(toIdentificable(user));

export const deserializeKnownUser = (state: DeepReadonly<State>) => (
  serializedUser: DeepReadonly<SerializedKnownUser>,
): User => {
  const identificable = deserializeIdentificable(state)(serializedUser);
  const user = copyUser(state.users[identificable.id]);
  return user;
};

export type SerializedUnknownUser =
  | [SerializedIdentificable, string]
  | [SerializedIdentificable, string, string];

export const serializeUnknownUser = (state: DeepReadonly<State>) => (
  user: DeepReadonly<User>,
): SerializedUnknownUser => {
  const serializedUser: SerializedUnknownUser = [
    serializeIdentificable(state)(toIdentificable(user)),
    user.name,
  ];
  if (user.imageUrl) {
    serializedUser.push(user.imageUrl);
  }
  return serializedUser;
};

export const deserializeUnknownUser = (state: DeepReadonly<State>) => (
  serializedUser: DeepReadonly<SerializedUnknownUser>,
): User => {
  const user: User = {
    ...deserializeIdentificable(state)(serializedUser[0]),
    name: serializedUser[1],
  };
  if (serializedUser.length > 2) {
    user.imageUrl = serializedUser[2];
  }
  return user;
};
