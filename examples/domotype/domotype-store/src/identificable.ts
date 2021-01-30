import { DeepReadonly } from 'partially-shared-store';

export type Id = string;

export interface Identificable {
  id: Id;
}

export const createIdentificable = (): Identificable => ({
  id: (Date.now() * 1000 + Math.floor(1000 * Math.random())).toString(16),
});

export const toIdentificable = (obj: Identificable & any): Identificable => ({
  id: obj.id,
});

export const copyIdentificable = (
  obj: DeepReadonly<Identificable>,
): Identificable => ({
  ...obj,
});
