import { RequestBase } from './base';
import { RequestTypes as RT } from './types';

export type IncrementRequest = RequestBase & {
  type: RT.Increment;
}
