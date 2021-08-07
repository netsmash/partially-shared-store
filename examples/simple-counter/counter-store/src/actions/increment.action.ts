import { ActionBase } from './base';
import { ActionTypes as AT } from './types';

export type IncrementAction = ActionBase & {
  type: AT.Increment;
}
