import { Action } from 'partially-shared-store';
import { Identificable } from '../identificable';
import { ActionTypes as AT } from './types';

export type ActionBase = Action<Identificable, AT> & {
  type: AT;
  targets?: Set<Identificable>;
  serverIgnore?: true;
};
