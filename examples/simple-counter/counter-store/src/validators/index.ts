import { Store } from '../store';
import { RequestTypes as RT } from '../action-requests';
import { decrementValidator } from './decrement.validator';

export const addValidators = function (store: Store) {
  store.createValidator(RT.Decrement, decrementValidator);
};
