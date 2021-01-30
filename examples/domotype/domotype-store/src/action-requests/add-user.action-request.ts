import { User } from '../models';
import { ActionRequestBaseNoAuthor } from './base';
import { ActionRequestTypes as ART } from './types';

export type AddUserActionRequest = ActionRequestBaseNoAuthor & {
  type: ART.AddUser;
  user: User;
};

