import { State } from 'domotype-store';
import { deserializeState, Serialized } from 'domotype-store/serializers';

export type ReceivedHome = Serialized<State>;

export type Home = State;

export const parseHome = deserializeState;

export interface RequestedNewHome {
  name: string;
}
