import { ReduxState } from "ra-core";
import { IConfigState } from "./config/types";
export * from "./config/types";

export interface IAppState extends ReduxState {
  config: IConfigState;
}
