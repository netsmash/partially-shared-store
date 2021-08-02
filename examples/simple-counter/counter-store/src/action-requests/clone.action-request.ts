import { Request } from 'partially-shared-store';
import { Identificable } from '../identificable';
import { RequestTypes as RT } from './types';

export type CloneRequest = Request<Identificable, RT> & {
  type: RT.Clone;
  author: Identificable;
};
