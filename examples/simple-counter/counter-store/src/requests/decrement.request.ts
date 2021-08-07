import { RequestBase } from './base';
import { RequestTypes as RT } from './types';

export type DecrementRequest = RequestBase & {
  type: RT.Decrement;
}
