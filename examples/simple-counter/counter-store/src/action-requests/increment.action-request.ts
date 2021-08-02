import { Request } from 'partially-shared-store';
import { Identificable } from '../identificable';
import { RequestTypes as RT } from './types';

export type IncrementRequest = Request<Identificable, RT> & {
  type: RT.Increment;
  author: Identificable;
};
