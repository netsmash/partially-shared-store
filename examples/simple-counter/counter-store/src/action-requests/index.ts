import { RequestTypes as RT } from './types';
import { CloneRequest } from './clone.action-request';
import { IncrementRequest } from './increment.action-request';
import { DecrementRequest } from './decrement.action-request';
import { createIdentificable } from '../identificable';

type AnyRequest = CloneRequest | IncrementRequest | DecrementRequest;

export type Request<T extends RT = RT> = T extends RT.Clone
  ? CloneRequest
  : T extends RT.Increment
  ? IncrementRequest
  : T extends RT.Decrement
  ? DecrementRequest
  : AnyRequest;

export const isRequest = <T extends RT>(obj: any, type?: T): obj is Request<T> =>
  typeof obj === 'object' && 'type' in obj && obj.type in RT && (type === undefined || obj.type === type);

export const createRequest = <T extends RT>(type: T) => (obj: Omit<Request<T>, 'id' | 'type'>): Request<T> =>
  (({
    ...createIdentificable(),
    type,
    ...obj,
  } as unknown) as Request<T>);

export * from './types';
