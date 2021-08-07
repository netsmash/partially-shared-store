import { DeepReadonly } from 'partially-shared-store';
import { ValidationError } from 'partially-shared-store/errors';
import { State } from '../state';
import { Request, RequestTypes as RT } from '../requests';

export const decrementValidator = (state: DeepReadonly<State>, request: Request<RT.Decrement>): void => {
  if (state.value === 0) {
    throw new ValidationError('Cannot decrement counter below 0');
  }
};
