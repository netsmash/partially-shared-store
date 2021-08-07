import { Request } from 'partially-shared-store';
import { RequestTypes as RT } from './types';

export type RequestBase = Request<RT> & {
  type: RT;
};
