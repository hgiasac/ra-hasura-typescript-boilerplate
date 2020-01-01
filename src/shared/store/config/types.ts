export enum Theme {
  Light = "Light",
  Dark = "Dark",
}

export interface IConfigState {
  readonly theme: Theme;
}

export const CHANGE_THEME = "CHANGE_THEME";

export interface IChangeThemeAction {
  type: typeof CHANGE_THEME;
  payload: Theme;
}

export type ConfigAction
  = IChangeThemeAction;
