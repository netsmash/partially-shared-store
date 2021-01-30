import { ActionRequestBase } from './base';
import { ActionRequestTypes as ART } from './types';

export type CloneActionRequest = ActionRequestBase & {
  type: ART.Clone;
};