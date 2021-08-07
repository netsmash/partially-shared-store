import { State } from "../state";
import { RequestBase } from "./base";
import { RequestTypes as RT } from "./types";

export type CloneRequest = RequestBase & {
  type: RT.Clone;
};
