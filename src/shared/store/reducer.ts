import { configReducer, initialConfigState } from "./config/reducer";
import { InternalAppState } from "./types";

export const initialAppState = (): InternalAppState => ({
  config: initialConfigState()
});

export const appReducer = {
  config: configReducer
};
