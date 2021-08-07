import { State } from "../state";
import { ActionBase } from "./base";
import { ActionTypes as AT } from "./types";

export type CloneAction = ActionBase & {
  type: AT.Clone;
  version: string;
  state: State;
};
