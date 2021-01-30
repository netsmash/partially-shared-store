import { DeepReadonly } from 'partially-shared-store';
import { State } from '../state';
import { Id, Identificable } from '../identificable';

export type SerializedIdentificable = Id;

export const serializeIdentificable = (state: DeepReadonly<State>) => (
  identificable: Identificable,
): SerializedIdentificable => identificable.id;

export const deserializeIdentificable = (state: DeepReadonly<State>) => (
  serializedIdentificable: SerializedIdentificable,
): Identificable => ({
  id: serializedIdentificable,
});
