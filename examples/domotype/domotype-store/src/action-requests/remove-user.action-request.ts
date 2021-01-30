import { User } from '../models';
import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type RemoveUserActionRequest = ActionRequestBase & {
  type: ART.RemoveUser;
  user: User;
};

