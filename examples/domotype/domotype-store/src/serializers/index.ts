import { ActionRequest } from '../action-requests';
import { Action } from '../actions';
import { State } from '../state';

import { SerializedState } from './state';
import { SerializedActionRequest } from './action-requests';
import { SerializedAction } from './actions';

export type Serialized<T> = T extends State
  ? SerializedState
  : T extends ActionRequest<infer U>
  ? SerializedActionRequest<U>
  : T extends Action<infer U>
  ? SerializedAction<U>
  : never;

export * from './action-requests';
export * from './actions';
export * from './state';
