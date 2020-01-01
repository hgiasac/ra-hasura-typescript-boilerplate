import { Reducer } from "redux";
import { ConfigAction, CHANGE_THEME, IConfigState, Theme } from "./types";

export const ConfigState: () => IConfigState = () => ({
  theme: Theme.Light,
});

type ConfigReducer = Reducer<IConfigState, ConfigAction>;
export const configReducer: ConfigReducer = (state = ConfigState(), action) => {
  switch (action.type) {
  case CHANGE_THEME:
    return {
      ...state,
      theme: action.payload
    };
  default:
    return state;
  }
};
