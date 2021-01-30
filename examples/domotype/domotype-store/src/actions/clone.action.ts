import { Identificable } from "../identificable";
import { ActionTypes as AT } from "./types";
import { State } from "../state";
import { ActionBase } from "./base";

export interface CloneAction extends ActionBase {
  type: AT.Clone;
  state: State;
  version: string;
  target: Identificable;
}
