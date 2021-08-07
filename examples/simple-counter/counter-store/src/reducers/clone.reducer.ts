import {
  DeepReadonly,
  PartiallySharedStoreError,
} from "partially-shared-store";
import { State, copyState } from "../state";
import { Action, ActionTypes as AT } from "../actions";
import { version } from "../version";

export const cloneReducer = (
  state: DeepReadonly<State>,
  action: Action<AT.Clone>
): DeepReadonly<State> => {
  if (action.version !== version) {
    throw new PartiallySharedStoreError("Server and client versions missmatch");
  }
  return copyState(action.state);
};
