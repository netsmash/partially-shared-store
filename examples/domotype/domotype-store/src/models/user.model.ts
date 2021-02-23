import { DeepReadonly } from 'partially-shared-store';
import { copyIdentificable, toIdentificable } from '../identificable';
import { BaseModel } from './base.model';

export interface User extends BaseModel {
  name: string;
  imageUrl?: string;
}

export const copyUser = (user: DeepReadonly<User>): User => ({
  ...user,
  ...copyIdentificable(toIdentificable(user)),
});

type UsersDict = { [index: string]: User };

export const copyUsersDict = (users: UsersDict): UsersDict => {
  const usersCopy: UsersDict = {};
  for (const key of Object.keys(users)) {
    usersCopy[key] = copyUser(users[key]);
  }
  return usersCopy;
};