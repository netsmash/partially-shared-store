import { User } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type AddUserAction = ActionBase & {
  type: AT.AddUser;
  user: User;
};
