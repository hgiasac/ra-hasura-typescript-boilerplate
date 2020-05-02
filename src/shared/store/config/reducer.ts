import { Reducer } from "redux";
import { ConfigAction, CHANGE_THEME, ConfigState, Theme } from "./types";

export const initialConfigState: () => ConfigState = () => ({
  theme: Theme.Light
});

type ConfigReducer = Reducer<ConfigState, ConfigAction>;
export const configReducer: ConfigReducer = (state = initialConfigState(), action) => {
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
