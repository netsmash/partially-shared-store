import { User } from 'domotype-store/models';
import { Serialized } from 'domotype-store/serializers';
import { deserializeUnknownUser } from 'domotype-store/serializers/models';
import { createInitialState } from 'domotype-store/state';

export type ReceivedUser = Serialized<User>;

export const parseUser = deserializeUnknownUser(createInitialState());

export { User } from 'domotype-store/models';
