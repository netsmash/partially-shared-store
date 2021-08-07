import { Action } from 'partially-shared-store';
import { ActionTypes as AT } from './types';

export type ActionBase = Action<AT> & {
  type: AT;
};
