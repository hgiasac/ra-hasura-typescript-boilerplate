import { ReduxState } from "ra-core";
import { ConfigState } from "./config/types";
export * from "./config/types";

export type InternalAppState = {
  readonly config: ConfigState
};

export type AppState = ReduxState & InternalAppState;
