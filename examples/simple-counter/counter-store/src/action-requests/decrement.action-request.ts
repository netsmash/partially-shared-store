import { Request } from 'partially-shared-store';
import { Identificable } from '../identificable';
import { RequestTypes as RT } from './types';

export type DecrementRequest = Request<Identificable, RT> & {
  type: RT.Decrement;
  author: Identificable;
};
