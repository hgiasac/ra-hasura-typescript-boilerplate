import { configReducer, ConfigState } from "./config/reducer";

export const AppState = () => ({
  config: ConfigState()
});

export const appReducer = {
  config: configReducer,
};
