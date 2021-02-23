import { ActionRequest } from 'partially-shared-store';
import { Identificable } from '../identificable';
import { User } from '../models';
import { ActionRequestTypes as ART } from './types';

export type ActionRequestBase = ActionRequest<Identificable, ART> & {
  type: ART;
  author: User;
};

export type ActionRequestBaseNoAuthor = ActionRequest<Identificable, ART>;
