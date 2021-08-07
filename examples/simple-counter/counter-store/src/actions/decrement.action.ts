import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type DecrementAction = ActionBase & {
  type: AT.Decrement;
}
