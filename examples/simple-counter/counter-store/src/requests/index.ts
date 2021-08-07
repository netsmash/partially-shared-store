import { RequestTypes as RT } from './types';
import { CloneRequest } from './clone.request';
import { IncrementRequest } from './increment.request';
import { DecrementRequest } from './decrement.request';

type AnyRequest = CloneRequest | IncrementRequest | DecrementRequest;

export type Request<T extends RT = RT> = T extends RT.Clone
  ? CloneRequest
  : T extends RT.Increment
  ? IncrementRequest
  : T extends RT.Decrement
  ? DecrementRequest
  : AnyRequest;

export const isRequest = <T extends RT>(obj: any, type?: T): obj is Request<T> =>
  typeof obj === 'object' && obj.type in RT && (type === undefined || obj.type === type);

export const createRequest = <T extends RT>(type: T) => (obj: Omit<Request<T>, 'type'>): Request<T> =>
  (({
    type,
    ...obj,
  } as unknown) as Request<T>);

export * from './types';
