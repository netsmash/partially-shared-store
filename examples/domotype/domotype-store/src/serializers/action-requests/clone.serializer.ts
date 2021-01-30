import { DeepReadonly } from 'partially-shared-store';
import {
  ActionRequest,
  ActionRequestTypes as ART,
} from '../../action-requests';
import { State } from '../../state';
import { SerializedTypes } from '../types';
import {
  SerializedIdentificable,
  serializeIdentificable,
  deserializeIdentificable,
} from '../identificable';

export type SerializedCloneActionRequest = [
  SerializedTypes.ActionRequest,
  ART.Clone,
  SerializedIdentificable,
];

export const serializeClone = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<ActionRequest<ART.Clone>>,
): SerializedCloneActionRequest => [
  SerializedTypes.ActionRequest,
  ART.Clone,
  serializeIdentificable(state)(obj.author),
];

export const deserializeClone = (state: DeepReadonly<State>) => (
  obj: DeepReadonly<SerializedCloneActionRequest>,
): ActionRequest<ART.Clone> => ({
  ...deserializeIdentificable(state)(obj[2]),
  type: ART.Clone,
  author: deserializeIdentificable(state)(obj[2]),
});

