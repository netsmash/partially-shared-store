import { User } from '../models';
import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type RemoveUserAction = ActionBase & {
  type: AT.RemoveUser;
  user: User;
};

