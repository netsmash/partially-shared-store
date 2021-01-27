import { State } from '../state';
import {
  DeepReadonly,
  PartiallySharedStoreError,
} from 'partially-shared-store';
import { ActionTypes as AT, Action } from '../actions';
import { version } from '../version';

export const cloneReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.Clone>,
): DeepReadonly<State> => {
  if (action.version !== version) {
    throw new PartiallySharedStoreError('Server and client versions missmatch');
  }
  return action.state;
};
