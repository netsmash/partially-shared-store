import { RequestTypes as RT } from '../requests';
import { Store } from '../store';
import { decrementValidator } from './decrement.validator';

export const addValidators = (store: Store) => {
  store.createValidator(RT.Decrement, decrementValidator);
};
