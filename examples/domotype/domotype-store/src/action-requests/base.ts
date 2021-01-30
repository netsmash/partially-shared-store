import { ActionRequest } from 'partially-shared-store';
import { Identificable } from '../identificable';
import { ActionRequestTypes as ART } from './types';

export type ActionRequestBase = ActionRequest<Identificable, ART> & {
  type: ART;
  author: Identificable;
};

export type ActionRequestBaseNoAuthor = ActionRequest<Identificable, ART>;
